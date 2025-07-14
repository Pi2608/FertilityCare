"use client"

import { useState } from "react"
import "./Doctor.css"
import CreateDoctor from "./CreateDoctor"

const Doctor = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all") // "all", "active", "inactive"
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

  // Khởi tạo mảng rỗng để sau này điền dữ liệu từ API
  const [doctorsData, setDoctorsData] = useState([])

  const handleToggleStatus = (doctorId) => {
    setDoctorsData((prev) =>
      prev.map((doctor) => (doctor.id === doctorId ? { ...doctor, isActive: !doctor.isActive } : doctor)),
    )
  }

  const filteredDoctors = doctorsData.filter((doctor) => {
    const matchesSearch =
      doctor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && doctor.isActive) ||
      (statusFilter === "inactive" && !doctor.isActive)

    return matchesSearch && matchesStatus
  })

  return (
    <div className="doctor-page">
      {/* Header */}
      <header className="doctor-header">
        <h1 className="page-title">Thông tin bác sĩ</h1>

        <div className="header-actions">
          <div className="notification-bell">
            <span>🔔</span>
            <div className="notification-dot"></div>
          </div>

          <div className="user-profile">
            <div className="avatar">
              <span>JC</span>
            </div>
            <div className="user-info">
              <div className="user-name">Admin User</div>
              <div className="user-role">Admin</div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="doctor-content">
        {/* Search and Filter */}
        <div className="search-section">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Tìm kiếm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-section">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="status-filter">
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Đang hoạt động</option>
              <option value="inactive">Không hoạt động</option>
            </select>

            <button className="create-doctor-btn" onClick={() => setIsCreateModalOpen(true)}>
              <span>+</span>
              Tạo tài khoản bác sĩ
            </button>
          </div>
        </div>

        {/* Doctors Table */}
        <div className="table-wrapper">
          <table className="doctors-table">
            <thead>
              <tr>
                <th>Họ và tên</th>
                <th>Giới tính</th>
                <th>Ngày sinh</th>
                <th>Chuyên môn</th>
                <th>Kinh nghiệm</th>
                <th>Đánh giá</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <tr key={doctor.id}>
                    <td className="doctor-name-cell">
                      <div className="doctor-info">
                        <div className="doctor-avatar">{doctor.initials}</div>
                        <span className="doctor-name">{doctor.name}</span>
                      </div>
                    </td>
                    <td>{doctor.gender}</td>
                    <td>{doctor.birthDate}</td>
                    <td>
                      <span className={`specialty-badge ${doctor.specialty?.toLowerCase()}`}>{doctor.specialty}</span>
                    </td>
                    <td>{doctor.experience}</td>
                    <td>
                      <div className="rating">
                        <span className="rating-value">{doctor.rating}</span>
                      </div>
                    </td>
                    <td>
                      <button
                        onClick={() => handleToggleStatus(doctor.id)}
                        className={`status-toggle-btn ${doctor.isActive ? "active" : "inactive"}`}
                      >
                        {doctor.isActive ? "Hoạt động" : "Không hoạt động"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="empty-state">
                    <p>Chưa có dữ liệu bác sĩ. Dữ liệu sẽ được tải từ API.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination-section">
          <button className="pagination-btn prev">Trước đó</button>

          <div className="page-numbers">
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <button className="page-btn">4</button>
            <button className="page-btn next-page">Tiếp theo</button>
          </div>
        </div>
      </main>

      {/* Create Doctor Modal */}
      <CreateDoctor
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => setIsSuccessModalOpen(true)}
      />

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="success-modal-overlay">
          <div className="success-modal-content">
            <div className="success-modal-body">
              <div className="success-icon">✓</div>
              <h2>Tạo tài khoản thành công!</h2>
              <p>Tài khoản bác sĩ đã được tạo thành công.</p>
            </div>
            <div className="success-modal-footer">
              <button className="success-close-btn" onClick={() => setIsSuccessModalOpen(false)}>
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Doctor
