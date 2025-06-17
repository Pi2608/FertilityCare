"use client"

import { useState } from "react"
import "./CusProfile.css"

const ProfileLayout = () => {
  const [doctorInfo, setDoctorInfo] = useState({
    fullName: "Lê Văn Lương",
    gender: "male",
    birthDate: "1985-03-15",
  })

  const reviews = [
    {
      id: 1,
      patientName: "Chị Nguyễn Thị Lan",
      rating: 5,
      date: "2024-01-15",
      comment:
        "Bác sĩ An rất tận tâm và chuyên nghiệp. Giải thích rất kỹ về tình trạng bệnh và cách điều trị. Sau 3 tháng điều trị, tình trạng tim mạch của tôi đã cải thiện rõ rệt.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      patientName: "Anh Trần Minh Hoàng",
      rating: 5,
      date: "2024-01-10",
      comment:
        "Bác sĩ có kinh nghiệm và kiến thức chuyên môn cao. Thái độ thân thiện, lắng nghe bệnh nhân. Tôi rất hài lòng với dịch vụ khám và điều trị.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      patientName: "Cô Lê Thị Mai",
      rating: 4,
      date: "2024-01-05",
      comment:
        "Bác sĩ khám rất kỹ và chu đáo. Tuy nhiên thời gian chờ hơi lâu một chút. Nhưng nhìn chung tôi rất tin tưởng vào chuyên môn của bác sĩ.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const handleInputChange = (field, value) => {
    setDoctorInfo((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    console.log("Đã lưu thông tin bác sĩ:", doctorInfo)
    alert("Đã lưu thông tin thành công!")
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`star ${index < rating ? "filled" : ""}`}>
        ⭐
      </span>
    ))
  }

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("vi-VN")
  }

  return (
    <div className="profile-container">
      {/* Header */}
      <div className="profile-header">
        <div>
          <h2>Hồ sơ bệnh nhân</h2>
          <p>Quản lý thông tin cá nhân</p>
        </div>
      </div>

      {/* Main Content - 2 columns */}
      <div className="profile-content">
        {/* Left Column - Doctor Information */}
        <div className="doctor-info-section">
          <h3>👤 Thông Tin Cá Nhân</h3>
          <div className="doctor-card">
            {/* <div className="doctor-avatar">
              <img src="/placeholder.svg?height=60&width=60" alt="Doctor Avatar" />
            </div> */}
            <div className="doctor-details">
              <div className="info-grid">
                <div className="info-item">
                  <label>Họ và Tên</label>
                  <input
                    type="text"
                    className="edit-input"
                    value={doctorInfo.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    placeholder="Nhập họ và tên"
                  />
                </div>

                <div className="info-item">
                  <label>Giới Tính</label>
                  <select
                    className="edit-select"
                    value={doctorInfo.gender}
                    onChange={(e) => handleInputChange("gender", e.target.value)}
                  >
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
    
                  </select>
                </div>

                <div className="info-item">
                  <label>Ngày Sinh</label>
                  <input
                    type="date"
                    className="edit-input"
                    value={doctorInfo.birthDate}
                    onChange={(e) => handleInputChange("birthDate", e.target.value)}
                  />
                </div>

              </div>

              <button className="btn-save" onClick={handleSave}>
                💾 Lưu Thông Tin
              </button>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  )
}

export default ProfileLayout;
