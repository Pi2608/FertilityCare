import React from 'react';
import './Patients.css';


const patients = [
  {
    id: 'PT-2024-0123',
    name: 'Nguyễn Thị Hoa',
    age: '34',
    status: 'Đang điều trị',
    statusType: 'active',
    treatment: 'IVF Chu kỳ #2',
    avatar: 'https://i.pravatar.cc/100?img=1',
  },
  {
    id: 'PT-2024-0145',
    name: 'Trần Văn Linh',
    age: '38',
    status: 'Mới',
    statusType: 'new',
    treatment: 'Đánh giá ban đầu',
    avatar: 'https://i.pravatar.cc/100?img=2',
  },
  {
    id: 'PT-2024-0098',
    name: 'Phạm Thị Mai',
    age: '32',
    status: 'Đang điều trị',
    statusType: 'active',
    treatment: 'IVF Chu kỳ #1',
    avatar: 'https://i.pravatar.cc/100?img=3',
  },
  {
    id: 'PT-2024-0112',
    name: 'Lê Thị Hương',
    age: '39',
    status: 'Ưu tiên',
    statusType: 'urgent',
    treatment: 'IVF Chu kỳ #3',
    avatar: 'https://i.pravatar.cc/100?img=4',
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
            <option>Mới</option>
            <option>Ưu tiên</option>
          </select>
          
        </div>
      </div>


      <table className="patients-table">
        <thead>
          <tr>
            <th>Bệnh nhân</th>
            <th>Tuổi</th>
            <th>Trạng thái</th>
            <th>Điều trị</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p, i) => (
            <tr key={i}>
              <td>
                <div className="patient-info">
                  <img src={p.avatar} alt="avatar" />
                  <div>
                    <div>{p.name}</div>
                    <span className="patient-id">ID: {p.id}</span>
                  </div>
                </div>
              </td>
              <td>{p.age}</td>
              <td>
                <span className={`badge ${p.statusType}`}>{p.status}</span>
              </td>
              <td>{p.treatment}</td>
              <td>
                <div className="actions">
                  <button className="btn">Hồ sơ</button>
                  <button className="btn red">Xem</button>
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
