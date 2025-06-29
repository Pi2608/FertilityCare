import { useEffect, useState, React } from "react";
import "./PatientApt.css";
import { Calendar as CalendarIcon, Clock as ClockIcon } from "lucide-react";
import apiAppointment from "../../../../features/service/apiAppointment";


const PatientApt = ({ userName = "Nguyễn Thị Hoa" }) => {
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await apiAppointment.getAllAppointments();
        setAppointments(data);
      } catch (error) {
        console.error("Lỗi khi lấy lịch hẹn:", error);
      }
    };


    fetchAppointments();
  }, []);


  const now = new Date();


  const upcomingAppointments = appointments.filter(
    (appt) => new Date(`${appt.date}T${appt.startTime}`) >= now
  );


  const completedAppointments = appointments.filter(
    (appt) => new Date(`${appt.date}T${appt.startTime}`) < now
  );


  return (
    <div className="appointment-page">
      <div className="welcome-section">
        <div className="welcome-text">
          <h2>Xin chào, {userName}</h2>
          <p>Chào mừng quay trở lại với cổng thông tin bệnh nhân</p>
        </div>


            <div className="actions">
                {/* <button className="primary-btn">Đặt lịch hẹn</button> */}
                <button className="secondary-btn">Liên hệ bác sĩ</button>
            </div>
        </div>

      <div className="apt-container">
        <div className="page-title-actions">
          <h3>Lịch hẹn của tôi</h3>
          <button className="btn-primary">Đặt lịch mới</button>
        </div>
        <div className="subtitle">
          <p>Quản lý tất cả các cuộc hẹn sắp tới và đã qua</p>
        </div>


        <section className="patient-apt-section">
          <h4>Sắp tới</h4>
          <div className="appointments-list">
            {upcomingAppointments.map((appt) => (
              <div
                key={appt.appointmentId}
                className="appointment-card upcoming"
              >
                <div className="appointment-icon">
                  <CalendarIcon size={24} />
                </div>


                <div className="appointment-info">
                  <h5>{appt.type === "tu_van" ? "Tư vấn" : "Tái khám"}</h5>
                  <p>
                    {new Date(appt.date).toLocaleDateString("vi-VN")} -{" "}
                    {appt.startTime.slice(0, 5)}
                  </p>
                  <p className="doctor-name">Bác sĩ {appt.doctorName}</p>
                </div>


                <div className="appointment-actions">
                  <button className="secondary-btn">Đổi lịch</button>
                  <button className="primary-btn">Chi tiết</button>
                </div>
              </div>
            ))}
          </div>
        </section>


        <section className="patient-apt-section">
          <h4>Đã hoàn thành</h4>
          <div className="appointments-list">
            {completedAppointments.map((appt) => (
              <div
                key={appt.appointmentId}
                className="appointment-card completed"
              >
                <div className="appointment-icon completed-icon">
                  <CalendarIcon size={24} />
                </div>


                <div className="appointment-info">
                  <h5>{appt.type === "tu_van" ? "Tư vấn" : "Tái khám"}</h5>
                  <p>
                    {new Date(appt.date).toLocaleDateString("vi-VN")} -{" "}
                    {appt.startTime.slice(0, 5)}
                  </p>
                  <p className="doctor-name">Bác sĩ {appt.doctorName}</p>
                </div>


                <div className="appointment-actions">
                  <button className="btn-outline">Xem chi tiết</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};


export default PatientApt;