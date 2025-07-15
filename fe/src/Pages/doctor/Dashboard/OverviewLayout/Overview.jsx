import "./Overview.css";
import { useEffect, useState } from "react";
import apiAppointment from "@features/service/apiAppointment";

export default function Overview() {
  const [hoverDay, setHoverDay] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("week"); // "week" or "month"
  const [appointments, setAppointments] = useState([]);
  const getTypeLabel = (type) => {
    switch (type) {
      case "tu_van":
        return "Tư vấn";
      case "tai_kham":
        return "Tái khám";
      default:
        return "Khác";
    }
  };
  const getAppointmentsForDay = (day) => {
    const dateObj = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    return appointmentsMonth.filter(
      (appt) => getDatetime(appt).toDateString() === dateObj.toDateString()
    );
  };
  const today = new Date();

  const getDatetime = (a) => new Date(`${a.date}T${a.startTime}`);

  const appointmentsToday = appointments.filter(
    (a) => getDatetime(a).toDateString() === today.toDateString()
  );

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Monday
  startOfWeek.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 6);

  const appointmentsWeek = appointments.filter((a) => {
    const d = getDatetime(a);
    return d >= startOfWeek && d <= endOfWeek;
  });

  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const appointmentsMonth = appointments.filter((a) => {
    const d = getDatetime(a);
    return d >= startOfMonth && d <= endOfMonth;
  });

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await apiAppointment.getAllAppointments();
        console.log("Dữ liệu lịch hẹn từ API:", data); // ✅ LOG Ở ĐÂY
        const confirmed = data.filter((a) => a.status === "confirmed");
        setAppointments(confirmed);
      } catch (err) {
        console.error("Lỗi khi lấy lịch hẹn:", err);
      }
    };

    fetchAppointments();
  }, []);

  const weekSchedule = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(date.getDate() + i);

    const sessions = appointmentsWeek
      .filter((a) => getDatetime(a).toDateString() === date.toDateString())
      .map((a) => ({
        time: a.startTime.slice(0, 5),
        patient: a.customerName,
      }));

    return {
      date: `${date.toLocaleDateString("vi-VN", {
        weekday: "long",
      })}\n${date.toLocaleDateString("vi-VN")}`,
      working: sessions.length > 0,
      sessions,
    };
  });

  // Calendar functions
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const navigateMonth = (direction) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const formatMonth = (date) => {
    return date.toLocaleDateString("vi-VN", { month: "long", year: "numeric" });
  };

  const isWorkingDay = (day) => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    const dayOfWeek = date.getDay();
    // Assume working days are Monday to Friday (1-5), Saturday morning (6)
    return dayOfWeek >= 1 && dayOfWeek <= 6;
  };

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
          <button
            className={`toggle-btn ${viewMode === "week" ? "active" : ""}`}
            onClick={() => setViewMode("week")}
          >
            Tuần
          </button>
          <button
            className={`toggle-btn ${viewMode === "month" ? "active" : ""}`}
            onClick={() => setViewMode("month")}
          >
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
            <button
              className="calendar-nav-btn"
              onClick={() => navigateMonth(-1)}
            >
              ← Tháng trước
            </button>
            <h3 className="calendar-month">{formatMonth(currentDate)}</h3>
            <button
              className="calendar-nav-btn"
              onClick={() => navigateMonth(1)}
            >
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
                  className={`calendar-day-month ${
                    day ? "has-day" : "empty-day"
                  } ${day && isWorkingDay(day) ? "working" : "off"} ${
                    day && getAppointmentsForDay(day).length > 0
                      ? "has-schedule"
                      : ""
                  }`}
                  onMouseEnter={() => day && setHoverDay(day)}
                  onMouseLeave={() => setHoverDay(null)}
                >
                  {day && (
                    <>
                      <div className="day-number">{day}</div>
                      {getAppointmentsForDay(day).length > 0 && (
                        <div className="schedule-indicator">
                          <div className="schedule-count">
                            {getAppointmentsForDay(day).length}
                          </div>
                        </div>
                      )}
                      {hoverDay === day &&
                        getAppointmentsForDay(day).length > 0 && (
                          <div className="tooltip">
                            {getAppointmentsForDay(day).map((s, i) => (
                              <p key={i}>
                                🕒 {s.startTime.slice(0, 5)} – {s.customerName}
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
        <p className="sub-heading">
          {today.toLocaleDateString("vi-VN", {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </p>
        <div className="appointment-list">
          {appointmentsToday.map((appt) => (
            <div key={appt.appointmentId} className="appointment-card">
              <div className="appointment-info">
                <p className="patient-name">{appt.customerName}</p>
                <p className="appointment-note">{getTypeLabel(appt.type)}</p>
                <p className="appointment-note">
                  {appt.note && appt.note !== "string"
                    ? appt.note
                    : "Không có ghi chú"}
                </p>

                <div className="actions">
                  <a href="/patient-profile">Xem hồ sơ</a>
                  <span> · </span>
                  <a href="#">Ghi chú</a>
                </div>
              </div>
              <div className="appointment-time">
                {appt.startTime?.slice(0, 5)} {/* ví dụ: 16:00 */}
              </div>
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
