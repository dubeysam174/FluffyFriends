
import { createSlice } from "@reduxjs/toolkit";

const initialState={
    nearbyVets:[],
    loading:false,
    error:null,
    userLocation:null,
    lastSearchTime:null,
}


const vetSearchSlice=createSlice({
    name:"vetSearch",
    initialState,
    reducers:{
        setNearbyVets:(state,action)=>{
            state.nearbyVets = action.payload.vets ||[];
            state.userLocation= action.payload.userLocation
            state.lastSearchTime = Date.now();
        },
           setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearVetSearch: () => initialState,
  },
});

export const { setNearbyVets, setLoading, setError, clearVetSearch } = vetSearchSlice.actions;
export default vetSearchSlice.reducer;

export const selectNearbyVets = (state) => state.vetSearch.nearbyVets;
export const selectVetSearchLoading = (state) => state.vetSearch.loading;
export const selectUserLocation = (state) => state.vetSearch.userLocation;
export const selectLastSearchTime = (state) => state.vetSearch.lastSearchTime;

    
