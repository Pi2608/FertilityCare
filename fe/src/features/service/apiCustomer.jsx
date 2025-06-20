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
  // API lấy thông tin Customer
  getCustomerInfo: async () => {
    try {
      const response = await axiosInstance.get("customer/info");
      return response.data;
    } catch (error) {
      console.error("❌ Lỗi khi lấy thông tin customer:", error);
      throw error;
    }
  },

  // API cập nhật thông tin Customer
  updateCustomerInfo: async (updatedData) => {
    try {
      const response = await axiosInstance.put("customer/update", updatedData);
      return response.data;
    } catch (error) {
      console.error("❌ Lỗi khi cập nhật thông tin customer:", error);
      throw error;
    }
  },
};

export default CustomerAPI;