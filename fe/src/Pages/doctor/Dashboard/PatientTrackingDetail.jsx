import React from "react";
import "./PatientTrackingDetail.css";


const patients = [
  {
    id: "PT-2024-0123",
    name: "Nguyễn Thị Hoa",
    age: 34,
    stage: "Kích trứng",
    priority: "Cao",
    status: "Đã uống",
  },
  {
    id: "PT-2024-0145",
    name: "Trần Văn Linh & Vợ",
    age: "38 / 36",
    stage: "Đánh giá ban đầu",
    priority: "Trung bình",
    status: "Quên",
  },
  {
    id: "PT-2024-0098",
    name: "Phạm Thị Mai",
    age: 32,
    stage: "Chuyển phôi",
    priority: "Thấp",
    status: "Trễ",
  },
  {
    id: "PT-2024-0112",
    name: "Lê Thị Hương",
    age: 39,
    stage: "Kích trứng",
    priority: "Cao",
    status: "Đã uống",
  },
  {
    id: "PT-2024-0155",
    name: "Ngô Thị Lan",
    age: 30,
    stage: "Theo dõi nội tiết",
    priority: "Trung bình",
    status: "Đã uống",
  },
];


export default function PatientTrackingList() {
  return (
    <div className="tracking-list-container">
      <div className="patients-header">
        <div>
          <h2>Danh sách theo dõi bệnh nhân</h2>
          <p>Quản lý tất cả bệnh nhân của bạn</p>
        </div>
        <div className="patients-actions">
          <input type="text" placeholder="🔍 Tìm kiếm bệnh nhân..." />
          <select>
            <option>Tất cả</option>
            <option>Đã uống</option>
            <option>Quên</option>
            <option>Trễ</option>
          </select>
        </div>
      </div>


      <table className="tracking-table">
        <thead>
          <tr>
            <th>Bệnh nhân</th>
            <th>Tuổi</th>
            <th>Giai đoạn điều trị</th>
            <th>Trạng thái hôm nay</th>
            <th>Ưu tiên</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p, i) => (
            <tr key={i}>
              <td>{p.name}</td>
              <td>{p.age}</td>
              <td>{p.stage}</td>
              <td>
                <span className={`status-badge ${p.status}`}>{p.status}</span>
              </td>
              <td>
                <span className={`priority-badge ${p.priority}`}>
                  {p.priority}
                </span>
              </td>
              <td>
                <button className="btn">Chi tiết</button>
                <button className="btn red">Cập nhật</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
