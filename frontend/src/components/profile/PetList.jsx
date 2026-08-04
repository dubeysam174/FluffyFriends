import React, { useState } from "react";
import { Trash2, Edit2, Heart } from "lucide-react";
import { deletePet } from "../../api/profileAPI";
import toast from "react-hot-toast";
// import AddEditPet from "./AddEditPet";
const PetList = ({ pets, onPetUpdate }) => {
  console.log("pets:", pets);
  console.log("Is Array?", Array.isArray(pets));
  const [editingPet, setEditingPet] = useState(null);
  const [editPetOpen, setEditPetOpen] = useState(false);

  const handleEdit = (pet) => {
    setEditingPet(pet);
    setEditPetOpen(true);
  };

  const handleDelete = async (petId) => {
    if (window.confirm("Are you sure you want to delete this pet?")) {
      try {
        await deletePet(petId);
        toast.success("Pet deleted successfully");
        onPetUpdate();
      } catch (error) {
        console.error("Error deleting pet:", error);
        toast.error("Failed to delete pet");
      }
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets.map((pet) => (
          <div key={pet._id} className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl border-2 border-red-200 p-6 hover:shadow-lg transition">
            
            {/* PET IMAGE */}
            <div className="w-full h-40 bg-gray-200 rounded-lg mb-4 overflow-hidden">
              {pet.photo ? (
                <img src={pet.photo} alt={pet.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-300 text-white text-4xl">
                  🐾
                </div>
              )}
            </div>

            {/* PET INFO */}
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-900">{pet.name}</h3>
              <p className="text-gray-600 text-sm mb-2">
                {pet.species.charAt(0).toUpperCase() + pet.species.slice(1)} • {pet.breed}
              </p>
              
              <div className="space-y-1 text-sm text-gray-700">
                {pet.age && <p>Age: {pet.age} years</p>}
                {pet.gender && <p>Gender: {pet.gender}</p>}
                {pet.weight && <p>Weight: {pet.weight} kg</p>}
              </div>
            </div>

            {/* MEDICAL INFO SUMMARY */}
            {(pet.vaccinations?.length > 0 || pet.allergies?.length > 0) && (
              <div className="bg-white rounded-lg p-3 mb-4 text-xs">
                {pet.vaccinations?.length > 0 && (
                  <p className="text-blue-700">💉 {pet.vaccinations.length} vaccination(s)</p>
                )}
                {pet.allergies?.length > 0 && (
                  <p className="text-orange-700">⚠️ {pet.allergies.length} allergy(ies)</p>
                )}
              </div>
            )}

            {/* ACTION BUTTONS */}
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(pet)}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition font-semibold text-sm"
              >
                <Edit2 size={16} />
                Edit
              </button>
              <button
                onClick={() => handleDelete(pet._id)}
                className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition font-semibold text-sm"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT PET DIALOG */}
      {/* <AddEditPet
        isOpen={editPetOpen}
        onClose={() => {
          setEditPetOpen(false);
          setEditingPet(null);
        }}
        onSuccess={() => {
          onPetUpdate();
          setEditPetOpen(false);
          setEditingPet(null);
        }}
        editingPet={editingPet}
      /> */}
    </>
  );
};

export default PetList;