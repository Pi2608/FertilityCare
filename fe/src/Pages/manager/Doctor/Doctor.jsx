"use client"

import { useState } from "react"
import "./Doctor.css"

const Doctor = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({})
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
    },
  ])

  const handleEdit = (doctor) => {
    setEditingId(doctor.id)
    setEditData({
      gender: doctor.gender,
      birthDate: doctor.birthDate,
      specialty: doctor.specialty,
      experience: doctor.experience,
      rating: doctor.rating
    })
  }

  const handleSave = (doctorId) => {
    setDoctorsData(prev => prev.map(doctor =>
      doctor.id === doctorId
        ? { ...doctor, ...editData }
        : doctor
    ))
    setEditingId(null)
    setEditData({})
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditData({})
  }

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const filteredDoctors = doctorsData.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
              <div className="user-name">Jonitha Cathrine</div>
              <div className="user-role">Manager</div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="doctor-content">
        {/* Search */}
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
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.map((doctor) => {
                const isEditing = editingId === doctor.id
                return (
                  <tr key={doctor.id}>
                    <td className="doctor-name-cell">
                      <div className="doctor-info">
                        <div className="doctor-avatar">{doctor.initials}</div>
                        <span className="doctor-name">{doctor.name}</span>
                      </div>
                    </td>
                    <td>
                      {isEditing ? (
                        <select
                          value={editData.gender || doctor.gender}
                          onChange={(e) => handleInputChange('gender', e.target.value)}
                          className="edit-input"
                        >
                          <option value="Nam">Nam</option>
                          <option value="Nữ">Nữ</option>
                        </select>
                      ) : (
                        doctor.gender
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <input
                          type="date"
                          value={editData.birthDate ? editData.birthDate.split('/').reverse().join('-') : doctor.birthDate.split('/').reverse().join('-')}
                          onChange={(e) => {
                            const date = new Date(e.target.value)
                            const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`
                            handleInputChange('birthDate', formattedDate)
                          }}
                          className="edit-input"
                        />
                      ) : (
                        doctor.birthDate
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <select
                          value={editData.specialty || doctor.specialty}
                          onChange={(e) => handleInputChange('specialty', e.target.value)}
                          className="edit-input"
                        >
                          <option value="IVF">IVF</option>
                          <option value="IUI">IUI</option>
                        </select>
                      ) : (
                        <span className={`specialty-badge ${doctor.specialty.toLowerCase()}`}>{doctor.specialty}</span>
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <input
                          type="number"
                          value={editData.experience || doctor.experience}
                          onChange={(e) => handleInputChange('experience', parseInt(e.target.value))}
                          className="edit-input"
                          min="0"
                          max="50"
                        />
                      ) : (
                        doctor.experience
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <input
                          type="number"
                          step="0.1"
                          value={editData.rating || doctor.rating}
                          onChange={(e) => handleInputChange('rating', parseFloat(e.target.value))}
                          className="edit-input"
                          min="0"
                          max="5"
                        />
                      ) : (
                        <div className="rating">
                          <span className="rating-value">{doctor.rating}</span>
                        </div>
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <div className="action-buttons">
                          <button
                            onClick={() => handleSave(doctor.id)}
                            className="save-btn"
                          >
                            Lưu
                          </button>
                          <button
                            onClick={handleCancel}
                            className="cancel-btn"
                          >
                            Hủy
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleEdit(doctor)}
                          className="edit-btn"
                        >
                          Chỉnh sửa
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
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
