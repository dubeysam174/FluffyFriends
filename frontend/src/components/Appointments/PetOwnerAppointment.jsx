import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAppointments,
  selectLoading,
  setAppointments,
  setLoading,
} from "../../store/slices/appointmentSlice";
import { getMyAppointments, cancelAppointment } from "../../api/appointmentAPI";
import AppointmentCard from "./AppointmentCard";
import toast from "react-hot-toast";
import { Calendar, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const PetOwnerAppointments = () => {
  const dispatch = useDispatch();
  const appointments = useSelector(selectAppointments);
  const loading = useSelector(selectLoading);
  const [filter, setFilter] = React.useState("all");
   console.log("Appointments from Redux:", appointments);
  console.log("Loading state:", loading);

  useEffect(() => {
    fetchAppointments();
  }, []);

 const fetchAppointments = async () => {
  try {
    dispatch(setLoading(true));
    
    const response = await getMyAppointments();
    
    // LOG THE ENTIRE RESPONSE
   console.log("Full Response Object:", response);
    console.log("Response Keys:", Object.keys(response));
    console.log("Response.success:", response.success);
    console.log("Response.data:", response.data);
    console.log("Response.appointments:", response.appointments);
    console.log("Entire Response:", JSON.stringify(response, null, 2))
    
    // Try different structures
 
    
    dispatch(setAppointments(response.appointments)|| []);
    
  } catch (error) {
    console.error("Error fetching appointments:", error);
    toast.error("Failed to load appointments");
  } finally {
    dispatch(setLoading(false));
  }
};

  const handleCancel = async (appointmentId) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      try {
        await cancelAppointment(appointmentId);
        toast.success("Appointment cancelled");
        fetchAppointments(); // Refresh list
      } catch (error) {
        console.error("Error cancelling appointment:", error);
        toast.error("Failed to cancel appointment");
      }
    }
  };

  const getFilteredAppointments = () => {
    if (filter === "all") return appointments;
    return appointments.filter((apt) => apt.status === filter);
  };

  const filteredAppointments = getFilteredAppointments();
  const upcomingCount = appointments.filter((apt) => apt.status === "confirmed").length;
  const completedCount = appointments.filter((apt) => apt.status === "completed").length;
  const pendingCount = appointments.filter((apt) => apt.status === "pending").length;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Appointments</h1>
          <p className="text-gray-600">Manage your veterinary appointments</p>
        </div>
        <Link to='/find-vet'>
        <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition">
          <Plus size={20} />
          Book New
        </button>
        </Link>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm">Upcoming</p>
          <p className="text-3xl font-bold text-gray-900">{upcomingCount}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm">Pending</p>
          <p className="text-3xl font-bold text-gray-900">{pendingCount}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm">Completed</p>
          <p className="text-3xl font-bold text-gray-900">{completedCount}</p>
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex gap-2 flex-wrap">
        {["all", "confirmed", "pending", "completed", "rejected"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filter === status
                ? "bg-red-600 text-white"
                : "bg-white text-gray-700 border-2 border-gray-200 hover:border-red-600"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* APPOINTMENTS LIST */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading appointments...</p>
        </div>
      ) : filteredAppointments.length === 0 ? (
        <div className="bg-gray-50 rounded-xl border-2 border-gray-200 p-12 text-center">
          <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 text-lg">No {filter === "all" ? "" : filter} appointments</p>
          <Link to="/find-vet">
          <button className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition">
            Book Appointment
          </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredAppointments.map((appointment) => (
            <AppointmentCard
              key={appointment._id}
              appointment={appointment}
              role="petOwner"
              onCancel={handleCancel}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PetOwnerAppointments;