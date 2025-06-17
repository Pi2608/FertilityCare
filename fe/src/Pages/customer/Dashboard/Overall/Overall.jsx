import React, { useState } from 'react';
import './Overall.css';
import { useNavigate } from 'react-router-dom';




const Overall = ({ userName = 'Nguyễn Thị Hoa' }) => {
  const tabs = ['Tổng quan', 'Lịch hẹn', 'Điều trị', 'Hồ sơ'];
  const navigate = useNavigate();


  // Mock data for Tổng quan
  const ivfProgress = {
    currentStep: 3, // 1-based index
    steps: [
      { label: 'Kích trứng', status: 'completed' },
      { label: 'Lấy trứng', status: 'completed' },
      { label: 'Thụ tinh', status: 'in-progress' },
      { label: 'Chuyển phôi', status: 'pending' },
    ],
    dateInfo: 'Chu kỳ điều trị hiện tại: #2 - Ngày 6/13',
  };


  const upcomingAppointments = [
    {
      id: 1,
      title: 'Tư vấn theo dõi',
      date: 'Thứ Tư, 22/05/2024',
      time: '10:30',
      doctor: 'Bác sĩ Nguyễn Lan Anh',
      status: 'sắp tới',
    },
    {
      id: 2,
      title: 'Xét nghiệm máu',
      date: 'Thứ Sáu, 24/05/2024',
      time: '08:15',
      location: 'Phòng xét nghiệm - Tầng 2',
      status: 'đã lên lịch',
    },
  ];


  const todaysMedications = [
    {
      id: 1,
      name: 'Progesterone',
      dosage: '200mg',
      instruction: 'Uống sau bữa sáng',
      time: '8:00 AM',
    },
    {
      id: 2,
      name: 'Estradiol',
      dosage: '2mg',
      instruction: 'Uống sau bữa tối',
      time: '8:00 PM',
    },
  ];


  const recentMessages = [
    {
      id: 1,
      sender: 'Bác sĩ Nguyễn Lan Anh',
      avatarUrl: '', // Nếu có avatar URL
      content: 'Chào chị Hoa, kết quả xét nghiệm của chị đã có. Mọi thứ đều ổn và chúng ta có thể tiếp tục với kế hoạch điều trị như đã thảo luận.',
      time: 'Hôm qua, 14:30',
    },
    {
      id: 2,
      sender: 'Y tá Trần Thị Minh',
      avatarUrl: '',
      content: 'Xin nhắc chị Hoa nhớ mang theo sổ theo dõi thuốc khi đến cuộc hẹn tiếp theo vào thứ Tư nhé.',
      time: '2 ngày trước, 09:15',
    },
  ];


  const usefulDocs = [
    {
      id: 1,
      title: 'Hướng dẫn chuẩn bị cho chuyển phôi',
      type: 'PDF',
      pages: 5,
      link: '#',
    },
    {
      id: 2,
      title: 'Dinh dưỡng trong quá trình điều trị IVF',
      type: 'Video',
      duration: '12 phút',
      link: '#',
    },
  ];


  const renderProgressBar = () => {
    const total = ivfProgress.steps.length;
    const percent = ((ivfProgress.currentStep - 1) / (total - 1)) * 100;
    return (
        <div className="ivf-progress">
            <h3>Tiến trình điều trị</h3>
            <div className="progress-header">
                <span>{ivfProgress.dateInfo}</span>
                <span>{Math.round(percent)}%</span>
            </div>


            <div className="progress-bar-wrapper">
                <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: `${percent}%` }} />
                </div>


                <div className="progress-steps">
                    {ivfProgress.steps.map((step, idx) => {
                        let className = '';
                        if (idx < ivfProgress.currentStep - 1) className = 'completed';
                        else if (idx === ivfProgress.currentStep - 1) className = 'in-progress';
                        else className = 'pending';
                        return (
                            <div key={idx} className={`step-item ${className}`}>
                            <div className="step-icon"></div>
                            <span className="step-label">{step.label}</span>
                            </div>
                        );
                    })}
                </div>
            </div>


            <button className="btn-detail" onClick={() => navigate('/patient-dashboard/treatment-process')}>
  Xem chi tiết điều trị
</button>


        </div>
        );
    };


    return (
        <div className="patient-dashboard-main">
            <div className="welcome-section">
                <div className="welcome-text">
                    <h2>Xin chào, {userName}</h2>
                    <p>Chào mừng quay trở lại với cổng thông tin bệnh nhân</p>
                </div>


                <div className="actions">
                    <button className="primary-btn">Đặt lịch hẹn</button>
                    <button className="secondary-btn">Liên hệ bác sĩ</button>
                </div>
            </div>


            <div className="tab-content">
                <div className="overview-container">
                    <section className="overview-item progress-card">
                        {renderProgressBar()}
                    </section>
                    <section className="overview-item appointments-card">
                        <h3>Lịch hẹn sắp tới</h3>
                        {upcomingAppointments.map((appt) => (
                            <div key={appt.id} className="appointment-item">
                                <div className="appointment-info">
                                    <h4>{appt.title}</h4>
                                    <p>{appt.date} - {appt.time}</p>
                                    {appt.doctor && <p>{appt.doctor}</p>}
                                    {appt.location && <p>{appt.location}</p>}
                                </div>
                                <div className="appointment-actions">
                                    <button className="btn-sm">Chi tiết</button>
                                    <button className="btn-sm">Đổi lịch</button>
                                </div>
                                <span className={`status-label status-${appt.status.replace(/\s+/g, '').toLowerCase()}`}>{appt.status}</span>
                            </div>
                        ))}
                        <button className="btn-link">Xem tất cả lịch hẹn</button>
                    </section>
                    <section className="overview-item meds-card">
                        <h3>Lịch uống thuốc hôm nay</h3>
                        {todaysMedications.map((med) => (
                        <div key={med.id} className="med-item">
                            <div>
                                <h4>{med.name}</h4>
                                <p>{med.dosage} - Uống</p>
                                <p>{med.instruction}</p>
                            </div>
                            <span className="med-time">{med.time}</span>
                        </div>
                        ))}
                        <button className="btn-link">Xem lịch uống thuốc đầy đủ</button>
                    </section>
                    <section className="overview-item messages-card">
                        <h3>Tin nhắn gần đây</h3>
                        {recentMessages.map((msg) => (
                        <div key={msg.id} className="message-item">
                            <div className="message-avatar">
                                {msg.avatarUrl ? (
                                    <img src={msg.avatarUrl} alt={msg.sender} />
                                ) : (
                                    <div className="avatar-placeholder"></div>
                                )}
                            </div>
                            <div className="message-content">
                                <p className="sender-name">{msg.sender}</p>
                                <p className="message-text">{msg.content}</p>
                                <p className="message-time">{msg.time}</p>
                                <button className="btn-sm">Trả lời</button>
                            </div>
                        </div>
                        ))}
                        <button className="btn-link">Xem tất cả tin nhắn</button>
                    </section>
                   
                </div>
            </div>
        </div>
  );
};


export default Overall;
