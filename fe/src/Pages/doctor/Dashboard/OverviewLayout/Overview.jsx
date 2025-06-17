"use client"

import { useState } from "react"
import "./Overview.css"

export default function Overview() {
  const [hoverDay, setHoverDay] = useState(null)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState("week") // "week" or "month"

  const weekSchedule = [
    {
      date: "Thứ Hai\n20/05",
      working: true,
      sessions: [
        { time: "09:00", patient: "Nguyễn Thị Hoa" },
        { time: "10:30", patient: "Trần Văn Linh" },
      ],
    },
    {
      date: "Thứ Ba\n21/05",
      working: false,
      sessions: [],
    },
    {
      date: "Thứ Tư\n22/05",
      working: true,
      sessions: [
        { time: "09:00", patient: "Phạm Thị Mai" },
        { time: "13:00", patient: "Lê Thị Hương" },
      ],
    },
    {
      date: "Thứ Năm\n23/05",
      working: true,
      sessions: [{ time: "08:30", patient: "Ngô Thị Lan" }],
    },
    {
      date: "Thứ Sáu\n24/05",
      working: true,
      sessions: [],
    },
    {
      date: "Thứ Bảy\n25/05",
      working: false,
      sessions: [],
    },
    {
      date: "Chủ Nhật\n26/05",
      working: false,
      sessions: [],
    },
  ]

  const appointments = [
    {
      id: 1,
      name: "Nguyễn Thị Hoa",
      note: "Tư vấn theo dõi - IVF Chu kỳ #2",
      time: "09:00",
    },
    {
      id: 2,
      name: "Trần Văn Linh",
      note: "Tư vấn ban đầu - Đánh giá vô sinh",
      time: "10:30",
    },
    {
      id: 3,
      name: "Phạm Thị Mai",
      note: "Siêu âm theo dõi - IVF Chu kỳ #1",
      time: "13:15",
    },
  ]

  // Calendar functions
  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    return days
  }

  const navigateMonth = (direction) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() + direction)
      return newDate
    })
  }

  const formatMonth = (date) => {
    return date.toLocaleDateString("vi-VN", { month: "long", year: "numeric" })
  }

  const getScheduleForDay = (day) => {
    // Mock schedule data - replace with real data
    const schedules = {
      5: [{ time: "09:00", patient: "Nguyễn Thị Hoa" }],
      12: [{ time: "14:00", patient: "Trần Văn Linh" }],
      18: [
        { time: "08:00", patient: "Phạm Thị Mai" },
        { time: "13:00", patient: "Lê Thị Hương" },
      ],
      20: [
        { time: "09:00", patient: "Nguyễn Thị Hoa" },
        { time: "10:30", patient: "Trần Văn Linh" },
      ],
      22: [
        { time: "09:00", patient: "Phạm Thị Mai" },
        { time: "13:00", patient: "Lê Thị Hương" },
      ],
      23: [{ time: "08:30", patient: "Ngô Thị Lan" }],
      25: [{ time: "10:00", patient: "Hoàng Thị Lan" }],
    }
    return schedules[day] || []
  }

  const isWorkingDay = (day) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    const dayOfWeek = date.getDay()
    // Assume working days are Monday to Friday (1-5), Saturday morning (6)
    return dayOfWeek >= 1 && dayOfWeek <= 6
  }

  return (
    <div className="dashboard-wrapper">
      {/* HEADER BÁC SĨ */}
      <div className="doctor-header">
        <div className="header-left">
          <h1>Xin chào, Bác sĩ Lan Anh</h1>
        </div>
      </div>

      {/* LỊCH LÀM VIỆC */}
      <div className="schedule-header">
        <h2>Lịch làm việc</h2>
        <div className="view-toggle">
          <button className={`toggle-btn ${viewMode === "week" ? "active" : ""}`} onClick={() => setViewMode("week")}>
            Tuần
          </button>
          <button className={`toggle-btn ${viewMode === "month" ? "active" : ""}`} onClick={() => setViewMode("month")}>
            Tháng
          </button>
        </div>
      </div>

      {viewMode === "week" ? (
        // LỊCH LÀM VIỆC TRONG TUẦN
        <div className="calendar-grid">
          {weekSchedule.map((day, index) => (
            <div
              key={index}
              className={`calendar-day ${day.working ? "active" : "off"}`}
              onMouseEnter={() => setHoverDay(index)}
              onMouseLeave={() => setHoverDay(null)}
            >
              <div className="day-label">{day.date}</div>
              {day.working ? (
                <div className="shift-count">{day.sessions.length} ca khám</div>
              ) : (
                <div className="shift-off">Nghỉ</div>
              )}
              {hoverDay === index && day.working && (
                <div className="tooltip">
                  {day.sessions.length === 0 ? (
                    <p>Không có ca khám</p>
                  ) : (
                    day.sessions.map((s, i) => (
                      <p key={i}>
                        🕒 {s.time} – {s.patient}
                      </p>
                    ))
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        // LỊCH LÀM VIỆC THEO THÁNG
        <div className="month-calendar">
          <div className="calendar-header">
            <button className="calendar-nav-btn" onClick={() => navigateMonth(-1)}>
              ← Tháng trước
            </button>
            <h3 className="calendar-month">{formatMonth(currentDate)}</h3>
            <button className="calendar-nav-btn" onClick={() => navigateMonth(1)}>
              Tháng sau →
            </button>
          </div>

          <div className="calendar-container">
            <div className="calendar-weekdays">
              <div className="weekday">CN</div>
              <div className="weekday">T2</div>
              <div className="weekday">T3</div>
              <div className="weekday">T4</div>
              <div className="weekday">T5</div>
              <div className="weekday">T6</div>
              <div className="weekday">T7</div>
            </div>

            <div className="calendar-days">
              {getDaysInMonth(currentDate).map((day, index) => (
                <div
                  key={index}
                  className={`calendar-day-month ${day ? "has-day" : "empty-day"} ${
                    day && isWorkingDay(day) ? "working" : "off"
                  } ${getScheduleForDay(day).length > 0 ? "has-schedule" : ""}`}
                  onMouseEnter={() => day && setHoverDay(day)}
                  onMouseLeave={() => setHoverDay(null)}
                >
                  {day && (
                    <>
                      <div className="day-number">{day}</div>
                      {getScheduleForDay(day).length > 0 && (
                        <div className="schedule-indicator">
                          <div className="schedule-count">{getScheduleForDay(day).length}</div>
                        </div>
                      )}
                      {hoverDay === day && getScheduleForDay(day).length > 0 && (
                        <div className="tooltip">
                          {getScheduleForDay(day).map((s, i) => (
                            <p key={i}>
                              🕒 {s.time} – {s.patient}
                            </p>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <section className="appointment-section">
        <h2>Lịch hẹn hôm nay</h2>
        <p className="sub-heading">Thứ Hai, 20/05/2024</p>
        <div className="appointment-list">
          {appointments.map((appt) => (
            <div key={appt.id} className="appointment-card">
              <div className="appointment-info">
                <p className="patient-name">{appt.name}</p>
                <p className="appointment-note">{appt.note}</p>
                <div className="actions">
                  <a href="/patient-profile">Xem hồ sơ</a>
                  <span> · </span>
                  <a href="#">Ghi chú</a>
                </div>
              </div>
              <div className="appointment-time">{appt.time}</div>
            </div>
          ))}
        </div>
        <div className="see-more">
          <a href="#">Xem tất cả lịch hẹn</a>
        </div>
      </section>
    </div>
  )
}
