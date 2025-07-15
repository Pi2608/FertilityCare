import axios from "axios"


const API_BASE = "http://localhost:8080/api/"


const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
})


// Gắn token nếu cần
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})


const apiDashboard = {
  // API 1: Tổng quan người dùng
  getUserSummary: async () => {
    const res = await axiosInstance.get("reports/users/summary")
    return res.data
  },


  // API 2: Doanh thu
  getRevenue: async () => {
    const res = await axiosInstance.get("reports/revenue")
    return res.data
  },


  // API 3: Tài khoản
  getAccountStats: async () => {
    const res = await axiosInstance.get("reports/accounts")
    return res.data
  },
}


export default apiDashboard