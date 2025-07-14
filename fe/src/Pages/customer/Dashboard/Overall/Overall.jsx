import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiGateway from '../../../../features/service/apiGateway';
import './Overall.css';


const Overall = ({ userName = 'Nguyễn Thị Hoa' }) => {
  const navigate = useNavigate();

  // Mock data for Tổng quan
  const [ myTreatment, setMyTreatment ] = useState();
  const [ treatmentSteps, setTreatmentSteps ] = useState([]);

  const [ upcomingAppointments, setUpcomingAppointments ] = useState([]);


  const todaysMedications = [
    // {
    //   id: 1,
    //   name: 'Progesterone',
    //   dosage: '200mg',
    //   instruction: 'Uống sau bữa sáng',
    //   time: '8:00 AM',
    // },
    // {
    //   id: 2,
    //   name: 'Estradiol',
    //   dosage: '2mg',
    //   instruction: 'Uống sau bữa tối',
    //   time: '8:00 PM',
    // },
  ];


  const recentMessages = [
    // {
    //   id: 1,
    //   sender: 'Bác sĩ Nguyễn Lan Anh',
    //   avatarUrl: '', // Nếu có avatar URL
    //   content: 'Chào chị Hoa, kết quả xét nghiệm của chị đã có. Mọi thứ đều ổn và chúng ta có thể tiếp tục với kế hoạch điều trị như đã thảo luận.',
    //   time: 'Hôm qua, 14:30',
    // },
    // {
    //   id: 2,
    //   sender: 'Y tá Trần Thị Minh',
    //   avatarUrl: '',
    //   content: 'Xin nhắc chị Hoa nhớ mang theo sổ theo dõi thuốc khi đến cuộc hẹn tiếp theo vào thứ Tư nhé.',
    //   time: '2 ngày trước, 09:15',
    // },
  ];

  function formatDate(date) {
    if (typeof date === 'string') {
      date = new Date(date);
    }
    
    return date?.toLocaleDateString('en-GB'); // 'en-GB' format: dd/mm/yyyy
  }

  useEffect(() => {
    fetchMyTreatments();
    getUpcomingAppointments();
  },[]);

  const fetchMyTreatments = async () => {
    try {
      const response = await ApiGateway.getMyCycle();
      setMyTreatment(response.data[0]);
      if (response.data) {
        await getCycleSteps(response.data[0].cycleId);
      }
    } catch (error) {
      console.error("Error fetching treatments:", error);
    }
  };

  const getCycleSteps = async (cycleId) => {
    try {
      const response = await ApiGateway.getCycleStepsByCycleId(cycleId);
      setTreatmentSteps(response.data);
    } catch (error) {
      console.error("Error fetching cycle steps:", error);
    }
  };

  const getUpcomingAppointments = async () => {
    try {
      const response = await ApiGateway.getAllAppointments();
      let today = new Date();

        const upcomingAppointments = response.filter(appointment => {
            const appointmentDateTime = new Date(`${appointment.date}T${appointment.startTime}`);
            
            return appointmentDateTime > today;
        });
        
        upcomingAppointments.sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.startTime}`);
            const dateB = new Date(`${b.date}T${b.startTime}`);
            return dateA - dateB;
        });
        
        setUpcomingAppointments(upcomingAppointments);
    } catch (error) {
      console.error("Error fetching upcoming appointments:", error);
    }
  };

  const renderProgressBar = () => {
    const total = treatmentSteps?.length;
    const percent = ((myTreatment?.cycleStep?.length - 1) / (total - 1)) * 100;
    return (
        <div className="my-progress">
            <h3>Tiến trình điều trị {myTreatment?.serviceName} #{myTreatment?.cycleId}</h3>
            <div className="progress-header">
              <span></span>
              <span>{formatDate(myTreatment?.startDate)} - {formatDate(myTreatment?.endDate)}</span>
              <span>{Math.round(percent)}%</span>
            </div>


            <div className="progress-bar-wrapper">
                <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: `${percent}%` }} />
                </div>


                <div className="progress-steps">
                    {treatmentSteps.map((step, idx) => {
                        let className = '';
                        if (idx < myTreatment.cycleStep.length - 1) className = 'completed';
                        else if (idx === myTreatment.cycleStep.length - 1) className = 'in-progress';
                        else className = 'pending';
                        return (
                            <div key={idx} className={`step-item ${className}`}>
                              <div className="step-no">
                                <p>Bước {step.stepOrder}</p>
                                <span style={{color: '#666'}}>{formatDate(step.eventdate)}</span>
                              </div>
                              <div className="step-status">
                                {className === 'completed' && "Hoàn thành"}
                                {className === 'in-progress' && "Đang tiến hành"}
                                {className === 'pending' && "Chưa bắt đầu"}
                              </div>
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
                    {/* <button className="primary-btn">Đặt lịch hẹn</button> */}
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
                            <div key={appt.appointmentId} className="appointment-item">
                                <div className="appointment-info">
                                    <h4>
                                      {appt.type === " tu_van" ? "Tư vấn" : "Tái khám"} {appt.serviceId === 1 ? "IUI" : appt.serviceId === 2 ? "IVF" : ""}
                                      <span className={`status-label status-${appt.status.replace(/\s+/g, '').toLowerCase()}`}>{appt.status}</span>
                                    </h4>
                                    <p>{formatDate(appt.date)} - {appt.startTime}</p>
                                    {appt.doctorName && <p>Bác sĩ {appt.doctorName}</p>}
                                    {/* {appt.location && <p>{appt.location}</p>} */}
                                </div>
                                <div className="appointment-actions">
                                    <button className="btn-sm">Chi tiết</button>
                                    <button className="btn-sm">Đổi lịch</button>
                                </div>
                                
                            </div>
                        ))}
                        <button className="btn-link" onClick={() => navigate("/patient-dashboard/appointments")}>Xem tất cả lịch hẹn</button>
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
                        <button className="btn-link" onClick={() => navigate("/patient-dashboard/pills")}>Xem lịch uống thuốc đầy đủ</button>
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
                        <button className="btn-link" onClick={() => navigate("/patient-dashboard/messages")}>Xem tất cả tin nhắn</button>
                    </section>
                   
                </div>
            </div>
        </div>
  );
};


export default Overall;
