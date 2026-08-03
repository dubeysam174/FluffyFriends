import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/authSlice";
import { bookAppointment } from "../../api/appointmentAPI";
import { getMyPets } from "../../api/petAPI";
import toast from "react-hot-toast";
import { Calendar, Clock, FileText } from "lucide-react";

const AppointmentForm = ({ vetId, onClose }) => {
  const user = useSelector(selectUser);
  const [pets, setPets] = React.useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    petId: "",
    date: "",
    slot: "",
    reason: "",
    type: "inPerson",
  });

  const [errors, setErrors] = useState({});

  // Fetch user's pets on mount
  React.useEffect(() => {
    fetchPets();
  }, []);

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
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.petId) newErrors.petId = "Please select a pet";
    if (!formData.date) newErrors.date = "Please select a date";
    if (!formData.slot) newErrors.slot = "Please select a time slot";
    if (!formData.reason.trim()) newErrors.reason = "Please provide a reason";

    // Validate date is not in past
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
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const appointmentData = {
        vet: vetId,
        pet: formData.petId,
        date: new Date(formData.date).toISOString(),
        slot: formData.slot,
        reason: formData.reason,
        type: formData.type,
      };

      console.log("Booking appointment with data:", appointmentData);

      const response = await bookAppointment(appointmentData);

      toast.success("Appointment booked successfully!");
      setLoading(false);
      onClose();
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error(error.response?.data?.message || "Failed to book appointment");
      setLoading(false);
    }
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split("T")[0];

  return (
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
          placeholder="Describe the reason for this appointment (e.g., Annual checkup, Vaccination, Emergency, etc.)"
          rows="4"
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-600 transition resize-none"
        ></textarea>
        {errors.reason && <p className="text-red-600 text-sm mt-1">{errors.reason}</p>}
      </div>

      {/* BUTTONS */}
      <div className="flex gap-3">
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
          className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold py-2 rounded-lg transition"
        >
          {loading ? "Booking..." : "Book Appointment"}
        </button>
      </div>
    </form>
  );
};

export default AppointmentForm;