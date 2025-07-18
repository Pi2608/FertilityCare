import axios from "axios";
import mockUsers from "../../data/mockUsers";

export default class ApiGateway {
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
    ApiGateway.axiosInstance.defaults.headers[`Authorization`] = `Bearer ${token}`;
  }

  static USE_MOCK_LOGIN = false;

  // ==================== Auth & User ====================

  static async login(email, password) {
    if (ApiGateway.USE_MOCK_LOGIN) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const user = mockUsers.find(
        (u) =>
          (u.email === email || u.phone === email) && u.password === password
      );
      if (user) {
        const token = `mock-token-${user.userId}`;
        return {
          data: {
            userId: user.userId,
            token,
          },
        };
      } else {
        const error = new Error(`Sai tài khoản hoặc mật khẩu`);
        error.response = { data: { message: `Sai tài khoản hoặc mật khẩu` } };
        throw error;
      }
    }
    try {
      const account = { email, password };
      const response = await ApiGateway.axiosInstance.post(`login`, account);
      return response.data ? { data: response.data } : null;
    } catch (error) {
      console.error(`Login error:`, error);
      throw error;
    }
  }

  static async register(newUser) {
    try {
      const newUserData = {
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        medicalHistory: `Chưa có`,
        phone: newUser.phone,
        gender: newUser.gender,
        dob: newUser.dob,
      };
      const response = await ApiGateway.axiosInstance.post(
        `register/request`,
        newUserData
      );
      return response.data;
    } catch (error) {
      console.error(`Registration error:`, error);
      throw error;
    }
  }

  /**
   * [POST] Xác nhận đăng ký bằng OTP
   * @param {object} otp
   */
  static async confirmRegister(otp) {
    try {
      const confirmInfo = {
        email: otp.email,
        otp: otp.otp,
      };
      await ApiGateway.axiosInstance.post(
        `register/confirm?email=${confirmInfo.email}&otp=${confirmInfo.otp}`
      );
    } catch (error) {
      console.error(`Otp error`, error);
      throw error;
    }
  }

  static async getUserInfo() {
    try {
      const response = await ApiGateway.axiosInstance.get(`customer/info`);
      return response.data;
    } catch (error) {
      console.error(`Get User Info error:`, error);
      throw error;
    }
  }

  static async getUserRole() {
    try {
      const response = await ApiGateway.axiosInstance.get(`login/roles`);
      return response.data;
    } catch (error) {
      console.error(`Get User Role error:`, error);
      throw error;
    }
  }

  static async getAllUsers() {
    try {
      const response = await ApiGateway.axiosInstance.get(`User/GetAllUser`);
      return response.data;
    } catch (error) {
      console.error(`Get All Users error:`, error);
      throw error;
    }
  }

  static async getUserById() {
    try {
      const response = await ApiGateway.axiosInstance.get(`User/GetUser`);
      return response.data;
    } catch (error) {
      console.error(`Get User by ID error:`, error);
      throw error;
    }
  }

  static async createUser(user) {
    try {
      const response = await ApiGateway.axiosInstance.post(
        `User/CreateUser`,
        user
      );
      return response.data;
    } catch (error) {
      console.error(`Create User error:`, error);
      throw error;
    }
  }

  static async changePassword(oldPwd, newPwd) {
    try {
      const password = {
        oldPassword: oldPwd,
        newPassword: newPwd,
      };
      const response = await ApiGateway.axiosInstance.put(
        `/User/ChangePassword`,
        password
      );
      return response.data;
    } catch (error) {
      console.error(`Change Password error:`, error);
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
      console.error(`Edit User error:`, error);
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
      console.error(`Restore User error:`, error);
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
      console.error(`Delete User error:`, error);
      throw error;
    }
  }

  // ==================== Payment APIs ====================

  static async getAllPayments() {
    try {
      const response = await ApiGateway.axiosInstance.get(`/payments/all`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching all payments:`, error);
      throw error;
    }
  }

  static async getPaymentsByCustomerId() {
    try {
      const response = await ApiGateway.axiosInstance.get(`/payments/customer`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching payments for customer:`, error);
      throw error;
    }
  }

  static async getPendingPaymentsByCustomerId() {
    try {
      const response = await ApiGateway.axiosInstance.get(
        `/payments/pending/customer`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching pending payments for customer:`, error);
      throw error;
    }
  }

  static async createPayment(payment) {
    try {
      const paymentForm = {
        customerId: payment.customerId || `4`,
        serviceId: payment.serviceId || ``,
        appointmentId: payment.appointmentId || ``,
        total: payment.total || 0,
        paidDate: null,
        status: `pending`,
        type: payment.type || `treatment`,
        appointmentDate: payment.appointmentDate || ``,
        note: payment.note || ``,
      };
      const response = await ApiGateway.axiosInstance.post(
        `/payments`,
        paymentForm
      );
      return response.data;
    } catch (error) {
      console.error(`Error creating payment:`, error);
      throw error;
    }
  }

  static async cancelPayment(paymentId) {
    try {
      const response = await ApiGateway.axiosInstance.put(
        `/payments/cancel`,
        paymentId
      );
      return response.data;
    } catch (error) {
      console.error(`Error cancelling payment:`, error);
      throw error;
    }
  }

  static async createVNPayUrl(paymentId) {
    try {
      const response = await ApiGateway.axiosInstance.post(
        `/payments/vnpay`,
        paymentId
      );
      return response.data;
    } catch (error) {
      console.error(`Error creating VNPay URL:`, error);
      throw error;
    }
  }

  static async processVNPayCallback(callbackParams) {
    try {
      const queryString = new URLSearchParams(callbackParams).toString();
      const response = await ApiGateway.axiosInstance.get(
        `/payments/vnpay-callback?${queryString}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error processing VNPay callback:`, error);
      throw error;
    }
  }

  // ==================== Appointment Controller ====================

  /**
   * [GET] Lấy lịch ban của bác sĩ theo ngày
   * @param {number} doctorId
   * @param {string} date (YYYY-MM-DD)
   */
  static async getDoctorUnavailableSchedules(doctorId, date) {
    try {
      const response = await ApiGateway.axiosInstance.get(
        `appointment-services/doctors/${doctorId}/unavailable-schedules`,
        { params: { date } }
      );
      return response.data;
    } catch (error) {
      console.error(`Get Doctor Unavailable Schedules error:`, error);
      throw error;
    }
  }

  /**
   * [GET] Lấy lịch ban của bác sĩ theo ngày
   * @param {string} date (YYYY-MM-DD)
   */
  static async getMyUnavailableSchedules(date) {
    try {
      const response = await ApiGateway.axiosInstance.get(
        `appointment-services/doctors/unavailable-schedules`,
        { params: { date } }
      );
      return response.data;
    } catch (error) {
      console.error(`Get Doctor Unavailable Schedules error:`, error);
      throw error;
    }
  }

  /**
   * [POST] Đặt lịch hẹn mới
   * @param {object} dto
   */
  static async createAppointment(dto) {
    try {
      const response = await ApiGateway.axiosInstance.post(
        `appointment-services/register/appointments`,
        dto
      );
      return response.data;
    } catch (error) {
      console.error(`Create Appointment error:`, error);
      throw error;
    }
  }

  /**
   * [POST] Đặt lịch hẹn mới
   * @param {object} dto
   */
  static async createReExamAppointment(dto) {
    try {
      const apiDto = {
        customerId: parseInt(dto.customerId),
        serviceId: parseInt(dto.serviceId),
        date: dto.date,
        note: dto.note,
        cycleStepId: parseInt(dto.cycleStepId),
      }
      console.log(`Re-exam Appointment DTO:`, apiDto);
      const response = await ApiGateway.axiosInstance.post(
        `appointment-services/appointments/reexam`,
        dto
      );
      return response.data;
    } catch (error) {
      console.error(`Create Re-exam Appointment error:`, error);
      throw error;
    }
  }

  /**
   * [PATCH] Hủy cuộc hẹn
   * @param {number} appointmentId
   */
  static async cancelAppointment(appointmentId) {
    try {
      const response = await ApiGateway.axiosInstance.patch(
        `appointment-services/appointments/cancel/${appointmentId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Cancel Appointment error:`, error);
      throw error;
    }
  }

  /**
   * [GET] Lịch sử cuộc hẹn với bệnh nhân (bác sĩ xem)
   * @param {number} customerId
   */
  static async getAppointmentHistoryByCustomer(customerId) {
    try {
      const response = await ApiGateway.axiosInstance.get(
        `appointment-services/appointments/history/${customerId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Get Appointment History error:`, error);
      throw error;
    }
  }

  /**
   * [GET] Tổng quan lịch hẹn toàn hệ thống (quản lý)
   */
  static async getAllAppointmentsOverview() {
    try {
      const response = await ApiGateway.axiosInstance.get(
        `appointment-services/appointments/overview`
      );
      return response.data;
    } catch (error) {
      console.error(`Get All Appointments Overview error:`, error);
      throw error;
    }
  }

  /**
   * [PATCH] Cập nhật dịch vụ cho cuộc hẹn
   * @param {number} appointmentId
   * @param {object} dto
   */
  static async updateAppointmentService(appointmentId, dto) {
    try {
      const response = await ApiGateway.axiosInstance.patch(
        `appointment-services/appointments/${appointmentId}/update-service`,
        dto
      );
      return response.data;
    } catch (error) {
      console.error(`Update Appointment Service error:`, error);
      throw error;
    }
  }

  /**
   * [GET] Chi tiết lịch hẹn theo ID
   * @param {number} appointmentId
   */
  static async getAppointmentDetailById(appointmentId) {
    try {
      const response = await ApiGateway.axiosInstance.get(
        `appointment-services/appointments/${appointmentId}/detail`
      );
      return response.data;
    } catch (error) {
      console.error(`Get Appointment Detail by ID error:`, error);
      throw error;
    }
  }

  /**
   * [GET] Lấy tất cả cuộc hẹn
   */
  static async getAllAppointments() {
    try {
      const response = await ApiGateway.axiosInstance.get(
        `appointment-services/appointments/detail`
      );
      return response.data;
    } catch (error) {
      console.error(`Get All Appointments error:`, error);
      throw error;
    }
  }

  // ==================== Cycle Controller ====================

  /**
   * [GET] Lấy tất cả chu kỳ điều trị của bệnh nhân
   */
  static async getMyCycle() {
    try {
      const response = await ApiGateway.axiosInstance.get(`cycles/meC/cycle/all`);
      return response.data;
    } catch (error) {
      console.error(`Get All Cycles error:`, error);
      throw error;
    }
  }

  /**
   * [GET] Lấy tất cả chu kỳ điều trị của bác sĩ
   */
  static async getDoctorCycles() {
    try {
      const response = await ApiGateway.axiosInstance.get(`cycles/meD/cycle/all`);
      return response.data;
    } catch (error) {
      console.error(`Get All Doctor Cycles error:`, error);
      throw error;
    }
  }

  /**
   * [GET] Lấy chu kỳ điều trị hiện tại của bệnh nhân bác sĩ
   */
  static async getCurrentCyclesOfPatient(customerId) {
    try {
      const response = await ApiGateway.axiosInstance.get(`cycles/current-cycle/${customerId}`);
      return response.data;
    } catch (error) {
      console.error(`Get Current Cycle error:`, error);
      throw error;
    }
  }

  /**
   * [PATCH] Cập nhật ghi chú chu kỳ điều trị
   * @param {number} cycleId
   * @param {string} note
   */
  static async updateCycleNote(cycleId, note) {
    try {
      const response = await ApiGateway.axiosInstance.patch(
        `cycles/cycleId/${cycleId}/note?note=${encodeURIComponent(note)}`
      );
      return response.data;
    } catch (error) {
      console.error(`Update Cycle Note error:`, error);
      throw error;
    }
  }

  /**
   * [POST] Tạo chu kỳ điều trị mới
   * @param {object} dto
   */
  static async createCycle(dto) {
    try {
      const response = await ApiGateway.axiosInstance.post(
        `cycles/create`,
        dto
      );
      return response.data;
    } catch (error) {
      console.error(`Create Cycle error:`, error);
      throw error;
    }
  }

  // ==================== Cycle Step Controller ====================

  /**
   * [GET] Lấy tất cả các bước điều trị trong chu kỳ
   * @param {number} cycleId
   */
  static async getCycleStepsByCycleId(cycleId) {
    try {
      const response = await ApiGateway.axiosInstance.get(
        `cycle-steps/cycleId/${cycleId}/step/all`
      );
      return response.data;
    } catch (error) {
      console.error(`Get Cycle Steps by Cycle ID error:`, error);
      throw error;
    }
  }

  /**
   * [GET] Lấy một bước điều trị cụ thể
   * @param {number} cycleId
   * @param {number} stepOrder
   */
  static async getCycleStep(cycleId, stepOrder) {
    try {
      const response = await ApiGateway.axiosInstance.get(
        `cycle-steps/cycleId/${cycleId}/step/${stepOrder}`
      );
      return response.data;
    } catch (error) {
      console.error(`Get Cycle Step error:`, error);
      throw error;
    }
  }

  /**
   * [PATCH] Cập nhật trạng thái bước điều trị
   * @param {number} cycleId
   * @param {number} stepOrder
   * @param {string} status
   */
  static async updateCycleStepStatus(cycleId, stepOrder, status) {
    try {
      const response = await ApiGateway.axiosInstance.patch(
        `cycle-steps/cycleId/${cycleId}/step/${stepOrder}/status?status=${status}`
      );
      return response.data;
    } catch (error) {
      console.error(`Update Cycle Step Status error:`, error);
      throw error;
    }
  }

  /**
   * [PATCH] Cập nhật ghi chú cho bước điều trị
   * @param {number} cycleId
   * @param {number} stepOrder
   * @param {string} note
   */
  static async updateCycleStepNote(cycleId, stepOrder, note) {
    try {
      console.log(cycleId, ", ", stepOrder, ",", note)
      const response = await ApiGateway.axiosInstance.patch(
        `cycle-steps/cycleId/${cycleId}/step/${stepOrder}/note?note=${encodeURIComponent(
          note
        )}`
      );
      return response.data;
    } catch (error) {
      console.error(`Update Cycle Step Note error:`, error);
      throw error;
    }
  }

  /**
   * [GET] Lấy chi tiết step (note, test, medician)
   * @param {number} cycleStepId
   */
  static async getCycleStepDetails(cycleStepId) {
    try {
      const response = await ApiGateway.axiosInstance.get(
        `cycle-steps/${cycleStepId}/details(note,test,medician)`
      );
      return response.data;
    } catch (error) {
      console.error(`Get Cycle Step Details error:`, error);
      throw error;
    }
  }

  // ==================== Medication Controller ====================

  /**
   * [POST] Tạo lịch uống thuốc
   * @param {object} schedule
   */
  static async createMedicationSchedule(schedule) {
    try {
      const scheduleDto = {
        medicineId: parseInt(schedule.medicineId),
        cycleId: parseInt(schedule.cycleId),
        stepId: parseInt(schedule.stepId),
        startDate: schedule.startDate,
        endDate: schedule.endDate
      }
      console.log("Tạo lịch uống thuốc", scheduleDto)
      const response = await ApiGateway.axiosInstance.post(
        `medicine/medication-schedule`,
        scheduleDto
      );
      return response.data;
    } catch (error) {
      console.error(`Create Medication Schedule error:`, error);
      throw error;
    }
  }

  /**
   * [PATCH] Cập nhật trạng thái uống thuốc
   * @param {number} scheduleId
   * @param {object} statusDto
   */
  static async updateMedicationStatus(scheduleId, statusDto) {
    try {
      const response = await ApiGateway.axiosInstance.patch(
        `medicine/medicine-schedules/${scheduleId}`,
        statusDto
      );
      return response.data;
    } catch (error) {
      console.error(`Update Medication Status error:`, error);
      throw error;
    }
  }

  /**
   * [GET] Lấy lịch uống thuốc theo chu kỳ và bước điều trị
   * @param {number} cycleId
   * @param {number} stepOrder
   */
  static async getSchedulesByCycleStep(cycleId, stepOrder) {
    try {
      const response = await ApiGateway.axiosInstance.get(
        `medicine/cycles/${cycleId}/steps/${stepOrder}/medicine-schedules`
      );
      return response.data;
    } catch (error) {
      console.error(`Get Schedules by Cycle and Step error:`, error);
      throw error;
    }
  }

  /**
   * [GET] Lấy lịch thuốc theo ngày, chu kỳ và bước điều trị
   * @param {number} cycleId
   * @param {number} stepOrder
   * @param {string} date
   */
  static async getSchedulesByDate(cycleId, stepOrder, date) {
    try {
      const response = await ApiGateway.axiosInstance.get(
        `medicine/cycles/${cycleId}/steps/${stepOrder}/medicine-schedules/by-date`,
        { params: { date } }
      );
      return response.data;
    } catch (error) {
      console.error(`Get Schedules by Date error:`, error);
      throw error;
    }
  }

  /**
   * [GET] Lấy lịch uống thuốc của bệnh nhân
   * @param {number} customerId
   */
  static async getMedicinesByCustomerId(customerId) {
    try {
      const response = await ApiGateway.axiosInstance.get(
        `medicine/customer/${customerId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Get Medicines by Customer ID error:`, error);
      throw error;
    }
  }

  /**
   * [GET] Lấy danh sách thuốc
   */
  static async getAllMedicines() {
    try {
      const response = await ApiGateway.axiosInstance.get(`medicine/all`);
      return response.data;
    } catch (error) {
      console.error(`Get All Medicines error:`, error);
      throw error;
    }
  }

  // ==================== Treatment Controller ====================

  static async getActiveTreatments() {
    try {
      const response = await ApiGateway.axiosInstance.get(
        `treatment-services/active`
      );
      return response.data.data;
    } catch (error) {
      console.error(`Get All Treatments error:`, error);
      throw error;
    }
  }

  static async getTreatmentById(treatmentId) {
    try {
      const response = await ApiGateway.axiosInstance.get(
        `treatment-services/id/${treatmentId}`
      );
      return response.data.data;
    } catch (error) {
      console.error(`Get Treatment by ID error:`, error);
      throw error;
    }
  }

  static async findTreatmentByName(treatmentName) {
    try {
      const response = await ApiGateway.axiosInstance.get(
        `treatment-services/name/${treatmentName}`
      );
      return response.data.data;
    } catch (error) {
      console.error(`Find Treatment by Name error:`, error);
      throw error;
    }
  }

  static async getTreatmentSteps(treatmentId) {
    try {
      const response = await ApiGateway.axiosInstance.get(
        `treatment-services/${treatmentId}/steps/all`
      );
      return response.data;
    } catch (error) {
      console.error(`Get All Steps of Treatment error:`, error);
      throw error;
    }
  }

  // ==================== Test Result Controller ====================

  /**
   * [POST] Tạo mới kết quả xét nghiệm
   * @param {object} dto
   */
  static async createTestResult(dto) {
    try {
      const reqDto = {
        appointmentId: parseInt(dto.appointmentId),
        name: dto.name,
        value: parseFloat(dto.value),
        unit: dto.unit,
        referenceRange: dto.referenceRange,
        testDate: dto.testDate,
        note: dto.note,
        cycleStepId: parseInt(dto.cycleStepId),
      }
      const response = await ApiGateway.axiosInstance.post(
        `test-results/create`,
        reqDto
      );
      return response.data;
    } catch (error) {
      console.error(`Create Test Result error:`, error);
      throw error;
    }
  }

  /**
   * [GET] Bệnh nhân xem kết quả xét nghiệm của mình
   */
  static async getMyTestResults() {
    try {
      const response = await ApiGateway.axiosInstance.get(
        `test-results/test-result/customer`
      );
      return response.data;
    } catch (error) {
      console.error(`Get My Test Results error:`, error);
      throw error;
    }
  }

  /**
   * [GET] Bệnh nhân xem kết quả xét nghiệm của mình
   */
  static async getCustomerTestResults(customerId) {
    try {
      const response = await ApiGateway.axiosInstance.get(
        `test-results/customer/${customerId}`
      );
      return response;
    } catch (error) {
      console.error(`Get My Test Results error:`, error);
      throw error;
    }
  }

  /**
   * [PUT] Cập nhật kết quả xét nghiệm
   * @param {number} id
   * @param {object} dto
   */
  static async updateTestResult(id, dto) {
    try {
      const rpDto = {
        name: dto.name,
        value: parseFloat(dto.value),
        unit: dto.unit,
        referenceRange: dto.referenceRange,
        note: dto.note,
        testDate: dto.testDate
      }
      const response = await ApiGateway.axiosInstance.put(
        `test-results/update/${id}`,
        dto
      );
      return response.data;
    } catch (error) {
      console.error(`Update Test Result error:`, error);
      throw error;
    }
  }
}