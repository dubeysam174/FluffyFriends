import API from "./axios";

// Get nearby vets
export const getNearbyVets = async (latitude, longitude, distance = 50) => {
  try {
    const response = await API.get("/vets/nearby", {
      params: {
        latitude,
        longitude,
        distance,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Search vets by name or specialization
export const searchVets = async (query) => {
  try {
    const response = await API.get("/vets/search", {
      params: { query },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get all vets
export const getAllVets = async () => {
  try {
    const response = await API.get("/vets");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get vet by ID
export const getVetById = async (vetId) => {
  try {
    const response = await API.get(`/vets/${vetId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};