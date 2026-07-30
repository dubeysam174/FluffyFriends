import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/authSlice";
import { MapPin,
  CalendarDays,
  Clock3,
  MessageSquare,
  Plus,
  PawPrint,
  ShieldCheck,
  MessageCirclePlus,
  ChevronRight,
  Stethoscope,
  Syringe,CalendarDaysIcon,MessageCirclePlusIcon  } from "lucide-react";
import DashboardLayout from "../layout/DashboardLayout";

const PetOwnerDashboard = () => {
  const user = useSelector(selectUser);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        
        {/* WELCOME HEADER */}
        
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, <span className="text-red-600">{user?.name}!</span> 🐾
          </h1>
          <p className="text-gray-600">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
       

        {/* QUICK STATS */}
       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
  <div className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Your Pets</p>
                <p className="text-3xl font-bold text-gray-900">3</p>
              </div>
              <div className="text-4xl"><PawPrint className="w-7 h-7 text-orange-600"/></div>
            </div>
          </div>
          
  <div className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Upcoming Appointments</p>
                <p className="text-3xl font-bold text-gray-900">2</p>
              </div>
              <div className="text-4xl"><CalendarDaysIcon className="w-7 h-7 text-red-600"/></div>
            </div>
          </div>

  <div className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Trusted Vets</p>
                <p className="text-3xl font-bold text-gray-900">5</p>
              </div>
              <div className="text-4xl"><ShieldCheck className="w-7 h-7 text-red-600"/></div>
            </div>
          </div>

  <div className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">New Messages</p>
                <p className="text-3xl font-bold text-gray-900">1</p>
              </div>
              <div className="text-4xl"><MessageCirclePlusIcon className="w-7 h-7 text-orange-600"/></div>
            </div>
          </div>
        </div>

       
       

        {/* UPCOMING APPOINTMENTS */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
  {/* Header */}
  <div className="flex items-center justify-between mb-8">
    <div>
      <h2 className="text-3xl font-bold text-gray-900">
        Upcoming Appointments
      </h2>
      <p className="text-gray-500 mt-1">
        You have 2 appointments scheduled
      </p>
    </div>

    <button className="flex items-center gap-1 font-semibold text-gray-800 hover:text-red-600 transition">
      View All
      <ChevronRight size={18} />
    </button>
  </div>

  <div className="space-y-5">

    {/* Appointment 1 */}
    <div className="border-2 border-red-300 rounded-2xl p-5 flex items-center justify-between hover:shadow-lg transition">

      <div className="flex items-center gap-5">

        {/* Icon */}
        <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
          <Stethoscope className="text-red-600" size={24} />
        </div>

        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center font-semibold text-gray-600">
          MA
        </div>

        {/* Details */}
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="font-bold text-xl">
              Annual Checkup
            </h3>

            <span className="text-gray-500">
              with Dr. Sharma
            </span>

            <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold">
              Checkup
            </span>
          </div>

          <p className="text-gray-500 mt-2">
            Max • Golden Retriever
          </p>
        </div>
      </div>

      {/* Date */}
      <div className="text-right">
        <div className="flex items-center justify-end gap-2 font-semibold text-gray-800">
          <CalendarDays size={18} />
          May 15, 2024
        </div>

        <div className="flex items-center justify-end gap-2 mt-2 text-gray-500">
          <Clock3 size={18} />
          10:00 AM
        </div>
      </div>

    </div>

    {/* Appointment 2 */}

    <div className="border-2 border-green-300 rounded-2xl p-5 flex items-center justify-between hover:shadow-lg transition">

      <div className="flex items-center gap-5">

        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
          <Syringe className="text-green-600" size={24} />
        </div>

        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center font-semibold text-gray-600">
          BE
        </div>

        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="font-bold text-xl">
              Vaccination
            </h3>

            <span className="text-gray-500">
              with Dr. Patel
            </span>

            <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs font-semibold">
              Vaccination
            </span>
          </div>

          <p className="text-gray-500 mt-2">
            Bella • Beagle
          </p>
        </div>

      </div>

      <div className="text-right">
        <div className="flex items-center justify-end gap-2 font-semibold text-gray-800">
          <CalendarDays size={18} />
          May 20, 2024
        </div>

        <div className="flex items-center justify-end gap-2 mt-2 text-gray-500">
          <Clock3 size={18} />
          2:30 PM
        </div>
      </div>

    </div>

  </div>
</div>

        {/* YOUR PETS */}
        <div className="bg-white rounded-2xl shadow p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Pets</h2>
            <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition">
              <Plus size={20} />
              Add Pet
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Max", "Bella", "Charlie"].map((petName, index) => (
              <div key={index} className="border-2 border-gray-200 rounded-lg p-4 hover:border-red-600 transition">
                <img
                  src={`https://images.unsplash.com/photo-1633722715463-d30628cad4ae?w=300&h=300&fit=crop`}
                  alt={petName}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{petName}</h3>
                <p className="text-gray-600 text-sm mb-4">Golden Retriever • 3 years</p>
                <button className="w-full border-2 border-red-600 text-red-600 font-semibold py-2 rounded-lg hover:bg-red-50 transition">
                  View Profile
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PetOwnerDashboard;