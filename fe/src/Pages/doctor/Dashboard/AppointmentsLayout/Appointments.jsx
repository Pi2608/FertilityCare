import React, { useEffect, useState } from "react";
import ApiGateway from "@features/service/apiGateway";
import { X, Plus } from 'lucide-react';
import "./Appointments.css";

const scheduleData = [
  {
    id: "PT-2024-0123",
    name: "Nguyễn Thị Hoa",
    age: 34,
    time: "09:00 - 09:30",
    date: "20/05/2024",
    treatmentType: "IVF chu kỳ 2",
    treatmentStage: "Kích trứng",
    status: "ready",
  },
  {
    id: "PT-2024-0145",
    name: "Trần Văn Linh",
    age: 28,
    time: "10:30 - 11:15",
    date: "20/05/2024",
    treatmentType: "Tư vấn",
    treatmentStage: "Kích trứng",
    status: "not_ready",
  },
  {
    id: "PT-2024-0098",
    name: "Phạm Thị Mai",
    age: 31,
    time: "13:15 - 13:45",
    date: "20/05/2024",
    treatmentType: "IUI chu kỳ cuối",
    treatmentStage: "Kích trứng",
    status: "not_ready",
  },
  {
    id: "PT-2024-0112",
    name: "Lê Thị Hương",
    age: 29,
    time: "14:30 - 15:00",
    date: "20/05/2024",
    treatmentType: "Tư vấn",
    treatmentStage: "Kích trứng",
    status: "not_ready",
  },
];

