import React, { useState } from "react";
import mockPatientData from "../../../data/mockPatientData";
import { User } from "lucide-react";
import "./Profile.css";

const formatDateDisplay = (isoDate) => {
  if (!isoDate) return "";
  const [year, month, day] = isoDate.split("-");
  return `${day}/${month}/${year}`;
};

const parseDateInput = (isoDate) => {
  return isoDate;
};

const Profile = () => {
  const [patientData, setPatientData] = useState(mockPatientData);

  const [activeTab, setActiveTab] = useState("overview");
  const [expandedSections, setExpandedSections] = useState({
    medicalHistory: true,
    familyHistory: true,
    allergies: true,
  });

  // State cho chế độ chỉnh sửa basic info
  const [isEditingBasic, setIsEditingBasic] = useState(false);
  // State tạm cho form chỉnh sửa
  const [editBasicData, setEditBasicData] = useState({
    name: patientData.name,
    birthDate: patientData.birthDate,
    gender: patientData.gender,
    phone: patientData.phone,
    email: patientData.email,
    address: patientData.address,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Xử lý input thay đổi khi editing basic info
  const handleEditBasicChange = (e) => {
    const { name, value } = e.target;
    setEditBasicData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const startEditBasic = () => {
    setEditBasicData({
      name: patientData.name,
      birthDate: patientData.birthDate,
      gender: patientData.gender,
      phone: patientData.phone,
      email: patientData.email,
      address: patientData.address,
    });
    setIsEditingBasic(true);
  };

  const cancelEditBasic = () => {
    setIsEditingBasic(false);
  };

  const saveEditBasic = () => {
    setPatientData((prev) => ({
      ...prev,
      name: editBasicData.name,
      birthDate: editBasicData.birthDate,
      gender: editBasicData.gender,
      phone: editBasicData.phone,
      email: editBasicData.email,
      address: editBasicData.address,
    }));
    setIsEditingBasic(false);
  };

  const tabs = [
    { id: "overview", label: "Tổng quan", icon: "👤" },
    { id: "schedule", label: "Lịch hẹn", icon: "📅" },
    { id: "results", label: "Kết quả xét nghiệm", icon: "📋" },
    { id: "medications", label: "Thuốc", icon: "💊" },
  ];

  const renderOverviewTab = () => {
    const plan = patientData.treatmentPlan || {};
    return (
      <div className="patient-profile-tab-content">
        <div className="patient-profile-treatment-plan">
          <h3>Kế hoạch điều trị</h3>
          <p className="patient-profile-treatment-subtitle">
            Thông tin về kế hoạch điều trị hiện tại
          </p>

          <div className="patient-profile-treatment-cards">
            <div className="patient-profile-treatment-card patient-profile-current">
              <div className="patient-profile-card-icon">
                <span className="patient-profile-icon-red">⚠️</span>
              </div>
              <div className="patient-profile-card-content">
                <h4>Giai đoạn hiện tại</h4>
                <p>{plan.currentStage}</p>
              </div>
            </div>

            <div className="patient-profile-treatment-card patient-profile-next">
              <div className="patient-profile-card-icon">
                <span className="patient-profile-icon-blue">📅</span>
              </div>
              <div className="patient-profile-card-content">
                <h4>Giai đoạn tiếp theo</h4>
                <p>{plan.nextStage}</p>
                {plan.nextExpectedDate && (
                  <span className="patient-profile-date">
                    Dự kiến: {formatDateDisplay(plan.nextExpectedDate)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {plan.note && (
            <div className="patient-profile-treatment-note">
              <span className="patient-profile-note-icon">📝</span>
              <div>
                <h4>Ghi chú điều trị</h4>
                <p>{plan.note}</p>
              </div>
            </div>
          )}

          {patientData.medications && patientData.medications.length > 0 && (
            <div className="patient-profile-current-medications">
              <div className="patient-profile-section-header">
                <span className="patient-profile-section-icon">💊</span>
                <h4>Thuốc hiện tại</h4>
              </div>
              <div className="patient-profile-medication-list">
                {patientData.medications
                  .filter((m) => m.status === "active")
                  .map((med) => (
                    <div
                      key={med.id}
                      className="patient-profile-medication-item"
                    >
                      <div className="patient-profile-med-info">
                        <h5>{med.name}</h5>
                        <p>Liều lượng: {med.dosage}</p>
                        <p>Tần suất: {med.frequency}</p>
                        {med.startDate && (
                          <span className="patient-profile-med-date">
                            Bắt đầu: {formatDateDisplay(med.startDate)}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

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
          {patientData.schedule?.upcoming?.length > 0 ? (
            patientData.schedule.upcoming.map((app) => (
              <div
                key={app.id}
                className="patient-profile-appointment-item patient-profile-upcoming"
              >
                <div className="patient-profile-appointment-time">
                  <span className="patient-profile-time-icon">🕘</span>
                </div>
                <div className="patient-profile-appointment-details">
                  <h5>{app.title}</h5>
                  <p>
                    {formatDateDisplay(app.date)} | {app.time}
                  </p>
                  <p>{app.doctor}</p>
                  <div className="patient-profile-appointment-actions">
                    <button className="patient-profile-btn-outline-red">
                      Chi tiết
                    </button>
                    <button className="patient-profile-btn-outline-blue">
                      Dời lịch
                    </button>
                  </div>
                </div>
                <button className="patient-profile-reschedule-btn">
                  Đã lên lịch
                </button>
              </div>
            ))
          ) : (
            <p>Không có lịch hẹn sắp tới.</p>
          )}
        </div>
      </div>

      <div className="patient-profile-schedule-section">
        <h4>Lịch sử cuộc hẹn</h4>
        <div className="patient-profile-appointment-list">
          {patientData.schedule?.history?.length > 0 ? (
            patientData.schedule.history.map((app) => (
              <div
                key={app.id}
                className="patient-profile-appointment-item patient-profile-completed"
              >
                <div className="patient-profile-appointment-time">
                  <span className="patient-profile-time-icon patient-profile-completed">
                    ✅
                  </span>
                </div>
                <div className="patient-profile-appointment-details">
                  <h5>{app.title}</h5>
                  <p>
                    {formatDateDisplay(app.date)} | {app.time}
                  </p>
                  <p>{app.doctor}</p>
                  <button className="patient-profile-btn-outline-red">
                    Xem ghi chú
                  </button>
                </div>
                <span className="patient-profile-status-badge patient-profile-completed">
                  Hoàn thành
                </span>
              </div>
            ))
          ) : (
            <p>Chưa có lịch sử cuộc hẹn.</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderResultsTab = () => (
    <div className="patient-profile-tab-content">
      <div className="patient-profile-results-header">
        <div>
          <h3>Kết quả xét nghiệm</h3>
          <p>Lịch sử các xét nghiệm và kết quả</p>
        </div>
        <button className="patient-profile-btn-primary">
          ➕ Thêm kết quả mới
        </button>
      </div>

      <div className="patient-profile-results-list">
        {patientData.results?.length > 0 ? (
          patientData.results.map((res) => (
            <div key={res.id} className="patient-profile-result-item">
              <div className="patient-profile-result-icon">
                <span className="patient-profile-icon-purple">📋</span>
              </div>
              <div className="patient-profile-result-details">
                <h4>{res.title}</h4>
                <p>Ngày: {formatDateDisplay(res.date)}</p>
                <p>Kết quả: {res.result}</p>
                <button className="patient-profile-btn-outline">
                  Xem chi tiết
                </button>
              </div>
              <span className="patient-profile-status-badge patient-profile-completed">
                Hoàn thành
              </span>
            </div>
          ))
        ) : (
          <p>Chưa có kết quả xét nghiệm.</p>
        )}
      </div>
    </div>
  );

  const renderMedicationsTab = () => (
    <div className="patient-profile-tab-content">
      <div className="patient-profile-medications-header">
        <div>
          <h3>Thuốc</h3>
          <p>Thuốc hiện tại và lịch sử thuốc</p>
        </div>
        <button className="patient-profile-btn-primary">
          ➕ Thêm thuốc mới
        </button>
      </div>

      <div className="patient-profile-medications-section">
        <h4>Thuốc hiện tại</h4>
        <div className="patient-profile-medication-cards">
          {patientData.medications
            ?.filter((m) => m.status === "active")
            .map((med) => (
              <div
                key={med.id}
                className="patient-profile-medication-card patient-profile-active"
              >
                <div className="patient-profile-med-header">
                  <h5>{med.name}</h5>
                  <span className="patient-profile-status-badge patient-profile-active">
                    Đang dùng
                  </span>
                </div>
                <div className="patient-profile-med-details">
                  <p>
                    <strong>Liều lượng:</strong> {med.dosage}
                  </p>
                  <p>
                    <strong>Tần suất:</strong> {med.frequency}
                  </p>
                  {med.startDate && (
                    <p>
                      <strong>Bắt đầu:</strong>{" "}
                      {formatDateDisplay(med.startDate)}
                    </p>
                  )}
                </div>
                <div className="patient-profile-med-actions">
                  <button className="patient-profile-btn-outline-blue">
                    Chỉnh sửa
                  </button>
                  <button className="patient-profile-btn-outline-red">
                    Ngừng
                  </button>
                </div>
              </div>
            ))}
          {(!patientData.medications ||
            patientData.medications.filter((m) => m.status === "active")
              .length === 0) && <p>Chưa có thuốc đang dùng.</p>}
        </div>
        {/* Nếu muốn hiển thị lịch sử thuốc đã ngưng: lọc m.status==="stopped" */}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return renderOverviewTab();
      case "schedule":
        return renderScheduleTab();
      case "results":
        return renderResultsTab();
      case "medications":
        return renderMedicationsTab();
      default:
        return renderOverviewTab();
    }
  };

  return (
    <div className="patient-cus-profile">
      <div className="patient-profile-header">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.history.back();
          }}
          className="patient-profile-back-btn"
        >
          ← Quay lại
        </a>
        <h1>Hồ sơ bệnh nhân</h1>
      </div>

      <div className="patient-profile-container">
        <div className="patient-profile-sidebar">
          <div className="patient-profile-patient-info">
            <div className="patient-profile-patient-avatar">
              <img src="/src/asset/ivf.jpg" alt="Patient Avatar" />
            </div>
            <div className="patient-profile-patient-details">
              {isEditingBasic ? (
                // Khi chỉnh sửa tên
                <input
                  type="text"
                  name="name"
                  value={editBasicData.name}
                  onChange={handleEditBasicChange}
                  className="patient-profile-input-edit"
                />
              ) : (
                <h2>{patientData.name}</h2>
              )}
              <p className="patient-profile-patient-id">ID: {patientData.id}</p>
              <span className="patient-profile-status-badge patient-profile-active">
                {patientData.status}
              </span>
            </div>
          </div>

          <div className="patient-profile-patient-basic-info">
            {/* Nút edit/cancel/save */}
            <div className="edit-basic-buttons">
              {isEditingBasic ? (
                <>
                  <button
                    className="patient-profile-btn-outline-blue"
                    onClick={saveEditBasic}
                  >
                    Lưu
                  </button>
                  <button
                    className="patient-profile-btn-outline-red"
                    onClick={cancelEditBasic}
                  >
                    Hủy
                  </button>
                </>
              ) : (
                <button
                  className="patient-profile-btn-outline"
                  onClick={startEditBasic}
                >
                  ✏️ Chỉnh sửa thông tin
                </button>
              )}
            </div>

            {/* Hiển thị hoặc form editing thông tin cơ bản */}
            <div className="patient-profile-info-row">
              <span className="patient-profile-label">Ngày sinh:</span>
              {isEditingBasic ? (
                <input
                  type="date"
                  name="birthDate"
                  value={editBasicData.birthDate}
                  onChange={handleEditBasicChange}
                  className="patient-profile-input-edit"
                />
              ) : (
                <span className="patient-profile-value">
                  {formatDateDisplay(patientData.birthDate)}
                </span>
              )}
            </div>
            <div className="patient-profile-info-row">
              <span className="patient-profile-label">Giới tính:</span>
              {isEditingBasic ? (
                <select
                  name="gender"
                  value={editBasicData.gender}
                  onChange={handleEditBasicChange}
                  className="patient-profile-input-edit"
                >
                  <option value="">Chọn giới tính</option>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </select>
              ) : (
                <span
                  className={`patient-profile-value patient-profile-gender-${
                    patientData.gender === "female" ? "female" : "male"
                  }`}
                >
                  {patientData.gender === "male"
                    ? "Nam"
                    : patientData.gender === "female"
                    ? "Nữ"
                    : "Khác"}
                </span>
              )}
            </div>
            <div className="patient-profile-info-row">
              <span className="patient-profile-label">Điện thoại:</span>
              {isEditingBasic ? (
                <input
                  type="tel"
                  name="phone"
                  value={editBasicData.phone}
                  onChange={handleEditBasicChange}
                  className="patient-profile-input-edit"
                />
              ) : (
                <span className="patient-profile-value">
                  {patientData.phone}
                </span>
              )}
            </div>
            <div className="patient-profile-info-row">
              <span className="patient-profile-label">Email:</span>
              {isEditingBasic ? (
                <input
                  type="email"
                  name="email"
                  value={editBasicData.email}
                  onChange={handleEditBasicChange}
                  className="patient-profile-input-edit"
                />
              ) : (
                <span className="patient-profile-value">
                  {patientData.email}
                </span>
              )}
            </div>
            <div className="patient-profile-info-row">
              <span className="patient-profile-label">Địa chỉ:</span>
              {isEditingBasic ? (
                <input
                  type="text"
                  name="address"
                  value={editBasicData.address}
                  onChange={handleEditBasicChange}
                  className="patient-profile-input-edit"
                />
              ) : (
                <span className="patient-profile-value">
                  {patientData.address}
                </span>
              )}
            </div>
            <div className="patient-profile-info-row">
              <span className="patient-profile-label">Điều trị:</span>
              <span className="patient-profile-value">
                {patientData.treatment}
              </span>
            </div>
            <div className="patient-profile-info-row">
              <span className="patient-profile-label">Ngày bắt đầu:</span>
              <span className="patient-profile-value">
                {formatDateDisplay(patientData.startDate)}
              </span>
            </div>
            <div className="patient-profile-info-row">
              <span className="patient-profile-label">
                Bác sĩ phụ trách:
              </span>
              <span className="patient-profile-value">
                {patientData.doctor}
              </span>
            </div>
          </div>

          <div className="patient-profile-collapsible-sections">
            <div className="patient-profile-section">
              <button
                className="patient-profile-section-header"
                onClick={() => toggleSection("medicalHistory")}
              >
                <span>Tiền sử bệnh</span>
                <span>
                  {expandedSections.medicalHistory ? "▲" : "▼"}
                </span>
              </button>
              {expandedSections.medicalHistory && (
                <div className="patient-profile-section-content">
                  <ul>
                    {patientData.medicalHistory.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="patient-profile-section">
              <button
                className="patient-profile-section-header"
                onClick={() => toggleSection("familyHistory")}
              >
                <span>Tiền sử gia đình</span>
                <span>
                  {expandedSections.familyHistory ? "▲" : "▼"}
                </span>
              </button>
              {expandedSections.familyHistory && (
                <div className="patient-profile-section-content">
                  <ul>
                    {patientData.familyHistory.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="patient-profile-section">
              <button
                className="patient-profile-section-header"
                onClick={() => toggleSection("allergies")}
              >
                <span>Dị ứng</span>
                <span>
                  {expandedSections.allergies ? "▲" : "▼"}
                </span>
              </button>
              {expandedSections.allergies && (
                <div className="patient-profile-section-content">
                  <ul>
                    {patientData.allergies.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
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
                className={`patient-profile-tab ${
                  activeTab === tab.id ? "patient-profile-active" : ""
                }`}
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
  );
};

export default Profile;
