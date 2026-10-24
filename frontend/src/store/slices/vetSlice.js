import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vets: [],
  selectedVet: null,
  myProfile: null,
  loading: false,
  error: null,
};

const vetSlice = createSlice({
  name: "vet",
  initialState,
  reducers: {
    setVets: (state, action) => {
      state.vets = action.payload;
    },

    setSelectedVet: (state, action) => {
      state.selectedVet = action.payload;
    },

    setMyProfile: (state, action) => {
      // Store the full vet document, including clinicPhotos (Cloudinary URLs)
      state.myProfile = {
        ...action.payload,
        clinicPhotos: action.payload?.clinicPhotos || [],
      };
    },

    // Remove one saved clinic photo URL after the server confirms the delete
    removeClinicPhoto: (state, action) => {
      if (state.myProfile) {
        state.myProfile.clinicPhotos = state.myProfile.clinicPhotos.filter(
          (url) => url !== action.payload
        );
      }
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    clearVetState: () => initialState,
  },
});

export const {
  setVets,
  setSelectedVet,
  setMyProfile,
  removeClinicPhoto,
  setLoading,
  setError,
  clearVetState,
} = vetSlice.actions;

export default vetSlice.reducer;

export const selectVets = (state) => state.vet.vets;
export const selectSelectedVet = (state) => state.vet.selectedVet;
export const selectMyProfile = (state) => state.vet.myProfile;
export const selectClinicPhotos = (state) => state.vet.myProfile?.clinicPhotos || [];
export const selectVetLoading = (state) => state.vet.loading;
export const selectVetError = (state) => state.vet.error;