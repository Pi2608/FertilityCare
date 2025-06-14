import axios from "axios";
import mockUsers from "../../data/mockUsers";

class ApiGateway {
    static API_BASE = "http://localhost:5276/";
    static axiosInstance = axios.create({
        baseURL: ApiGateway.API_BASE,
        headers: { "Content-Type": "application/json" },
    });
    static formDataAxiosInstance = axios.create({
        baseURL: ApiGateway.API_BASE,
        headers: { "Content-Type": "multipart/form-data" },
    });
    static setAuthToken(token) {
        ApiGateway.axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
    }

    static USE_MOCK_LOGIN = true;

    static async login(emailOrPhone, password) {
        if (ApiGateway.USE_MOCK_LOGIN) {
            // Giả lập delay
            await new Promise((resolve) => setTimeout(resolve, 500));
            // Tìm user trong mockUsers
            const user = mockUsers.find(u =>
                (u.email === emailOrPhone || u.phone === emailOrPhone) && u.password === password
            );
            if (user) {
                // Tạo token giả (có thể đơn giản hoặc random)
                const token = `mock-token-${user.userId}`;
                return {
                    data: {
                        userId: user.userId,
                        token,
                        // Có thể trả thêm thông tin user nếu cần: user: { id: ..., fullName: ... }
                    }
                };
            } else {
                const error = new Error("Sai tài khoản hoặc mật khẩu");
                error.response = { data: { message: "Sai tài khoản hoặc mật khẩu" } };
                throw error;
            }
        }
        // Khi không mock, gọi API thật
        try {
            const response = await ApiGateway.axiosInstance.get(
                `User/Login?email=${encodeURIComponent(emailOrPhone)}&password=${encodeURIComponent(password)}`
            );
            return response.data ? { data: response.data } : null;
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    }

  // Phương thức register vẫn như cũ hoặc mock tương tự nếu muốn
    static async register(newUser) {
        if (ApiGateway.USE_MOCK_LOGIN) {
            await new Promise((resolve) => setTimeout(resolve, 500));
            // Trong mock, có thể giả lập thêm user mới:
            const userId = `user-mock-${Date.now()}`;
            const token = `mock-token-${userId}`;
            // Không thêm vào mockUsers vì không persistent; nếu muốn persistent tạm, có thể push vào array nhưng khi reload sẽ mất
            return {
                data: { userId, token }
            };
        }
        try {
            const response = await ApiGateway.axiosInstance.post("User/Register", newUser);
            return response.data ? { data: response.data } : null;
        } catch (error) {
            console.error("Registration error:", error);
            throw error;
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
