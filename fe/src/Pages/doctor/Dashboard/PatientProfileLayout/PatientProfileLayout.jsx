import { useState } from "react"
import "./PatientProfileLayout.css"

const PatientProfileLayout = () => {
  const [activeTab, setActiveTab] = useState("overview")
  const [expandedSections, setExpandedSections] = useState({
    medicalHistory: true,
    familyHistory: true,
    allergies: true,
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
    address: "123 Đường Lê Lợi, Quận ...",
    treatment: "IVF Chu kỳ #2",
    startDate: "01/04/2024",
    doctor: "BS. Nguyễn Lan Anh",
  }

  const tabs = [
    { id: "overview", label: "Tổng quan", icon: "👤" },
    { id: "schedule", label: "Lịch hẹn", icon: "📅" },
    { id: "results", label: "Kết quả xét nghiệm", icon: "📋" },
    { id: "medications", label: "Thuốc", icon: "💊" },
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
              <span className="patient-profile-date">Dự kiến: 28/05/2024</span>
            </div>
          </div>
        </div>

        <div className="patient-profile-treatment-note">
          <span className="patient-profile-note-icon">📝</span>
          <div>
            <h4>Ghi chú điều trị</h4>
            <p>Đáp ứng tốt với liều pháp kích thích buồng trứng. Tiếp tục theo dõi sự phát triển của nang noãn.</p>
          </div>
        </div>

        <div className="patient-profile-current-medications">
          <div className="patient-profile-section-header">
            <span className="patient-profile-section-icon">💊</span>
            <h4>Thuốc hiện tại</h4>
          </div>
          <div className="patient-profile-medication-list">
            <div className="patient-profile-medication-item">
              <div className="patient-profile-med-info">
                <h5>Gonal-F</h5>
                <p>Liều lượng: 150 IU</p>
                <p>Tần suất: Hàng ngày</p>
                <span className="patient-profile-med-date">Bắt đầu: 10/05/2024</span>
              </div>
            </div>
            <div className="patient-profile-medication-item">
              <div className="patient-profile-med-info">
                <h5>Cetrotide</h5>
                <p>Liều lượng: 0.25mg</p>
                <p>Tần suất: Hàng ngày</p>
                <span className="patient-profile-med-date">Bắt đầu: 15/05/2024</span>
              </div>
            </div>
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
        <button className="patient-profile-btn-primary">📅 Đặt lịch hẹn mới</button>
      </div>

      <div className="patient-profile-schedule-section">
        <h4>Lịch hẹn sắp tới</h4>
        <div className="patient-profile-appointment-list">
          <div className="patient-profile-appointment-item patient-profile-upcoming">
            <div className="patient-profile-appointment-time">
              <span className="patient-profile-time-icon">🕘</span>
            </div>
            <div className="patient-profile-appointment-details">
              <h5>Tư vấn theo dõi</h5>
              <p>20/05/2024 | 09:00 - 09:30</p>
              <p>BS. Nguyễn Lan Anh</p>
              <div className="patient-profile-appointment-actions">
                <button className="patient-profile-btn-outline-red">Chi tiết</button>
                <button className="patient-profile-btn-outline-blue">Dời lịch</button>
              </div>
            </div>
            <button className="patient-profile-reschedule-btn">Đã lên lịch</button>
          </div>

          <div className="patient-profile-appointment-item patient-profile-upcoming">
            <div className="patient-profile-appointment-time">
              <span className="patient-profile-time-icon">🕘</span>
            </div>
            <div className="patient-profile-appointment-details">
              <h5>Siêu âm theo dõi</h5>
              <p>25/05/2024 | 10:15 - 10:45</p>
              <p>BS. Nguyễn Lan Anh</p>
              <div className="patient-profile-appointment-actions">
                <button className="patient-profile-btn-outline-red">Chi tiết</button>
                <button className="patient-profile-btn-outline-blue">Dời lịch</button>
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
              <button className="patient-profile-btn-outline-red">Xem ghi chú</button>
            </div>
            <span className="patient-profile-status-badge patient-profile-completed">Hoàn thành</span>
          </div>
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
        <button className="patient-profile-btn-primary">➕ Thêm kết quả mới</button>
      </div>

      <div className="patient-profile-results-list">
        <div className="patient-profile-result-item">
          <div className="patient-profile-result-icon">
            <span className="patient-profile-icon-purple">📋</span>
          </div>
          <div className="patient-profile-result-details">
            <h4>Xét nghiệm nội tiết</h4>
            <p>Ngày: 05/05/2024</p>
            <p>Kết quả: Nồng độ FSH, LH, E2 trong giới hạn bình thường</p>
            <button className="patient-profile-btn-outline">Xem chi tiết</button>
          </div>
          <span className="patient-profile-status-badge patient-profile-completed">Hoàn thành</span>
        </div>

        <div className="patient-profile-result-item">
          <div className="patient-profile-result-icon">
            <span className="patient-profile-icon-purple">📋</span>
          </div>
          <div className="patient-profile-result-details">
            <h4>Siêu âm buồng trứng</h4>
            <p>Ngày: 15/04/2024</p>
            <p>Kết quả: Số lượng nang noãn: 12</p>
            <button className="patient-profile-btn-outline">Xem chi tiết</button>
          </div>
          <span className="patient-profile-status-badge patient-profile-completed">Hoàn thành</span>
        </div>
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
        <button className="patient-profile-btn-primary">➕ Thêm thuốc mới</button>
      </div>

      <div className="patient-profile-medications-section">
        <h4>Thuốc hiện tại</h4>
        <div className="patient-profile-medication-cards">
          <div className="patient-profile-medication-card patient-profile-active">
            <div className="patient-profile-med-header">
              <h5>Gonal-F</h5>
              <span className="patient-profile-status-badge patient-profile-active">Đang dùng</span>
            </div>
            <div className="patient-profile-med-details">
              <p>
                <strong>Liều lượng:</strong> 150 IU
              </p>
              <p>
                <strong>Tần suất:</strong> Hàng ngày
              </p>
              <p>
                <strong>Bắt đầu:</strong> 10/05/2024
              </p>
            </div>
            <div className="patient-profile-med-actions">
              <button className="patient-profile-btn-outline-blue">Chỉnh sửa</button>
              <button className="patient-profile-btn-outline-red">Ngừng</button>
            </div>
          </div>

          <div className="patient-profile-medication-card patient-profile-active">
            <div className="patient-profile-med-header">
              <h5>Cetrotide</h5>
              <span className="patient-profile-status-badge patient-profile-active">Đang dùng</span>
            </div>
            <div className="patient-profile-med-details">
              <p>
                <strong>Liều lượng:</strong> 0.25mg
              </p>
              <p>
                <strong>Tần suất:</strong> Hàng ngày
              </p>
              <p>
                <strong>Bắt đầu:</strong> 15/05/2024
              </p>
            </div>
            <div className="patient-profile-med-actions">
              <button className="patient-profile-btn-outline-blue">Chỉnh sửa</button>
              <button className="patient-profile-btn-outline-red">Ngừng</button>
            </div>
          </div>
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
      <a href="#" onClick={(e) => { e.preventDefault(); window.history.back(); }} className="patient-profile-back-btn">← Quay lại</a>
        <h1>Hồ sơ bệnh nhân</h1>
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
              <span className="patient-profile-label">Điện thoại:</span>
              <span className="patient-profile-value">{patientData.phone}</span>
            </div>
            <div className="patient-profile-info-row">
              <span className="patient-profile-label">Email:</span>
              <span className="patient-profile-value">{patientData.email}</span>
            </div>
            <div className="patient-profile-info-row">
              <span className="patient-profile-label">Địa chỉ:</span>
              <span className="patient-profile-value">{patientData.address}</span>
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
                    <li>Vô sinh nguyên phát</li>
                    <li>Lạc nội mạc tử cung nhẹ</li>
                    <li>Đã trải qua 1 chu kỳ IVF không thành công (12/2023)</li>
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
                    <li>Không có tiền sử gia đình về vô sinh</li>
                    <li>Mẹ có tiền sử lạc nội mạc tử cung</li>
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
                    <li>Không có</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="patient-profile-sidebar-actions">
            <button className="patient-profile-btn-outline">✏️ Liên hệ</button>
            <button className="patient-profile-btn-primary">📅 Đặt lịch hẹn</button>
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

export default PatientProfileLayout
