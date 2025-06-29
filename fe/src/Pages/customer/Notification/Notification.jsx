import { useState, useEffect } from "react";
import "./Notification.css";
import {
  Bell,
  Calendar,
  Pill,
  MessageCircle,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import ApiGateway from "@features/service/apiGateway";

const Notification = ({ userName = "Nguyễn Thị Hoa" }) => {
  const [filter, setFilter] = useState("all");
  const [paymentNotifications, setPaymentNotifications] = useState([]);

  const notifications = [
    {
      id: 1,
      type: "appointment",
      title: "Nhắc nhở cuộc hẹn",
      message:
        "Bạn có cuộc hẹn tư vấn theo dõi vào ngày mai lúc 10:30 với Bác sĩ Nguyễn Lan Anh",
      time: "2 giờ trước",
      isRead: false,
      priority: "high",
      date: "Thứ Tư, 22/05/2024",
    },
    {
      id: 2,
      type: "medication",
      title: "Nhắc uống thuốc",
      message:
        "Đã đến giờ uống Gonal-F 150 IU. Hãy tiêm theo đúng hướng dẫn của bác sĩ.",
      time: "30 phút trước",
      isRead: false,
      priority: "high",
      medication: "Gonal-F 150 IU",
    },
    {
      id: 3,
      type: "message",
      title: "Tin nhắn từ bác sĩ",
      message:
        'Bác sĩ Nguyễn Lan Anh: "Kết quả xét nghiệm của bạn đã có. Hãy đến khám vào thứ 6 để tư vấn chi tiết."',
      time: "1 giờ trước",
      isRead: true,
      priority: "medium",
      doctor: "Bác sĩ Nguyễn Lan Anh",
    },
    {
      id: 4,
      type: "result",
      title: "Kết quả xét nghiệm",
      message:
        "Kết quả xét nghiệm hormone AMH đã có. Vui lòng đăng nhập để xem chi tiết.",
      time: "3 giờ trước",
      isRead: true,
      priority: "medium",
      testType: "Xét nghiệm hormone AMH",
    },
    {
      id: 5,
      type: "medication",
      title: "Nhắc uống thuốc",
      message: "Đã đến giờ uống Duphaston 10mg. Uống 1 viên sau bữa tối.",
      time: "4 giờ trước",
      isRead: true,
      priority: "medium",
      medication: "Duphaston 10mg",
    },
    {
      id: 6,
      type: "system",
      title: "Cập nhật lịch điều trị",
      message:
        "Lịch điều trị IVF chu kỳ #2 của bạn đã được cập nhật. Vui lòng kiểm tra lại.",
      time: "1 ngày trước",
      isRead: true,
      priority: "low",
      cycle: "IVF Chu kỳ #2",
    },
    {
      id: 7,
      type: "appointment",
      title: "Xác nhận cuộc hẹn",
      message:
        "Cuộc hẹn siêu âm theo dõi ngày 24/05/2024 lúc 08:15 đã được xác nhận.",
      time: "2 ngày trước",
      isRead: true,
      priority: "low",
      date: "Thứ Sáu, 24/05/2024",
    },
  ];

  const getIcon = (type) => {
    switch (type) {
      case "appointment":
        return <Calendar size={24} />;
      case "medication":
        return <Pill size={24} />;
      case "message":
        return <MessageCircle size={24} />;
      case "result":
        return <CheckCircle size={24} />;
      case "system":
        return <AlertCircle size={24} />;
      default:
        return <Bell size={24} />;
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "high":
        return "high-priority";
      case "medium":
        return "medium-priority";
      case "low":
        return "low-priority";
      default:
        return "";
    }
  };

  const filteredNotifications =
    filter === "all"
      ? notifications
      : notifications.filter((notif) => notif.type === filter);

  const unreadCount = notifications.filter((notif) => !notif.isRead).length;

  const markAsRead = (id) => {
    // Logic to mark notification as read
    console.log("Marking notification as read:", id);
  };

  const markAllAsRead = () => {
    // Logic to mark all notifications as read
    console.log("Marking all notifications as read");
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
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
  }

  const cancelPayment = (paymentId) => {
    try {
      const response = ApiGateway.cancelPayment(paymentId);
      fetchPaymentNotifications();
    } catch (error) {
      console.error("Error canceling payment:", error);
      alert("Có lỗi xảy ra khi hủy thanh toán. Vui lòng thử lại.");
    }
  }

  useEffect(() => {
    fetchPaymentNotifications();
    
    console.log("Fetching payment notifications...");

    const interval = setInterval(() => {
      fetchPaymentNotifications();
    }, 60000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="notification-page">
      <div className="notification-container">
        <div className="page-title-actions">
          <h3>Thông báo</h3>
          <div className="filter-buttons">
            <button
              className={`filter-btn ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              Tất cả
            </button>
            <button
              className={`filter-btn ${
                filter === "appointment" ? "active" : ""
              }`}
              onClick={() => setFilter("appointment")}
            >
              Lịch hẹn
            </button>
            <button
              className={`filter-btn ${
                filter === "medication" ? "active" : ""
              }`}
              onClick={() => setFilter("medication")}
            >
              Thuốc
            </button>
            <button
              className={`filter-btn ${filter === "message" ? "active" : ""}`}
              onClick={() => setFilter("message")}
            >
              Tin nhắn
            </button>
          </div>
        </div>

        <div className="subtitle">
          <p>Hiển thị {filteredNotifications.length} thông báo</p>
        </div>

        <section className="notification-section">
          <div className="notifications-list">
            {paymentNotifications.length > 0 && (
              <>
                <h4>Xác nhận thanh toán</h4>
                {paymentNotifications.map((payment) => (
                  <PaymentNotification
                    key={payment.id}
                    payment={payment}
                    markAsRead={markAsRead}
                    getIcon={getIcon}
                    formatDatetimeWithWeekday={formatDatetimeWithWeekday}
                    formatCurrency={formatCurrency}
                    cancelPayment={cancelPayment}
                  />
                ))}
              </>
            )}

            <h4>Nhắc nhở</h4>
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`notification-card ${
                  notification.type
                } ${getPriorityClass(notification.priority)} ${
                  !notification.isRead ? "unread" : "read"
                }`}
                onClick={() =>
                  !notification.isRead && markAsRead(notification.id)
                }
              >
                <div className={`notification-icon ${notification.type}-icon`}>
                  {getIcon(notification.type)}
                </div>

                <div className="notification-info">
                  <div className="notification-header">
                    <h5>{notification.title}</h5>
                    <span className="notification-time">
                      {notification.time}
                    </span>
                  </div>
                  <p className="notification-message">{notification.message}</p>

                  {notification.doctor && (
                    <p className="notification-meta doctor-name">
                      {notification.doctor}
                    </p>
                  )}
                  {notification.medication && (
                    <p className="notification-meta medication-name">
                      Thuốc: {notification.medication}
                    </p>
                  )}
                  {notification.testType && (
                    <p className="notification-meta test-type">
                      {notification.testType}
                    </p>
                  )}
                  {notification.cycle && (
                    <p className="notification-meta cycle-info">
                      {notification.cycle}
                    </p>
                  )}
                  {notification.date && (
                    <p className="notification-meta appointment-date">
                      {notification.date}
                    </p>
                  )}
                </div>

                <div className="notification-actions">
                  {notification.type === "appointment" && (
                    <button className="action-btn primary">Xem chi tiết</button>
                  )}
                  {notification.type === "medication" && (
                    <button className="action-btn secondary">Đã uống</button>
                  )}
                  {notification.type === "message" && (
                    <button className="action-btn primary">Trả lời</button>
                  )}
                  {notification.type === "result" && (
                    <button className="action-btn primary">Xem kết quả</button>
                  )}
                  {notification.type === "system" && (
                    <button className="action-btn secondary">Xem</button>
                  )}
                </div>

                {!notification.isRead && (
                  <div className="unread-indicator"></div>
                )}
              </div>
            ))}
          </div>
        </section>

        {filteredNotifications.length === 0 && (
          <div className="empty-state">
            <Bell size={48} />
            <h4>Không có thông báo</h4>
            <p>Bạn đã xem hết tất cả thông báo</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;

const PaymentNotification = ({ payment, markAsRead, getIcon, formatDatetimeWithWeekday, formatCurrency, cancelPayment }) => {
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
      onClick={() => markAsRead(payment.id)}
    >
      <div className="notification-icon payment-icon">
        {getIcon("appointment")}
      </div>

      <div className="notification-info">
        <div className="notification-header">
          <p>
             đã đặt lịch khám vào lúc{" "}
            <strong>{formatDatetimeWithWeekday(payment?.appointmentDate)}</strong>.
          </p>
          <span className="notification-time">
            {payment.time}
          </span>
        </div>
        <p className="notification-message">
          Vui lòng hoàn tất thanh toán để xác nhận lịch khám.
        </p>
        <p className="notification-meta payment-amount">
          <span style={{color: "#d6004c"}}>Bác sĩ {payment?.doctorName}</span>
          {" "}-{" "} 
          <span style={{color: "#388e3c"}}>Số tiền: {formatCurrency(payment.total)}</span>
          {" "}-{" "}
          <span style={{color: "#f57c00"}}>{payment?.serviceName}</span>
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
