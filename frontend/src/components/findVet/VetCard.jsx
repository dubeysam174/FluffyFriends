import React, { useState, useEffect } from "react";
import { MapPin, Star, Phone, Award, Calendar, Clock, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { bookAppointment } from "../../api/appointmentAPI";
import { getMyPets } from "../../api/petAPI";
import toast from "react-hot-toast";
import VetProfileDialog from "./VetProfileVeiw";

const VetCard = ({ vet }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    petId: "",
    date: "",
    slot: "",
    reason: "",
    type: "inPerson",
  });

  const availableSlots = vet?.availableSlots || [];
  const doctorName = vet?.user?.name || "Unknown";
  const today = new Date().toISOString().split("T")[0];

  // Fetch pets when the booking dialog opens
  useEffect(() => {
    if (isBookingOpen) fetchPets();
  }, [isBookingOpen]);

  const fetchPets = async () => {
    try {
      const response = await getMyPets();
      const petsList = response?.pets || [];
      setPets(Array.isArray(petsList) ? petsList : []);
    } catch (error) {
      console.error("Error fetching pets:", error);
      toast.error("Failed to load your pets");
      setPets([]);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.petId) newErrors.petId = "Please select a pet";
    if (!formData.date) newErrors.date = "Please select a date";
    if (!formData.slot) newErrors.slot = "Please select a time slot";
    if (!formData.reason.trim()) newErrors.reason = "Please provide a reason";

    if (formData.date) {
      const selectedDate = new Date(formData.date);
      const todayDate = new Date();
      todayDate.setHours(0, 0, 0, 0);
      if (selectedDate < todayDate) newErrors.date = "Please select a future date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSlotSelect = (time) => {
    setSelectedTime(time);
    setFormData((prev) => ({ ...prev, slot: time }));
    if (errors.slot) setErrors((prev) => ({ ...prev, slot: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);

      const appointmentData = {
        vetId: vet._id,
        petId: formData.petId,
        date: new Date(formData.date).toISOString(),
        slot: formData.slot,
        reason: formData.reason,
        type: formData.type,
      };

      await bookAppointment(appointmentData);

      toast.success("Appointment booked successfully!");
      setIsBookingOpen(false);
      setFormData({ petId: "", date: "", slot: "", reason: "", type: "inPerson" });
      setSelectedTime("");

      setTimeout(() => {
        window.location.href = "/appointments";
      }, 500);
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error(error.response?.data?.message || "Failed to book appointment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 border border-gray-200 hover:border-red-600">
        {/* IMAGE & RATING */}
        <div className="relative mb-4">
          <img
            src={vet.clinicPhotos?.[0] || "https://via.placeholder.com/300"}
            alt={vet.clinicName || "Clinic"}
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1">
            <Star size={16} className="text-yellow-500 fill-yellow-500" />
            <span className="font-semibold text-gray-900">
              {(vet.rating ?? 0).toFixed(1)}
            </span>
          </div>
        </div>

        {/* INFO */}
        <div className="space-y-2 mb-4">
          <h3 className="text-xl font-bold text-gray-900">Dr. {doctorName}</h3>
          <p className="text-sm font-semibold text-gray-700">{vet.clinicName || "Clinic"}</p>

          <div className="flex items-center gap-2 text-gray-600">
            <Award size={16} className="text-red-600" />
            <span className="text-sm">
              {vet.specializations?.length > 0
                ? vet.specializations.join(", ")
                : "General Veterinarian"}
            </span>
          </div>

          <p className="text-sm text-gray-600">{vet.experience || 0}+ years of experience</p>

          <div className="flex items-center gap-2 text-gray-600">
            <MapPin size={16} className="text-red-600" />
            <span className="text-sm">{vet.address || "Clinic Address"}</span>
          </div>
        </div>

        {/* PHONE */}
        <div className="flex items-center gap-2 mb-4 text-gray-700">
          <Phone size={16} />
          <span className="text-sm">{vet.phone || "Not provided"}</span>
        </div>

        {/* BIO */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {vet.bio || "Professional veterinary care for your beloved pets"}
        </p>

        {/* BUTTONS */}
        <div className="flex gap-2">
          <button
            onClick={() => setIsBookingOpen(true)}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Book Appointment
          </button>
          <button
            onClick={() => setIsProfileOpen(true)}
            className="flex-1 border-2 border-red-600 text-red-600 hover:bg-red-50 font-semibold py-2 rounded-lg transition"
          >
            View Profile
          </button>
        </div>
      </div>

      {/* BOOKING DIALOG */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Book Appointment</DialogTitle>
            <DialogDescription>Schedule an appointment with Dr. {doctorName}</DialogDescription>
          </DialogHeader>

          {/* VET INFO */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2">Booking appointment with:</p>
            <div className="flex items-center gap-4">
              <img
                src={vet.clinicPhotos?.[0] || "https://via.placeholder.com/80"}
                alt={vet.clinicName || "Clinic"}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-lg font-bold text-gray-900">Dr. {doctorName}</h3>
                <p className="text-sm text-gray-600">{vet.clinicName}</p>
                <p className="text-sm text-gray-600">⭐ {(vet.rating ?? 0).toFixed(1)}/5</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* PET */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Select Pet *</label>
              <select
                name="petId"
                value={formData.petId}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-600 transition"
              >
                <option value="">Choose a pet...</option>
                {pets.map((pet) => (
                  <option key={pet._id} value={pet._id}>
                    {pet.name} ({pet.breed})
                  </option>
                ))}
              </select>
              {errors.petId && <p className="text-red-600 text-sm mt-1">{errors.petId}</p>}
            </div>

            {/* TYPE */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Appointment Type</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="type"
                    value="inPerson"
                    checked={formData.type === "inPerson"}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-700">In-Person</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="type"
                    value="online"
                    checked={formData.type === "online"}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-700">Online Consultation</span>
                </label>
              </div>
            </div>

            {/* DATE */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Calendar size={18} /> Select Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={today}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-600 transition"
              />
              {errors.date && <p className="text-red-600 text-sm mt-1">{errors.date}</p>}
            </div>

            {/* TIME SLOT */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Clock size={18} /> Select Time Slot *
              </label>

              {availableSlots.length === 0 ? (
                <p className="text-gray-500">No slots available</p>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot._id || slot.time}
                      type="button"
                      disabled={slot.isBooked}
                      onClick={() => handleSlotSelect(slot.time)}
                      className={`px-3 py-2 rounded-lg font-semibold ${
                        slot.isBooked
                          ? "bg-red-100 text-red-400 line-through cursor-not-allowed"
                          : selectedTime === slot.time
                          ? "bg-red-600 text-white"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              )}
              {errors.slot && <p className="text-red-600 text-sm mt-1">{errors.slot}</p>}
            </div>

            {/* REASON */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FileText size={18} /> Reason for Visit *
              </label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                placeholder="Describe the reason for this appointment..."
                rows="4"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-600 transition resize-none"
              />
              {errors.reason && <p className="text-red-600 text-sm mt-1">{errors.reason}</p>}
            </div>

            {/* BUTTONS */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setIsBookingOpen(false)}
                className="flex-1 border-2 border-gray-300 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold py-2 rounded-lg transition"
              >
                {loading ? "Booking..." : "Book Appointment"}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* PROFILE DIALOG */}
      <VetProfileDialog
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        vetId={vet._id}
      />
    </>
  );
};

export default VetCard;