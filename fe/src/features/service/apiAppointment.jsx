// src/features/service/apiAppointment.jsx
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


const apiAppointment = {
  getAllAppointments: async () => {
    const response = await axiosInstance.get("appointment-services/appointments/detail");
    return response.data;
  },
};


export default apiAppointment;
