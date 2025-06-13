import axios from "axios";

class ApiGateway {
    static API_BASE = "http://localhost:5276/";

    static axiosInstance = axios.create({
        baseURL: ApiGateway.API_BASE,
        headers: {
            "Content-Type": "application/json",
        },
    });

    static formDataAxiosInstance = axios.create({
        baseURL: ApiGateway.API_BASE,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    

    static setAuthToken(token) {
        ApiGateway.axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
    }

    //User APIs

    static async register(newUser) {
        try {
            console.log(newUser);
            const response = await ApiGateway.axiosInstance.post("User/Register", newUser);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error("Registration error:", error);
            return null;
        }
    }

    static async login(email, password) {
        try {
            const response = await ApiGateway.axiosInstance.get(`User/Login?email=${email}&password=${password}`);
            return response.data;
        } catch (error) {
            console.error("Login error:", error);
            return null;
        }
    }

    static async getAllUsers() {
        try {
            const response = await ApiGateway.axiosInstance.get("User/GetAllUser");
            return response.data;
        } catch (error) {
            console.error("Get All Users error:", error);
            throw error;
        }
    }

    static async getUserById() {
        try {
            const response = await ApiGateway.axiosInstance.get(`User/GetUser`);
            return response.data;
        } catch (error) {
            console.error("Get User by ID error:", error);
            throw error;
        }
    }

    static async createUser(user) {
        try {
            const newUser = {
                account: user.account,
                email: user.email,
                address: user.address,
                password: user.password,
                roleId: user.roleId,
                createdBy:'',
                updatedBy:'',
            }
            const response = await ApiGateway.axiosInstance.post("User/CreateUser", user);
            return response.data;
        } catch (error) {
            console.error("Create User error:", error);
            throw error;
        }
    }

    static async changePassword(oldPwd, newPwd) {
        try {
            const password = {
                oldPassword: oldPwd,
                newPassword: newPwd,
            };
            const response = await ApiGateway.axiosInstance.put(`/User/ChangePassword`, password);
            return response.data;
        } catch (error) {
            console.error("Change Password error:", error);
            throw error;
        }
    }

    static async updateUser(userInfo) {
        try {
            const response = await ApiGateway.axiosInstance.put(`/User/UpdateProfile`, userInfo);
            return response.data;
        } catch (error) {
            console.error("Update Profile error:", error);
            throw error;
        }
    }

    static async editUser(userId, user) {
        try {
            const response = await ApiGateway.axiosInstance.put(`/User/EditUser?id=${userId}`, user);
            return response.data;
        } catch (error) {
            console.error("Edit User error:", error);
            throw error;
        }
    }

    static async restoreUser(userId) {
        try {
            const response = await ApiGateway.axiosInstance.put(`/User/RestoreUser?id=${userId}`);
            return response.data;
        } catch (error) {
            console.error("Restore User error:", error);
            throw error;
        }
    }

    static async deleteUser(userId) {
        try {
            const response = await ApiGateway.axiosInstance.delete(`/User/DeleteUser?id=${userId}`);
            return response.data;
        } catch (error) {
            console.error("Delete User error:", error);
            throw error;
        }
    }
}

export default ApiGateway;
