import API from "./axios";

// pet owner...
export const getMyAppointments=async()=>{
    try {
        const response = await API.get("/appointments/my-appointments");
        return response.data;

    } catch (error) {
        throw error;
    }


}


export const bookAppointment= async(data)=>{
    try {
        const response = await API.post("/appointments/book",data)
        return response;
    } catch (error) {
        throw error;
    }
}


export const cancelAppointment = async(appointmentId)=>{
    try {
        const response = await API.put(`/appointments/${appointmentId}/cancel`)
        return response.data;
    } catch (error) {
        throw error;
    }


}

export const getAppointmentById=async(appointmentId)=>{
    try {
         const response = await API.get(`/appointments/${appointmentId}`);
    return response.data;
    } catch (error) {
        throw error;
        
    }
}

// for vet ...
export const getVetAppointments = async () => {
  try {
    const response = await API.get("/appointments/vet-appointments");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const confirmAppointment = async (appointmentId) => {
  try {
    const response = await API.put(`/appointments/${appointmentId}/confirm`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const rejectAppointment = async (appointmentId) => {
  try {
    const response = await API.put(`/appointments/${appointmentId}/reject`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const completeAppointment = async (appointmentId) => {
  try {
    const response = await API.put(`/appointments/${appointmentId}/complete`);
    return response.data;
  } catch (error) {
    throw error;
  }
};