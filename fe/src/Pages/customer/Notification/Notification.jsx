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

const Notification = ({ userName = "Nguyễn Thị Hoa" }) => {
  const [filter, setFilter] = useState("all");

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