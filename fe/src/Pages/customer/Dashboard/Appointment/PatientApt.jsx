import { useEffect, useState, React } from "react";
import "./PatientApt.css";
import { Calendar as CalendarIcon, Clock as ClockIcon } from "lucide-react";
import apiAppointment from "../../../../features/service/apiAppointment";
import ApiGateway from "@features/service/apiGateway";
import apiFeedback from "@features/service/apiFeedback";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import { FaStar } from "react-icons/fa";


const PatientApt = ({ userName = "Nguyễn Thị Hoa" }) => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [paymentNotifications, setPaymentNotifications] = useState([]);
  const [myFeedbacks, setMyFeedbacks] = useState([]);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState({ id: null, name: "" });
  const [feedbackData, setFeedbackData] = useState({ rating: 0, comment: "" });

  const handleOpenFeedbackForm = (doctorId, doctorName) => {
    setSelectedDoctor({ id: doctorId, name: doctorName });
    setShowFeedbackForm(true);
  };

  const handleSubmitFeedback = async () => {
    try {
      await apiFeedback.createFeedback({
        doctorId: selectedDoctor.id,
        rating: feedbackData.rating,
        comment: feedbackData.comment,
      });

      alert("Gửi đánh giá thành công");
      setShowFeedbackForm(false);
      fetchMyFeedbacks(); // reload để ẩn nút
    } catch (error) {
      console.error("Lỗi gửi đánh giá:", error);
      alert("Gửi đánh giá thất bại.");
    }
  };

  const fetchMyFeedbacks = async () => {
    try {
      const feedbacks = await apiFeedback.getMyFeedbacks();
      setMyFeedbacks(Array.isArray(feedbacks) ? feedbacks : []);
    } catch (err) {
      console.error("Lỗi khi lấy feedbacks:", err);
      setMyFeedbacks([]); // fallback an toàn
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchPaymentNotifications();
    fetchMyFeedbacks();

    const interval = setInterval(() => {
      fetchPaymentNotifications();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDatetimeWithWeekday = (isoString) => {
    const date = new Date(isoString);

    const weekday = date.toLocaleDateString("vi-VN", { weekday: "long" }); // ví dụ: "Thứ Hai"
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${weekday}, ${hours}:${minutes} ${day}/${month}/${year}`;
  };

  const fetchPaymentNotifications = async () => {
    try {
      const response = await ApiGateway.getPendingPaymentsByCustomerId();
      setPaymentNotifications(response || []);
      console.log("Payment notifications fetched:", response);
    } catch (error) {
      console.error("Error fetching payment notifications:", error);
    }
  };

  const cancelPayment = (paymentId) => {
    try {
      const response = ApiGateway.cancelPayment(paymentId);
      fetchPaymentNotifications();
    } catch (error) {
      console.error("Error canceling payment:", error);
      alert("Có lỗi xảy ra khi hủy thanh toán. Vui lòng thử lại.");
    }
  };

  const fetchAppointments = async () => {
    try {
      const data = await apiAppointment.getAllAppointments();
  
      // Sort theo ngày và giờ giảm dần (mới nhất trước)
      const sorted = data.sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.startTime}`);
        const dateB = new Date(`${b.date}T${b.startTime}`);
        return dateB - dateA;
      });
  
      setAppointments(sorted);
    } catch (error) {
      console.error("Lỗi khi lấy lịch hẹn:", error);
    }
  };
  

  const cancelAppointment = async (appointmentId) => {
    const isConfirmed = window.confirm(
      "Bạn có chắc chắn muốn hủy cuộc hẹn này không?"
    );
    if (!isConfirmed) return;

    try {
      await apiAppointment.cancelAppointmentById(appointmentId);
      alert("Hủy cuộc hẹn thành công.");
      fetchAppointments(); // load lại danh sách sau khi hủy
    } catch (error) {
      console.error("Lỗi khi hủy cuộc hẹn:", error);
      alert("Hủy cuộc hẹn thất bại. Vui lòng thử lại.");
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchPaymentNotifications();

    console.log("Fetching payment notifications...");

    const interval = setInterval(() => {
      fetchPaymentNotifications();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const now = new Date();

  const completedAppointments = appointments.filter(
    (appt) => appt.status === "done"
  );

  const upcomingAppointments = appointments.filter(
    (appt) => appt.status === "confirmed"
  );

  const feedbackedDoctorIds = new Set(myFeedbacks.map((fb) => fb.doctorId));

  const completedAppointmentsFiltered = completedAppointments.filter((appt) => {
    return !feedbackedDoctorIds.has(appt.doctorId);
  });

  const displayedDoctors = new Set();

  return (
    <div className="appointment-page">
      <div className="welcome-section"></div>

      <div className="apt-container">
        <div className="page-title-actions">
          <h3>Lịch hẹn của tôi</h3>
        </div>
        <div className="subtitle">
          <p>Quản lý tất cả các cuộc hẹn sắp tới và đã qua</p>
        </div>

        <section className="patient-apt-section">
          {paymentNotifications.length > 0 && (
            <>
              <h4>Xác nhận thanh toán</h4>
              {paymentNotifications.map((payment) => (
                <PaymentNotification
                  key={payment.id}
                  payment={payment}
                  formatDatetimeWithWeekday={formatDatetimeWithWeekday}
                  formatCurrency={formatCurrency}
                  cancelPayment={cancelPayment}
                />
              ))}
            </>
          )}
          <h4 style={{ marginTop: "1rem" }}>Sắp tới</h4>
          <div className="appointments-list">
            {upcomingAppointments.map((appt) => (
              <div
                key={appt.appointmentId}
                className="appointment-card upcoming"
              >
                <div className="appointment-icon">
                  <CalendarIcon size={24} />
                </div>
                <div className="appointment-info">
                  <h5>{appt.type === "tu_van" ? "Tư vấn" : "Điều trị"}</h5>
                  <p>
                    {new Date(appt.date).toLocaleDateString("vi-VN")} -{" "}
                    {appt.startTime.slice(0, 5)}
                  </p>
                  <p className="doctor-name">Bác sĩ {appt.doctorName}</p>
                </div>
                <div className="appointment-actions">
                  {appt.type === "tu_van" && appt.status === "confirmed" ? (
                    <button
                      className="secondary-btn"
                      onClick={() => cancelAppointment(appt.appointmentId)}
                    >
                      Hủy cuộc hẹn
                    </button>
                  ) : (
                    <button className="secondary-btn" disabled>
                      Hủy cuộc hẹn
                    </button>
                  )}
                  <button
                    className="primary-btn"
                    onClick={() =>
                      navigate(
                        appt.type === "tu_van"
                          ? `/patient-dashboard/appointments/tu_van/${appt.appointmentId}/${appt.customerId}`
                          : `/patient-dashboard/appointments/dieu_tri/${appt.appointmentId}/${appt.customerId}`,
                        { state: { appointmentId: appt.appointmentId } }
                      )
                    }
                  >
                    Chi tiết
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="patient-apt-section">
          <h4>Đã hoàn thành</h4>
          <div className="appointments-list">
            {completedAppointmentsFiltered.map((appt) => {
              const alreadyDisplayed = displayedDoctors.has(appt.doctorId);
              const showFeedbackButton = !alreadyDisplayed;

              if (showFeedbackButton) {
                displayedDoctors.add(appt.doctorId);
              }

              return (
                <div
                  key={appt.appointmentId}
                  className="appointment-card completed"
                >
                  <div className="appointment-icon completed-icon">
                    <CalendarIcon size={24} />
                  </div>
                  <div className="appointment-info">
                    <h5>{appt.type === "tu_van" ? "Tư vấn" : "Điều trị"}</h5>
                    <p>
                      {new Date(appt.date).toLocaleDateString("vi-VN")} -{" "}
                      {appt.startTime.slice(0, 5)}
                    </p>
                    <p className="doctor-name">Bác sĩ {appt.doctorName}</p>
                  </div>
                  <div className="appointment-actions">
                    <button
                      className="btn-outline"
                      onClick={() =>
                        navigate(
                          appt.type === "tu_van"
                            ? `/patient-dashboard/appointments/tu_van/${appt.appointmentId}/${appt.customerId}`
                            : `/patient-dashboard/appointments/dieu_tri/${appt.appointmentId}/${appt.customerId}`,
                          { state: { appointmentId: appt.appointmentId } }
                        )
                      }
                    >
                      Xem chi tiết
                    </button>
                    {showFeedbackButton && (
                      <button
                        className="btn-primary"
                        onClick={() =>
                          handleOpenFeedbackForm(appt.doctorId, appt.doctorName)
                        }
                      >
                        Gửi đánh giá
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {showFeedbackForm && (
        <div className="feedback-form-overlay">
          <div className="feedback-form">
            <h3>Đánh giá bác sĩ {selectedDoctor.name}</h3>

            <label>Chấm điểm:</label>
            <div
              style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={24}
                  onClick={() =>
                    setFeedbackData({ ...feedbackData, rating: star })
                  }
                  style={{
                    cursor: "pointer",
                    color: star <= feedbackData.rating ? "#FFD700" : "#ccc",
                    transition: "color 0.2s",
                  }}
                />
              ))}
            </div>

            <label>Nhận xét:</label>
            <textarea
              value={feedbackData.comment}
              onChange={(e) =>
                setFeedbackData({ ...feedbackData, comment: e.target.value })
              }
              placeholder="Nhập đánh giá của bạn..."
            />

            <div className="feedback-form-actions">
              <button
                className="btn-outline"
                onClick={() => setShowFeedbackForm(false)}
              >
                Hủy
              </button>
              <button className="btn-primary" onClick={handleSubmitFeedback}>
                Gửi đánh giá
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientApt;

const PaymentNotification = ({
  payment,
  formatDatetimeWithWeekday,
  formatCurrency,
  cancelPayment,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const confirmPayment = async (paymentId) => {
    try {
      setIsLoading(true);
      const response = await ApiGateway.createVNPayUrl(paymentId);

      if (response) {
        window.location.href = response;
      } else {
        console.error("Không nhận được URL thanh toán từ server", response);
        alert("Có lỗi xảy ra khi tạo liên kết thanh toán. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Error confirming payment:", error);
      alert("Có lỗi xảy ra khi xác nhận thanh toán. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmClick = (e) => {
    e.stopPropagation();
    confirmPayment(payment.paymentId);
  };

  const handleCancelClick = (e) => {
    e.stopPropagation();
    cancelPayment(payment.paymentId);
  };

  return (
    <div
      key={payment.id}
      className={`notification-card payment ${
        !payment.isRead ? "unread" : "read"
      }`}
      // onClick={() => markAsRead(payment.id)}
    >
      <div className="notification-icon payment-icon">
        <CalendarIcon size={24} />
      </div>

      <div className="notification-info">
        <div className="notification-header">
          <p>
            Bác sĩ <strong>{payment?.doctorName}</strong> đã đặt lịch khám vào lúc{" "}
            <strong>
              {formatDatetimeWithWeekday(payment?.appointmentDate)}
            </strong>
            .
          </p>
          <span className="notification-time">{payment.time}</span>
        </div>
        <p className="notification-message">
          Vui lòng hoàn tất thanh toán để xác nhận lịch khám.
        </p>
        <p className="notification-meta payment-amount">
          <span className="doctor-name">Bác sĩ {payment?.doctorName}</span> -{" "}
          <span className="payment-total">
            Số tiền: {formatCurrency(payment.total)}
          </span>{" "}
          -{" "}
          <span className="medication-name" style={{ fontSize: "0.75rem" }}>
            {payment?.serviceName}
          </span>
        </p>
      </div>

      <div className="notification-actions">
        <button
          className="action-btn secondary"
          onClick={handleCancelClick}
          disabled={isLoading}
        >
          Hủy
        </button>
        <button
          className="action-btn primary"
          onClick={handleConfirmClick}
          disabled={isLoading}
        >
          {isLoading ? "Đang xử lý..." : "Xác nhận"}
        </button>
      </div>
    </div>
  );
};
