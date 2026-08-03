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

const VetCard = ({ vet }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    petId: "",
    date: "",
    slot: "",
    reason: "",
    type: "inPerson",
  });

  const [errors, setErrors] = useState({});

  // Fetch pets when modal opens
  useEffect(() => {
    if (isBookingOpen) {
      fetchPets();
    }
  }, [isBookingOpen]);

  const fetchPets = async () => {
    try {
      const response = await getMyPets();
      setPets(response.data || []);
    } catch (error) {
      console.error("Error fetching pets:", error);
      toast.error("Failed to load your pets");
    }
  };

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.petId) newErrors.petId = "Please select a pet";
    if (!formData.date) newErrors.date = "Please select a date";
    if (!formData.slot) newErrors.slot = "Please select a time slot";
    if (!formData.reason.trim()) newErrors.reason = "Please provide a reason";

    if (formData.date) {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = "Please select a future date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const appointmentData = {
        vet: vet._id,
        pet: formData.petId,
        date: new Date(formData.date).toISOString(),
        slot: formData.slot,
        reason: formData.reason,
        type: formData.type,
      };

      console.log("Booking appointment:", appointmentData);

      await bookAppointment(appointmentData);

      toast.success("Appointment booked successfully!");
      setLoading(false);

      // Close dialog
      setIsBookingOpen(false);

      // Reset form
      setFormData({
        petId: "",
        date: "",
        slot: "",
        reason: "",
        type: "inPerson",
      });

      // Redirect to appointments
      setTimeout(() => {
        window.location.href = "/appointments";
      }, 500);

    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error(error.response?.data?.message || "Failed to book appointment");
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 border border-gray-200 hover:border-red-600">
        {/* VET IMAGE & RATING */}
        <div className="relative mb-4">
          <img
            src={vet.image || "https://via.placeholder.com/300"}
            alt={vet.name}
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1">
            <Star size={16} className="text-yellow-500 fill-yellow-500" />
            <span className="font-semibold text-gray-900">{vet.rating || 4.8}</span>
          </div>
        </div>

        {/* VET INFO */}
        <div className="space-y-2 mb-4">
          <h3 className="text-xl font-bold text-gray-900">Dr. {vet.name}</h3>
          
          <div className="flex items-center gap-2 text-gray-600">
            <Award size={16} className="text-red-600" />
            <span className="text-sm">{vet.specialization || "General Veterinarian"}</span>
          </div>

          <p className="text-sm text-gray-600">
            {vet.yearsOfExperience || 5}+ years of experience
          </p>

          <div className="flex items-center gap-2 text-gray-600">
            <MapPin size={16} className="text-red-600" />
            <span className="text-sm">{vet.clinic || "Clinic Address"}</span>
          </div>

          {vet.distance && (
            <p className="text-sm font-semibold text-blue-600">
              📍 {vet.distance.toFixed(1)} km away
            </p>
          )}
        </div>

        {/* PHONE */}
        <div className="flex items-center gap-2 mb-4 text-gray-700">
          <Phone size={16} />
          <span className="text-sm">{vet.phone || "+1 (555) 123-4567"}</span>
        </div>

        {/* DESCRIPTION */}
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
          <button className="flex-1 border-2 border-red-600 text-red-600 hover:bg-red-50 font-semibold py-2 rounded-lg transition">
            View Profile
          </button>
        </div>
      </div>

      {/* SHADCN DIALOG */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Book Appointment</DialogTitle>
            <DialogDescription>
              Schedule an appointment with Dr. {vet.name}
            </DialogDescription>
          </DialogHeader>

          {/* VET INFO */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2">Booking appointment with:</p>
            <div className="flex items-center gap-4">
              <img
                src={vet.image || "https://via.placeholder.com/80"}
                alt={vet.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-lg font-bold text-gray-900">Dr. {vet.name}</h3>
                <p className="text-sm text-gray-600">{vet.specialization || "General Veterinarian"}</p>
                <p className="text-sm text-gray-600">⭐ {vet.rating || 4.8}/5</p>
              </div>
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* SELECT PET */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Pet *
              </label>
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

            {/* APPOINTMENT TYPE */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Appointment Type
              </label>
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
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Calendar size={18} />
                Select Date *
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
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Clock size={18} />
                Select Time Slot *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, slot }))}
                    className={`px-3 py-2 rounded-lg border-2 font-semibold transition ${
                      formData.slot === slot
                        ? "bg-red-600 text-white border-red-600"
                        : "border-gray-300 text-gray-700 hover:border-red-600"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              {errors.slot && <p className="text-red-600 text-sm mt-1">{errors.slot}</p>}
            </div>

            {/* REASON */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FileText size={18} />
                Reason for Visit *
              </label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                placeholder="Describe the reason for this appointment..."
                rows="4"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-600 transition resize-none"
              ></textarea>
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
    </>
  );
};

export default VetCard;