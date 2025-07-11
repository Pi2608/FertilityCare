import axios from "axios";


const API_BASE = "http://localhost:8080/api/";
const getToken = () => localStorage.getItem("token");


const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});


// Gán lại token trước mỗi request
axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// Hàm 4: Lấy userId hiện tại từ customer hoặc doctor
const getCurrentUserId = async () => {
  try {
    const customerRes = await axiosInstance.get("customer/info");
    console.log("👉 API customer/info trả về:", customerRes.data);
    const id = customerRes.data?.data?.id;
    if (id) return id;
  } catch (customerErr) {
    console.warn("Không lấy được từ customer, thử tiếp doctor");
  }


  try {
    const doctorRes = await axiosInstance.get("doctors/me");
    console.log("👉 API doctors/me trả về:", doctorRes.data);
    const id = doctorRes.data?.data?.userId;
    if (id) return id;
  } catch (doctorErr) {
    console.error("❌ Không lấy được userId từ cả customer và doctor");
  }


  return null;
};




const MessageAPI = {
  // 1. Lấy tin nhắn cuối cùng giữa mình và các user khác
  getLatestMessages: async () => {
    try {
      const response = await axiosInstance.get("messages/latest");
      return response.data.data; // chỉ trả về mảng data
    } catch (error) {
      console.error("Lỗi khi lấy tin nhắn cuối:", error);
      throw error;
    }
  },


  // 2. Lấy toàn bộ tin nhắn với 1 người dùng cụ thể
  getMessagesWithUser: async (otherUserId) => {
    try {
      const response = await axiosInstance.get(`messages/with/${otherUserId}`);
      return response.data.data;
    } catch (error) {
      console.error(`Lỗi khi lấy tin nhắn với user ${otherUserId}:`, error);
      throw error;
    }
  },


  // 3. Gửi tin nhắn đến người dùng khác
  sendMessage: async ({ receiverId, message }) => {
    try {
      console.log("Gửi tới:", receiverId, "| Nội dung:", message);
      const response = await axiosInstance.post("messages/send", {
        receiverId,
        message,
      });


      return response.data.data;
    } catch (error) {
      console.error("Lỗi khi gửi tin nhắn:", error.response?.data || error.message);
      throw error;
    }
  },


  // 4. ✅ Thêm hàm này để sử dụng bên ngoài
  getCurrentUserId,
};


export default MessageAPI;