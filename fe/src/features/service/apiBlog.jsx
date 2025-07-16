import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

const apiBlog = {
  getAllBlogs: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/blogs`);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi gọi API getAllBlogs:", error);
      throw error;
    }
  },
};

export default apiBlog;
