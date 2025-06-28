import axios from "axios";




const API_BASE = "http://localhost:8080/api/";




const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});




// Gắn token từ localStorage
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});




const apiConsultant = {
  getCustomerInfo: async () => {
    const res = await axiosInstance.get("customer/info");
    return res.data;
  },




  getActiveDoctors: async () => {
    const res = await axiosInstance.get("doctors/active");
    return res.data;
  },




  getAvailableSchedules: async (doctorId, date) => {
    const res = await axiosInstance.get(`appointment-services/doctors/${doctorId}/available-schedules`, {
      params: { date },
    });
    return res.data;
  },


  getUnavailableSchedules: async (doctorId, date) => {
    const res = await axiosInstance.get(`appointment-services/doctors/${doctorId}/unavailable-schedules`, {
      params: { date },
    });
    return res.data;
  },
 




  registerAppointment: async (data) => {
    const res = await axiosInstance.post("appointment-services/register/appointments", data);
    return res.data;
  },
};




export default apiConsultant;