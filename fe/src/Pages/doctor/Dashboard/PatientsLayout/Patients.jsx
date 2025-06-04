import React from 'react';
import './Patients.css';


const patients = [
  {
    id: 'PT-2024-0123',
    name: 'Nguyễn Thị Hoa',
    age: 34,
    treatmentType: 'IVF chu kỳ 2',
    treatmentStage: 'Kích trứng',
    status: 'Đang điều trị',
    statusType: 'active',
  },
  {
    id: 'PT-2024-0145',
    name: 'Trần Văn Linh',
    age: 28,
    treatmentType: 'Tư vấn',
    treatmentStage: 'Kích trứng',
    status: 'Hoàn thành điều trị',
    statusType: 'completed',
  },
  {
    id: 'PT-2024-0098',
    name: 'Phạm Thị Mai',
    age: 31,
    treatmentType: 'IUI chu kỳ cuối',
    treatmentStage: 'Kích trứng',
    status: 'Hoàn thành điều trị',
    statusType: 'completed',
  },
  {
    id: 'PT-2024-0112',
    name: 'Lê Thị Hương',
    age: 29,
    treatmentType: 'Tư vấn',
    treatmentStage: 'Kích trứng',
    status: 'Hoàn thành điều trị',
    statusType: 'completed',
  },
];


export default function Patients() {
  return (
    <div className="patients-container">
      <div className="patients-header">
        <div>
          <h2>Danh sách bệnh nhân</h2>
          <p>Quản lý tất cả bệnh nhân của bạn</p>
        </div>
        <div className="patients-actions">
          <input type="text" placeholder="🔍 Tìm kiếm bệnh nhân..." />
          <select>
            <option>Tất cả</option>
            <option>Đang điều trị</option>
            <option>Hoàn thành điều trị</option>
          </select>

        </div>
      </div>


      <table className="patients-table">
        <thead>
          <tr>
            <th>Bệnh nhân</th>
            <th>Tuổi</th>
            <th>Loại điều trị</th>
            <th>Giai đoạn điều trị</th>
            <th>Trạng thái</th>
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
                    <span className="patient-id">ID: {p.id}</span>
                  </div>
                </div>
              </td>
              <td>{p.age}</td>
              <td>
                <span className={`treatment-badge ${p.treatmentType === "Tư vấn" ? "consultation" : ""}`}>
                  {p.treatmentType}
                </span>
              </td>
              <td>
                <span className="treatment-stage">{p.treatmentStage}</span>
              </td>
              <td>
                <span className={`badge ${p.statusType}`}>{p.status}</span>
              </td>
              <td>
                <div className="actions">
                  <button className="btn">Hồ sơ</button>
                  <button className="btn btn-message">Nhắn tin</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      <div className="pagination">
        <button>Trước</button>
        <span>Trang 1 / 5</span>
        <button>Tiếp</button>
      </div>
    </div>
  );
}
