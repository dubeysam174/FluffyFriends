import { createSlice } from "@reduxjs/toolkit";
import { create } from "axios";

 const initialState={
    appointments:[],
    vetAppointments:[],
    loading: false,
    error: null
 }


 const appointmentSlice=createSlice({
    name: 'appointment',
    initialState,
    reducers: {
        setAppointments: (state,action)=>{
            state.appointments=action.payload
        },
        setVetAppointments:(state,action)=>{
            state.vetAppointments=action.payload
        },
        addAppointment:(state,action)=>{
            state.appointments.push(action.payload)
        },
        setLoading: (state,action)=>{
            state.loading=action.payload
        },
        setError: (state,action)=>{
            state.error=action.payload
        },
        clearAppointmentState:()=> initialState
    }
 })

export const { setAppointments, setVetAppointments, addAppointment, setLoading, setError,clearAppointmentState } = appointmentSlice.actions
export default appointmentSlice.reducer

export const selectAppointments    = (state) => state.appointment.appointments
export const selectVetAppointments = (state) => state.appointment.vetAppointments
export const selectLoading = (state) =>
  state.appointment.loading;

export const selectError = (state) =>
  state.appointment.error;