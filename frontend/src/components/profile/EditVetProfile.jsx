import React, { useState, useEffect } from "react";
import { Camera, Phone, MapPin, Award, Briefcase } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { updateVetProfile, getVetProfile } from "../../api/profileAPI";
import { useSelector,useDispatch } from "react-redux";
import { selectUser } from "../../store/slices/authSlice";
import { selectMyProfile, setMyProfile } from "../../store/slices/vetSlice";
import toast from "react-hot-toast";

const EditVetProfile = ({ isOpen, onClose, onSuccess }) => {
  const user = useSelector(selectUser);
  const dispatch=useDispatch();
  const profile= useSelector(selectMyProfile)
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [tab, setTab] = useState("basic");

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
  });

  const [errors, setErrors] = useState({});
  const [newSlotTime, setNewSlotTime] = useState("");

  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  const species = ["dog", "cat", "bird", "rabbit", "fish", "reptile", "other"];

  // Initialize form with vet data
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
        });

        setPreviewImage(user?.avatar || null);
        setErrors({});
    }
}, [isOpen, profile, user]);

 

  const validateForm = () => {
    const newErrors = {};

    if (!formData.clinicName.trim()) newErrors.clinicName = "Clinic name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, "")))
      newErrors.phone = "Phone must be 10 digits";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "experience" || name === "consultationFee"
          ? value
            ? Number(value)
            : ""
          : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // SPECIALIZATIONS
  const toggleSpecialization = (spec) => {
    setFormData((prev) => ({
      ...prev,
      specializations: prev.specializations.includes(spec)
        ? prev.specializations.filter((s) => s !== spec)
        : [...prev.specializations, spec],
    }));
  };

  // AVAILABLE DAYS
  const toggleDay = (day) => {
    setFormData((prev) => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter((d) => d !== day)
        : [...prev.availableDays, day],
    }));
  };

  // TIME SLOTS
  const addSlot = () => {
    if (!newSlotTime.trim()) {
      toast.error("Please enter time");
      return;
    }
    if (formData.availableSlots.some((slot) => slot.time === newSlotTime)) {
      toast.error("Slot already exists");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      availableSlots: [...prev.availableSlots, { time: newSlotTime, isBooked: false }],
    }));
    setNewSlotTime("");
  };

  const removeSlot = (index) => {
    setFormData((prev) => ({
      ...prev,
      availableSlots: prev.availableSlots.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const updateData = {
        clinicName: formData.clinicName,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        bio: formData.bio,
        experience: formData.experience,
        consultationFee: formData.consultationFee,
        specializations: formData.specializations,
        availableDays: formData.availableDays,
        availableSlots: formData.availableSlots,
      };

      console.log("Updating vet profile:", updateData);

      const response = await updateVetProfile(updateData);

if (response.data.success) {
    dispatch(setMyProfile(response.data.vet));

    toast.success("Profile updated successfully!");
    setLoading(false);
    onClose();
}
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Edit Vet Profile</DialogTitle>
          <DialogDescription>
            Update your clinic information and availability
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* TABS */}
          <div className="flex gap-2 border-b-2 border-gray-200">
            <button
              type="button"
              onClick={() => setTab("basic")}
              className={`px-4 py-2 font-semibold transition ${
                tab === "basic"
                  ? "border-b-2 border-green-600 text-green-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Basic Info
            </button>
            <button
              type="button"
              onClick={() => setTab("availability")}
              className={`px-4 py-2 font-semibold transition ${
                tab === "availability"
                  ? "border-b-2 border-green-600 text-green-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Availability
            </button>
          </div>

          {/* BASIC INFO TAB */}
          {tab === "basic" && (
            <div className="space-y-6">
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
                  <label className=" text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Phone size={18} />
                    Phone *
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
                  <label className=" text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <MapPin size={18} />
                    City *
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

              {/* ADDRESS */}
              <div>
                <label className=" text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin size={18} />
                  Full Address *
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

              {/* EXPERIENCE & CONSULTATION FEE */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Briefcase size={18} />
                    Experience (years)
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  About You
                </label>
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
                <label className=" text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Award size={18} />
                  Specializations
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {species.map((spec) => (
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

          {/* AVAILABILITY TAB */}
          {tab === "availability" && (
            <div className="space-y-6">
              {/* AVAILABLE DAYS */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Available Days
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {days.map((day) => (
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

              {/* TIME SLOTS */}
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

                {/* SLOTS LIST */}
                {formData.availableSlots.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {formData.availableSlots.map((slot, index) => (
                      <div
                        key={index}
                        className="bg-white p-3 rounded-lg flex items-center justify-between"
                      >
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

          {/* BUTTONS */}
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