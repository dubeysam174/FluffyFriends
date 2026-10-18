import API from "./axios";

// USER PROFILE
export const getUserProfile = async () => {
  const response = await API.get("/user/profile");
  return response;
};

// Accepts FormData (doctor photo, name, email, city)
export const updateUserProfile = async (formData) => {
  const response = await API.put("/user/update-profile", formData);
  return response;
};

// PETS
export const getMyPets = async () => {
  const response = await API.get("/pets/my-pets");
  return response;
};

export const getPetById = async (petId) => {
  const response = await API.get(`/pets/${petId}`);
  return response;
};

// Accepts FormData (pet photo + fields)
export const addPet = async (formData) => {
  const response = await API.post("/pets/add", formData);
  return response;
};

// Accepts FormData (pet photo + fields)
export const updatePet = async (petId, formData) => {
  const response = await API.put(`/pets/${petId}`, formData);
  return response;
};

export const deletePet = async (petId) => {
  const response = await API.delete(`/pets/${petId}`);
  return response;
};

// VET PROFILE
export const getVetProfile = async () => {
  const response = await API.get("/vets/my-profile");
  return response;
};

// Accepts a plain object (clinic details) or FormData (clinic photos)
export const updateVetProfile = async (data) => {
  const response = await API.put("/vets/update-profile", data);
  return response;
};