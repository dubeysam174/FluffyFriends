import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { getVetById } from "../../api/vetAPI";
import {
  Mail,
  Phone,
  MapPin,
  Award,
  Briefcase,
  Clock,
  Star,
} from "lucide-react";
import toast from "react-hot-toast";

const VetProfileDialog = ({ isOpen, onClose, vetId }) => {
  const [vetData, setVetData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && vetId) {
      fetchVetDetails();
    }
  }, [isOpen, vetId]);

  const fetchVetDetails = async () => {
    try {
      setLoading(true);
      const response = await getVetById(vetId);
      console.log("🏥 Vet Details:", response);
      setVetData(response.data);
    } catch (error) {
      console.error("Error fetching vet details:", error);
      toast.error("Failed to load vet profile");
    } finally {
      setLoading(false);
    }
  };

  const displayData = vetData?.vet || vetData;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Vet Profile</DialogTitle>
          <DialogDescription>
            View detailed information about this veterinarian
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading profile...</p>
          </div>
        ) : displayData ? (
          <div className="space-y-6">
            {/* HEADER */}
            <div className="flex items-center gap-4 pb-6 border-b">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
                {displayData?.user?.avatar ? (
                  <img
                    src={displayData.user.avatar}
                    alt={displayData.user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  displayData?.user?.name?.charAt(0).toUpperCase()
                )}
              </div>

              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">
                  Dr. {displayData?.user?.name}
                </h2>
                <p className="text-gray-600">Veterinarian</p>
                {displayData?.specializations && (
                  <p className="text-sm text-blue-700 font-semibold">
                    {displayData.specializations.join(", ")}
                  </p>
                )}
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500">
                  {displayData?.rating || 0}⭐
                </div>
                <p className="text-xs text-gray-600">
                  {displayData?.totalRatings || 0} ratings
                </p>
              </div>
            </div>

            {/* CONTACT INFO */}
            <div className="space-y-3">
              {displayData?.user?.email && (
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-green-600" />
                  <span className="text-gray-700">{displayData.user.email}</span>
                </div>
              )}
              {displayData?.phone && (
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-green-600" />
                  <span className="text-gray-700">{displayData.phone}</span>
                </div>
              )}
            </div>

            {/* CLINIC INFO */}
            <div className="bg-green-50 rounded-lg p-4 space-y-2 border border-green-200">
              <h3 className="font-bold text-gray-900">🏥 Clinic</h3>
              <p className="text-gray-900 font-semibold">{displayData?.clinicName || "N/A"}</p>
              {displayData?.address && (
                <div className="flex items-start gap-2">
                  <MapPin size={16} className="text-green-600 mt-1" />
                  <span className="text-gray-700">{displayData.address}</span>
                </div>
              )}
              {displayData?.city && (
                <p className="text-gray-600 text-sm">City: {displayData.city}</p>
              )}
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-blue-50 rounded-lg p-3 text-center border border-blue-200">
                <p className="text-xs text-gray-600">Experience</p>
                <p className="text-xl font-bold text-gray-900">
                  {displayData?.experience || 0}+
                </p>
                <p className="text-xs text-gray-600">years</p>
              </div>

              <div className="bg-purple-50 rounded-lg p-3 text-center border border-purple-200">
                <p className="text-xs text-gray-600">Fee</p>
                <p className="text-xl font-bold text-gray-900">
                  ₹{displayData?.consultationFee || 0}
                </p>
              </div>

              <div className="bg-green-50 rounded-lg p-3 text-center border border-green-200">
                <p className="text-xs text-gray-600">Status</p>
                <span
                  className={`text-xs font-bold px-2 py-1 rounded ${
                    displayData?.verificationStatus === "approved"
                      ? "bg-green-200 text-green-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {displayData?.verificationStatus?.charAt(0).toUpperCase() +
                    displayData?.verificationStatus?.slice(1)}
                </span>
              </div>
            </div>

            {/* BIO */}
            {displayData?.bio && (
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2">About</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {displayData.bio}
                </p>
              </div>
            )}

            {/* SPECIALIZATIONS */}
            {displayData?.specializations && displayData.specializations.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Specializations</h3>
                <div className="flex flex-wrap gap-2">
                  {displayData.specializations.map((spec, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold"
                    >
                      {spec.charAt(0).toUpperCase() + spec.slice(1)}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* AVAILABILITY */}
            {displayData?.availableDays && displayData.availableDays.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Available Days</h3>
                <div className="flex flex-wrap gap-2">
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
                    (day) => (
                      <div
                        key={day}
                        className={`px-3 py-1 rounded-lg font-semibold text-xs ${
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

            {/* TIME SLOTS */}
            {displayData?.availableSlots && displayData.availableSlots.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Available Slots</h3>
                <div className="grid grid-cols-4 gap-2">
                  {displayData.availableSlots.map((slot, index) => (
                    <div
                      key={index}
                      className="bg-green-100 text-green-800 px-3 py-2 rounded text-xs font-semibold text-center"
                    >
                      {slot.time}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CLOSE BUTTON */}
            <div className="flex gap-3 pt-4 border-t">
              <button
                onClick={onClose}
                className="flex-1 border-2 border-gray-300 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-50 transition"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">Vet profile not found</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default VetProfileDialog;