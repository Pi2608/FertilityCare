import './Patient.css'

const AdminPatient = () => {
  return (
    <div className="admin-patient-page">
      <header className="admin-patient-header">
        <h1 className="page-title">Quản lý bệnh nhân</h1>
        <div className="header-actions">
          <div className="notification-bell">
            <span>🔔</span>
            <div className="notification-dot"></div>
          </div>
          <div className="user-profile">
            <div className="avatar">
              <span>AD</span>
            </div>
            <div className="user-info">
              <div className="user-name">Admin User</div>
              <div className="user-role">Admin</div>
            </div>
          </div>
        </div>
      </header>

      <main className="admin-patient-content">
        <div className="coming-soon-container">
          <div className="coming-soon-icon">👥</div>
          <h2>Quản lý bệnh nhân Admin</h2>
          <p>Tính năng đang được phát triển...</p>
          <div className="features-list">
            <ul>
              <li>✨ Xem danh sách tất cả bệnh nhân</li>
              <li>✨ Quản lý hồ sơ bệnh nhân</li>
              <li>✨ Thống kê bệnh nhân theo khu vực</li>
              <li>✨ Xuất báo cáo bệnh nhân</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminPatient