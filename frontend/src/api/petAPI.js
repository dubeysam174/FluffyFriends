import API from "./axios";

export const getMyPets = async () => {
  try {
    const response = await API.get("/pets/my-pets");
    return response.data;  // ✅ Extract .data
  } catch (error) {
    throw error;
  }
};

export const getPetById = async (petId) => {
  try {
    const response = await API.get(`/pets/${petId}`);
    return response.data;  // ✅ Extract .data
  } catch (error) {
    throw error;
  }
};

export const addPet = async (data) => {
  try {
    // ✅ Handle FormData for file uploads
    const response = await API.post(
      "/pets/add",  // ✅ FIXED: /pets/add (not /pets)
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;  // ✅ Extract .data
  } catch (error) {
    throw error;
  }
};

export const updatePet = async (petId, data) => {
  try {
    // ✅ Handle FormData for file uploads
    const response = await API.put(
      `/pets/${petId}`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;  // ✅ Extract .data
  } catch (error) {
    throw error;
  }
};

export const deletePet = async (petId) => {
  try {
    const response = await API.delete(`/pets/${petId}`);
    return response.data;  // ✅ Extract .data
  } catch (error) {
    throw error;
  }
};

// ✅ NEW: Add vaccination
export const addVaccination = async (petId, data) => {
  try {
    const response = await API.post(
      `/pets/${petId}/vaccination`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ✅ NEW: Add medical history
export const addMedicalHistory = async (petId, data) => {
  try {
    const response = await API.post(
      `/pets/${petId}/medical-history`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};