import API from "./axios";

export const getMyPets = async () => {
  try {
    const response = await API.get("pets/my-pets");
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
    const response = await API.post("/pets", data);
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