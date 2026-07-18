import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pets: [],
  selectedPets: null,
  loading: false,
  error: null,
};

const petslice = createSlice({
  name: "pet",
  initialState,
  reducers: {
    setPets: (state, action) => {
      state.pets = action.payload;
    },

    addPets: (state, action) => {
      state.pets.push(action.payload);
    },
    setSelectedPets: (state, action) => {
      state.selectedPets = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});
