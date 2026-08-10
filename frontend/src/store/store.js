import { configureStore } from "@reduxjs/toolkit";
import authReducer  from './slices/authSlice'
import vetReducer from './slices/vetSlice'
import petReducer from './slices/petSlice'
import appointmentReducer from './slices/appointmentSlice'
import vetSearchReducer from './slices/VetSearchSlice'


export const store = configureStore({
    reducer: {
        auth: authReducer,
       
        vet: vetReducer,
        pet:petReducer,
        appointment: appointmentReducer,
        vetSearch: vetSearchReducer
    }
})

export default store