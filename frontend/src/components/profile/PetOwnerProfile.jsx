import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../store/slices/authSlice";
import { getUserProfile, getMyPets } from "../../api/profileAPI";
import { Mail, Phone, MapPin, Edit2, Plus } from "lucide-react";
import toast from "react-hot-toast";
import PetList from "./PetList";
import EditPetOwnerProfile from "./EditPetOwnerProfile";
import AddEditPet from "./AddEditPet";

const PetOwnerProfile = () => {
  const user = useSelector(selectUser);
  const [profileData, setProfileData] = useState(null);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [addPetOpen, setAddPetOpen] = useState(false);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      
      // Fetch user profile
      const profileResponse = await getUserProfile();
      console.log("Profile response:", profileResponse);
      setProfileData(profileResponse.data);

      // Fetch pets
      const petsResponse = await getMyPets();
      console.log("Pets response:", petsResponse);
      setPets(petsResponse.data || []);
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12"><p className="text-gray-600">Loading profile...</p></div>;
  }

  const displayData = profileData || user;

  return (
    <div className="space-y-8">
      {/* USER INFO CARD */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-6">
            {/* PROFILE PICTURE */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-white text-3xl font-bold overflow-hidden">
              {displayData?.avatar ? (
                <img src={displayData.avatar} alt={displayData.name} className="w-full h-full object-cover" />
              ) : (
                displayData?.name?.charAt(0).toUpperCase()
              )}
            </div>

            {/* USER INFO */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{displayData?.name}</h1>
              <p className="text-gray-600 mb-3">{displayData?.role === "petOwner" ? "Pet Owner" : "Veterinarian"}</p>
              
              <div className="space-y-2">
                {displayData?.email && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <Mail size={18} className="text-red-600" />
                    <span>{displayData.email}</span>
                  </div>
                )}
                {displayData?.phone && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <Phone size={18} className="text-red-600" />
                    <span>{displayData.phone}</span>
                  </div>
                )}
                {displayData?.city && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin size={18} className="text-red-600" />
                    <span>{displayData.city}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* EDIT PROFILE BUTTON */}
          <button
            onClick={() => setEditProfileOpen(true)}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition font-semibold"
          >
            <Edit2 size={18} />
            Edit Profile
          </button>
        </div>
      </div>

      {/* PETS SECTION */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">My Pets</h2>
          <button
            onClick={() => setAddPetOpen(true)}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition font-semibold"
          >
            <Plus size={18} />
            Add Pet
          </button>
        </div>

        {/* PETS LIST */}
        {pets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No pets added yet</p>
            <button
              onClick={() => setAddPetOpen(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition font-semibold"
            >
              Add Your First Pet
            </button>
          </div>
        ) : (
          <PetList pets={pets} onPetUpdate={fetchProfileData} />
        )}
      </div>

      {/* EDIT PROFILE DIALOG */}
      <EditPetOwnerProfile
        isOpen={editProfileOpen}
        onClose={() => setEditProfileOpen(false)}
        onSuccess={fetchProfileData}
      />

      {/* ADD PET DIALOG */}
      <AddEditPet
        isOpen={addPetOpen}
        onClose={() => setAddPetOpen(false)}
        onSuccess={fetchProfileData}
      />
    </div>
  );
};

export default PetOwnerProfile;