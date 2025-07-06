"use client";

import { useState } from "react";
import "./PatientAppointment.css";

const PatientAppointment = () => {
  const [activeTab, setActiveTab] = useState("notes");
  const [notes, setNotes] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [prescriptionText, setPrescriptionText] = useState("");
  const [medications, setMedications] = useState([]);
  const [showMedicationModal, setShowMedicationModal] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [customMedicationName, setCustomMedicationName] = useState("");
  const [medicationForm, setMedicationForm] = useState({
    dosage: "",
    frequency: "",
    duration: "",
    instructions: "",
  });

  // Danh sách thuốc có sẵn trong hệ thống
  const predefinedMedications = [
    {
      id: "1",
      name: "Gonal-F",
      commonDosages: ["75 IU", "150 IU", "225 IU", "300 IU"],
      category: "Hormone kích thích buồng trứng",
    },
    {
      id: "2",
      name: "Cetrotide",
      commonDosages: ["0.25mg", "3mg"],
      category: "Thuốc chống phóng noãn",
    },
    {
      id: "3",
      name: "Pregnyl",
      commonDosages: ["5000 IU", "10000 IU"],
      category: "Hormone hCG",
    },
    {
      id: "4",
      name: "Duphaston",
      commonDosages: ["10mg"],
      category: "Progesterone",
    },
    {
      id: "5",
      name: "Estrofem",
      commonDosages: ["2mg"],
      category: "Estrogen",
    },
  ];

  const patientData = {
    name: "Nguyễn Thị Hoa",
    id: "PT-2024-0123",
    age: 34,
    appointmentType: "Tư vấn theo dõi",
    cycle: "IVF Chu kỳ #2",
    date: "20/05/2024",
    time: "09:00 - 09:30",
    medicalHistory:
      "Đã hoàn thành 1 chu kỳ IVF không thành công. Hiện đang trong chu kỳ thứ 2.",
    lastVisit: "05/05/2024",
    currentMedications: ["Gonal-F 150 IU", "Cetrotide 0.25mg"],
  };

  const tabs = [
    { id: "notes", label: "Ghi chú" },
    { id: "diagnosis", label: "Chẩn đoán" },
    { id: "prescription", label: "Đơn thuốc" },
  ];

  const handleSaveNotes = () => {
    console.log("Saving notes:", notes);
    alert("Đã lưu ghi chú!");
  };

  const handleSaveDiagnosis = () => {
    console.log("Saving diagnosis:", diagnosis);
    alert("Đã lưu chẩn đoán!");
  };

  const handleSavePrescription = () => {
    console.log("Saving prescription:", prescriptionText);
    console.log("Medications:", medications);
    alert("Đã lưu đơn thuốc!");
  };

  const handleAddMedication = () => {
    const newMedication = {
      id: Date.now().toString(),
      name: selectedMedication ? selectedMedication.name : customMedicationName,
      dosage: medicationForm.dosage,
      frequency: medicationForm.frequency,
      duration: medicationForm.duration,
      instructions: medicationForm.instructions,
    };

    setMedications([...medications, newMedication]);
    setShowMedicationModal(false);
    setSelectedMedication(null);
    setCustomMedicationName("");
    setMedicationForm({
      dosage: "",
      frequency: "",
      duration: "",
      instructions: "",
    });
  };

  const handleRemoveMedication = (id) => {
    setMedications(medications.filter((med) => med.id !== id));
  };

  const handleFinishAppointment = () => {
    if (window.confirm("Bạn có chắc chắn muốn kết thúc cuộc hẹn?")) {
      alert("Cuộc hẹn đã được kết thúc!");
      // Redirect logic here
    }
  };

  const renderNotesTab = () => (
    <div className="patient-appointment-tab-content">
      <div className="patient-appointment-tab-header">
        <h3>Ghi chú cuộc hẹn</h3>
        <p>Ghi lại các thông tin quan trọng trong cuộc hẹn</p>
      </div>

      <div className="patient-appointment-form-group">
        <textarea
          className="patient-appointment-textarea"
          placeholder="Nhập ghi chú của bạn ở đây..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={12}
        />
      </div>

      <div className="patient-appointment-tab-actions">
        <button
          className="patient-appointment-btn-save"
          onClick={handleSaveNotes}
        >
          Lưu ghi chú
        </button>
      </div>
    </div>
  );

  const renderDiagnosisTab = () => (
    <div className="patient-appointment-tab-content">
      <div className="patient-appointment-tab-header">
        <h3>Chẩn đoán</h3>
        <p>Nhập chẩn đoán và kết quả đánh giá</p>
      </div>

      <div className="patient-appointment-form-group">
        <textarea
          className="patient-appointment-textarea"
          placeholder="Nhập chẩn đoán của bạn ở đây..."
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          rows={12}
        />
      </div>

      <div className="patient-appointment-tab-actions">
        <button
          className="patient-appointment-btn-save"
          onClick={handleSaveDiagnosis}
        >
          Lưu chẩn đoán
        </button>
      </div>
    </div>
  );

  const renderPrescriptionTab = () => (
    <div className="patient-appointment-tab-content">
      <div className="patient-appointment-tab-header">
        <h3>Đơn thuốc</h3>
        <p>Kê đơn thuốc và hướng dẫn điều trị</p>
      </div>

      {/* Danh sách thuốc đã kê */}
      {medications.length > 0 && (
        <div className="patient-appointment-medications-list">
          <h4>Thuốc đã kê:</h4>
          {medications.map((med) => (
            <div key={med.id} className="patient-appointment-medication-item">
              <div className="patient-appointment-medication-info">
                <h5>{med.name}</h5>
                <p>
                  <strong>Liều lượng:</strong> {med.dosage}
                </p>
                <p>
                  <strong>Tần suất:</strong> {med.frequency}
                </p>
                <p>
                  <strong>Thời gian:</strong> {med.duration}
                </p>
                {med.instructions && (
                  <p>
                    <strong>Hướng dẫn:</strong> {med.instructions}
                  </p>
                )}
              </div>
              <button
                className="patient-appointment-btn-remove"
                onClick={() => handleRemoveMedication(med.id)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="patient-appointment-add-medication-section">
        <button
          className="patient-appointment-btn-add-medication"
          onClick={() => setShowMedicationModal(true)}
        >
          ➕ Thêm thuốc
        </button>
      </div>

      <div className="patient-appointment-form-group">
        <label>Ghi chú thêm và hướng dẫn điều trị:</label>
        <textarea
          className="patient-appointment-textarea"
          placeholder="Nhập đơn thuốc và hướng dẫn điều trị ở đây..."
          value={prescriptionText}
          onChange={(e) => setPrescriptionText(e.target.value)}
          rows={8}
        />
      </div>

      <div className="patient-appointment-tab-actions">
        <button
          className="patient-appointment-btn-save"
          onClick={handleSavePrescription}
        >
          Lưu đơn thuốc
        </button>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "notes":
        return renderNotesTab();
      case "diagnosis":
        return renderDiagnosisTab();
      case "prescription":
        return renderPrescriptionTab();
      default:
        return renderNotesTab();
    }
  };

  return (
    <div className="patient-appointment">
      {/* Header */}
      <div className="patient-appointment-header">
        <div className="patient-appointment-header-left">
          <button className="patient-appointment-back-btn">← Quay lại</button>
          <h1>Cuộc hẹn với {patientData.name}</h1>
        </div>
        <div className="patient-appointment-header-right">
          <span className="patient-appointment-time">
            🕘 {patientData.time}
          </span>
          <button
            className="patient-appointment-btn-finish"
            onClick={handleFinishAppointment}
          >
            Kết thúc cuộc hẹn
          </button>
        </div>
      </div>

      <div className="patient-appointment-container">
        {/* Sidebar */}
        <div className="patient-appointment-sidebar">
          <div className="patient-appointment-patient-info">
            <div className="patient-appointment-patient-avatar">
              <div className="patient-appointment-avatar-placeholder">
                {patientData.name.charAt(0)}
              </div>
            </div>
            <div className="patient-appointment-patient-details">
              <h2>{patientData.name}</h2>
              <p>ID: {patientData.id}</p>
              <p>Tuổi: {patientData.age}</p>
            </div>
          </div>

          <div className="patient-appointment-details">
            <h3>Chi tiết cuộc hẹn</h3>
            <div className="patient-appointment-detail-row">
              <span className="patient-appointment-label">Loại cuộc hẹn:</span>
              <span className="patient-appointment-value">
                {patientData.appointmentType}
              </span>
            </div>
            <div className="patient-appointment-detail-row">
              <span className="patient-appointment-label">Chi tiết:</span>
              <span className="patient-appointment-value">
                {patientData.cycle}
              </span>
            </div>
            <div className="patient-appointment-detail-row">
              <span className="patient-appointment-label">Ngày:</span>
              <span className="patient-appointment-value">
                {patientData.date}
              </span>
            </div>
            <div className="patient-appointment-detail-row">
              <span className="patient-appointment-label">Thời gian:</span>
              <span className="patient-appointment-value">
                {patientData.time}
              </span>
            </div>
          </div>

          <div className="patient-appointment-medical-history">
            <h3>Lịch sử y tế</h3>
            <p>{patientData.medicalHistory}</p>
            <div className="patient-appointment-detail-row">
              <span className="patient-appointment-label">
                Lần khám gần nhất:
              </span>
              <span className="patient-appointment-value">
                {patientData.lastVisit}
              </span>
            </div>
          </div>

          <div className="patient-appointment-current-medications">
            <h3>Thuốc hiện tại</h3>
            <ul>
              {patientData.currentMedications.map((med, index) => (
                <li key={index}>{med}</li>
              ))}
            </ul>
          </div>

          <div className="patient-appointment-sidebar-actions">
            <button className="patient-appointment-btn-outline">
              📋 Xem hồ sơ đầy đủ
            </button>
            <button className="patient-appointment-btn-outline">
              💬 Liên hệ
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="patient-appointment-main">
          <div className="patient-appointment-header-section">
            <h2>Cuộc hẹn đang diễn ra</h2>
            <p>
              {patientData.appointmentType} - {patientData.date}
            </p>
          </div>

          <div className="patient-appointment-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`patient-appointment-tab ${
                  activeTab === tab.id ? "patient-appointment-active" : ""
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {renderTabContent()}
        </div>
      </div>

      {/* Medication Modal */}
      {showMedicationModal && (
        <div className="patient-appointment-modal-overlay">
          <div className="patient-appointment-medication-modal">
            <div className="patient-appointment-modal-header">
              <h3>Thêm thuốc</h3>
              <button
                className="patient-appointment-modal-close"
                onClick={() => setShowMedicationModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="patient-appointment-modal-content">
              <div className="patient-appointment-medication-selection">
                <h4>Chọn thuốc có sẵn:</h4>
                <div className="patient-appointment-predefined-medications">
                  {predefinedMedications.map((med) => (
                    <div
                      key={med.id}
                      className={`patient-appointment-medication-option ${
                        selectedMedication?.id === med.id
                          ? "patient-appointment-selected"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedMedication(med);
                        setCustomMedicationName("");
                      }}
                    >
                      <h5>{med.name}</h5>
                      <p>{med.category}</p>
                    </div>
                  ))}
                </div>

                <div className="patient-appointment-custom-medication">
                  <h4>Hoặc nhập tên thuốc mới:</h4>
                  <input
                    type="text"
                    placeholder="Nhập tên thuốc..."
                    value={customMedicationName}
                    onChange={(e) => {
                      setCustomMedicationName(e.target.value);
                      setSelectedMedication(null);
                    }}
                  />
                </div>
              </div>

              <div className="patient-appointment-medication-form">
                <div className="patient-appointment-form-row">
                  <label>Liều lượng:</label>
                  {selectedMedication ? (
                    <select
                      value={medicationForm.dosage}
                      onChange={(e) =>
                        setMedicationForm({
                          ...medicationForm,
                          dosage: e.target.value,
                        })
                      }
                    >
                      <option value="">Chọn liều lượng</option>
                      {selectedMedication.commonDosages.map((dosage) => (
                        <option key={dosage} value={dosage}>
                          {dosage}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      placeholder="Nhập liều lượng..."
                      value={medicationForm.dosage}
                      onChange={(e) =>
                        setMedicationForm({
                          ...medicationForm,
                          dosage: e.target.value,
                        })
                      }
                    />
                  )}
                </div>

                <div className="patient-appointment-form-row">
                  <label>Tần suất:</label>
                  <select
                    value={medicationForm.frequency}
                    onChange={(e) =>
                      setMedicationForm({
                        ...medicationForm,
                        frequency: e.target.value,
                      })
                    }
                  >
                    <option value="">Chọn tần suất</option>
                    <option value="Ngày 1 lần">Ngày 1 lần</option>
                    <option value="Ngày 2 lần">Ngày 2 lần</option>
                    <option value="Ngày 3 lần">Ngày 3 lần</option>
                    <option value="2 ngày 1 lần">2 ngày 1 lần</option>
                    <option value="Tuần 1 lần">Tuần 1 lần</option>
                  </select>
                </div>

                <div className="patient-appointment-form-row">
                  <label>Thời gian sử dụng:</label>
                  <input
                    type="text"
                    placeholder="VD: 7 ngày, 2 tuần..."
                    value={medicationForm.duration}
                    onChange={(e) =>
                      setMedicationForm({
                        ...medicationForm,
                        duration: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="patient-appointment-form-row">
                  <label>Hướng dẫn sử dụng:</label>
                  <textarea
                    placeholder="Nhập hướng dẫn sử dụng..."
                    value={medicationForm.instructions}
                    onChange={(e) =>
                      setMedicationForm({
                        ...medicationForm,
                        instructions: e.target.value,
                      })
                    }
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <div className="patient-appointment-modal-actions">
              <button
                className="patient-appointment-btn-cancel"
                onClick={() => setShowMedicationModal(false)}
              >
                Hủy
              </button>
              <button
                className="patient-appointment-btn-add"
                onClick={handleAddMedication}
                disabled={
                  (!selectedMedication && !customMedicationName) ||
                  !medicationForm.dosage ||
                  !medicationForm.frequency ||
                  !medicationForm.duration
                }
              >
                Thêm thuốc
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientAppointment;
