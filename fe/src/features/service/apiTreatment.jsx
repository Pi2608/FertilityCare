import axios from "axios";

const API_BASE = "http://localhost:8080/api/";

const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

const TreatmentAPI = {
  getActiveTreatments: async () => {
    try {
      const response = await axiosInstance.get("treatment-services/active");
      return response.data;
    } catch (error) {
      console.error("Get Active Treatments error:", error);
      throw error;
    }
  },
};

export default TreatmentAPI;
