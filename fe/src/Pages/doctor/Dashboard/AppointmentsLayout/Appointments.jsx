import React, { useState, useEffect } from "react";
import apiAppointment from "../../../../features/service/apiAppointment";
import apiMessage from "../../../../features/service/apiMessage";
import "./Appointments.css";
import { useNavigate } from "react-router-dom";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState("all");
  const [filterTime, setFilterTime] = useState("all");
  const [showMessagePopup, setShowMessagePopup] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  const filterAppointments = () => {
    const today = new Date("2025-07-19T08:05:00+07:00"); // Thời gian hiện tại
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Monday
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Sunday

    return appointments
      .filter((item) => {
        const itemDate = new Date(item.date);

        // Loại bỏ các cuộc hẹn có status "canceled" khỏi tất cả các loại
        if (item.status === "canceled") return false;

        // Filter theo loại điều trị
        if (filterType === "tu_van" && item.type !== "tu_van") return false;
        if (filterType === "tai_kham" && item.type === "tu_van") return false;
        if (filterType === "khac" && item.status === "confirmed") return false; // Chỉ loại bỏ confirmed trong "Khác"

        // Loại bỏ "done" khỏi "Tất cả loại", "Tư vấn", và "Tái khám"
        if (
          ["all", "tu_van", "tai_kham"].includes(filterType) &&
          item.status === "done"
        )
          return false;

        // Filter theo thời gian
        if (filterTime === "today") {
          return itemDate.toDateString() === today.toDateString();
        }
        if (filterTime === "tomorrow") {
          const tomorrow = new Date(today);
          tomorrow.setDate(today.getDate() + 1);
          return itemDate.toDateString() === tomorrow.toDateString();
        }
        if (filterTime === "week") {
          return itemDate >= startOfWeek && itemDate <= endOfWeek;
        }

        return true;
      })
      .sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.startTime}`);
        const dateB = new Date(`${b.date}T${b.startTime}`);
        return dateB - dateA; // Sắp xếp mới nhất lên đầu
      });
  };

  const renderActionButton = (status, isDoneSection, appointmentId) => {
    if (isDoneSection) {
      // Đã hoàn thành: đổi "Chưa mở" thành "Chi tiết", vẫn để màu xám, nhưng không bị disabled
      return (
        <button
          className="btn btn-grey text-gray-600 border border-gray-300 px-3 py-1 rounded hover:bg-gray-100"
          onClick={() => handleViewDetail(appointmentId)} // mở popup chi tiết
        >
          Chi tiết
        </button>
      );
    }

    // Các trạng thái khác như đang xử lý, chưa đến,... vẫn giữ nguyên xử lý cũ
    switch (status) {
      case "new":
        return (
          <button
            className="btn btn-green"
            onClick={() => handleStart(appointmentId)}
          >
            Bắt đầu
          </button>
        );
      case "processing":
        return (
          <button
            className="btn btn-yellow"
            onClick={() => handleContinue(appointmentId)}
          >
            Tiếp tục
          </button>
        );
      default:
        return (
          <button className="btn btn-disabled text-gray-400 bg-gray-100 cursor-not-allowed">
            Không khả dụng
          </button>
        );
    }
  };

  const handleSendMessage = async () => {
    try {
      if (!messageContent.trim()) {
        alert("Vui lòng nhập nội dung tin nhắn.");
        return;
      }

      if (!selectedCustomerId) {
        alert("Không tìm thấy thông tin bệnh nhân.");
        return;
      }

      const payload = {
        receiverId: selectedCustomerId,
        message: messageContent,
      };

      await apiMessage.sendMessage(payload);
      alert("Gửi tin nhắn thành công!");
      setMessageContent("");
      setShowMessagePopup(false);
      setSelectedCustomerId(null);
    } catch (err) {
      console.error("Lỗi khi gửi tin nhắn:", err);
      alert("Không thể gửi tin nhắn.");
    }
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await apiAppointment.getAllAppointments();
        console.log("Appointments data:", data); // Thêm log để kiểm tra dữ liệu
        setAppointments(data);
      } catch (err) {
        console.error("Lỗi khi gọi API lịch hẹn:", err);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="schedule-container">
      <div className="schedule-header">
        <div>
          <h2>Lịch hẹn</h2>
          <p>Quản lý tất cả các cuộc hẹn của bạn</p>
        </div>
        <div className="schedule-actions">
          <select
            onChange={(e) => setFilterTime(e.target.value)}
            value={filterTime}
          >
            <option value="all">Tất cả thời gian</option>
            <option value="today">Hôm nay</option>
            <option value="tomorrow">Ngày mai</option>
            <option value="week">Tuần này</option>
          </select>
          <select
            onChange={(e) => setFilterType(e.target.value)}
            value={filterType}
          >
            <option value="all">Tất cả loại</option>
            <option value="tu_van">Tư vấn</option>
            <option value="tai_kham">Tái khám</option>
            <option value="khac">Đã hoàn thành</option>
          </select>
        </div>
      </div>

      {showMessagePopup && (
        <div className="schedule-popup">
          <div className="schedule-popup-content">
            <h3>Gửi tin nhắn</h3>
            <p>Nhập tin nhắn cho bệnh nhân</p>
            <div className="form-group">
              <textarea
                className="form-textarea"
                rows={4}
                placeholder="Nhập nội dung tin nhắn..."
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
              />
            </div>
            <div className="button-group">
              <button className="btn btn-primary" onClick={handleSendMessage}>
                Gửi
              </button>
              <button
                className="btn btn-outline"
                onClick={() => {
                  setShowMessagePopup(false);
                  setMessageContent("");
                  setSelectedCustomerId(null);
                }}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      <table className="schedule-table">
        <thead>
          <tr>
            <th>Bệnh nhân</th>
            <th>Tuổi</th>
            <th>Thời gian</th>
            <th>Loại điều trị</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filterAppointments().map((item, index) => (
            <tr key={item.appointmentId}>
              <td>
                <div className="patient-info">
                  <div>
                    <div className="patient-name">{item.customerName}</div>
                    <span className="patient-id">ID: {item.appointmentId}</span>
                  </div>
                </div>
              </td>
              <td>
                <span className="patient-age">{item.customerAge}</span>
              </td>
              <td>
                <div className="time-info">
                  <div>{item.startTime?.slice(0, 5)}</div>
                  <div className="date">
                    {new Date(item.date).toLocaleDateString("vi-VN")}
                  </div>
                </div>
              </td>
              <td>
                <span
                  className={`treatment-badge ${
                    item.type === "tu_van" ? "consultation" : ""
                  }`}
                >
                  {item.type === "tu_van" ? "Tư vấn" : "Tái khám"}
                </span>
              </td>
              <td>
                <div className="actions">
                  {item.status === "confirmed" ? (
                    <>
                      <button
                        className="btn btn-start"
                        onClick={() =>
                          navigate(
                            item.type === "tu_van"
                              ? `/doctor-dashboard/appointments/tu_van/${item.appointmentId}/${item.customerId}`
                              : `/doctor-dashboard/appointments/dieu_tri/${item.appointmentId}/${item.customerId}`,
                            { state: { appointmentId: item.appointmentId } }
                          )
                        }
                      >
                        Bắt đầu
                      </button>
                      <button
                        className="btn btn-message"
                        onClick={() => {
                          setSelectedCustomerId(item.customerId);
                          setShowMessagePopup(true);
                        }}
                      >
                        Nhắn tin
                      </button>
                    </>
                  ) : item.status === "done" ? (
                    <>
                      <button
                        className="btn btn-not-ready"
                        onClick={() =>
                          navigate(
                            item.type === "tu_van"
                              ? `/doctor-dashboard/appointments/tu_van/${item.appointmentId}/${item.customerId}`
                              : `/doctor-dashboard/appointments/dieu_tri/${item.appointmentId}/${item.customerId}`,
                            { state: { appointmentId: item.appointmentId } }
                          )
                        }
                      >
                        Chi tiết
                      </button>
                      <button
                        className="btn btn-message"
                        onClick={() => {
                          setSelectedCustomerId(item.customerId);
                          setShowMessagePopup(true);
                        }}
                      >
                        Nhắn tin
                      </button>
                    </>
                  ) : (
                    <>
                      <a href="#" className="btn btn-not-ready no-underline">
                        Chưa mở
                      </a>
                      <button
                        className="btn btn-message"
                        onClick={() => {
                          setSelectedCustomerId(item.customerId);
                          setShowMessagePopup(true);
                        }}
                      >
                        Nhắn tin
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}
