import { createSlice } from "@reduxjs/toolkit";


const initialState={
    vets: [],
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
      
        setSelectedVet: (state,action)=>{
            state.selectedVet=action.payload

        },
         setMyProfile: (state, action) => {  // ← ADD THIS
      state.myProfile = {
        _id: action.payload._id,
        clinicName: action.payload.clinicName,
        phone: action.payload.phone,
        address: action.payload.address,
        city: action.payload.city,
        bio: action.payload.bio,
        specializations: action.payload.specializations,
        experience: action.payload.experience,
        consultationFee: action.payload.consultationFee,
        availableDays: action.payload.availableDays,
        availableSlots: action.payload.availableSlots,
        rating: action.payload.rating,
        totalRatings: action.payload.totalRatings,
        verificationStatus: action.payload.verificationStatus,
        isAvailable: action.payload.isAvailable,};},
 
        setLoading: (state,action)=>{
            state.loading=action.payload
        },
        setError: (state,action)=>{
            state.error=action.payload
        },
        clearVetState: () => initialState,
  },
    
})

export const {setVets,setSelectedVet,setLoading,setError,clearVetState,setMyProfile}=vetSlice.actions
export default vetSlice.reducer

export const selectVets       = (state) => state.vet.vets
export const selectNearbyVets = (state) => state.vet.nearbyVets
export const selectSelectedVet = (state) => state.vet.selectedVet
export const selectMyProfile = (state) => state.vet.myProfile;
export const selectVetLoading = (state) => state.vet.loading;
export const selectVetError = (state) => state.vet.error;