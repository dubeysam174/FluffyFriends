import { createSlice } from "@reduxjs/toolkit";


const initialState={
    vets: [],
    nearbyVets: [],
    selectedVet:null,
    myProfile: null,
    loading: false,
    error: null
}


const vetSlice = createSlice({
    name:'vet',
    initialState,
    reducers: {
        setVets: (state,action)=>{
            state.vets = action.payload
        },
        setNearbyVets: (state,action)=>{
            state.nearbyVets=action.payload
        },
        setSelectedVet: (state,action)=>{
            state.selectedVet=action.payload

        },
         setMyProfile: (state, action) => {  // ← ADD THIS
      state.myProfile = action.payload;},
 
        setLoading: (state,action)=>{
            state.loading=action.payload
        },
        setError: (state,action)=>{
            state.error=action.payload
        },
        clearVetState: () => initialState,
  },
    
})

export const {setVets,setNearbyVets,setSelectedVet,setLoading,setError,clearVetState,setMyProfile}=vetSlice.actions
export default vetSlice.reducer

export const selectVets       = (state) => state.vet.vets
export const selectNearbyVets = (state) => state.vet.nearbyVets
export const selectSelectedVet = (state) => state.vet.selectedVet
export const selectMyVetProfile = (state) => state.vet.myProfile;
export const selectVetLoading = (state) => state.vet.loading;
export const selectVetError = (state) => state.vet.error;