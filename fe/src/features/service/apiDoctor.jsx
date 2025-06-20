import axios from "axios";


const API_BASE = "http://localhost:8080/api/";


const axiosInstance = axios.create({
    baseURL: API_BASE,
    headers: { "Content-Type": "application/json" },
});


const DoctorAPI = {
    // Lấy tất cả bác sĩ active
    getActiveDoctors: async () => {
        try {
            const response = await axiosInstance.get("doctors/active");
            return response.data;
        } catch (error) {
            console.error("Get Active Doctors error:", error);
            throw error;
        }
    },


    // Lấy chi tiết bác sĩ theo ID
    getDoctorById: async (id) => {
        try {
            const response = await axiosInstance.get(`doctors/id/${id}`);
            return response.data;
        } catch (error) {
            console.error("Get Doctor by ID error:", error);
            throw error;
        }
    },
   


    // Lấy danh sách bác sĩ theo phương pháp điều trị
    getDoctorsBySpecification: async (specification) => {
        try {
            const response = await axiosInstance.get("doctors/specification", {
                params: { specification },
            });
            return response.data;
        } catch (error) {
            console.error("Get Doctors by Specification error:", error);
            throw error;
        }
    },
};


export default DoctorAPI;



