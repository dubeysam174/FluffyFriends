import React from "react";
import { MapPin, Star, Phone, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

const VetCard = ({ vet }) => {
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    navigate(`/appointments/book/${vet._id}`);
  };

  return (
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
        
        {/* SPECIALIZATION */}
        <div className="flex items-center gap-2 text-gray-600">
          <Award size={16} className="text-red-600" />
          <span className="text-sm">{vet.specialization || "General Veterinarian"}</span>
        </div>

        {/* EXPERIENCE */}
        <p className="text-sm text-gray-600">
          {vet.yearsOfExperience || 5}+ years of experience
        </p>

        {/* LOCATION */}
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin size={16} className="text-red-600" />
          <span className="text-sm">{vet.clinic || "Clinic Address"}</span>
        </div>

        {/* DISTANCE */}
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
          onClick={handleBookAppointment}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition"
        >
          Book Appointment
        </button>
        <button className="flex-1 border-2 border-red-600 text-red-600 hover:bg-red-50 font-semibold py-2 rounded-lg transition">
          View Profile
        </button>
      </div>
    </div>
  );
};

export default VetCard;