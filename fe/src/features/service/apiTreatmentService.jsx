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

// API để lấy danh sách dịch vụ điều trị cho role Manager
const TreatmentServiceAPI = {
  getAll: async () => {
    const response = await axiosInstance.get("treatment-services/all");
    return response.data;
  },
};

export default TreatmentServiceAPI;


