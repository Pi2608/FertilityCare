import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PatientProfile.css';

const patientData = {
  id: 'PT-2024-0123',
  name: 'Nguyễn Thị Hoa',
  avatar: 'https://i.pravatar.cc/100?img=1',
  status: 'Đang điều trị',
  age: 34,
  birthDate: '15/06/1989',
  gender: 'Nữ',
  phone: '0912345678',
  email: 'hoa.nguyen@email.com',
  address: '123 Đường Lê Lợi, Quận ...',
  treatment: 'IVF Chu kỳ #2',
  startDate: '01/04/2024',
  doctor: 'BS. Nguyễn Lan Anh',
  medicalHistory: [
    'Vô sinh nguyên phát',
    'Lạc nội mạc tử cung nhẹ',
    'Đã trải qua 1 chu kỳ IVF không thành công (12/2023)'
  ],
  familyHistory: [
    'Không có tiền sử gia đình về vô sinh',
    'Mẹ có tiền sử lạc nội mạc tử cung'
  ],
  allergies: ['Không có']
};

const appointments = [
  {
    id: 1,
    type: 'Tư vấn theo dõi',
    date: '20/05/2024',
    time: '09:00 - 09:30',
    doctor: 'BS. Nguyễn Lan Anh',
    status: 'upcoming',
    actions: ['Chi tiết', 'Đổi lịch']
  },
  {
    id: 2,
    type: 'Siêu âm theo dõi',
    date: '25/05/2024',
    time: '10:15 - 10:45',
    doctor: 'BS. Nguyễn Lan Anh',
    status: 'upcoming',
    actions: ['Chi tiết', 'Đổi lịch']
  },
  {
    id: 3,
    type: 'Tư vấn',
    date: '05/05/2024',
    time: '14:00 - 14:30',
    doctor: 'BS. Nguyễn Lan Anh',
    status: 'completed',
    actions: ['Xem ghi chú']
  }
];

const testResults = [
  {
    id: 1,
    name: 'Xét nghiệm nội tiết',
    date: '05/05/2024',
    result: 'Nồng độ FSH, LH, E2 trong giới hạn bình thường',
    status: 'completed'
  },
  {
    id: 2,
    name: 'Siêu âm buồng trứng',
    date: '15/04/2024',
    result: 'Số lượng nang noãn: 12',
    status: 'completed'
  }
];

const medications = [
  {
    id: 1,
    name: 'Gonal-F',
    dosage: '150 IU',
    frequency: 'Hàng ngày',
    startDate: '10/05/2024',
    status: 'active',
    actions: ['Chỉnh sửa', 'Ngừng']
  },
  {
    id: 2,
    name: 'Cetrotide',
    dosage: '0.25mg',
    frequency: 'Hàng ngày',
    startDate: '15/05/2024',
    status: 'active',
    actions: ['Chỉnh sửa', 'Ngừng']
  }
];

