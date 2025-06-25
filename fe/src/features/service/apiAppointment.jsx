import axios from "axios";

const API_BASE = "http://localhost:8080/api/";

const axiosInstance = axios.create({
    baseURL: API_BASE,
    headers: { "Content-Type": "application/json" },
});

const formDataAxiosInstance = axios.create({
    baseURL: API_BASE,
    headers: { "Content-Type": "multipart/form-data" },
});

class ApiAppointment {
    
}