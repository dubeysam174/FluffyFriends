import React, { useState } from "react";
import { X } from "lucide-react";
import AppointmentForm from "./AppointmentForm";
import toast from "react-hot-toast";

const BookAppointment = ({ isOpen, onClose, vetId, vetName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* HEADER */}
        <div className="sticky top-0 bg-gradient-to-r from-red-600 to-red-700 text-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Book Appointment</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6">
          {vetName && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-600">Booking with:</p>
              <p className="text-xl font-bold text-gray-900">Dr. {vetName}</p>
            </div>
          )}

          <AppointmentForm vetId={vetId} onClose={onClose} />
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;