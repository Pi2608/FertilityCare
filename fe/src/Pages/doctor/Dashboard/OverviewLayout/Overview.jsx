import React, { useState } from "react";
import "./Overview.css";

export default function Overview() {
  const [hoverDay, setHoverDay] = useState(null);

  const weekSchedule = [
    {
      date: 'Thứ Hai\n20/05',
      working: true,
      sessions: [
        { time: '09:00', patient: 'Nguyễn Thị Hoa' },
        { time: '10:30', patient: 'Trần Văn Linh' },
      ],
    },
    {
      date: 'Thứ Ba\n21/05',
      working: false,
      sessions: [],
    },
    {
      date: 'Thứ Tư\n22/05',
      working: true,
      sessions: [
        { time: '09:00', patient: 'Phạm Thị Mai' },
        { time: '13:00', patient: 'Lê Thị Hương' },
      ],
    },
    {
      date: 'Thứ Năm\n23/05',
      working: true,
      sessions: [
        { time: '08:30', patient: 'Ngô Thị Lan' },
      ],
    },
    {
      date: 'Thứ Sáu\n24/05',
      working: true,
      sessions: [],
    },
    {
      date: 'Thứ Bảy\n25/05',
      working: false,
      sessions: [],
    },
    {
      date: 'Chủ Nhật\n26/05',
      working: false,
      sessions: [],
    },
  ];

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
  ];



  return (
    <div className="dashboard-wrapper">
      {/* HEADER BÁC SĨ */}
      <div className="doctor-header">
        <div className="header-left">
          <h1>Xin chào, Bác sĩ Lan Anh</h1>
        </div>
      </div>
      
      {/* LỊCH LÀM VIỆC TRONG TUẦN */}
      <h2>Lịch làm việc trong tuần</h2>
      <div className="calendar-grid">
        {weekSchedule.map((day, index) => (
          <div
            key={index}
            className={`calendar-day ${day.working ? 'active' : 'off'}`}
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
                    <p key={i}>🕒 {s.time} – {s.patient}</p>
                  ))
                )}
              </div>
            )}
          </div>
        ))}
      </div>

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
  );
}
