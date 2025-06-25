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

const CustomerAPI = {
  getAllCustomers: async () => {
    try {
      const response = await axiosInstance.get("admin/customers");
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách khách hàng:", error);
      throw error;
    }
  },
};

export default CustomerAPI;

