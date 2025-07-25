import React, { useEffect, useState } from "react";
import apiAppointment from "@features/service/apiAppointment";
import apiMessage from "../../../../features/service/apiMessage";
import "./Patients.css";
import { useNavigate } from "react-router-dom";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [allAppointmentPatients, setAllAppointmentPatients] = useState([]);
  const [allCyclePatients, setAllCyclePatients] = useState([]);
  const [filterType, setFilterType] = useState("all"); // 'all' | 'tu_van' | 'cycle'
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [customerAppointments, setCustomerAppointments] = useState([]);
  const [selectedCustomerName, setSelectedCustomerName] = useState("");
  const [showMessagePopup, setShowMessagePopup] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const appointments = await apiAppointment.getAllAppointments();
        const cyclesRes = await apiAppointment.getAllCyclesOfDoctor();
        const cycles = cyclesRes.data || [];

        // 👉 Đếm số lượng lịch hẹn của mỗi khách hàng
        const appointmentCountMap = appointments.reduce((acc, cur) => {
          const customerId = cur.customerId;
          acc[customerId] = (acc[customerId] || 0) + 1;
          return acc;
        }, {});

        // 👉 Danh sách bệnh nhân từ lịch tư vấn
        const appointmentPatients = Object.values(
          appointments
            .filter((item) => item.type === "tu_van")
            .reduce((acc, item) => {
              const key = item.customerId;
              const current = acc[key];
              if (!current || new Date(item.date) > new Date(current.date)) {
                acc[key] = item;
              }
              return acc;
            }, {})
        ).map((item) => ({
          id: `APT-${item.appointmentId}`,
          name: item.customerName,
          age: item.customerAge,
          totalAppointments: appointmentCountMap[item.customerId] || 1,
          customerId: item.customerId,
        }));

        setPatients(appointmentPatients);
        setAllAppointmentPatients(appointmentPatients); // Cập nhật state phụ trợ
      } catch (err) {
        console.error("Lỗi khi fetch dữ liệu:", err);
      }
    };

    fetchData();
  }, []);

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

  const handleOpenProfile = async (customerId) => {
    try {
      const allAppointments = await apiAppointment.getAllAppointments();
      const filtered = allAppointments.filter(
        (a) => a.customerId === customerId
      );
      const name = filtered[0]?.customerName || "Không rõ";
      setSelectedCustomerName(name);
      setCustomerAppointments(filtered);
      setSelectedCustomerId(customerId);
      setShowModal(true);
    } catch (error) {
      console.error("Lỗi khi lấy lịch hẹn:", error);
    }
  };

  const shortenText = (text, max = 40) => {
    return text.length > max ? text.substring(0, max) + "..." : text;
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterType(value);

    if (value === "tu_van") {
      setPatients(allAppointmentPatients);
    } else if (value === "cycle") {
      setPatients(allCyclePatients);
    } else {
      setPatients([...allAppointmentPatients, ...allCyclePatients]);
    }
  };

  return (
    <div className="patients-container">
      <div className="patients-header">
        <div>
          <h2>Danh sách bệnh nhân</h2>
          <p>Quản lý tất cả bệnh nhân của bạn</p>
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

      <table className="patients-table">
        <thead>
          <tr>
            <th>Bệnh nhân</th>
            <th>Tuổi</th>
            <th>Tổng lịch hẹn</th>
            <th>Hành động</th>
          </tr>
        </thead>

        <tbody>
          {patients.map((p, i) => (
            <tr key={i}>
              <td>
                <div className="patient-info">
                  <div>
                    <div className="patient-name">{p.name}</div>
                  </div>
                </div>
              </td>
              <td>{p.age}</td>
              <td>{p.totalAppointments}</td>
              <td>
                <div className="actions">
                  <button
                    className="btn btn-start"
                    onClick={() => handleOpenProfile(p.customerId)}
                  >
                    Hồ sơ
                  </button>

                  <button
                        className="btn btn-message"
                        onClick={() => {
                          setSelectedCustomerId(p.customerId);
                          setShowMessagePopup(true);
                        }}
                      >
                        Nhắn tin
                      </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content enhanced">
            <div className="modal-header">
              <h2>Lịch hẹn của bệnh nhân {selectedCustomerName}</h2>

              <button className="close-btn" onClick={() => setShowModal(false)}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <table className="modal-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Ngày</th>
                    <th>Giờ</th>
                    <th>Loại</th>
                    <th>Trạng thái</th>
                    <th>Ghi chú</th>
                  </tr>
                </thead>
                <tbody>
                  {customerAppointments.map((item) => (
                    <tr key={item.appointmentId}>
                      <td>{item.appointmentId}</td> {/* ✅ Hiển thị ID */}
                      <td>{item.date}</td>
                      <td>{item.startTime}</td>
                      <td>
                        {item.type === "tai_kham"
                          ? "Điều trị"
                          : item.type === "tu_van"
                          ? "Tư vấn"
                          : item.type}
                      </td>
                      <td>
                        {item.status === "done"
                          ? "Hoàn thành"
                          : item.status === "confirmed"
                          ? "Đang diễn ra"
                          : item.status === "canceled"
                          ? "Hủy lịch"
                          : item.status}
                      </td>
                      <td>{item.note || "—"}</td>
                      <td>
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
                          Xem chi tiết
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
