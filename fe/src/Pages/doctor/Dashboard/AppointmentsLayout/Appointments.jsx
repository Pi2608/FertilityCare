import React, { useState, useEffect } from "react";
import apiAppointment from "../../../../features/service/apiAppointment";
import "./Appointments.css";
import { useNavigate } from "react-router-dom";


export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState("all");
  const [filterTime, setFilterTime] = useState("all");


  const filterAppointments = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Monday
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Sunday


    return appointments
      .filter((item) => {
        const itemDate = new Date(item.date);


        // Filter theo loại điều trị
        if (filterType === "tu_van" && item.type !== "tu_van") return false;
        if (filterType === "tai_kham" && item.type === "tu_van") return false;


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


  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await apiAppointment.getAllAppointments();
        setAppointments(data);
      } catch (err) {
        console.error("Lỗi khi gọi API lịch hẹn:", err);
      }
    };


    fetchAppointments();
  }, []);


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
                <span className="treatment-stage">Đang cập nhật</span>
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
                            ? `/doctor-dashboard/appointments/tu_van/${item.appointmentId}`
                            : `/doctor-dashboard/appointments/dieu_tri/${item.appointmentId}`,
                            { state: { appointmentId: item.appointmentId } }
                          )
                        }
                      >
                        Bắt đầu
                      </button>


                      <a href="" className="btn btn-message no-underline">
                        Nhắn tin
                      </a>
                    </>
                  ) : (
                    <>
                      <a href="" className="btn btn-not-ready no-underline">
                        Chưa mở
                      </a>
                      <a href="" className="btn btn-message no-underline">
                        Nhắn tin
                      </a>
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
    </div>
  );
}
