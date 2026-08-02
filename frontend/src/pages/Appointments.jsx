import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../store/slices/authSlice";
import PetOwnerAppointments from "../components/Appointments/PetOwnerAppointment";
import VetAppointments from "../components/Appointments/VetAppointment";

const Appointments = () => {
  const user = useSelector(selectUser);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {user?.role === "petOwner" ? (
          <PetOwnerAppointments />
        ) : (
          <VetAppointments />
        )}
      </div>
    </div>
  );
};

export default Appointments;