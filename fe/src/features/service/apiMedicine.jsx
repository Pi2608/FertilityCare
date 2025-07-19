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


const apiMedicine = {
  // 1. Lấy thông tin người dùng để lấy userId
  getCurrentCustomer: async () => {
    try {
      const res = await axiosInstance.get("customer/info");
      console.log("✅ API getCurrentCustomer trả về:", res.data);
      return res.data.data;
    } catch (err) {
      console.error("Lỗi khi lấy thông tin khách hàng:", err);
      throw err;
    }
  },


  // 2. Lấy toàn bộ thuốc của người dùng theo userId
  getMedicineSchedulesByCustomer: async (userId) => {
    try {
      const res = await axiosInstance.get(`medicine/customer/${userId}`);
      return res.data.data;
    } catch (err) {
      console.error("Lỗi khi lấy lịch thuốc theo customerId:", err);
      throw err;
    }
  },


  // 3. Ghi nhận trạng thái uống thuốc
  updateMedicineStatus: async (scheduleId, status) => {
    try {
      const res = await axiosInstance.patch(
        `medicine/medicine-schedules/${scheduleId}?status=${status}`
      );
      return res.data;
    } catch (err) {
      console.error("Lỗi khi cập nhật trạng thái thuốc:", err);
      throw err;
    }
  },
};


export default apiMedicine;