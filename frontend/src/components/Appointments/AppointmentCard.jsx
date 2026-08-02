import React from "react";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  Check,
  X,
  AlertCircle,
} from "lucide-react";

const AppointmentCard = ({
  appointment,
  role,
  onConfirm,
  onReject,
  onCancel,
  onComplete,
}) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-300";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 border-l-4 border-red-600">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">
            {role === "petOwner"
              ? `Dr. ${appointment.vet?.name}`
              : appointment.petOwner?.name}
          </h3>
          <p className="text-gray-600 text-sm">
            {role === "petOwner"
              ? appointment.pet?.name
              : appointment.pet?.name}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(appointment.status)}`}
        >
          {appointment.status?.charAt(0).toUpperCase() +
            appointment.status?.slice(1)}
        </span>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-3 text-gray-700">
          <Calendar size={18} className="text-red-600" />
          <span>{formatDate(appointment.date)}</span>
        </div>

        <div className="flex items-center gap-3 text-gray-700">
          <Clock size={18} className="text-red-600" />
          <span>{formatTime(appointment.date)}</span>
        </div>

        {role === "petOwner" && appointment.vet?.address && (
          <div className="flex items-center gap-3 text-gray-700">
            <MapPin size={18} className="text-red-600" />
            <span>{appointment.vet.clinic}</span>
          </div>
        )}

        {role === "petOwner" && appointment.vet?.phone && (
          <div className="flex items-center gap-3 text-gray-700">
            <Phone size={18} className="text-red-600" />
            <span>{appointment.vet.phone}</span>
          </div>
        )}

        {role === "vet" && appointment.petOwner?.phone && (
          <div className="flex items-center gap-3 text-gray-700">
            <Phone size={18} className="text-red-600" />
            <span>{appointment.petOwner.phone}</span>
          </div>
        )}

        {appointment.reason && (
          <div className="flex gap-3 text-gray-700">
            <AlertCircle size={18} className="text-red-600 flex-shrink-0" />
            <span className="text-sm">{appointment.reason}</span>
          </div>
        )}
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-2">
        {role === "petOwner" ? (
          <>
            {appointment.status === "confirmed" && (
              <button
                onClick={() => onCancel(appointment._id)}
                className="flex-1 border-2 border-red-600 text-red-600 hover:bg-red-50 font-semibold py-2 rounded-lg transition"
              >
                Cancel
              </button>
            )}
            {appointment.status === "pending" && (
              <button
                onClick={() => onCancel(appointment._id)}
                className="flex-1 border-2 border-gray-600 text-gray-600 hover:bg-gray-50 font-semibold py-2 rounded-lg transition"
              >
                Withdraw Request
              </button>
            )}
          </>
        ) : (
          <>
            {appointment.status === "pending" && (
              <>
                <button
                  onClick={() => onConfirm(appointment._id)}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition flex items-center justify-center gap-2"
                >
                  <Check size={18} />
                  Confirm
                </button>
                <button
                  onClick={() => onReject(appointment._id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition flex items-center justify-center gap-2"
                >
                  <X size={18} />
                  Reject
                </button>
              </>
            )}
            {appointment.status === "confirmed" && (
              <button
                onClick={() => onComplete(appointment._id)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
              >
                Mark Complete
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;
