import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getVetById } from "../api/vetAPI";
import AppointmentForm from "../components/Appointments/AppointmentForm";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

const BookAppointmentPage = () => {
  const { vetId } = useParams();
  const navigate = useNavigate();
  const [vet, setVet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVetDetails();
  }, [vetId]);

  const fetchVetDetails = async () => {
    try {
      setLoading(true);
      const response = await getVetById(vetId);
      console.log("Vet details:", response);
      setVet(response.data);
    } catch (error) {
      console.error("Error fetching vet details:", error);
      toast.error("Failed to load vet details");
      navigate("/find-vet");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="max-w-2xl mx-auto px-4 text-center py-12">
          <p className="text-gray-600">Loading vet details...</p>
        </div>
      </div>
    );
  }

  if (!vet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="max-w-2xl mx-auto px-4 text-center py-12">
          <p className="text-gray-600">Vet not found</p>
          <button
            onClick={() => navigate("/find-vet")}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
          >
            Back to Find Vet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/find-vet")}
          className="flex items-center gap-2 text-red-600 hover:text-red-700 mb-6 transition"
        >
          <ArrowLeft size={20} />
          Back to Vets
        </button>

        {/* VET INFO CARD */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200">
          <div className="flex items-center gap-4">
            <img
              src={vet.image || "https://via.placeholder.com/100"}
              alt={vet.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dr. {vet.name}</h1>
              <p className="text-gray-600">{vet.specialization || "General Veterinarian"}</p>
              <p className="text-gray-600">{vet.yearsOfExperience || 5}+ years experience</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-yellow-500">⭐</span>
                <span className="font-semibold">{vet.rating || 4.8}/5</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div>
              <p className="text-sm text-gray-600">Clinic Location</p>
              <p className="font-semibold text-gray-900">{vet.clinic || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-semibold text-gray-900">{vet.phone || "N/A"}</p>
            </div>
          </div>

          {vet.bio && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-gray-700">{vet.bio}</p>
            </div>
          )}
        </div>

        {/* BOOKING FORM CARD */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Schedule Your Appointment
          </h2>
          <AppointmentForm vetId={vetId} onClose={() => navigate("/appointments")} />
        </div>
      </div>
    </div>
  );
};

export default BookAppointmentPage;