export default function PatientProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSections, setExpandedSections] = useState({
    medicalHistory: true,
    familyHistory: false,
    allergies: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'upcoming': { class: 'info', text: 'Đã lên lịch' },
      'completed': { class: 'success', text: 'Hoàn thành' },
      'active': { class: 'success', text: 'Đang dùng' }
    };
    const statusInfo = statusMap[status] || { class: 'default', text: status };
    return <span className={`status-badge ${statusInfo.class}`}>{statusInfo.text}</span>;
  };

  const renderOverview = () => (
    <div className="overview-content">
      <h3>Lịch hẹn</h3>
      <p className="section-desc">Lịch sử và lịch hẹn sắp tới</p>
      
      <div className="section-header">
        <h4>Lịch hẹn sắp tới</h4>
        <button className="btn-primary">Đặt lịch hẹn mới</button>
      </div>

      <div className="appointments-list">
        {appointments.filter(apt => apt.status === 'upcoming').map(appointment => (
          <div key={appointment.id} className="appointment-card">
            <div className="appointment-info">
              <div className="appointment-type">{appointment.type}</div>
              <div className="appointment-details">
                {appointment.date} | {appointment.time}
              </div>
              <div className="appointment-doctor">BS. {appointment.doctor}</div>
            </div>
            <div className="appointment-actions">
              {appointment.actions.map((action, index) => (
                <button key={index} className={index === 0 ? 'btn-outline' : 'btn-danger'}>
                  {action}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="section-header">
        <h4>Lịch sử cuộc hẹn</h4>
      </div>

      <div className="appointments-list">
        {appointments.filter(apt => apt.status === 'completed').map(appointment => (
          <div key={appointment.id} className="appointment-card completed">
            <div className="appointment-info">
              <div className="appointment-type">{appointment.type}</div>
              <div className="appointment-details">
                {appointment.date} | {appointment.time}
              </div>
              <div className="appointment-doctor">BS. {appointment.doctor}</div>
            </div>
            <div className="appointment-actions">
              {getStatusBadge('completed')}
              <button className="btn-link">Xem ghi chú</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAppointments = () => (
    <div className="appointments-content">
      <div className="section-header">
        <h3>Lịch hẹn</h3>
        <button className="btn-primary">Đặt lịch hẹn mới</button>
      </div>
      <p className="section-desc">Lịch sử và lịch hẹn sắp tới</p>

      <div className="section-header">
        <h4>Lịch hẹn sắp tới</h4>
      </div>

      <div className="appointments-list">
        {appointments.filter(apt => apt.status === 'upcoming').map(appointment => (
          <div key={appointment.id} className="appointment-card">
            <div className="appointment-icon">
              <div className="icon-circle info">⏰</div>
            </div>
            <div className="appointment-info">
              <div className="appointment-type">{appointment.type}</div>
              <div className="appointment-details">
                {appointment.date} | {appointment.time}
              </div>
              <div className="appointment-doctor">{appointment.doctor}</div>
            </div>
            <div className="appointment-actions">
              {getStatusBadge('info')}
              {appointment.actions.map((action, index) => (
                <button key={index} className={index === 0 ? 'btn-outline' : 'btn-danger'}>
                  {action}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="section-header">
        <h4>Lịch sử cuộc hẹn</h4>
      </div>

      <div className="appointments-list">
        {appointments.filter(apt => apt.status === 'completed').map(appointment => (
          <div key={appointment.id} className="appointment-card completed">
            <div className="appointment-icon">
              <div className="icon-circle success">✓</div>
            </div>
            <div className="appointment-info">
              <div className="appointment-type">{appointment.type}</div>
              <div className="appointment-details">
                {appointment.date} | {appointment.time}
              </div>
              <div className="appointment-doctor">{appointment.doctor}</div>
            </div>
            <div className="appointment-actions">
              {getStatusBadge('completed')}
              <button className="btn-link">Xem ghi chú</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTestResults = () => (
    <div className="test-results-content">
      <div className="section-header">
        <h3>Kết quả xét nghiệm</h3>
        <button className="btn-primary">Thêm kết quả mới</button>
      </div>
      <p className="section-desc">Lịch sử các xét nghiệm và kết quả</p>

      <div className="test-results-list">
        {testResults.map(test => (
          <div key={test.id} className="test-result-card">
            <div className="test-icon">
              <div className="icon-circle purple">📋</div>
            </div>
            <div className="test-info">
              <div className="test-name">{test.name}</div>
              <div className="test-date">Ngày: {test.date}</div>
              <div className="test-result">Kết quả: {test.result}</div>
            </div>
            <div className="test-actions">
              {getStatusBadge('completed')}
              <button className="btn-link">Xem chi tiết</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMedications = () => (
    <div className="medications-content">
      <div className="section-header">
        <h3>Thuốc</h3>
        <button className="btn-primary">Thêm thuốc mới</button>
      </div>
      <p className="section-desc">Thuốc hiện tại và lịch sử thuốc</p>

      <div className="section-header">
        <h4>Thuốc hiện tại</h4>
      </div>

      <div className="medications-list">
        {medications.map(medication => (
          <div key={medication.id} className="medication-card">
            <div className="medication-info">
              <div className="medication-name">{medication.name}</div>
              <div className="medication-details">
                <span>Liều lượng: {medication.dosage}</span>
                <span>Tần suất: {medication.frequency}</span>
                <span>Bắt đầu: {medication.startDate}</span>
              </div>
            </div>
            <div className="medication-actions">
              {getStatusBadge('active')}
              {medication.actions.map((action, index) => (
                <button key={index} className={index === 0 ? 'btn-outline' : 'btn-danger'}>
                  {action}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="patient-profile">
      <div className="profile-header">
        <button
          className="back-btn"
          onClick={() => navigate('/doctor-dashboard/patients')}
        >
          ← Quay lại
        </button>
        <h1>Hồ sơ bệnh nhân</h1>
      </div>

      <div className="profile-content">
        <div className="profile-sidebar">
          <div className="patient-card">
            <img src={patientData.avatar} alt="Patient" className="patient-avatar" />
            <div className="patient-info">
              <h2>{patientData.name}</h2>
              <p className="patient-id">ID: {patientData.id}</p>
              <span className={`status-badge ${patientData.status === 'Đang điều trị' ? 'success' : 'default'}`}>
                {patientData.status}
              </span>
            </div>
          </div>

          <div className="patient-details">
            <div className="detail-row">
              <span className="label">Tuổi:</span>
              <span className="value">{patientData.age}</span>
            </div>
            <div className="detail-row">
              <span className="label">Ngày sinh:</span>
              <span className="value">{patientData.birthDate}</span>
            </div>
            <div className="detail-row">
              <span className="label">Giới tính:</span>
              <span className="value">{patientData.gender}</span>
            </div>
            <div className="detail-row">
              <span className="label">Điện thoại:</span>
              <span className="value">{patientData.phone}</span>
            </div>
            <div className="detail-row">
              <span className="label">Email:</span>
              <span className="value">{patientData.email}</span>
            </div>
            <div className="detail-row">
              <span className="label">Địa chỉ:</span>
              <span className="value">{patientData.address}</span>
            </div>
            <div className="detail-row">
              <span className="label">Điều trị:</span>
              <span className="value">{patientData.treatment}</span>
            </div>
            <div className="detail-row">
              <span className="label">Ngày bắt đầu:</span>
              <span className="value">{patientData.startDate}</span>
            </div>
            <div className="detail-row">
              <span className="label">Bác sĩ phụ trách:</span>
              <span className="value">{patientData.doctor}</span>
            </div>
          </div>

          <div className="collapsible-sections">
            <div className="section">
              <div 
                className="section-header clickable" 
                onClick={() => toggleSection('medicalHistory')}
              >
                <span>Tiền sử bệnh</span>
                <span className={`arrow ${expandedSections.medicalHistory ? 'expanded' : ''}`}>▼</span>
              </div>
              {expandedSections.medicalHistory && (
                <div className="section-content">
                  <ul>
                    {patientData.medicalHistory.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="section">
              <div 
                className="section-header clickable" 
                onClick={() => toggleSection('familyHistory')}
              >
                <span>Tiền sử gia đình</span>
                <span className={`arrow ${expandedSections.familyHistory ? 'expanded' : ''}`}>▼</span>
              </div>
              {expandedSections.familyHistory && (
                <div className="section-content">
                  <ul>
                    {patientData.familyHistory.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="section">
              <div 
                className="section-header clickable" 
                onClick={() => toggleSection('allergies')}
              >
                <span>Dị ứng</span>
                <span className={`arrow ${expandedSections.allergies ? 'expanded' : ''}`}>▼</span>
              </div>
              {expandedSections.allergies && (
                <div className="section-content">
                  <ul>
                    {patientData.allergies.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="sidebar-actions">
            <button className="btn-outline">📞 Liên hệ</button>
            <button className="btn-primary">📅 Đặt lịch hẹn</button>
          </div>
        </div>

        <div className="profile-main">
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Tổng quan
            </button>
            <button 
              className={`tab ${activeTab === 'appointments' ? 'active' : ''}`}
              onClick={() => setActiveTab('appointments')}
            >
              Lịch hẹn
            </button>
            <button 
              className={`tab ${activeTab === 'results' ? 'active' : ''}`}
              onClick={() => setActiveTab('results')}
            >
              Kết quả xét nghiệm
            </button>
            <button 
              className={`tab ${activeTab === 'medications' ? 'active' : ''}`}
              onClick={() => setActiveTab('medications')}
            >
              Thuốc
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'appointments' && renderAppointments()}
            {activeTab === 'results' && renderTestResults()}
            {activeTab === 'medications' && renderMedications()}
          </div>
        </div>
      </div>
    </div>
  );
}
