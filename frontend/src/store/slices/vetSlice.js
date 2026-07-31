import { createSlice } from "@reduxjs/toolkit";


const initialState={
    vets: [],
    nearbyVets: [],
    selectedVet:null,
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
            state.NearbyVets=action.payload
        },
        setSelectedVet: (state,action)=>{
            state.selectedVet=action.payload

        },
 
        setLoading: (state,action)=>{
            state.loading=action.payload
        },
        setError: (state,action)=>{
            state.error=action.payload
        },
        clearVetState: () => initialState,
  },
    
})

export const {setVets,setNearbyVets,setSelectedVet,setLoading,setError,clearVetState}=vetSlice.actions
export default vetSlice.reducer

export const selectVets       = (state) => state.vet.vets
export const selectNearbyVets = (state) => state.vet.nearbyVets
export const selectSelectedVet = (state) => state.vet.selectedVet
