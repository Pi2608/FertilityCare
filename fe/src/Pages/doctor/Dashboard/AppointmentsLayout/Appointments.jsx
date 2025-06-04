import React from "react";
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
  return (
    <div className="schedule-container">
      {/* PHẦN 2: DANH SÁCH LỊCH HẸN */}
      <div className="schedule-header">
        <div>
          <h2>Lịch hẹn</h2>
          <p>Quản lý tất cả các cuộc hẹn của bạn</p>
        </div>
        <div className="schedule-actions">
          <input type="text" placeholder="🔍 Tìm kiếm bệnh nhân..." />
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
                      <button className="btn btn-start">Bắt đầu</button>
                      <button className="btn btn-message">Nhắn tin</button>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-not-ready">Chưa mở</button>
                      <button className="btn btn-message">Nhắn tin</button>
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
