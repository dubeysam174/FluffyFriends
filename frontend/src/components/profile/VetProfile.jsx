import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/slices/authSlice";
import {
    selectMyProfile,
    selectVetLoading,
    setMyProfile,
    setLoading,
    setError,
} from "../../store/slices/vetSlice";

import { getVetProfile } from "../../api/profileAPI";
import {
  Mail,
  Phone,
  MapPin,
  Edit2,
  Award,
  Briefcase,
  Clock,
  Star,
} from "lucide-react";
import toast from "react-hot-toast";
import EditVetProfile from "./EditVetProfile";

const VetProfile = () => {
const user = useSelector(selectUser);
const dispatch= useDispatch();
    const profile = useSelector(selectMyProfile);
    const loading = useSelector(selectVetLoading);

    const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    fetchVetProfile();
  }, []);

const fetchVetProfile = async () => {
    try {
        dispatch(setLoading(true));

        const response = await getVetProfile();

        if (response.data.success) {
            dispatch(setMyProfile(response.data.vet));
        }

    } catch (error) {
        dispatch(setError(error.message));
        toast.error("Failed to load profile");
    } finally {
        dispatch(setLoading(false));
    }
};

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  const displayData= profile || user

  return (
    <div className="space-y-8">
      {/* HEADER CARD */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-6">
            {/* PROFILE PICTURE */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center text-white text-3xl font-bold overflow-hidden">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                user?.name?.charAt(0).toUpperCase()
              )}
            </div>

            {/* VET INFO */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dr. {user?.name}</h1>
              <p className="text-gray-600 mb-1">Veterinarian</p>

              {displayData?.specializations && (
                <p className="text-sm text-blue-700 font-semibold mb-3">
                  {displayData.specializations.join(", ")}
                </p>
              )}

              <div className="space-y-2">
                {user?.email && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <Mail size={18} className="text-green-600" />
                    <span>{user.email}</span>
                  </div>
                )}
                {user?.phone && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <Phone size={18} className="text-green-600" />
                    <span>{user.phone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* EDIT BUTTON */}
          <button
            onClick={() => setEditOpen(true)}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition font-semibold"
          >
            <Edit2 size={18} />
            Edit Profile
          </button>
        </div>
      </div>

      {/* STATS SECTION */}
     
{/* TEMPORARY DEBUG - Remove later */}

      {/* CLINIC INFO CARD */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">🏥 Clinic Information</h2>

        <div className="space-y-6">
          {/* CLINIC NAME */}
          <div>
            <p className="text-sm text-gray-600 mb-1">Clinic Name</p>
            <p className="text-xl font-semibold text-gray-900">
              {profile?.clinicName || "N/A"}
            </p>
          </div>

          {/* CONTACT INFO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Phone size={18} className="text-green-600" />
                <p className="text-sm text-gray-600">Phone</p>
              </div>
              <p className="text-lg font-semibold text-gray-900">
                {displayData?.phone || "N/A"}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={18} className="text-green-600" />
                <p className="text-sm text-gray-600">City</p>
              </div>
              <p className="text-lg font-semibold text-gray-900">
                {displayData?.city || "N/A"}
              </p>
            </div>
          </div>

          {/* ADDRESS */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={18} className="text-green-600" />
              <p className="text-sm text-gray-600">Full Address</p>
            </div>
            <p className="text-gray-900 font-semibold">
              {displayData?.address || "N/A"}
            </p>
          </div>

          {/* BIO */}
          {displayData?.bio && (
            <div>
              <p className="text-sm text-gray-600 mb-2">About</p>
              <p className="text-gray-700 leading-relaxed">{displayData.bio}</p>
            </div>
          )}

          {/* SPECIALIZATIONS */}
          {displayData?.specializations && displayData.specializations.length > 0 && (
            <div>
              <p className="text-sm text-gray-600 mb-2">Specializations</p>
              <div className="flex flex-wrap gap-2">
                {displayData.specializations.map((spec, index) => (
                  <span
                    key={index}
                    className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold"
                  >
                    {spec.charAt(0).toUpperCase() + spec.slice(1)}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AVAILABILITY SECTION */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">📅 Availability</h2>

        <div className="space-y-6">
          {/* AVAILABLE DAYS */}
          {displayData?.availableDays && displayData.availableDays.length > 0 && (
            <div>
              <p className="text-sm text-gray-600 mb-3">Available Days</p>
              <div className="flex flex-wrap gap-2">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
                  (day) => (
                    <div
                      key={day}
                      className={`px-4 py-2 rounded-lg font-semibold ${
                        displayData.availableDays.includes(day.toLowerCase())
                          ? "bg-green-600 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {day.slice(0, 3)}
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* AVAILABLE SLOTS */}
          {displayData?.availableSlots && displayData.availableSlots.length > 0 && (
            <div>
              <p className="text-sm text-gray-600 mb-3">Available Time Slots</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {displayData.availableSlots.map((slot, index) => (
                  <div
                    key={index}
                    className={`px-4 py-3 rounded-lg font-semibold text-center text-sm ${
                      slot.isBooked
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    <p>{slot.time}</p>
                    <p className="text-xs">
                      {slot.isBooked ? "Booked" : "Available"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* VERIFICATION STATUS */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">✅ Verification Status</h2>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="font-semibold text-gray-900">Verification</p>
            <span
              className={`px-4 py-2 rounded-full text-sm font-bold ${
                displayData?.verificationStatus === "approved"
                  ? "bg-green-100 text-green-800"
                  : displayData?.verificationStatus === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {displayData?.verificationStatus?.charAt(0).toUpperCase() +
                displayData?.verificationStatus?.slice(1)}
            </span>
          </div>

          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="font-semibold text-gray-900">Status</p>
            <span
              className={`px-4 py-2 rounded-full text-sm font-bold ${
                displayData?.isAvailable
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {displayData?.isAvailable ? "Available" : "Unavailable"}
            </span>
          </div>
        </div>
      </div>

      {/* CLINIC PHOTOS */}
    
    

      {/* EDIT VET PROFILE DIALOG */}
      <EditVetProfile
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        onSuccess={fetchVetProfile}
      />
    </div>
  );
};

export default VetProfile;