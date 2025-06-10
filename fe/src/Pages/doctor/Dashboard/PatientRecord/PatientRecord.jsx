import { useState } from "react"
import "./PatientRecord.css"


const PatientRecord = () => {
  const [activeTab, setActiveTab] = useState("overview")
  const [expandedSections, setExpandedSections] = useState({
    medicalHistory: true,
    familyHistory: true,
    allergies: true,
    medicalRecords: false,
    prescribedMeds: false,
  })


  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }


  const patientData = {
    name: "Nguyễn Thị Hoa",
    id: "PT-2024-0123",
    status: "Đang điều trị",
    age: 34,
    birthDate: "15/06/1989",
    gender: "Nữ",
    phone: "0912345678",
    email: "hoa.nguyen@email.com",
    address: "123 Đường Lê Lợi, Quận 1, TP.HCM",
    treatment: "IVF Chu kỳ #2",
    startDate: "01/04/2024",
    doctor: "BS. Nguyễn Lan Anh",
    medicalHistory: [
      "Vô sinh nguyên phát",
      "Lạc nội mạc tử cung nhẹ",
      "Đã trải qua 1 chu kỳ IVF không thành công (12/2023)"
    ],
    familyHistory: [
      "Không có tiền sử gia đình về vô sinh",
      "Mẹ có tiền sử lạc nội mạc tử cung"
    ],
    allergies: ["Không có"],
    currentAppointment: {
      date: "",
      time: "",
      status: "",
     
    }
  }


  const tabs = [
    { id: "overview", label: "Tổng quan", icon: "👤" },
    { id: "schedule", label: "Lịch hẹn", icon: "📅" },
    { id: "notes", label: "Ghi chú khám", icon: "📝" },
    { id: "results", label: "Kết quả xét nghiệm", icon: "📋" },
    { id: "medications", label: "Thuốc", icon: "💊" },
  ]


  // Data for timeline - linked to other tabs
  const treatmentPhases = [
    {
      id: 1,
      title: "Giai đoạn 1: Chuẩn bị",
      period: "01/04 - 30/04/2024",
      status: "completed",
      notes: [
        {
          date: "30/04/2024",
          content: "Bệnh nhân đã hoàn thành tất cả xét nghiệm cần thiết. Kết quả tốt, sẵn sàng cho chu kỳ điều trị IVF.",
          doctor: "BS. Nguyễn Lan Anh"
        }
      ],
      results: [
        { name: "AMH", value: "2.8 ng/ml", status: "Bình thường", date: "25/04/2024" },
        { name: "FSH", value: "6.2 mIU/ml", status: "Tốt", date: "25/04/2024" },
        { name: "Siêu âm buồng trứng", value: "12 nang trứng", status: "Tốt", date: "28/04/2024" }
      ],
      medications: [
        { name: "Folic Acid 5mg", usage: "Uống 1 viên/ngày, sau ăn", period: "01/04 - 30/04/2024" },
        { name: "Vitamin D3 1000IU", usage: "Uống 1 viên/ngày, buổi sáng", period: "01/04 - 30/04/2024" }
      ]
    },
    {
      id: 2,
      title: "Giai đoạn 2: Kích thích buồng trứng",
      period: "01/05 - 20/05/2024",
      status: "active",
      notes: [
        {
          date: "20/05/2024",
          content: "Phản ứng tốt với thuốc kích thích. Nang trứng phát triển đều, kích thước phù hợp. Chuẩn bị trigger shot.",
          doctor: "BS. Nguyễn Lan Anh"
        },
        {
          date: "15/05/2024",
          content: "Theo dõi phản ứng kích thích. E2 tăng tốt, nang trứng phát triển đồng đều. Tiếp tục protocol.",
          doctor: "BS. Nguyễn Lan Anh"
        }
      ],
      results: [
        { name: "E2", value: "1200 pg/ml", status: "Tốt", date: "18/05/2024" },
        { name: "Siêu âm theo dõi", value: "8 nang trứng >14mm", status: "Đạt yêu cầu", date: "18/05/2024" },
        { name: "LH", value: "2.1 mIU/ml", status: "Ổn định", date: "18/05/2024" }
      ],
      medications: [
        { name: "Gonal-F 450 IU", usage: "Tiêm dưới da, buổi tối (21:00)", period: "01/05 - 18/05/2024" },
        { name: "Cetrotide 0.25mg", usage: "Tiêm dưới da, buổi sáng (08:00)", period: "10/05 - 18/05/2024" },
        { name: "Ovitrelle 250mcg", usage: "Tiêm dưới da, trigger shot", period: "20/05/2024" }
      ]
    },
    {
      id: 3,
      title: "Giai đoạn 3: Lấy trứng",
      period: "",
      status: "upcoming",
      notes: [
       
      ],
      results: [],
      medications: []
    }
  ]


  const renderOverviewTab = () => (
    <div className="patient-profile-tab-content">
      <div className="patient-profile-treatment-plan">
        <h3>Kế hoạch điều trị</h3>
        <p className="patient-profile-treatment-subtitle">Thông tin về kế hoạch điều trị hiện tại</p>


        <div className="patient-profile-treatment-cards">
          <div className="patient-profile-treatment-card patient-profile-current">
            <div className="patient-profile-card-icon">
              <span className="patient-profile-icon-red">⚠️</span>
            </div>
            <div className="patient-profile-card-content">
              <h4>Giai đoạn hiện tại</h4>
              <p>Kích thích buồng trứng</p>
            </div>
          </div>


          <div className="patient-profile-treatment-card patient-profile-next">
            <div className="patient-profile-card-icon">
              <span className="patient-profile-icon-blue">📅</span>
            </div>
            <div className="patient-profile-card-content">
              <h4>Giai đoạn tiếp theo</h4>
              <p>Thu trứng</p>
              <span className="patient-profile-date"></span>
            </div>
          </div>
        </div>






        <div className="patient-profile-treatment-timeline">
          <h3>Toàn bộ giai đoạn điều trị</h3>
          <div className="patient-profile-timeline">
            {treatmentPhases.map((phase) => (
              <div key={phase.id} className={`patient-profile-timeline-item patient-profile-${phase.status}`}>
                <div className="patient-profile-timeline-marker">
                  {phase.status === 'completed' ? '✓' : phase.status === 'active' ? '⏳' : '📅'}
                </div>
                <div className="patient-profile-timeline-content">
                  <div className="patient-profile-timeline-header">
                    <h4>{phase.title}</h4>
                    <span className="patient-profile-timeline-date">{phase.period}</span>
                  </div>
                  <div className="patient-profile-timeline-details">
                    {/* Ghi chú */}
                    {phase.notes.length > 0 && (
                      <div className="patient-profile-timeline-section">
                   
                        {phase.notes.map((note, index) => (
                          <div key={index} className="patient-profile-timeline-note">
                            <p><strong>{note.date}:</strong> {note.content}</p>
                            <span className="patient-profile-note-doctor">- {note.doctor}</span>
                          </div>
                        ))}
                      </div>
                    )}


                    {/* Kết quả xét nghiệm */}
                    {phase.results.length > 0 && (
                      <div className="patient-profile-timeline-section">
                        <h5>📋 Kết quả xét nghiệm:</h5>
                        <ul>
                          {phase.results.map((result, index) => (
                            <li key={index}>
                              <strong>{result.name}:</strong> {result.value} ({result.status}) - {result.date}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}


                    {/* Thuốc sử dụng */}
                    {phase.medications.length > 0 && (
                      <div className="patient-profile-timeline-section">
                        <h5>💊 Thuốc sử dụng:</h5>
                        <ul>
                          {phase.medications.map((med, index) => (
                            <li key={index}>
                              <strong>{med.name}:</strong> {med.usage} ({med.period})
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}


                    {/* Action buttons cho từng giai đoạn */}
                    <div className="patient-profile-timeline-actions">
                      {phase.status === 'active' && (
                        <div className="patient-profile-phase-actions">
                          
                          
                        </div>
                      )}
                      {phase.status === 'upcoming' && (
                        <div className="patient-profile-phase-actions">
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )


  const renderScheduleTab = () => (
    <div className="patient-profile-tab-content">
      <div className="patient-profile-schedule-header">
        <div>
          <h3>Lịch hẹn</h3>
          <p>Lịch sử và lịch hẹn sắp tới</p>
        </div>
        
      </div>


      <div className="patient-profile-schedule-section">
        <h4>Lịch hẹn sắp tới</h4>
        <div className="patient-profile-appointment-list">




          <div className="patient-profile-appointment-item patient-profile-upcoming">
            <div className="patient-profile-appointment-time">
              <span className="patient-profile-time-icon">🕘</span>
            </div>
            <div className="patient-profile-appointment-details">
              <h5>Siêu âm theo dõi</h5>
              <p>25/05/2024 | 10:15 - 10:45</p>
              <p>BS. Nguyễn Lan Anh</p>
              <div className="patient-profile-appointment-actions">
                {/* <button className="patient-profile-btn-outline-red">Chi tiết</button> */}
                
              </div>
            </div>
            <button className="patient-profile-reschedule-btn">Đã lên lịch</button>
          </div>
        </div>
      </div>


      <div className="patient-profile-schedule-section">
        <h4>Lịch sử cuộc hẹn</h4>
        <div className="patient-profile-appointment-list">
          <div className="patient-profile-appointment-item patient-profile-completed">
            <div className="patient-profile-appointment-time">
              <span className="patient-profile-time-icon patient-profile-completed">✅</span>
            </div>
            <div className="patient-profile-appointment-details">
              <h5>Tư vấn</h5>
              <p>05/05/2024 | 14:00 - 14:30</p>
              <p>BS. Nguyễn Lan Anh</p>
              {/* <button className="patient-profile-btn-outline-red">Xem ghi chú</button> */}
            </div>
            <span className="patient-profile-status-badge patient-profile-completed">Hoàn thành</span>
          </div>
        </div>
      </div>
    </div>
  )


  const renderNotesTab = () => (
    <div className="patient-profile-tab-content">
      <div className="patient-profile-notes-header">
        <div>
          <h3>Ghi chú khám bệnh</h3>
          <p>Ghi chú và theo dõi quá trình điều trị</p>
        </div>
        
      </div>


      <div className="patient-profile-notes-section">
        <h4>Ghi chú theo giai đoạn điều trị</h4>
        <div className="patient-profile-notes-list">
          {treatmentPhases.map((phase) =>
            phase.notes.map((note, noteIndex) => (
              <div key={`${phase.id}-${noteIndex}`} className="patient-profile-note-item">
                <div className="patient-profile-note-header">
                  <div className="patient-profile-note-date">
                    <span className="patient-profile-date-icon">📅</span>
                    <span>{note.date}</span>
                  </div>
                  <span className="patient-profile-note-type">{phase.title}</span>
                </div>
                <div className="patient-profile-note-content">
                  <h5>Ghi chú khám:</h5>
                  <p>{note.content}</p>
                </div>
                <div className="patient-profile-note-footer">
                  <span className="patient-profile-doctor-name">{note.doctor}</span>
                  
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )


  const renderResultsTab = () => (
    <div className="patient-profile-tab-content">
      <div className="patient-profile-results-header">
        <div>
          <h3>Kết quả xét nghiệm</h3>
          <p>Lịch sử các xét nghiệm và kết quả</p>
        </div>
        
      </div>


      <div className="patient-profile-results-by-phase">
        {treatmentPhases.map((phase) => {
          if (phase.results.length === 0) return null;


          return (
            <div key={phase.id} className="patient-profile-phase-results-container">
              <div className="patient-profile-phase-results-header">
                <h4>{phase.title}</h4>
                <span className="patient-profile-phase-period">{phase.period}</span>
              </div>


              <div className="patient-profile-results-list">
                {phase.results.map((result, resultIndex) => (
                  <div key={`${phase.id}-${resultIndex}`} className="patient-profile-result-item">
                    <div className="patient-profile-result-icon">
                      <span className="patient-profile-icon-purple">📋</span>
                    </div>
                    <div className="patient-profile-result-details">
                      <h4>{result.name}</h4>
                      <p>Ngày: {result.date}</p>
                      <p>Kết quả: {result.value}</p>
                      <p>Trạng thái: <strong>{result.status}</strong></p>
                      <button className="patient-profile-btn-outline">Xem chi tiết</button>
                    </div>
                    <span className="patient-profile-status-badge patient-profile-completed">Hoàn thành</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )


  const renderMedicationsTab = () => (
    <div className="patient-profile-tab-content">
      <div className="patient-profile-medications-header">
        <div>
          <h3>Thuốc</h3>
          <p>Thuốc hiện tại và lịch sử thuốc</p>
        </div>
      
      </div>


      <div className="patient-profile-medications-section">
        <h4>Thuốc theo giai đoạn điều trị</h4>
        <div className="patient-profile-medication-cards">
          {treatmentPhases
            .flatMap((phase) =>
              phase.medications.map((med, medIndex) => {
                const isActive = phase.status === 'active' && med.period.includes('2024') && !med.period.includes('Dự kiến');
                return {
                  key: `${phase.id}-${medIndex}`,
                  isActive,
                  phase,
                  med,
                  medIndex
                };
              })
            )
            .sort((a, b) => {
              // Thuốc đang dùng (isActive = true) lên trước
              if (a.isActive && !b.isActive) return -1;
              if (!a.isActive && b.isActive) return 1;
              return 0;
            })
            .map(({ key, isActive, phase, med }) => (
              <div key={key} className={`patient-profile-medication-card ${isActive ? 'patient-profile-active' : 'patient-profile-completed'}`}>
                <div className="patient-profile-med-header">
                  <h5>{med.name}</h5>
                  <span className={`patient-profile-status-badge ${isActive ? 'patient-profile-active' : 'patient-profile-completed'}`}>
                    {isActive ? 'Đang dùng' : 'Đã hoàn thành'}
                  </span>
                </div>
                <div className="patient-profile-med-details">
                  <p>
                    <strong>Cách dùng:</strong> {med.usage}
                  </p>
                  <p>
                    <strong>Thời gian:</strong> {med.period}
                  </p>
                  <p>
                    <strong>Giai đoạn:</strong> {phase.title.replace('Giai đoạn ', '')}
                  </p>
                </div>
                <div className="patient-profile-med-actions">
                  <button className="patient-profile-btn-outline-blue">Xem chi tiết</button>
                  
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )


  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return renderOverviewTab()
      case "schedule":
        return renderScheduleTab()
      case "notes":
        return renderNotesTab()
      case "results":
        return renderResultsTab()
      case "medications":
        return renderMedicationsTab()
      default:
        return renderOverviewTab()
    }
  }


  return (
    <div className="patient-profile">
      <div className="patient-profile-header">
        <div className="patient-profile-header-left">
          <a href="#" onClick={(e) => { e.preventDefault(); window.history.back(); }} className="patient-profile-back-btn">← Quay lại</a>
          <div className="patient-profile-header-info">
            <h1>Hồ sơ bệnh nhân</h1>
            <div className="patient-profile-appointment-info">
              <span className="patient-profile-appointment-type">{patientData.currentAppointment.type}</span>
            
              {/* <span className="patient-profile-appointment-status">{patientData.currentAppointment.status}</span> */}
            </div>
            <p className="patient-profile-appointment-details">{patientData.currentAppointment.details}</p>
          </div>
        </div>
        <div className="patient-profile-header-actions">
          
        </div>
      </div>


      <div className="patient-profile-container">
        <div className="patient-profile-sidebar">
          <div className="patient-profile-patient-info">
            <div className="patient-profile-patient-avatar">
              <img src="/src/asset/ivf.jpg" alt="Patient Avatar" />
            </div>
            <div className="patient-profile-patient-details">
              <h2>{patientData.name}</h2>
              <p className="patient-profile-patient-id">ID: {patientData.id}</p>
              <span className="patient-profile-status-badge patient-profile-active">{patientData.status}</span>
            </div>
          </div>


          <div className="patient-profile-patient-basic-info">
            <div className="patient-profile-info-row">
              <span className="patient-profile-label">Tuổi:</span>
              <span className="patient-profile-value">{patientData.age}</span>
            </div>
            <div className="patient-profile-info-row">
              <span className="patient-profile-label">Ngày sinh:</span>
              <span className="patient-profile-value">{patientData.birthDate}</span>
            </div>
            <div className="patient-profile-info-row">
              <span className="patient-profile-label">Giới tính:</span>
              <span className="patient-profile-value patient-profile-gender-female">{patientData.gender}</span>
            </div>


            <div className="patient-profile-info-row">
              <span className="patient-profile-label">Điều trị:</span>
              <span className="patient-profile-value">{patientData.treatment}</span>
            </div>
            <div className="patient-profile-info-row">
              <span className="patient-profile-label">Ngày bắt đầu:</span>
              <span className="patient-profile-value">{patientData.startDate}</span>
            </div>
            <div className="patient-profile-info-row">
              <span className="patient-profile-label">Bác sĩ phụ trách:</span>
              <span className="patient-profile-value">{patientData.doctor}</span>
            </div>
          </div>


          <div className="patient-profile-collapsible-sections">
            <div className="patient-profile-section">
              <button className="patient-profile-section-header" onClick={() => toggleSection("medicalHistory")}>
                <span>Tiền sử bệnh</span>
                <span>{expandedSections.medicalHistory ? "▲" : "▼"}</span>
              </button>
              {expandedSections.medicalHistory && (
                <div className="patient-profile-section-content">
                  <ul>
                    {patientData.medicalHistory.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>


            <div className="patient-profile-section">
              <button className="patient-profile-section-header" onClick={() => toggleSection("familyHistory")}>
                <span>Tiền sử gia đình</span>
                <span>{expandedSections.familyHistory ? "▲" : "▼"}</span>
              </button>
              {expandedSections.familyHistory && (
                <div className="patient-profile-section-content">
                  <ul>
                    {patientData.familyHistory.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>


            <div className="patient-profile-section">
              <button className="patient-profile-section-header" onClick={() => toggleSection("allergies")}>
                <span>Dị ứng</span>
                <span>{expandedSections.allergies ? "▲" : "▼"}</span>
              </button>
              {expandedSections.allergies && (
                <div className="patient-profile-section-content">
                  <ul>
                    {patientData.allergies.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>


            <div className="patient-profile-section">
              <button className="patient-profile-section-header" onClick={() => toggleSection("medicalRecords")}>
                <span>Lịch sử y tế</span>
                <span>{expandedSections.medicalRecords ? "▲" : "▼"}</span>
              </button>
              {expandedSections.medicalRecords && (
                <div className="patient-profile-section-content">
                  <div className="patient-profile-medical-record">
                    <div className="patient-profile-record-date">15/05/2024</div>
                    <div className="patient-profile-record-content">Siêu âm theo dõi - Phát triển nang trứng tốt</div>
                  </div>
                  <div className="patient-profile-medical-record">
                    <div className="patient-profile-record-date">10/05/2024</div>
                    <div className="patient-profile-record-content">Xét nghiệm hormone - Kết quả trong giới hạn bình thường</div>
                  </div>
                  <div className="patient-profile-medical-record">
                    <div className="patient-profile-record-date">05/05/2024</div>
                    <div className="patient-profile-record-content">Tư vấn khởi đầu chu kỳ IVF #2</div>
                  </div>
                </div>
              )}
            </div>


            <div className="patient-profile-section">
              <button className="patient-profile-section-header" onClick={() => toggleSection("prescribedMeds")}>
                <span>Thuốc đã kê</span>
                <span>{expandedSections.prescribedMeds ? "▲" : "▼"}</span>
              </button>
              {expandedSections.prescribedMeds && (
                <div className="patient-profile-section-content">
                  <div className="patient-profile-prescribed-med">
                    <div className="patient-profile-med-name">Gonal-F 450 IU</div>
                    <div className="patient-profile-med-usage">Tiêm dưới da, 1 lần/ngày, buổi tối</div>
                    <div className="patient-profile-med-period">01/05/2024 - 15/05/2024</div>
                  </div>
                  <div className="patient-profile-prescribed-med">
                    <div className="patient-profile-med-name">Cetrotide 0.25mg</div>
                    <div className="patient-profile-med-usage">Tiêm dưới da, 1 lần/ngày, buổi sáng</div>
                    <div className="patient-profile-med-period">10/05/2024 - 18/05/2024</div>
                  </div>
                </div>
              )}
            </div>
          </div>


          <div className="patient-profile-sidebar-actions">
            <button className="patient-profile-btn-outline">💬 Nhắn tin</button>
          </div>
        </div>


        <div className="patient-profile-main-content">
          <div className="patient-profile-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`patient-profile-tab ${activeTab === tab.id ? "patient-profile-active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>


          {renderTabContent()}
        </div>
      </div>
    </div>
  )
}


export default PatientRecord


