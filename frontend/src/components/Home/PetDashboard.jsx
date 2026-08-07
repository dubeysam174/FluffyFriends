import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/slices/authSlice";
import {
  selectAppointments,
  setAppointments,
} from "../../store/slices/appointmentSlice";
import { selectPets, setPets } from "../../store/slices/petSlice";
import { getMyPets } from "../../api/petAPI";
import { getMyAppointments } from "../../api/appointmentAPI";
import {
  MapPin,
  CalendarDays,
  Clock3,
  MessageSquare,
  Plus,
  PawPrint,
  ShieldCheck,
  MessageCirclePlus,
  ChevronRight,
  Stethoscope,
  Syringe,
  CalendarDaysIcon,
  MessageCirclePlusIcon,
} from "lucide-react";
import DashboardLayout from "../layout/DashboardLayout";
import toast from "react-hot-toast";

const PetOwnerDashboard = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const pets = useSelector(selectPets);
  const appointments = useSelector(selectAppointments);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        console.log("Fetching dashboard data...");

        // ✅ CALL BOTH APIs
        const [petRes, appointmentRes] = await Promise.all([
          getMyPets(),
          getMyAppointments(),
        ]);

        console.log("Pets:", petRes.data);
        console.log("Appointments:", appointmentRes.appointments);

        // ✅ SAVE TO REDUX
     dispatch(setPets(petRes.data.pets || []));  // ← Extract .pets
dispatch(setAppointments(appointmentRes.appointments || []));

        setError(null);
      } catch (err) {
        console.log("Error fetching dashboard:", err);
        setError("Failed to load dashboard data");
        toast.error("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [dispatch]);

  // ================= Dashboard Statistics =================

  const totalPets = pets.length;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingAppointments = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.date);
    appointmentDate.setHours(0, 0, 0, 0);
    return appointmentDate >= today && appointment.status !== "cancelled";
  });

  const completedAppointments = appointments.filter(
    (appointment) => appointment.status === "completed"
  );

  const cancelledAppointments = appointments.filter(
    (appointment) => appointment.status === "cancelled"
  );

  const trustedVets = new Set(
    appointments.map((appointment) => appointment.vet?._id)
  ).size;

  const recentAppointments = [...appointments]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  // ================= Loading =================

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-[60vh]">
          <h2 className="text-2xl font-semibold text-gray-600">Loading...</h2>
        </div>
      </DashboardLayout>
    );
  }

  // ================= Error =================

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-[60vh]">
          <h2 className="text-2xl text-red-600">{error}</h2>
        </div>
      </DashboardLayout>
    );
  }

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
                <p className="text-3xl font-bold text-gray-900"> {totalPets}</p>
              </div>
              <div className="text-4xl"><PawPrint className="w-7 h-7 text-orange-600"/></div>
            </div>
          </div>
          
  <div className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Upcoming Appointments</p>
                <p className="text-3xl font-bold text-gray-900"> {upcomingAppointments.length} </p>
              </div>
              <div className="text-4xl"><CalendarDaysIcon className="w-7 h-7 text-red-600"/></div>
            </div>
          </div>

  <div className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Trusted Vets</p>
                <p className="text-3xl font-bold text-gray-900">{trustedVets}</p>
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
        <div className="space-y-5">
  {upcomingAppointments.length > 0 ? (
    upcomingAppointments.map((appointment) => (
      <div
        key={appointment._id}
        className="border-2 border-red-300 rounded-2xl p-5 flex items-center justify-between hover:shadow-lg transition"
      >
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
            <Stethoscope className="text-red-600" size={24} />
          </div>

          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h3 className="font-bold text-xl">
                {appointment.reason}
              </h3>

              <span className="text-gray-500">
                Dr. {appointment.vet?.user?.name}
              </span>

              <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold capitalize">
                {appointment.type}
              </span>
            </div>

            <p className="text-gray-500 mt-2">
              {appointment.pet?.name} • {appointment.pet?.breed}
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="font-semibold">
            {new Date(appointment.date).toLocaleDateString()}
          </div>

          <div className="text-gray-500 mt-2">
            {appointment.slot}
          </div>
        </div>
      </div>
    ))
  ) : (
    <div className="text-center py-8 text-gray-500">
      No Upcoming Appointments
    </div>
  )}
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
            {pets.map((pet) => (
              <div
  key={pet._id}
  className="border-2 border-gray-200 rounded-lg p-4 hover:border-red-600 transition"
>
  <img
    src={pet.image || "https://placehold.co/300x300?text=Pet"}
    alt={pet.name}
    className="w-full h-48 object-cover rounded-lg mb-4"
  />

  <h3 className="text-lg font-bold text-gray-900">
    {pet.name}
  </h3>

  <p className="text-gray-600 text-sm mb-4">
    {pet.breed} • {pet.age} Years
  </p>

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