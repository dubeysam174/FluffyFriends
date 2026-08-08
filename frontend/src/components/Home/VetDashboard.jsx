import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../store/slices/authSlice";
import API from "../../api/axios";
import { Users, CalendarDays, MessageSquare, Clock3, Star } from "lucide-react";
import DashboardLayout from "../layout/DashboardLayout";
import {
  selectVetAppointments,
  selectLoading,
  selectError,
  setVetAppointments,
  setLoading,
  setError,
} from "../../store/slices/appointmentSlice";
import { getVetAppointments } from "../../api/appointmentAPI";
import { getVetProfile } from "../../api/profileAPI";

const VetDashboard = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const appointments = useSelector(selectVetAppointments);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const today = new Date().toDateString();

  const todaysAppointments = appointments.filter(
    (appointment) => new Date(appointment.date).toDateString() === today
  );

  useEffect(() => {
    let isMounted = true;

    const fetchVetAppointments = async () => { // ← renamed, no more collision
      dispatch(setLoading(true));
      dispatch(setError(null));

      try {
        const data = await getVetAppointments(); // ← now correctly calls the imported API fn
        console.log(data);

        if (isMounted) {
          dispatch(setVetAppointments(data.appointments || [])); // ← no extra .data
        }
      } catch (error) {
        if (isMounted) {
          dispatch(
            setError(
              error.response?.data?.message || "Unable to fetch appointments"
            )
          );
        }
      } finally {
        if (isMounted) {
          dispatch(setLoading(false));
        }
      }
    };

    fetchVetAppointments();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

   // Fetch vet's own profile
  useEffect(() => {
    let isMounted = true;

    const fetchVetProfile = async () => {
      try {
        const data = await getVetProfile();
        console.log("Vet profile:", data);

        if (isMounted) {
          dispatch(setMyProfile(data.vet || data)); // adjust based on actual response shape
        }
      } catch (error) {
        console.error("Error fetching vet profile:", error);
        // optional: dispatch a separate profile-specific error if you want to surface it in UI
      }
    };

    fetchVetProfile();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  const pendingAppointments = appointments.filter(
    (appointment) => appointment.status === "pending"
  );

  const recentPatients = appointments.slice(0, 5);

  // ...rest of the JSX stays exactly the same

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* WELCOME HEADER */}
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Welcome back, <span className="text-red-600">{user?.name}!</span>
        </h1>
        <p className="text-gray-600">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        {/* STATS */}
       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

  {/* Total Patients */}
  <div className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-500 text-sm font-medium">
          Total Patients
        </p>

        <h2 className="text-4xl font-bold text-gray-900 mt-2">
          {appointments.length}
        </h2>
      </div>

      <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
        <Users className="text-blue-600" size={28} />
      </div>
    </div>
  </div>

  {/* Today's Appointments */}
  <div className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-500 text-sm font-medium">
          Today's Appointments
        </p>

        <h2 className="text-4xl font-bold text-gray-900 mt-2">
           {
    appointments.filter(
      (appointment) =>
        new Date(appointment.date).toDateString() ===
        new Date().toDateString()
    ).length
  }
        </h2>
      </div>

      <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
        <CalendarDays className="text-green-600" size={28} />
      </div>
    </div>
  </div>

  {/* Pending Requests */}
  <div className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-500 text-sm font-medium">
          Pending Requests
        </p>

        <h2 className="text-4xl font-bold text-gray-900 mt-2">
          
{
appointments.filter(
appointment=>appointment.status==="pending"
).length
}

        </h2>
      </div>

      <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center">
        <Clock3 className="text-orange-600" size={28} />
      </div>
    </div>
  </div>

  {/* Rating */}
  

</div>


        {/* TODAY'S APPOINTMENTS */}
        <div className="bg-white rounded-2xl shadow p-8">
  <h2 className="text-3xl font-bold text-gray-900 mb-6">
    Today's Appointments
  </h2>

  <div className="space-y-4">
    {todaysAppointments.length > 0 ? (
      todaysAppointments.map((appointment) => (
        <div
          key={appointment._id}
          className={`flex items-center gap-4 p-4 rounded-lg border-l-4 ${
            appointment.status === "confirmed"
              ? "border-green-600"
              : appointment.status === "pending"
              ? "border-yellow-500"
              : appointment.status === "completed"
              ? "border-blue-600"
              : "border-red-600"
          } bg-gray-50`}
        >
          {/* Pet Icon */}
          <div className="text-3xl">
            {appointment.pet.species === "dog"
              ? "🐕"
              : appointment.pet.species === "cat"
              ? "🐈"
              : "🐾"}
          </div>

          {/* Pet Details */}
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900">
              {appointment.pet.name} ({appointment.pet.breed})
            </h4>

            <p className="text-gray-600 text-sm">
              Owner: {appointment.petOwner.name} • {appointment.reason}
            </p>
          </div>

          {/* Time & Status */}
          <div className="text-right">
            <p className="font-semibold text-gray-900">
              {appointment.slot}
            </p>

            <span
              className={`text-sm font-semibold ${
                appointment.status === "confirmed"
                  ? "text-green-600"
                  : appointment.status === "pending"
                  ? "text-yellow-600"
                  : appointment.status === "completed"
                  ? "text-blue-600"
                  : "text-red-600"
              }`}
            >
              {appointment.status}
            </span>
          </div>
        </div>
      ))
    ) : (
      <div className="text-center py-10 text-gray-500">
        No appointments scheduled for today.
      </div>
    )}
  </div>
</div>

        {/* APPOINTMENT REQUESTS */}
    <div className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">

  {/* Header */}
  <div className="flex items-center justify-between px-6 py-5">
    <h2 className="text-3xl font-bold text-gray-900">
      New Appointment Requests
    </h2>

    <span className="bg-blue-100 text-blue-600 text-sm font-semibold px-4 py-1 rounded-full">
      {pendingAppointments.length} Pending
    </span>
  </div>

  {pendingAppointments.length > 0 ? (
    pendingAppointments.map((appointment) => (
      <div
        key={appointment._id}
        className="flex items-center justify-between px-6 py-5 border-t border-gray-200 hover:bg-gray-50 transition"
      >
        {/* Left */}
        <div>
          <div className="flex items-center gap-3">
            <h3 className="font-bold text-lg text-gray-900">
              {appointment.pet.name}
              <span className="text-gray-500">
                {" "}
                ({appointment.pet.breed})
              </span>
            </h3>

            <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full capitalize">
              {appointment.reason}
            </span>
          </div>

          <p className="text-gray-500 mt-1">
            Owner: {appointment.petOwner.name}
          </p>

          <p className="text-gray-400 text-sm mt-1">
            {appointment.date.split("T")[0]} • {appointment.slot}
          </p>
        </div>

        {/* Right */}
        
      </div>
    ))
  ) : (
    <div className="py-10 text-center text-gray-500">
      No Pending Appointment Requests
    </div>
  )}
</div>

        {/* PATIENT STATISTICS */}
        <div className="bg-white rounded-2xl shadow p-8">
  <h2 className="text-2xl font-bold text-gray-900 mb-6">
    Recent Patients
  </h2>

  <div className="space-y-4">
    {recentPatients.length > 0 ? (
      recentPatients.map((appointment) => (
        <div
          key={appointment._id}
          className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
        >
          <div>
            <p className="font-semibold text-gray-900">
              {appointment.pet.name}
            </p>

            <p className="text-gray-600 text-sm">
              Owner: {appointment.petOwner.name}
            </p>

            <p className="text-gray-400 text-xs">
              {new Date(appointment.date).toLocaleDateString()}
            </p>
          </div>

          <span className="text-2xl">
            {appointment.pet.species === "dog"
              ? "🐕"
              : appointment.pet.species === "cat"
              ? "🐈"
              : "🐾"}
          </span>
        </div>
      ))
    ) : (
      <p className="text-gray-500 text-center">
        No Recent Patients
      </p>
    )}
  </div>
</div>
      </div>
    </DashboardLayout>
  );
};

export default VetDashboard;
