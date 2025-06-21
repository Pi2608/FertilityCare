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

const DoctorAPI = {
  // API lấy danh sách tất cả bác sĩ cho role manager
  getAllDoctors: async () => {
    try {
      const response = await axiosInstance.get("doctors/all");
      return response.data;
    } catch (error) {
      console.error(" Lỗi khi lấy danh sách bác sĩ:", error);
      throw error;
    }
  },

  createDoctor: async (newDoctorData) => {
    // API để tạo tài khoản bác sĩ role manager
    try {
      const response = await axiosInstance.post("doctors", newDoctorData);
      return response.data;
    } catch (error) {
      console.error(" Lỗi khi tạo tài khoản bác sĩ:", error);
      throw error;
    }
  },

  toggleDoctorStatus: async (doctorId, isActive) => {
    // API để cập nhật trạng thái hoạt động của bác sĩ cho role manager
    try {
      const response = await axiosInstance.patch(
        `doctors/${doctorId}/status`,
        null,
        {
          params: { active: isActive },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái bác sĩ:", error);
      throw error;
    }
  },

  // Có thể thêm các hàm khác như getDoctorById, createDoctor, updateDoctor ở đây nếu cần
};

export default DoctorAPI;
