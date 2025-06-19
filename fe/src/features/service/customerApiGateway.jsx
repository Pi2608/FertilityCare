import axios from "axios";
import mockUsers from "../../data/mockUsers";

class CustomerApiGateway {
    static API_BASE = "http://localhost:8080/api/";
    static axiosInstance = axios.create({
        baseURL: CustomerApiGateway.API_BASE,
        headers: { "Content-Type": "application/json" },
    });
    static formDataAxiosInstance = axios.create({
        baseURL: CustomerApiGateway.API_BASE,
        headers: { "Content-Type": "multipart/form-data" },
    });
    static setAuthToken(token) {
        CustomerApiGateway.axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
    }

    static USE_MOCK_LOGIN = false;
    static async register(newUser) {
        if (CustomerApiGateway.USE_MOCK_LOGIN) {
            await new Promise((resolve) => setTimeout(resolve, 500));
            const userId = `user-mock-${Date.now()}`;
            const token = `mock-token-${userId}`;
            return {
                data: { userId, token }
            };
        }
        try {
            const response = await CustomerApiGateway.axiosInstance.post("register/customer", newUser);
            return response.data ? { data: response.data } : null;
        } catch (error) {
            console.error("Registration error:", error);
            throw error;
        }
    }

    static async changePassword(oldPwd, newPwd) {
        try {
            const password = {
                oldPassword: oldPwd,
                newPassword: newPwd,
            };
            const response = await CustomerApiGateway.axiosInstance.put(`/customer/update`, password);
            return response.data;
        } catch (error) {
            console.error("Change Password error:", error);
            throw error;
        }
    }

    static async updateUser(userInfo) {
        try {
            const response = await CustomerApiGateway.axiosInstance.put(`/customer/update`, userInfo);
            return response.data;
        } catch (error) {
            console.error("Update Profile error:", error);
            throw error;
        }
    }

    static async editUser(userId, user) {
        try {
            const response = await CustomerApiGateway.axiosInstance.put(`/User/EditUser?id=${userId}`, user);
            return response.data;
        } catch (error) {
            console.error("Edit User error:", error);
            throw error;
        }
    }
}

export default CustomerApiGateway;
