import React, { useState, useEffect } from "react";
import { Upload, Plus, Trash2, Heart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { addPet, updatePet } from "../../api/profileAPI";
import toast from "react-hot-toast";

const AddEditPet = ({ isOpen, onClose, onSuccess, editingPet }) => {
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [tab, setTab] = useState("basic"); // basic, medical, notes

  const [formData, setFormData] = useState({
    name: "",
    species: "dog",
    breed: "",
    age: "",
    gender: "Unknown",
    weight: "",
    photo: "",
    vaccinations: [],
    medicalHistory: [],
    allergies: [],
    currentMedications: [],
    notes: "",
  });

  const [errors, setErrors] = useState({});

  // New vaccine/medication/allergy/condition form states
  const [newVaccine, setNewVaccine] = useState({ name: "", date: "", nextDue: "" });
  const [newAllergy, setNewAllergy] = useState("");
  const [newMedication, setNewMedication] = useState({ name: "", dosage: "", startDate: "" });
  const [newCondition, setNewCondition] = useState({ condition: "", diagnoseOn: "", treatment: "", notes: "" });

  const species = ["dog", "cat", "bird", "rabbit", "fish", "reptile", "other"];
  const genders = ["Male", "Female", "Unknown"];

  // Initialize form with editing pet data
  useEffect(() => {
    if (isOpen) {
      if (editingPet) {
        setFormData(editingPet);
        setPreviewImage(editingPet.photo || null);
      } else {
        setFormData({
          name: "",
          species: "dog",
          breed: "",
          age: "",
          gender: "Unknown",
          weight: "",
          photo: "",
          vaccinations: [],
          medicalHistory: [],
          allergies: [],
          currentMedications: [],
          notes: "",
        });
        setPreviewImage(null);
      }
      setErrors({});
      setTab("basic");
    }
  }, [isOpen, editingPet]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Pet name is required";
    if (!formData.species) newErrors.species = "Species is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" || name === "weight" ? (value ? Number(value) : "") : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData((prev) => ({
          ...prev,
          photo: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // VACCINATIONS
  const addVaccination = () => {
    if (!newVaccine.name.trim()) {
      toast.error("Please enter vaccine name");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      vaccinations: [...prev.vaccinations, newVaccine],
    }));
    setNewVaccine({ name: "", date: "", nextDue: "" });
  };

  const removeVaccination = (index) => {
    setFormData((prev) => ({
      ...prev,
      vaccinations: prev.vaccinations.filter((_, i) => i !== index),
    }));
  };

  // ALLERGIES
  const addAllergy = () => {
    if (!newAllergy.trim()) {
      toast.error("Please enter allergy");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      allergies: [...prev.allergies, newAllergy],
    }));
    setNewAllergy("");
  };

  const removeAllergy = (index) => {
    setFormData((prev) => ({
      ...prev,
      allergies: prev.allergies.filter((_, i) => i !== index),
    }));
  };

  // MEDICATIONS
  const addMedication = () => {
    if (!newMedication.name.trim()) {
      toast.error("Please enter medication name");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      currentMedications: [...prev.currentMedications, newMedication],
    }));
    setNewMedication({ name: "", dosage: "", startDate: "" });
  };

  const removeMedication = (index) => {
    setFormData((prev) => ({
      ...prev,
      currentMedications: prev.currentMedications.filter((_, i) => i !== index),
    }));
  };

  // MEDICAL CONDITIONS
  const addCondition = () => {
    if (!newCondition.condition.trim()) {
      toast.error("Please enter condition name");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      medicalHistory: [...prev.medicalHistory, newCondition],
    }));
    setNewCondition({ condition: "", diagnoseOn: "", treatment: "", notes: "" });
  };

  const removeCondition = (index) => {
    setFormData((prev) => ({
      ...prev,
      medicalHistory: prev.medicalHistory.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const submitData = {
        name: formData.name,
        species: formData.species,
        breed: formData.breed || "",
        age: formData.age || 0,
        gender: formData.gender || "Unknown",
        weight: formData.weight || 0,
        photo: formData.photo || "",
        vaccinations: formData.vaccinations,
        medicalHistory: formData.medicalHistory,
        allergies: formData.allergies,
        currentMedications: formData.currentMedications,
        notes: formData.notes || "",
      };

      console.log("Submitting pet data:", submitData);

      if (editingPet) {
        // Update pet
        await updatePet(editingPet._id, submitData);
        toast.success("Pet updated successfully!");
      } else {
        // Add new pet
        await addPet(submitData);
        toast.success("Pet added successfully!");
      }

      setLoading(false);
      onClose();
      onSuccess();
    } catch (error) {
      console.error("Error saving pet:", error);
      toast.error(error.response?.data?.message || "Failed to save pet");
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {editingPet ? "Edit Pet" : "Add New Pet"}
          </DialogTitle>
          <DialogDescription>
            {editingPet ? "Update your pet's information" : "Add a new pet to your profile"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* TABS */}
          <div className="flex gap-2 border-b-2 border-gray-200">
            <button
              type="button"
              onClick={() => setTab("basic")}
              className={`px-4 py-2 font-semibold transition ${
                tab === "basic"
                  ? "border-b-2 border-red-600 text-red-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Basic Info
            </button>
            <button
              type="button"
              onClick={() => setTab("medical")}
              className={`px-4 py-2 font-semibold transition ${
                tab === "medical"
                  ? "border-b-2 border-red-600 text-red-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Medical
            </button>
            <button
              type="button"
              onClick={() => setTab("notes")}
              className={`px-4 py-2 font-semibold transition ${
                tab === "notes"
                  ? "border-b-2 border-red-600 text-red-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Notes
            </button>
          </div>

          {/* BASIC INFO TAB */}
          {tab === "basic" && (
            <div className="space-y-6">
              {/* PET PHOTO */}
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 rounded-lg bg-gray-200 flex items-center justify-center text-4xl overflow-hidden mb-4">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Pet preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>🐾</span>
                  )}

                  <label className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer opacity-0 hover:opacity-100 transition">
                    <Upload size={32} className="text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-sm text-gray-600">Click to upload photo</p>
              </div>

              {/* PET NAME */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Pet Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Buddy, Whiskers"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-600 transition"
                />
                {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* SPECIES & BREED */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Species *
                  </label>
                  <select
                    name="species"
                    value={formData.species}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-600 transition"
                  >
                    {species.map((s) => (
                      <option key={s} value={s}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </option>
                    ))}
                  </select>
                  {errors.species && <p className="text-red-600 text-sm mt-1">{errors.species}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Breed
                  </label>
                  <input
                    type="text"
                    name="breed"
                    value={formData.breed}
                    onChange={handleChange}
                    placeholder="e.g., Labrador, Siamese"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-600 transition"
                  />
                </div>
              </div>

              {/* AGE, GENDER, WEIGHT */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Age (years)
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-600 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-600 transition"
                  >
                    {genders.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    step="0.1"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-600 transition"
                  />
                </div>
              </div>
            </div>
          )}

          {/* MEDICAL TAB */}
          {tab === "medical" && (
            <div className="space-y-6">
              {/* VACCINATIONS */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h3 className="font-bold text-blue-900 mb-3">💉 Vaccinations</h3>

                {/* ADD VACCINATION */}
                <div className="space-y-3 mb-4">
                  <input
                    type="text"
                    placeholder="Vaccine name (e.g., Rabies)"
                    value={newVaccine.name}
                    onChange={(e) =>
                      setNewVaccine({ ...newVaccine, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border-2 border-blue-300 rounded-lg text-sm focus:outline-none focus:border-blue-600"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      value={newVaccine.date}
                      onChange={(e) =>
                        setNewVaccine({ ...newVaccine, date: e.target.value })
                      }
                      className="px-3 py-2 border-2 border-blue-300 rounded-lg text-sm focus:outline-none focus:border-blue-600"
                    />
                    <input
                      type="date"
                      placeholder="Next due"
                      value={newVaccine.nextDue}
                      onChange={(e) =>
                        setNewVaccine({ ...newVaccine, nextDue: e.target.value })
                      }
                      className="px-3 py-2 border-2 border-blue-300 rounded-lg text-sm focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={addVaccination}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold transition"
                  >
                    <Plus size={16} />
                    Add Vaccination
                  </button>
                </div>

                {/* VACCINATIONS LIST */}
                {formData.vaccinations.length > 0 && (
                  <div className="space-y-2">
                    {formData.vaccinations.map((vaccine, index) => (
                      <div
                        key={index}
                        className="bg-white p-3 rounded-lg flex items-center justify-between"
                      >
                        <div>
                          <p className="font-semibold text-gray-900">{vaccine.name}</p>
                          <p className="text-xs text-gray-600">
                            {vaccine.date ? new Date(vaccine.date).toLocaleDateString() : "N/A"}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeVaccination(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ALLERGIES */}
              <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                <h3 className="font-bold text-orange-900 mb-3">⚠️ Allergies</h3>

                <div className="space-y-3 mb-4">
                  <input
                    type="text"
                    placeholder="Allergy (e.g., Peanuts, Chicken)"
                    value={newAllergy}
                    onChange={(e) => setNewAllergy(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-orange-300 rounded-lg text-sm focus:outline-none focus:border-orange-600"
                  />
                  <button
                    type="button"
                    onClick={addAllergy}
                    className="w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg text-sm font-semibold transition"
                  >
                    <Plus size={16} />
                    Add Allergy
                  </button>
                </div>

                {/* ALLERGIES LIST */}
                {formData.allergies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.allergies.map((allergy, index) => (
                      <div
                        key={index}
                        className="bg-white px-3 py-2 rounded-full flex items-center gap-2"
                      >
                        <span className="text-sm font-semibold text-gray-900">{allergy}</span>
                        <button
                          type="button"
                          onClick={() => removeAllergy(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* CURRENT MEDICATIONS */}
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <h3 className="font-bold text-green-900 mb-3">💊 Current Medications</h3>

                <div className="space-y-3 mb-4">
                  <input
                    type="text"
                    placeholder="Medication name"
                    value={newMedication.name}
                    onChange={(e) =>
                      setNewMedication({ ...newMedication, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border-2 border-green-300 rounded-lg text-sm focus:outline-none focus:border-green-600"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Dosage (e.g., 5mg)"
                      value={newMedication.dosage}
                      onChange={(e) =>
                        setNewMedication({ ...newMedication, dosage: e.target.value })
                      }
                      className="px-3 py-2 border-2 border-green-300 rounded-lg text-sm focus:outline-none focus:border-green-600"
                    />
                    <input
                      type="date"
                      value={newMedication.startDate}
                      onChange={(e) =>
                        setNewMedication({ ...newMedication, startDate: e.target.value })
                      }
                      className="px-3 py-2 border-2 border-green-300 rounded-lg text-sm focus:outline-none focus:border-green-600"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={addMedication}
                    className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-semibold transition"
                  >
                    <Plus size={16} />
                    Add Medication
                  </button>
                </div>

                {/* MEDICATIONS LIST */}
                {formData.currentMedications.length > 0 && (
                  <div className="space-y-2">
                    {formData.currentMedications.map((med, index) => (
                      <div key={index} className="bg-white p-3 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-gray-900">{med.name}</p>
                            <p className="text-xs text-gray-600">{med.dosage}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeMedication(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* MEDICAL CONDITIONS */}
              <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                <h3 className="font-bold text-red-900 mb-3">🏥 Medical History</h3>

                <div className="space-y-3 mb-4">
                  <input
                    type="text"
                    placeholder="Condition name"
                    value={newCondition.condition}
                    onChange={(e) =>
                      setNewCondition({ ...newCondition, condition: e.target.value })
                    }
                    className="w-full px-3 py-2 border-2 border-red-300 rounded-lg text-sm focus:outline-none focus:border-red-600"
                  />
                  <input
                    type="date"
                    value={newCondition.diagnoseOn}
                    onChange={(e) =>
                      setNewCondition({ ...newCondition, diagnoseOn: e.target.value })
                    }
                    className="w-full px-3 py-2 border-2 border-red-300 rounded-lg text-sm focus:outline-none focus:border-red-600"
                  />
                  <input
                    type="text"
                    placeholder="Treatment"
                    value={newCondition.treatment}
                    onChange={(e) =>
                      setNewCondition({ ...newCondition, treatment: e.target.value })
                    }
                    className="w-full px-3 py-2 border-2 border-red-300 rounded-lg text-sm focus:outline-none focus:border-red-600"
                  />
                  <textarea
                    placeholder="Notes"
                    value={newCondition.notes}
                    onChange={(e) =>
                      setNewCondition({ ...newCondition, notes: e.target.value })
                    }
                    rows="2"
                    className="w-full px-3 py-2 border-2 border-red-300 rounded-lg text-sm focus:outline-none focus:border-red-600 resize-none"
                  />
                  <button
                    type="button"
                    onClick={addCondition}
                    className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-semibold transition"
                  >
                    <Plus size={16} />
                    Add Condition
                  </button>
                </div>

                {/* CONDITIONS LIST */}
                {formData.medicalHistory.length > 0 && (
                  <div className="space-y-2">
                    {formData.medicalHistory.map((condition, index) => (
                      <div key={index} className="bg-white p-3 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold text-gray-900">{condition.condition}</p>
                            <p className="text-xs text-gray-600">
                              {condition.diagnoseOn
                                ? new Date(condition.diagnoseOn).toLocaleDateString()
                                : "N/A"}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeCondition(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        {condition.treatment && (
                          <p className="text-sm text-gray-700">Treatment: {condition.treatment}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* NOTES TAB */}
          {tab === "notes" && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Add any additional information about your pet..."
                rows="6"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-600 transition resize-none"
              />
            </div>
          )}

          {/* BUTTONS */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border-2 border-gray-300 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold py-2 rounded-lg transition"
            >
              {loading ? "Saving..." : editingPet ? "Update Pet" : "Add Pet"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditPet;