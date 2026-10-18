import React, { useState, useEffect } from "react";
import { Phone, MapPin, Award, Briefcase, Upload, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, updateUser } from "../../store/slices/authSlice";
import { selectMyProfile, setMyProfile } from "../../store/slices/vetSlice";
import toast from "react-hot-toast";
import { getCurrentLocation } from "../../utils/geoLocation";
// import API from "../../api/axios";
import { updateVetProfile ,updateUserProfile} from "../../api/profileAPI";
import { data } from "react-router-dom";

const MAX_CLINIC_PHOTOS = 5;
const MAX_SIZE = 5 * 1024 * 1024;

const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
const SPECIES = ["dog", "cat", "bird", "rabbit", "fish", "reptile", "other"];

// Returns true if the file is an acceptable image
const isValidImage = (file) => {
  if (!file.type.startsWith("image/")) {
    toast.error("Please select an image file");
    return false;
  }
  if (file.size > MAX_SIZE) {
    toast.error("Image must be less than 5MB");
    return false;
  }
  return true;
};

const readAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const EditVetProfile = ({ isOpen, onClose, onSuccess }) => {
  const user = useSelector(selectUser);
  const profile = useSelector(selectMyProfile);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("basic");
  const [errors, setErrors] = useState({});
  const [newSlotTime, setNewSlotTime] = useState("");

  const [formData, setFormData] = useState({
    clinicName: "",
    phone: "",
    address: "",
    city: "",
    bio: "",
    experience: "",
    consultationFee: "",
    specializations: [],
    availableDays: [],
    availableSlots: [],
    location: { type: "Point", coordinates: [0, 0] },
  });

  // Doctor photo (stored on User.avatar)
  const [doctorFile, setDoctorFile] = useState(null);
  const [doctorPreview, setDoctorPreview] = useState(null);


  // Clinic photos (stored on Vet.clinicPhotos)
  const [clinicFiles, setClinicFiles] = useState([]);
  const [clinicPreviews, setClinicPreviews] = useState([]);

  // Load existing data when the dialog opens
  useEffect(() => {
    if (isOpen && profile) {
      setFormData({
        clinicName: profile.clinicName || "",
        phone: profile.phone || "",
        address: profile.address || "",
        city: profile.city || "",
        bio: profile.bio || "",
        experience: profile.experience || "",
        consultationFee: profile.consultationFee || "",
        specializations: profile.specializations || [],
        availableDays: profile.availableDays || [],
        availableSlots: profile.availableSlots || [],
        location: profile.location || { type: "Point", coordinates: [0, 0] },
      });
      setErrors({});
    }
    if (isOpen) {
      setDoctorFile(null);
      setDoctorPreview(user?.avatar || null);
      setClinicFiles([]);
      setClinicPreviews([]);
    }
  }, [isOpen, profile, user]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.clinicName.trim()) newErrors.clinicName = "Clinic name is required";
    if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, "")))
      newErrors.phone = "Phone must be 10 digits";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const isNumber = name === "experience" || name === "consultationFee";
    setFormData((prev) => ({
      ...prev,
      [name]: isNumber ? (value ? Number(value) : "") : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const toggleSpecialization = (spec) =>
    setFormData((prev) => ({
      ...prev,
      specializations: prev.specializations.includes(spec)
        ? prev.specializations.filter((s) => s !== spec)
        : [...prev.specializations, spec],
    }));

  const toggleDay = (day) =>
    setFormData((prev) => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter((d) => d !== day)
        : [...prev.availableDays, day],
    }));

  const addSlot = () => {
    if (!newSlotTime) return toast.error("Please enter a time");
    if (formData.availableSlots.some((s) => s.time === newSlotTime))
      return toast.error("Slot already exists");
    setFormData((prev) => ({
      ...prev,
      availableSlots: [...prev.availableSlots, { time: newSlotTime, isBooked: false }],
    }));
    setNewSlotTime("");
  };

  const removeSlot = (index) =>
    setFormData((prev) => ({
      ...prev,
      availableSlots: prev.availableSlots.filter((_, i) => i !== index),
    }));

  // ---------- Doctor photo ----------
  const handleDoctorPhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !isValidImage(file)) return;
    setDoctorFile(file);
    setDoctorPreview(await readAsDataUrl(file));
  };

  // ---------- Clinic photos ----------
  const existingClinicCount = profile?.clinicPhotos?.length || 0;
  const remainingSlots = MAX_CLINIC_PHOTOS - existingClinicCount - clinicFiles.length;

  const handleClinicPhotosChange = async (e) => {
    const files = Array.from(e.target.files);
    e.target.value = "";
    if (!files.length) return;

    if (files.length > remainingSlots) {
      toast.error(`You can add ${remainingSlots} more photo(s)`);
      return;
    }
    const valid = files.filter(isValidImage);
    const previews = await Promise.all(valid.map(readAsDataUrl));
    setClinicFiles((prev) => [...prev, ...valid]);
    setClinicPreviews((prev) => [...prev, ...previews]);
  };

  const removeNewClinicPhoto = (index) => {
    setClinicFiles((prev) => prev.filter((_, i) => i !== index));
    setClinicPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // ---------- Location ----------
  const handleGetLocation = async () => {
    try {
      const location = await getCurrentLocation();
      setFormData((prev) => ({
        ...prev,
        location: { type: "Point", coordinates: location.coordinates },
      }));
      toast.success("Clinic location captured!");
    } catch (error) {
      toast.error("Failed to get location. Please enable location services.");
    }
  };

  // ---------- Save ----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);

      // 1. Doctor photo → User.avatar (Cloudinary via backend)
      if (doctorFile) {
        const fd = new FormData();
        fd.append("avatar", doctorFile);
        const { data } = await updateUserProfile(fd)
        dispatch(updateUser(data.user));
      }

      // 2. Clinic details → Vet (JSON)
      const { data: vetData } = await updateVetProfile(data)
      dispatch(setMyProfile(vetData.vet));

      // 3. New clinic photos → Vet.clinicPhotos (Cloudinary via backend)
      if (clinicFiles.length > 0) {
        const fd = new FormData();
        clinicFiles.forEach((file) => fd.append("clinicPhotos", file));
        const { data: photoData } = await updateVetProfile(data)
        dispatch(setMyProfile(photoData.vet));
      }

      toast.success("Profile updated successfully!");
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Edit Vet Profile</DialogTitle>
          <DialogDescription>
            Update your photo, clinic information and availability
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* TABS */}
          <div className="flex gap-2 border-b-2 border-gray-200">
            {["basic", "availability"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`px-4 py-2 font-semibold transition ${
                  tab === t
                    ? "border-b-2 border-green-600 text-green-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {t === "basic" ? "Basic Info" : "Availability"}
              </button>
            ))}
          </div>

          {tab === "basic" && (
            <div className="space-y-6">
              {/* DOCTOR PHOTO */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Photo (visible to pet owners)
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-green-100 flex items-center justify-center border-4 border-green-100">
                    {doctorPreview ? (
                      <img src={doctorPreview} alt="Doctor" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-2xl font-bold text-green-700">
                        {user?.name?.charAt(0).toUpperCase() || "D"}
                      </span>
                    )}
                  </div>
                  <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-600 transition">
                    <Upload size={18} className="text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {doctorFile ? doctorFile.name : "Choose your photo"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleDoctorPhotoChange}
                      className="hidden"
                      disabled={loading}
                    />
                  </label>
                </div>
              </div>

              {/* CLINIC NAME */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Clinic Name *
                </label>
                <input
                  type="text"
                  name="clinicName"
                  value={formData.clinicName}
                  onChange={handleChange}
                  placeholder="Enter clinic name"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600 transition"
                />
                {errors.clinicName && (
                  <p className="text-red-600 text-sm mt-1">{errors.clinicName}</p>
                )}
              </div>

              {/* PHONE & CITY */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Phone size={18} /> Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit phone"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600 transition"
                  />
                  {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <MapPin size={18} /> City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600 transition"
                  />
                  {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city}</p>}
                </div>
              </div>

              <button
                type="button"
                onClick={handleGetLocation}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
              >
                📍 Get Clinic Location
              </button>

              {/* ADDRESS */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin size={18} /> Full Address *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter complete clinic address"
                  rows="3"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600 transition resize-none"
                />
                {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
              </div>

              {/* CLINIC PHOTOS */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Clinic Photos ({existingClinicCount + clinicFiles.length}/{MAX_CLINIC_PHOTOS})
                </label>

                {(profile?.clinicPhotos?.length > 0 || clinicPreviews.length > 0) && (
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    {profile?.clinicPhotos?.map((url, i) => (
                      <img
                        key={`saved-${i}`}
                        src={url}
                        alt={`Saved clinic ${i + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                    ))}
                    {clinicPreviews.map((src, i) => (
                      <div key={`new-${i}`} className="relative">
                        <img src={src} alt={`New clinic ${i + 1}`} className="w-full h-24 object-cover rounded-lg" />
                        <button
                          type="button"
                          onClick={() => removeNewClinicPhoto(i)}
                          className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {remainingSlots > 0 && (
                  <label className="flex items-center justify-center gap-2 w-full px-4 py-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-600 transition">
                    <Upload size={18} className="text-gray-400" />
                    <span className="text-sm text-gray-600">
                      Add clinic photos (up to {remainingSlots} more)
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleClinicPhotosChange}
                      className="hidden"
                      disabled={loading}
                    />
                  </label>
                )}
              </div>

              {/* EXPERIENCE & FEE */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Briefcase size={18} /> Experience (years)
                  </label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Consultation Fee (₹)
                  </label>
                  <input
                    type="number"
                    name="consultationFee"
                    value={formData.consultationFee}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600 transition"
                  />
                </div>
              </div>

              {/* BIO */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">About You</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Write about yourself and your clinic..."
                  rows="4"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600 transition resize-none"
                />
              </div>

              {/* SPECIALIZATIONS */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Award size={18} /> Specializations
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {SPECIES.map((spec) => (
                    <button
                      key={spec}
                      type="button"
                      onClick={() => toggleSpecialization(spec)}
                      className={`px-4 py-2 rounded-lg font-semibold transition ${
                        formData.specializations.includes(spec)
                          ? "bg-green-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {spec.charAt(0).toUpperCase() + spec.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === "availability" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Available Days</label>
                <div className="grid grid-cols-4 gap-2">
                  {DAYS.map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={`px-3 py-2 rounded-lg font-semibold text-sm transition ${
                        formData.availableDays.includes(day)
                          ? "bg-green-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {day.slice(0, 3).toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h3 className="font-bold text-blue-900 mb-3">⏰ Available Time Slots</h3>
                <div className="space-y-3 mb-4">
                  <input
                    type="time"
                    value={newSlotTime}
                    onChange={(e) => setNewSlotTime(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-600"
                  />
                  <button
                    type="button"
                    onClick={addSlot}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
                  >
                    Add Slot
                  </button>
                </div>

                {formData.availableSlots.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {formData.availableSlots.map((slot, index) => (
                      <div key={index} className="bg-white p-3 rounded-lg flex items-center justify-between">
                        <p className="font-semibold text-gray-900">{slot.time}</p>
                        <button
                          type="button"
                          onClick={() => removeSlot(index)}
                          className="text-red-600 hover:text-red-700 font-bold"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border-2 border-gray-300 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-semibold py-2 rounded-lg transition"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditVetProfile;