import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectVetAppointments,
  selectLoading,
  setVetAppointments,
  setLoading,
} from "../../store/slices/appointmentSlice";
import {
  getVetAppointments,
  confirmAppointment,
  rejectAppointment,
  completeAppointment,
} from "../../api/appointmentAPI";
import AppointmentCard from "./AppointmentCard";
import toast from "react-hot-toast";
import { Calendar } from "lucide-react";

const VetAppointments = () => {
  const dispatch = useDispatch();
  const appointments = useSelector(selectVetAppointments);
  const loading = useSelector(selectLoading);
  const [filter, setFilter] = React.useState("all");

  // ✅ FETCH ONLY IF EMPTY (Redux already has data from home)
  useEffect(() => {
    if (!appointments || appointments.length === 0) {
      fetchAppointments();
    }
  }, [appointments]);

  const fetchAppointments = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getVetAppointments();
      dispatch(setVetAppointments(response.appointments || []));  // ✅ CORRECT PATH
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error("Failed to load appointments");
    } finally {
      dispatch(setLoading(false));
    }
  };

  // ✅ After action, refetch to update Redux
  const handleConfirm = async (appointmentId) => {
    try {
      await confirmAppointment(appointmentId);
      toast.success("Appointment confirmed");
      fetchAppointments();  // ✅ Refresh Redux
    } catch (error) {
      console.error("Error confirming appointment:", error);
      toast.error("Failed to confirm appointment");
    }
  };

  const handleReject = async (appointmentId) => {
    if (window.confirm("Are you sure you want to reject this appointment?")) {
      try {
        await rejectAppointment(appointmentId);
        toast.success("Appointment rejected");
        fetchAppointments();  // ✅ Refresh Redux
      } catch (error) {
        console.error("Error rejecting appointment:", error);
        toast.error("Failed to reject appointment");
      }
    }
  };

  const handleComplete = async (appointmentId) => {
    try {
      await completeAppointment(appointmentId);
      toast.success("Appointment marked as completed");
      fetchAppointments();  // ✅ Refresh Redux
    } catch (error) {
      console.error("Error completing appointment:", error);
      toast.error("Failed to complete appointment");
    }
  };

  const getFilteredAppointments = () => {
    if (filter === "all") return appointments;
    return appointments.filter((apt) => apt.status === filter);
  };

  const filteredAppointments = getFilteredAppointments();
  const pendingCount = appointments.filter((apt) => apt.status === "pending").length;
  const confirmedCount = appointments.filter((apt) => apt.status === "confirmed").length;
  const completedCount = appointments.filter((apt) => apt.status === "completed").length;

  if (loading && appointments.length === 0) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">My Appointments</h1>
        <p className="text-gray-600">Manage appointment requests and schedule</p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-600">
          <p className="text-gray-600 text-sm">Pending Requests</p>
          <p className="text-3xl font-bold text-gray-900">{pendingCount}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-600">
          <p className="text-gray-600 text-sm">Confirmed</p>
          <p className="text-3xl font-bold text-gray-900">{confirmedCount}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-600">
          <p className="text-gray-600 text-sm">Completed</p>
          <p className="text-3xl font-bold text-gray-900">{completedCount}</p>
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex gap-2 flex-wrap">
        {["all", "pending", "confirmed", "completed", "rejected"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filter === status
                ? "bg-green-600 text-white"
                : "bg-white text-gray-700 border-2 border-gray-200 hover:border-green-600"
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
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredAppointments.map((appointment) => (
            <AppointmentCard
              key={appointment._id}
              appointment={appointment}
              role="vet"
              onConfirm={handleConfirm}
              onReject={handleReject}
              onComplete={handleComplete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VetAppointments;