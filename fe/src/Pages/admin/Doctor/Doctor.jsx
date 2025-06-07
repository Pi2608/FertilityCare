"use client"

import { useState } from "react"
import "./Doctor.css"

const Doctor = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all") // "all", "active", "inactive"
  const [doctorsData, setDoctorsData] = useState([
    {
      id: 1,
      name: "Dr. Elizabeth Polson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "EP",
      gender: "Nữ",
      birthDate: "05/10/1985",
      specialty: "IVF",
      experience: 10,
      rating: 4.8,
      isActive: true,
    },
    {
      id: 2,
      name: "Dr. John David",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JD",
      gender: "Nam",
      birthDate: "15/03/1980",
      specialty: "IUI",
      experience: 15,
      rating: 4.9,
      isActive: true,
    },
    {
      id: 3,
      name: "Dr. Krishtav Rajan",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "KR",
      gender: "Nam",
      birthDate: "22/07/1982",
      specialty: "IVF",
      experience: 12,
      rating: 4.7,
      isActive: false,
    },
    {
      id: 4,
      name: "Dr. Sumanth Tinson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "ST",
      gender: "Nữ",
      birthDate: "08/12/1987",
      specialty: "IVF",
      experience: 8,
      rating: 4.6,
      isActive: true,
    },
    {
      id: 5,
      name: "Dr. EG Subramani",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "ES",
      gender: "Nữ",
      birthDate: "30/09/1975",
      specialty: "IVF",
      experience: 20,
      rating: 4.9,
      isActive: true,
    },
    {
      id: 6,
      name: "Dr. Ranjan Maari",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "RM",
      gender: "Nam",
      birthDate: "14/05/1978",
      specialty: "IUI",
      experience: 18,
      rating: 4.8,
      isActive: false,
    },
    {
      id: 7,
      name: "Dr. Philipile Gopal",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "PG",
      gender: "Nam",
      birthDate: "25/11/1983",
      specialty: "IUI",
      experience: 11,
      rating: 4.5,
      isActive: true,
    },
  ])

  const handleToggleStatus = (doctorId) => {
    setDoctorsData(prev => prev.map(doctor =>
      doctor.id === doctorId
        ? { ...doctor, isActive: !doctor.isActive }
        : doctor
    ))
  }

  const filteredDoctors = doctorsData.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())

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
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="status-filter"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Đang hoạt động</option>
              <option value="inactive">Không hoạt động</option>
            </select>
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
              {filteredDoctors.map((doctor) => (
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
                    <span className={`specialty-badge ${doctor.specialty.toLowerCase()}`}>
                      {doctor.specialty}
                    </span>
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
                      className={`status-toggle-btn ${doctor.isActive ? 'active' : 'inactive'}`}
                    >
                      {doctor.isActive ? 'Hoạt động' : 'Không hoạt động'}
                    </button>
                  </td>
                </tr>
              ))}
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
    </div>
  )
}

export default Doctor
