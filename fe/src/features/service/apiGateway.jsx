import axios from "axios";
import mockUsers from "../../data/mockUsers";

class ApiGateway {
  static API_BASE = "http://localhost:8080/api/";
  static axiosInstance = axios.create({
    baseURL: ApiGateway.API_BASE,
    headers: { "Content-Type": "application/json" },
  });
  static formDataAxiosInstance = axios.create({
    baseURL: ApiGateway.API_BASE,
    headers: { "Content-Type": "multipart/form-data" },
  });

  static setAuthToken(token) {
    ApiGateway.axiosInstance.defaults.headers[
      "Authorization"
    ] = `Bearer ${token}`;
  }

  static USE_MOCK_LOGIN = false;

  static async login(email, password) {
    if (ApiGateway.USE_MOCK_LOGIN) {
      // Giả lập delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      // Tìm user trong mockUsers
      const user = mockUsers.find(
        (u) =>
          (u.email === email || u.phone === email) && u.password === password
      );
      if (user) {
        // Tạo token giả (có thể đơn giản hoặc random)
        const token = `mock-token-${user.userId}`;
        return {
          data: {
            userId: user.userId,
            token,
            // Có thể trả thêm thông tin user nếu cần: user: { id: ..., fullName: ... }
          },
        };
      } else {
        const error = new Error("Sai tài khoản hoặc mật khẩu");
        error.response = { data: { message: "Sai tài khoản hoặc mật khẩu" } };
        throw error;
      }
    }
    // Khi không mock, gọi API thật
    try {
      const account = {
        email: email,
        password: password,
      };
      const response = await ApiGateway.axiosInstance.post(`login`, account);
      return response.data ? { data: response.data } : null;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

    static async getUserRole() {
        try {
            const response = await ApiGateway.axiosInstance.get("login/roles");
            return response.data;
        } catch (error) {
            console.error("Get User Role error:", error);
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
        createdBy: "",
        updatedBy: "",
      };
      const response = await ApiGateway.axiosInstance.post(
        "User/CreateUser",
        user
      );
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

  static async editUser(userId, user) {
    try {
      const response = await ApiGateway.axiosInstance.put(
        `/User/EditUser?id=${userId}`,
        user
      );
      return response.data;
    } catch (error) {
      console.error("Edit User error:", error);
      throw error;
    }
  }

  static async restoreUser(userId) {
    try {
      const response = await ApiGateway.axiosInstance.put(
        `/User/RestoreUser?id=${userId}`
      );
      return response.data;
    } catch (error) {
      console.error("Restore User error:", error);
      throw error;
    }
  }

  static async deleteUser(userId) {
    try {
      const response = await ApiGateway.axiosInstance.delete(
        `/User/DeleteUser?id=${userId}`
      );
      return response.data;
    } catch (error) {
      console.error("Delete User error:", error);
      throw error;
    }
  }

  // Payment APIs
    
  /**
   * Get all payments
   * @returns {Promise} - List of all payments
   */
  static async getAllPayments() {
      try {
          const response = await ApiGateway.axiosInstance.get('/payments/all');
          return response.data;
      } catch (error) {
          console.error('Error fetching all payments:', error);
          throw error;
      }
  }

  /**
   * Get payments by customer ID
   * @param {number} customerId - The customer ID
   * @returns {Promise} - List of payments for the customer
   */
  static async getPaymentsByCustomerId() {
      try {
          const response = await ApiGateway.axiosInstance.get(`/payments/customer`);
          return response.data;
      } catch (error) {
          console.error(`Error fetching payments for customer ${customerId}:`, error);
          throw error;
      }
  }

  /**
   * Get payments by customer ID
   * @param {number} customerId - The customer ID
   * @returns {Promise} - List of payments for the customer
   */
  static async getPendingPaymentsByCustomerId() {
      try {
          const response = await ApiGateway.axiosInstance.get(`/payments/pending/customer`);
          return response.data;
      } catch (error) {
          console.error(`Error fetching payments for customer ${customerId}:`, error);
          throw error;
      }
  }

  /**
   * Create a new payment
   * @param {Object} payment - Payment creation data
   * @returns {Promise} - Created payment response
   */
  static async createPayment(payment) {
      try {
          const paymentForm = {
              customerId: payment.customerId || "4",
              serviceId: payment.serviceId || "",
              total: payment.total || 0,  
              paidDate: null,
              status: "pending",
              type: payment.type || "treatment",
              appointmentDate: payment.appointmentDate || "",
              note: payment.note || "",
          };
          
          console.log('Creating payment with data:', paymentForm);
          const response = await ApiGateway.axiosInstance.post('/payments', paymentForm);
          return response.data;
      } catch (error) {
          console.error('Error creating payment:', error);
          throw error;
      }
  }

  /**
   * Cancel a payment
   * @param {number} paymentId - The payment ID to cancel
   * @returns {Promise} - Cancelled payment response
   */
  static async cancelPayment(paymentId) {
      try {
          const response = await ApiGateway.axiosInstance.put(`/payments/cancel`, paymentId);
          return response.data;
      } catch (error) {
          console.error(`Error cancelling payment ${paymentId}:`, error);
          throw error;
      }
  }

  /**
   * Create VNPay payment URL
   * @param {number} paymentId - The payment ID
   * @returns {Promise} - VNPay redirect URL
   */
  static async createVNPayUrl(paymentId) {
      try {
          const response = await ApiGateway.axiosInstance.post('/payments/vnpay', paymentId);
          return response.data;
      } catch (error) {
          console.error(`Error creating VNPay URL for payment ${paymentId}:`, error);
          throw error;
      }
  }

  /**
   * Handle VNPay callback (usually called by VNPay, but can be used for verification)
   * @param {Object} callbackParams - VNPay callback parameters
   * @returns {Promise} - Callback processing result
   */
  static async processVNPayCallback(callbackParams) {
      try {
          const queryString = new URLSearchParams(callbackParams).toString();
          const response = await ApiGateway.axiosInstance.get(`/payments/vnpay-callback?${queryString}`);
          return response.data;
      } catch (error) {
          console.error('Error processing VNPay callback:', error);
          throw error;
      }
  }
}

export default ApiGateway;
