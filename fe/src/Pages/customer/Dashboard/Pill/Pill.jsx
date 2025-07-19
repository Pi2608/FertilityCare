import { useState, useEffect } from "react";
import "./pill.css";
import { Bell, PillIcon, Clock, ArrowRightFromLine } from "lucide-react";
import apiMedicine from "@features/service/apiMedicine";


const generateWeekDays = (baseDate) => {
  const week = [];
  const start = new Date(baseDate);
  start.setDate(start.getDate() - start.getDay() + 1); // Thứ 2


  for (let i = 0; i < 7; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    week.push({
      day: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN"][i],
      date: date.getDate(),
      fullDate: date,
    });
  }
  return week;
};
const Pill = () => {
  useEffect(() => {
    const fetchMedicineData = async () => {
      try {
        const user = await apiMedicine.getCurrentCustomer();
        setUserId(user.id);
        const schedules = await apiMedicine.getMedicineSchedulesByCustomer(
          user.id
        );
        console.log("Danh sách thuốc từ API:", schedules); // Thêm dòng này để kiểm tra
        setMedicineSchedules(schedules);
      } catch (err) {
        console.error("Lỗi khi tải lịch thuốc:", err);
      }
    };


    fetchMedicineData();
  }, []);


  const [selectedDate, setSelectedDate] = useState(19);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [medicineSchedules, setMedicineSchedules] = useState([]);
  const [userId, setUserId] = useState(null);
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);
  const [weekDays, setWeekDays] = useState(generateWeekDays(new Date()));
  const activeDates = medicineSchedules.map((m) =>
    new Date(m.eventDate).toDateString()
  );


  // Dữ liệu mẫu cho thuốc theo ngày


  const changeWeek = (newOffset) => {
    setCurrentWeekOffset(newOffset);
    const today = new Date();
    const baseDate = new Date(today.setDate(today.getDate() + newOffset * 7));
    setWeekDays(generateWeekDays(baseDate));
    setSelectedDate(baseDate.getDate());
  };


  const currentData = {
    title: "Lịch thuốc theo API",
    medications: medicineSchedules.filter((med) => {
      const medDate = new Date(med.eventDate).getDate();
      return medDate === selectedDate;
    }),
  };


  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };


  const handleMedicationAction = async (medicationId, currentStatus) => {
    try {
      await apiMedicine.updateMedicineStatus(medicationId, "da_uong");
      // Cập nhật lại UI sau khi đổi trạng thái
      setMedicineSchedules((prev) =>
        prev.map((item) =>
          item.scheduleId === medicationId
            ? { ...item, status: "da_uong" }
            : item
        )
      );
    } catch (err) {
      alert("Cập nhật trạng thái thuốc thất bại.");
    }
  };


  const getStatusText = (status) => {
    switch (status) {
      case "da_uong":
        return "Đã uống";
      case "bo_lo":
        return "Bỏ lỡ";
      case "cho_xac_nhan":
      default:
        return "Đánh dấu đã uống";
    }
  };


  const getStatusClass = (status) => {
    switch (status) {
      case "da_uong":
        return "status-taken";
      case "bo_lo":
        return "status-missed";
      case "cho_xac_nhan":
      default:
        return "status-pending";
    }
  };


  const today = new Date();
  today.setHours(0, 0, 0, 0); // Đặt về đầu ngày để so sánh chính xác


  const total = medicineSchedules.length;
  let taken = 0;
  let missed = 0;


  medicineSchedules.forEach((med) => {
    const medDate = new Date(med.eventDate);
    medDate.setHours(0, 0, 0, 0);


    if (med.status === "da_uong" && medDate >= today) {
      // Uống trước hoặc đúng ngày -> đúng giờ
      taken++;
    } else if (med.status !== "da_uong" && medDate < today) {
      // Không uống và quá hạn -> bỏ lỡ
      missed++;
    }
  });


  const takenPercent = total === 0 ? 0 : Math.round((taken / total) * 100);
  const missedPercent = total === 0 ? 0 : 100 - takenPercent;


  return (
    <div className="pill-container">
      {/* Header - nằm ngoài background trắng */}
      <div className="pill-header">
        <div className="header-content">
          <h1>Quản lý thuốc</h1>
          <p>Theo dõi và quản lý lịch uống thuốc của bạn</p>
        </div>
        
      </div>


      {/* Progress Section */}
      <div className="progress-section">
        <h2>{currentData.title}</h2>
        <p>Tỷ lệ tuân thủ uống thuốc của bạn trong 30 ngày qua</p>


        <div className="progress-container">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${takenPercent}%` }}
            ></div>
          </div>
          <div className="progress-labels">
            <span className="progress-percentage">{takenPercent}%</span>
            <span className="progress-percentage-right">{missedPercent}%</span>
          </div>
        </div>


        <div className="progress-stats">
          <div className="stat-item stat-success">
            <div className="stat-icon">✓</div>
            <div className="stat-content">
              <div className="stat-title">Đã uống đúng giờ</div>
              <div className="stat-value">{takenPercent}% liều thuốc</div>
            </div>
          </div>
          <div className="stat-item stat-missed">
            <div className="stat-icon">⚠</div>
            <div className="stat-content">
              <div className="stat-title">Bỏ lỡ</div>
              <div className="stat-value">{missedPercent}% liều thuốc</div>
            </div>
          </div>
        </div>
      </div>


      {/* Schedule Section */}
      <div className="schedule-section">
        <div className="schedule-header">
          <h2>Lịch uống thuốc</h2>
          <p>
            {(() => {
              const selected = weekDays.find((d) => d.date === selectedDate);
              if (!selected) return "";
              return `${selected.day}, ${selected.fullDate.toLocaleDateString(
                "vi-VN"
              )}`;
            })()}
          </p>
        </div>


        {/* Calendar Navigation */}
        <div className="calendar-nav">
          <button
            className="nav-btn"
            onClick={() => changeWeek(currentWeekOffset - 1)}
          >
            ‹
          </button>
          <div className="week-days">
            {weekDays.map((day) => {
              const isAvailable = activeDates.includes(
                day.fullDate.toDateString()
              );


              return (
                <div
                  key={day.date}
                  className={`day-item ${
                    selectedDate === day.date ? "active" : ""
                  } ${!isAvailable ? "disabled-day" : ""}`}
                  onClick={() => {
                    if (isAvailable) handleDateSelect(day.date);
                  }}
                >
                  <div className="day-name">{day.day}</div>
                  <div className="day-date">{day.date}</div>
                </div>
              );
            })}
          </div>
          <button
            className="nav-btn"
            onClick={() => changeWeek(currentWeekOffset + 1)}
          >
            ›
          </button>
        </div>


        {/* Medication List */}
        <div className="medication-list">
          {currentData.medications.map((medication) => (
            <div key={medication.scheduleId} className="medication-item">
              <div className="medication-icon">
                <PillIcon size={20} />
              </div>
              <div className="medication-info">
                <div className="medication-name">{medication.medicineName}</div>
                <div className="medication-dosage">{medication.dose}</div>
                <div className="medication-time">
                  <Clock size={14} />
                  {new Date(medication.eventDate).toLocaleTimeString("vi-VN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
              <div className="medication-action">
                <button
                  className={`action-btn ${getStatusClass(medication.status)}`}
                  onClick={() =>
                    handleMedicationAction(
                      medication.scheduleId,
                      medication.status
                    )
                  }
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
  );
};


export default Pill;