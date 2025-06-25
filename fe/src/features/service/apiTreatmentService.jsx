import axios from "axios";

const API_BASE = "http://localhost:8080/api/";

const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm interceptor để gắn token từ localStorage
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// API để lấy danh sách Treatment Service
const TreatmentServiceAPI = {
  getAll: async () => {
    const response = await axiosInstance.get("treatment-services/all");
    return response.data;
  },

  // API update trạng thái Treatment Service
  updateStatus: async (id, active) => {
    const response = await axiosInstance.patch(
      `treatment-services/${id}/status`,
      null,
      {
        params: { active },
      }
    );
    return response.data;
  },
};

export default TreatmentServiceAPI;
