import API from "./axios";

// USER PROFILE
export const getUserProfile = async () => {
  try {
    const response = await API.get("/user/profile");
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateUserProfile = async (data) => {
  try {
    const response = await API.put("/user/profile", data);
    return response;
  } catch (error) {
    throw error;
  }
};

// PETS
export const getMyPets = async () => {
  try {
    const response = await API.get("/pets/my-pets");
    return response;
  } catch (error) {
    throw error;
  }
};

export const getPetById = async (petId) => {
  try {
    const response = await API.get(`/pets/${petId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const addPet = async (data) => {
  try {
    const response = await API.post("/pets/add", data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updatePet = async (petId, data) => {
  try {
    const response = await API.put(`/pets/${petId}`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deletePet = async (petId) => {
  try {
    const response = await API.delete(`/pets/${petId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// VET PROFILE
export const getVetProfile = async () => {
  try {
    const response = await API.get("/vets/profile");
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateVetProfile = async (data) => {
  try {
    const response = await API.put("/vets/profile", data);
    return response;
  } catch (error) {
    throw error;
  }
};