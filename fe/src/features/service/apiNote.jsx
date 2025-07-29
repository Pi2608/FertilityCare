import axios from "axios";

const API_BASE = "http://localhost:8080/api/";
const getToken = () => localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  },
});

const apiNote = {
  // Cập nhật ghi chú cho cuộc hẹn
  updateNoteForAppointment: async (appointmentId, payload) => {
    try {
      const response = await axiosInstance.patch(
        `appointment-services/appointments/${appointmentId}/update-service`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Lỗi khi cập nhật ghi chú:", error);
      throw error;
    }
  },

  // Cập nhật ghi chú cho cuộc hẹn
  updateNoteForAppointment1: async (appointmentId, payload) => {
    try {
      const dto = {
        note:payload
      }
      const response = await axiosInstance.patch(
        `appointment-services/appointments/${appointmentId}/update-note`,
        dto
      );
      return response.data;
    } catch (error) {
      console.error("Lỗi khi cập nhật ghi chú:", error);
      throw error;
    }
  },
  
  updateNoteForAppointment3: async (appointmentId, payload) => {
    try {
      const response = await axiosInstance.patch(
        `appointment-services/appointments/${appointmentId}/update-status`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Lỗi khi cập nhật ghi chú:", error);
      throw error;
    }
  },
};

export default apiNote;
