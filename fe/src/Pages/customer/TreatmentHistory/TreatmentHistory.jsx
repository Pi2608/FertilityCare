"use client"
import "./TreatmentHistory.css"
import { CalendarIcon } from "lucide-react"

const TreatmentHistory = ({ userName = "Nguyễn Thị Hoa" }) => {
  const ongoingTreatments = [
    {
      id: 1,
      title: "IVF - Chu kỳ #2",
      date: "Thứ Tư, 22/05/2024",
      time: "10:30",
      doctor: "Bác sĩ Nguyễn Lan Anh",
    },
  ]

  const completedTreatments = [
    {
      id: 2,
      title: "IVF - Chu kỳ #1",
      date: "Thứ Năm, 15/02/2024",
      time: "09:00",
      doctor: "Bác sĩ Nguyễn Lan Anh",
    },
    {
      id: 3,
      title: "IUI - Chu kỳ #3",
      date: "Chủ Nhật, 10/12/2023",
      time: "14:00",
      doctor: "Bác sĩ Phạm Thanh",
    },
    {
      id: 4,
      title: "IUI - Chu kỳ #2",
      date: "Chủ Nhật, 15/10/2023",
      time: "11:30",
      doctor: "Bác sĩ Phạm Thanh",
    },
  ]

  return (
    <div className="treatment-history-page">
<h2>Lịch sử điều trị</h2>
<br></br>
      <div className="treatment-container">
      
        <section className="treatment-section">
          <h4>Đang diễn ra</h4>
          <div className="treatments-list">
            {ongoingTreatments.map((treatment) => (
              <div key={treatment.id} className="treatment-card ongoing">
                <div className="treatment-icon">
                  <CalendarIcon size={24} />
                </div>

                <div className="treatment-info">
                  <h5>{treatment.title}</h5>
                  <p>
                    {treatment.date} - {treatment.time}
                  </p>
                  <p className="doctor-name">{treatment.doctor}</p>
                </div>

                <div className="treatment-actions">
                  <button className="primary-btn">Xem chi tiết</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="treatment-section">
          <h4>Đã hoàn thành</h4>
          <div className="treatments-list">
            {completedTreatments.map((treatment) => (
              <div key={treatment.id} className="treatment-card completed">
                <div className="treatment-icon completed-icon">
                  <CalendarIcon size={24} />
                </div>

                <div className="treatment-info">
                  <h5>{treatment.title}</h5>
                  <p>
                    {treatment.date} - {treatment.time}
                  </p>
                  <p className="doctor-name">{treatment.doctor}</p>
                </div>

                <div className="treatment-actions">
                  <button className="btn-outline">Xem chi tiết</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default TreatmentHistory
