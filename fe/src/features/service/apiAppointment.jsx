import axios from "axios";

const API_BASE = "http://localhost:8080/api/";

const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Gắn token từ localStorage
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const apiAppointment = {
  getAllAppointments: async () => {
    const response = await axiosInstance.get(
      "appointment-services/appointments/detail"
    );
    return response.data;
  },

  getAppointmentDetailById: async (id) => {
    const response = await axiosInstance.get(
      `appointment-services/appointments/${id}/detail`
    );
    return response.data;
  },

  createTestResult: async (data) => {
    const response = await axiosInstance.post("test-results/create", data);
    return response.data;
  },

  cancelAppointmentById: async (appointmentId) => {
    const response = await axiosInstance.patch(
      `appointment-services/appointments/cancel/${appointmentId}`
    );
    return response.data;
  },

  getAllCyclesOfDoctor: async () => {
    const response = await axiosInstance.get("cycles/meD/cycle/all");
    return response.data;
  },

  getAllCyclesOfCustomer: async (customerId) => {
    const response = await axiosInstance.get(`cycles/meC/cycle/all?customerId=${customerId}`);
    return response.data;
  },

  // Lấy tất cả các bước điều trị trong chu kỳ
  getCycleStepsByCycleId: async (cycleId) => {
    const response = await axiosInstance.get(
      `cycle-steps/cycleId/${cycleId}/step/all`
    );
    return response.data;
  },

  // Lấy lịch uống thuốc của bệnh nhân
  getMedicationSchedulesByCustomer: async (customerId) => {
    const response = await axiosInstance.get(`medicine/customer/${customerId}`);
    return response.data;
  },

  // Lấy kết quả xét nghiệm của bệnh nhân
  getTestResultsByCustomer: async (customerId) => {
    const response = await axiosInstance.get(
      `test-results/customer/${customerId}`
    );
    return response.data;
  },
};

export default apiAppointment;
