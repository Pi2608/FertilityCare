import React from 'react';
import './PatientApt.css';
import { Calendar as CalendarIcon, Clock as ClockIcon } from 'lucide-react';

const PatientApt = ({ userName = 'Nguyễn Thị Hoa' }) => {
  const upcomingAppointments = [
    {
      id: 1,
      title: 'Tư vấn theo dõi',
      date: 'Thứ Tư, 22/05/2024',
      time: '10:30',
      doctor: 'Bác sĩ Nguyễn Lan Anh',
    },
    {
      id: 2,
      title: 'Xét nghiệm máu',
      date: 'Thứ Sáu, 24/05/2024',
      time: '08:15',
      location: 'Phòng xét nghiệm - Tầng 2',
      doctor: null,
    },
  ];

  const completedAppointments = [
    {
      id: 3,
      title: 'Siêu âm theo dõi',
      date: 'Thứ Hai, 15/05/2024',
      time: '09:00',
      doctor: 'Bác sĩ Phạm Thanh',
      resultAvailable: true,
    },
    {
      id: 4,
      title: 'Tư vấn ban đầu',
      date: 'Thứ Tư, 08/05/2024',
      time: '14:00',
      doctor: 'Bác sĩ Nguyễn Lan Anh',
      notesAvailable: true,
    },
  ];

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
                        <div key={appt.id} className="appointment-card upcoming">
                            <div className="appointment-icon">
                                <CalendarIcon size={24} />
                            </div>

                            <div className="appointment-info">
                                <h5>{appt.title}</h5>
                                <p>{appt.date} - {appt.time}</p>
                                {appt.doctor && <p className="doctor-name">{appt.doctor}</p>}
                                {appt.location && <p className="location-text">{appt.location}</p>}
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
                    <div key={appt.id} className="appointment-card completed">
                        <div className="appointment-icon completed-icon">
                            <CalendarIcon size={24} />
                        </div>

                        <div className="appointment-info">
                            <h5>{appt.title}</h5>
                            <p>{appt.date} - {appt.time}</p>
                            {appt.doctor && <p className="doctor-name">{appt.doctor}</p>}
                        </div>
                        
                        <div className="appointment-actions">
                            {appt.resultAvailable && <button className="btn-outline">Xem kết quả</button>}
                            {appt.notesAvailable && <button className="btn-outline">Xem ghi chú</button>}
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
