import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pets: [],
  selectedPet: null,
  loading: false,
  error: null,
};

const petSlice = createSlice({
  name: "pet",
  initialState,
  reducers: {
    setPets: (state, action) => {
      state.pets = action.payload;
    },

    addPet: (state, action) => {
      state.pets.push(action.payload);
    },

    setSelectedPet: (state, action) => {
      state.selectedPet = action.payload;
    },
    updatePet: (state, action) => {
    state.pets = state.pets.map((pet) =>
        pet._id === action.payload._id ? action.payload : pet
    );
},

removePet: (state, action) => {
    state.pets = state.pets.filter(
        (pet) => pet._id !== action.payload
    );
},

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
    clearPetState: () => initialState,
  },
  
});

export const {
  setPets,
  addPet,
  setSelectedPet,
  setLoading,
  setError,
  clearPetState,
  updatePet,
  removePet
} = petSlice.actions;

export default petSlice.reducer;

export const selectPets = (state) => state.pet.pets;

export const selectSelectedPet = (state) => state.pet.selectedPet;

export const selectLoading = (state) => state.pet.loading;

export const selectError = (state) => state.pet.error;