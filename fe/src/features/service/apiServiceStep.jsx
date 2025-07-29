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

const apiServiceStep = {
  // Cập nhật title và description cho bước
  updateServiceStep: async (
    stepId,
    stepOrder,
    title,
    description,
    expectedDuration = 0
  ) => {
    try {
      const res = await axiosInstance.put(`service-steps/${stepId}`, {
        stepOrder,
        title,
        description,
        expectedDuration,
      });
      return res.data;
    } catch (err) {
      console.error("Lỗi khi cập nhật bước quy trình:", err);
      throw err;
    }
  },

  // Tạo mới bước cho service
  createServiceStep: async (
    serviceId,
    stepOrder,
    title,
    description,
    expectedDuration = 0
  ) => {
    try {
      const res = await axiosInstance.post(
        `service-steps/service/${serviceId}`,
        {
          stepOrder,
          title,
          description,
          expectedDuration,
        }
      );
      return res.data;
    } catch (err) {
      console.error("Lỗi khi tạo mới bước quy trình:", err);
      throw err;
    }
  },
};

export default apiServiceStep;
