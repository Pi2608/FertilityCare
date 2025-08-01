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


const apiFeedback = {
  // Gửi đánh giá bác sĩ
  createFeedback: async ({ doctorId, rating, comment }) => {
    try {
      const payload = {
        doctorId,
        rating,
        comment: comment || null,
      };
      const response = await axiosInstance.post("feedback", payload);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi gửi đánh giá:", error);
      throw error;
    }
  },


  // Lấy danh sách đánh giá của tôi
  getMyFeedbacks: async () => {
    try {
      const response = await axiosInstance.get("feedback/me");
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy đánh giá của tôi:", error);
      throw error;
    }
  },


  getAllFeedbacks: async () => {
    try {
      const response = await axiosInstance.get("feedback");
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy toàn bộ đánh giá:", error);
      throw error;
    }
  },
 
};
export default apiFeedback;