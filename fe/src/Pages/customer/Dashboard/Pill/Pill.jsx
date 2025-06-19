"use client"

import { useState } from "react"
import "./pill.css"

const Pill = () => {
  const [selectedDate, setSelectedDate] = useState(19)
  const [currentWeek, setCurrentWeek] = useState(0)

  // Dữ liệu mẫu cho thuốc theo ngày
  const medicationData = {
    18: {
      title: "Tổng quan tuần thứ",
      medications: [
        { id: 1, name: "Progesterone", dosage: "1 viên", time: "08:00", status: "taken", icon: "💊" },
        { id: 2, name: "Pikachu", dosage: "1 viên", time: "08:00", status: "missed", icon: "💊" },
        { id: 3, name: "Progesterone", dosage: "1 viên", time: "17:00", status: "taken", icon: "💊" },
      ],
    },
    19: {
      title: "Tỷ lệ uống thuốc",
      medications: [
        { id: 1, name: "Progesterone", dosage: "200mg - Uống", time: "08:00", status: "pending", icon: "💊" },
        { id: 2, name: "Acid Folic", dosage: "5mg - Uống", time: "08:00", status: "pending", icon: "💊" },
        { id: 3, name: "Progesterone", dosage: "200mg - Uống", time: "20:00", status: "pending", icon: "💊" },
        { id: 4, name: "Estradiol", dosage: "2mg - Uống", time: "20:00", status: "pending", icon: "💊" },
      ],
    },
  }

  const weekDays = [
    { day: "Thứ 2", date: 16 },
    { day: "Thứ 3", date: 17 },
    { day: "Thứ 4", date: 18 },
    { day: "Thứ 5", date: 19 },
    { day: "Thứ 6", date: 20 },
    { day: "Thứ 7", date: 21 },
    { day: "CN", date: 22 },
  ]

  const currentData = medicationData[selectedDate] || medicationData[19]

  const handleDateSelect = (date) => {
    setSelectedDate(date)
  }

  const handleMedicationAction = (medicationId, action) => {
    console.log(`${action} medication with id: ${medicationId}`)
  }

  const getStatusText = (status) => {
    switch (status) {
      case "taken":
        return "Đã uống"
      case "missed":
        return "Bỏ lỡ"
      case "pending":
        return "Đánh dấu đã uống"
      default:
        return "Đánh dấu đã uống"
    }
  }

  const getStatusClass = (status) => {
    switch (status) {
      case "taken":
        return "status-taken"
      case "missed":
        return "status-missed"
      case "pending":
        return "status-pending"
      default:
        return "status-pending"
    }
  }

  return (
    <div className="pill-container">
      {/* Header - nằm ngoài background trắng */}
      <div className="pill-header">
        <div className="header-content">
          <h1>Quản lý thuốc</h1>
          <br/>
          <p>Theo dõi và quản lý lịch uống thuốc của bạn</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary">📄 Xuất báo cáo</button>
          <button className="btn-primary">🔔 Cài đặt nhắc nhở</button>
        </div>
      </div>

      {/* Progress Section */}
      <div className="progress-section">
        <h2>{currentData.title}</h2>
        <p>Tỷ lệ tuân thủ uống thuốc của bạn trong 30 ngày qua</p>

        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: selectedDate === 18 ? "95%" : "95%" }}></div>
          </div>
          <div className="progress-labels">
            <span className="progress-percentage">95%</span>
            <span className="progress-percentage-right">5%</span>
          </div>
        </div>

        <div className="progress-stats">
          <div className="stat-item stat-success">
            <div className="stat-icon">✓</div>
            <div className="stat-content">
              <div className="stat-title">Đã uống đúng giờ</div>
              <div className="stat-value">95% liều thuốc</div>
            </div>
          </div>
          <div className="stat-item stat-missed">
            <div className="stat-icon">⚠</div>
            <div className="stat-content">
              <div className="stat-title">Bỏ lỡ</div>
              <div className="stat-value">{selectedDate === 18 ? "1%" : "5%"} liều thuốc</div>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Section */}
      <div className="schedule-section">
        <div className="schedule-header">
          <h2>Lịch uống thuốc</h2>
          <p>Thứ Năm, 19/06/2025</p>
        </div>

        {/* Calendar Navigation */}
        <div className="calendar-nav">
          <button className="nav-btn">‹</button>
          <div className="week-days">
            {weekDays.map((day) => (
              <div
                key={day.date}
                className={`day-item ${selectedDate === day.date ? "active" : ""}`}
                onClick={() => handleDateSelect(day.date)}
              >
                <div className="day-name">{day.day}</div>
                <div className="day-date">{day.date}</div>
              </div>
            ))}
          </div>
          <button className="nav-btn">›</button>
        </div>

        {/* Medication List */}
        <div className="medication-list">
          {currentData.medications.map((medication) => (
            <div key={medication.id} className="medication-item">
              <div className="medication-icon">{medication.icon}</div>
              <div className="medication-info">
                <div className="medication-name">{medication.name}</div>
                <div className="medication-dosage">{medication.dosage}</div>
                <div className="medication-time">🕐 {medication.time}</div>
              </div>
              <div className="medication-action">
                <button
                  className={`action-btn ${getStatusClass(medication.status)}`}
                  onClick={() => handleMedicationAction(medication.id, medication.status)}
                  disabled={medication.status === "taken"}
                >
                  {medication.status === "taken" && "✓ "}
                  {getStatusText(medication.status)}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Pill
