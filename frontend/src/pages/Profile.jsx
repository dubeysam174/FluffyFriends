import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../store/slices/authSlice";
import PetOwnerProfile from "../components/Profile/PetOwnerProfile";
// import VetProfile from "../components/Profile/VetProfile";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Please login to view profile</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-red-600 hover:text-red-700 mb-6 transition font-semibold"
        >
          <ArrowLeft size={20} />
          Back to Home
        </button>

        {/* ROUTE BASED ON ROLE */}
        {user?.role === "petOwner" ? (
          <PetOwnerProfile />
        ) : user?.role === "vet" ? (
          <VetProfile />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">Invalid user role</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;