export default function Appointments() {

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  
  useEffect(() => {
    fetchAppointments();
  }, []);
  
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      // const response = await <Api>.getAppointments();
      setAppointments(response.data);
    } catch (err) {
      setError("Không thể tải lịch hẹn. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  }

  const handleAddPayment = async (paymentData) => {
    try {      
      const result = await ApiGateway.createPayment(paymentData);
      console.log('Payment created:', result);
      setIsPaymentModalOpen(false);
    } catch (error) {
      console.error('Error creating payment:', error);
    }
  };

  return (
    <div className="schedule-container">
      {/* PHẦN 2: DANH SÁCH LỊCH HẸN */}
      <div className="schedule-header">
        <div>
          <h2>Lịch hẹn</h2>
          <p>Quản lý tất cả các cuộc hẹn của bạn</p>
        </div>
        <div className="schedule-actions">
          <input type="text" placeholder="Tìm kiếm bệnh nhân..." />
          <select>
            <option>Hôm nay</option>
            <option>Ngày mai</option>
            <option>Tuần này</option>
          </select>
        </div>
      </div>


      <table className="schedule-table">
        <thead>
          <tr>
            <th>Bệnh nhân</th>
            <th>Tuổi</th>
            <th>Thời gian</th>
            <th>Loại điều trị</th>
            <th>Giai đoạn điều trị</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {scheduleData.map((item, index) => (
            <tr key={index}>
              <td>
                <div className="patient-info">
                  <div>
                    <div className="patient-name">{item.name}</div>
                    <span className="patient-id">ID: {item.id}</span>
                  </div>
                </div>
              </td>
              <td>
                <span className="patient-age">{item.age}</span>
              </td>
              <td>
                <div className="time-info">
                  <div>{item.time}</div>
                  <div className="date">{item.date}</div>
                </div>
              </td>
              <td>
                <span className={`treatment-badge ${item.treatmentType === "Tư vấn" ? "consultation" : ""}`}>
                  {item.treatmentType}
                </span>
              </td>
              <td>
                <span className="treatment-stage">{item.treatmentStage}</span>
              </td>
              <td>
                <div className="actions">
                  {item.status === "ready" ? (
                    <>
                      <button className="btn btn-medical" onClick={() => setIsPaymentModalOpen(true)}>Mở Lịch Khám</button>
                      <a href="/doctor-dashboard/appointments/session" className="btn btn-start no-underline">Bắt đầu</a>
                      <a href="" className="btn btn-message no-underline">Nhắn tin</a>
                    </>
                  ) : (
                    <>
                      <a href="" className="btn btn-not-ready no-underline">Chưa mở</a>
                      <a href="" className="btn btn-message no-underline">Nhắn tin</a>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      <div className="pagination">
        <button>Trước</button>
        <span>Trang 1 / 3</span>
        <button>Tiếp</button>
      </div>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onSubmit={handleAddPayment}
      />
    </div>
  );
}

const PaymentModal = ({ isOpen, onClose, onSubmit }) => {
  const today = new Date();

  const [paymentForm, setPaymentForm] = useState({
    customerId: "",
    serviceId: "",
    appointmentDate: "",
    note: "",
    total: 0,
    type: "",
  });

  // Mock data - replace with actual API calls later
  const [services, setServices] = useState([
    { id: 1, name: "IUI", price: 5000000 },
    { id: 2, name: "IVF", price: 70000000 },
  ]);

  const typeOptions = [
    { value: "test", label: "Test" },
    { value: "treatment", label: "Điều trị" },
  ];

  useEffect(() => {
    if (paymentForm.serviceId) {
      const selectedService = services.find(service => service.id.toString() === paymentForm.serviceId);
      if (selectedService) {
        setPaymentForm(prev => ({ ...prev, total: selectedService.price }));
      }
    } else {
      setPaymentForm(prev => ({ ...prev, total: 0 }));
    }
  }, [paymentForm.serviceId, services]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    onSubmit(paymentForm);
  };

  const resetForm = () => {
    setPaymentForm({
      customerId: "",
      serviceId: "",
      appointmentDate: "",
      note: "",
      total: 0,
      type: "",
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const isFormValid = paymentForm.serviceId && paymentForm.appointmentDate && paymentForm.type;

  if (!isOpen) return null;

  return (
    <>
      <div className="payment-modal-overlay" onClick={(e) => e.target === e.currentTarget && handleClose()}>
        <div className="modal-container">
          {/* Modal Header */}
          <div className="modal-header">
            <h2 className="modal-title">
              Lịch khám mới
            </h2>
            <button className="close-btn" onClick={handleClose}>
              <X className="icon"/>
            </button>
          </div>

          <div className="modal-body">
            <input
              type="hidden"
              name="customerId"
              value={paymentForm.customerId}
              onChange={handleInputChange}
            />

            <div className="form-group">
              <label className="form-label required">Phương pháp</label>
              <select
                className="form-select"
                name="serviceId"
                value={paymentForm.serviceId}
                onChange={handleInputChange}
                required
              >
                <option value="">Chọn phương pháp</option>
                {services.map(service => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Appointment Date */}
            <div className="form-group">
              <label className="form-label required">Ngày & Giờ khám</label>
              <input
                type="datetime-local"
                className="form-input"
                name="appointmentDate"
                value={paymentForm.appointmentDate}
                min={today.toISOString().slice(0, 16)}
                step={3600}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Type */}
            <div className="form-group">
              <label className="form-label required">Loại</label>
              <select
                className="form-select"
                name="type"
                value={paymentForm.type}
                onChange={handleInputChange}
                required
              >
                <option value="">Chọn loại khám</option>
                {typeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Note */}
            <div className="form-group">
              <label className="form-label">Ghi chú</label>
              <textarea
                className="form-textarea"
                name="note"
                rows={3}
                value={paymentForm.note}
                onChange={handleInputChange}
                placeholder="Enter any additional notes..."
              />
            </div>

            {/* Total */}
            <div className="form-group">
              <label className="form-label">Tổng số tiền</label>
              <input
                type="text"
                className="form-input"
                value={formatCurrency(paymentForm.total)}
                disabled
              />
            </div>

            {/* Buttons */}
            <div className="button-group">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={!isFormValid}
              >
                Tạo lịch hẹn
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};