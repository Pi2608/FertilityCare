import axios from "axios";
import mockUsers from "../../data/mockUsers";

const API_BASE = "http://localhost:8080/api/";
const axiosInstance = axios.create({
    baseURL: API_BASE,
    headers: { "Content-Type": "application/json" },
});

const formDataAxiosInstance = axios.create({
    baseURL: API_BASE,
    headers: { "Content-Type": "multipart/form-data" },
});

class ApiPayment {

    // Payment APIs
    
    /**
     * Get all payments
     * @returns {Promise} - List of all payments
     */
    static async getAllPayments() {
        try {
            const response = await axiosInstance.get('/payments/all');
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
    static async getPaymentsByCustomerId(customerId) {
        try {
            const response = await axiosInstance.get(`/payments/customer/${customerId}`);
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
                customerId: payment.customerId || "",
                serviceId: payment.serviceId || "",
                appointmentDate: payment.appointmentDate || "",
                note: payment.note || "",
                total: payment.total || 0,  
                paidDate: null,
                status: "pending",
                type: payment.type || "VNPay",
            };
            const response = await axiosInstance.post('/payments', payment);
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
            const response = await axiosInstance.put(`/payments/cancel/${paymentId}`);
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
            const response = await axiosInstance.post('/payments/vnpay', paymentId);
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
            const response = await axiosInstance.get(`/payments/vnpay-callback?${queryString}`);
            return response.data;
        } catch (error) {
            console.error('Error processing VNPay callback:', error);
            throw error;
        }
    }
}

export default ApiPayment;