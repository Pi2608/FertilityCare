import React from "react";
import "./Appointments.css";

const scheduleData = [
  {
    id: "PT-2024-0123",
    name: "Nguyễn Thị Hoa",
    avatar: "https://i.pravatar.cc/100?img=1",
    time: "09:00 - 09:30",
    date: "20/05/2024",
    type: "Tư vấn",
    typeColor: "blue",
  },
  {
    id: "PT-2024-0145",
    name: "Trần Văn Linh",
    avatar: "https://i.pravatar.cc/100?img=2",
    time: "10:30 - 11:15",
    date: "20/05/2024",
    type: "Tư vấn ban đầu",
    typeColor: "purple",
  },
  {
    id: "PT-2024-0098",
    name: "Phạm Thị Mai",
    avatar: "https://i.pravatar.cc/100?img=3",
    time: "13:15 - 13:45",
    date: "20/05/2024",
    type: "Siêu âm",
    typeColor: "green",
  },
  {
    id: "PT-2024-0112",
    name: "Lê Thị Hương",
    avatar: "https://i.pravatar.cc/100?img=4",
    time: "14:30 - 15:00",
    date: "20/05/2024",
    type: "Khẩn cấp",
    typeColor: "red",
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
            <th>Thời gian</th>
            <th>Loại</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {scheduleData.map((item, index) => (
            <tr key={index}>
              <td>
                <div className="patient-info">
                  <img src={item.avatar} alt="avatar" />
                  <div>
                    <div>{item.name}</div>
                    <span className="patient-id">ID: {item.id}</span>
                  </div>
                </div>
              </td>
              <td>
                <div>{item.time}</div>
                <div className="date">{item.date}</div>
              </td>
              <td>
                <span className={`badge ${item.typeColor}`}>{item.type}</span>
              </td>
              <td>
                <div className="actions">
                  <button className="btn">Chi tiết</button>
                  <button className="btn red">Bắt đầu</button>
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
