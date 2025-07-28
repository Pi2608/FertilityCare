import { useState, useEffect } from "react";
import ApiGateway from "@features/service/apiGateway";
import "./AppointmentsTuVan.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import apiAppointment from "@features/service/apiAppointment";
import apiNote from "@features/service/apiNote";
import apiMessage from "@features/service/apiMessage";
import { NotebookPen, Stethoscope, MessageSquare, Clock9 } from "lucide-react";

const AppointmentsTuVan = () => {
  const [appointmentDetail, setAppointmentDetail] = useState(null);
  const [activeTab, setActiveTab] = useState("notes");
  const [showResultForm, setShowResultForm] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [showMessagePopup, setShowMessagePopup] = useState(false);
  const [messageContent, setMessageContent] = useState("");

  const [newResult, setNewResult] = useState({
    name: "",
    value: "",
    unit: "",
    referenceRange: "",
    testDate: new Date().toISOString().slice(0, 10), // yyyy-mm-dd
    note: "",
  });

  const handleToggleResultForm = () => {
    setShowResultForm((prev) => !prev);
  };

  const handleResultInputChange = (e) => {
    const { name, value } = e.target;
    setNewResult((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateTestResult = async () => {
    try {
      const payload = {
        ...newResult,
        value: parseFloat(newResult.value),
        appointmentId: appointmentDetail.appointmentId,
      };

      await apiAppointment.createTestResult(payload);
      alert("Tạo kết quả xét nghiệm thành công!");
      setShowResultForm(false);
      setNewResult({
        name: "",
        value: "",
        unit: "",
        referenceRange: "",
        testDate: "",
        note: "",
      });

      const updated = await apiAppointment.getAppointmentDetailById(
        appointmentDetail.appointmentId
      );
      setAppointmentDetail(updated);
    } catch (err) {
      console.error("Lỗi khi tạo kết quả:", err);
      alert("Không thể tạo kết quả.");
    }
  };

  const handleAddNote = async () => {
    try {
      if (!newNote.trim()) {
        alert("Vui lòng nhập ghi chú.");
        return;
      }

      const payload = {
        note: newNote,
        status: "confirmed", // Gán cứng giá trị status là "confirmed"
      };
      console.log("Payload gửi đi:", payload); // Log payload
      console.log("Appointment ID:", appointmentDetail.appointmentId); // Log appointmentId

      const response = await apiNote.updateNoteForAppointment(
        appointmentDetail.appointmentId,
        payload
      );
      console.log("Response từ server:", response); // Log phản hồi từ server

      alert("Cập nhật ghi chú thành công!");

      const updated = await apiAppointment.getAppointmentDetailById(
        appointmentDetail.appointmentId
      );
      setAppointmentDetail(updated);
      setIsAddingNote(false);
      setNewNote("");
    } catch (err) {
      console.error("Lỗi khi cập nhật ghi chú:", err);
      console.error(
        "Chi tiết lỗi:",
        err.response ? err.response.data : err.message
      ); // Log chi tiết lỗi
      alert("Không thể cập nhật ghi chú.");
    }
  };

  const handleSendMessage = async () => {
    try {
      if (!messageContent.trim()) {
        alert("Vui lòng nhập nội dung tin nhắn.");
        return;
      }

      const payload = {
        receiverId: appointmentDetail.customerId, // Lấy customerId từ appointmentDetail
        message: messageContent,
      };

      await apiMessage.sendMessage(payload);
      alert("Gửi tin nhắn thành công!");
      setMessageContent("");
      setShowMessagePopup(false);
    } catch (err) {
      console.error("Lỗi khi gửi tin nhắn:", err);
      alert("Không thể gửi tin nhắn.");
    }
  };

  const handleEndAppointment = async (status) => {
    try {
      const payload = { status };
      await apiNote.updateNoteForAppointment(
        appointmentDetail.appointmentId,
        payload
      );
      alert(
        `Cập nhật thành công: ${status === "done" ? "Hoàn thành" : "Thất bại"}!`
      );
      const updated = await apiAppointment.getAppointmentDetailById(
        appointmentDetail.appointmentId
      );
      setAppointmentDetail(updated);
      setShowConfirmPopup(false);
    } catch (err) {
      console.error("Lỗi khi cập nhật trạng thái cuộc hẹn:", err);
      alert("Không thể cập nhật trạng thái cuộc hẹn.");
    }
  };

  const location = useLocation();
  const navigate = useNavigate();
  const { appointmentId } = location.state || {};

  const [expandedSections, setExpandedSections] = useState({
    medicalHistory: true,
    familyHistory: true,
    allergies: true,
    medicalRecords: false,
    prescribedMeds: false,
  });

  useEffect(() => {
    if (!appointmentId) {
      alert(
        "Thiếu thông tin lịch hẹn. Vui lòng quay lại danh sách và chọn lại."
      );
      navigate("/doctor-dashboard/appointments");
    }
  }, [appointmentId, navigate]);

  useEffect(() => {
    const fetchAppointmentDetail = async () => {
      try {
        const data = await apiAppointment.getAppointmentDetailById(
          appointmentId
        );
        console.log("Chi tiết lịch hẹn:", data);
        setAppointmentDetail(data);
      } catch (err) {
        console.error("Lỗi khi lấy chi tiết lịch hẹn:", err);
      }
    };

    if (appointmentId) {
      fetchAppointmentDetail();
    }
  }, [appointmentId]);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const patientData = appointmentDetail
    ? {
        name: appointmentDetail.customerName,
        id: `PT-${appointmentDetail.customerId}`,
        status:
          appointmentDetail.status === "done" ? "Hoàn thành" : "Đang điều trị",
        age: appointmentDetail.customerAge,
        birthDate: "",
        gender: "",
        phone: "",
        email: "",
        address: "",
        treatment: "",
        startDate: appointmentDetail.date
          ? new Date(appointmentDetail.date).toLocaleDateString("vi-VN")
          : "",

        doctor: appointmentDetail.doctorName,
        medicalHistory: [],
        familyHistory: [],
        allergies: [],
        currentAppointment: {
          date: appointmentDetail.date,
          time: appointmentDetail.startTime?.slice(0, 5),
          status: appointmentDetail.status,
          type: appointmentDetail.type === "tu_van" ? "Tư vấn" : "Tái khám",
          details: appointmentDetail.note,
        },
      }
    : null;

  const tabs = [
    { id: "notes", label: "Ghi chú khám", icon: NotebookPen },
    { id: "service", label: "Chỉ định dịch vụ", icon: Stethoscope },
  ];

  const renderServiceTab = () => {
    // Xác định tên dịch vụ dựa trên serviceId
    const getServiceName = (serviceId) => {
      switch (serviceId) {
        case 0:
          return "Chưa chỉ định";
        case 1:
          return "IUI";
        case 2:
          return "IVF";
        default:
          return "Chưa chỉ định";
      }
    };

    return (
      <div className="patient-profile-tab-content">
        <h3>Chỉ định dịch vụ</h3>
        <p>
          Dịch vụ mà bác sĩ đã chỉ định:{" "}
          <strong>{getServiceName(appointmentDetail?.serviceId)}</strong>
        </p>
      </div>
    );
  };

  const renderNotesTab = () => (
    <div className="patient-profile-tab-content">
      <div className="patient-profile-notes-header">
        <div>
          <h3>Ghi chú khám bệnh</h3>
          <p>Ghi chú và theo dõi quá trình điều trị</p>
        </div>

        {isAddingNote && (
          <div style={{ marginTop: "1rem" }}>
            <textarea
              className="form-textarea"
              rows={3}
              placeholder="Nhập ghi chú..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />
            <div className="button-group">
              <button className="btn btn-primary" onClick={handleAddNote}>
                Lưu ghi chú
              </button>
              <button
                className="btn btn-outline"
                onClick={() => {
                  setIsAddingNote(false);
                  setNewNote("");
                }}
              >
                Hủy
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="patient-profile-notes-section">
        <div className="patient-profile-notes-list">
          <div className="patient-profile-notes-section">
            <h4>Ghi chú từ cuộc hẹn</h4>
            {appointmentDetail?.note &&
            appointmentDetail.note.trim().toLowerCase() !== "string" ? (
              <div className="patient-profile-note-item">
                <div className="patient-profile-note-header">
                  <div className="patient-profile-note-date">
                    <span className="patient-profile-date-icon">📅</span>
                    <span>
                      {new Date(appointmentDetail.date).toLocaleDateString(
                        "vi-VN"
                      )}
                    </span>
                  </div>
                  <span className="patient-profile-note-type">Cuộc hẹn</span>
                </div>
                <div className="patient-profile-note-content">
                  <h5>Ghi chú khám:</h5>
                  <p>{appointmentDetail.note}</p>
                </div>
                <div className="patient-profile-note-footer">
                  <span className="patient-profile-doctor-name">
                    {appointmentDetail.doctorName}
                  </span>
                  <button className="patient-profile-btn-outline-blue">
                    Chỉnh sửa
                  </button>
                </div>
              </div>
            ) : (
              <p>Không có ghi chú nào được ghi nhận.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderResultsTab = () => {
    const testResults = appointmentDetail?.testResultViewDTOList || [];

    return (
      <div className="patient-profile-tab-content">
        <div className="patient-profile-results-header">
          <div>
            <h3>Kết quả xét nghiệm</h3>
            <p>Lịch sử các xét nghiệm và kết quả</p>
          </div>
          <button
            className="patient-profile-btn-primary"
            onClick={handleToggleResultForm}
          >
            ➕ Thêm kết quả mới
          </button>
        </div>

        {showResultForm && (
          <div className="patient-profile-result-form">
            <div className="form-group">
              <label>Tên xét nghiệm</label>
              <input
                type="text"
                name="name"
                value={newResult.name}
                onChange={handleResultInputChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Giá trị</label>
              <input
                type="number"
                name="value"
                value={newResult.value}
                onChange={handleResultInputChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Đơn vị</label>
              <input
                type="text"
                name="unit"
                value={newResult.unit}
                onChange={handleResultInputChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Khoảng tham chiếu</label>
              <input
                type="text"
                name="referenceRange"
                value={newResult.referenceRange}
                onChange={handleResultInputChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Ngày xét nghiệm</label>
              <input
                type="date"
                name="testDate"
                value={newResult.testDate}
                onChange={handleResultInputChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Ghi chú</label>
              <textarea
                name="note"
                rows={2}
                value={newResult.note}
                onChange={handleResultInputChange}
                className="form-textarea"
              />
            </div>
            <div className="button-group">
              <button
                className="btn btn-primary"
                onClick={handleCreateTestResult}
              >
                Lưu kết quả
              </button>
              <button
                className="btn btn-outline"
                onClick={handleToggleResultForm}
              >
                Hủy
              </button>
            </div>
          </div>
        )}

        <div className="patient-profile-results-by-phase">
          {testResults.filter((r) => !isNaN(Number(r.value))).length > 0 ? (
            <div className="patient-profile-phase-results-container">
              <div className="patient-profile-phase-results-header">
                <h4>Kết quả từ cuộc hẹn</h4>
                <span className="patient-profile-phase-period">
                  {new Date(appointmentDetail.date).toLocaleDateString("vi-VN")}
                </span>
              </div>
              <div className="patient-profile-results-list">
                {testResults
                  .filter((result) => !isNaN(Number(result.value)))
                  .map((result) => (
                    <div
                      key={result.resultId}
                      className="patient-profile-result-item"
                    >
                      <div className="patient-profile-result-icon">
                        <span className="patient-profile-icon-purple">📋</span>
                      </div>
                      <div className="patient-profile-result-details">
                        <h4>
                          {decodeURIComponent(
                            escape(result.name || "Không rõ tên")
                          )}
                        </h4>
                        <p>
                          Ngày:{" "}
                          {result.testDate
                            ? new Date(result.testDate).toLocaleDateString(
                                "vi-VN"
                              )
                            : "Không rõ"}
                        </p>
                        <p>
                          Kết quả: {result.value} {result.unit || ""}
                        </p>
                        <p>Ghi chú: {result.note || "Không có ghi chú"}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div>Chưa có kết quả xét nghiệm nào.</div>
          )}
        </div>
      </div>
    );
  };

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
        <h4>Thuốc theo giai đoạn điều trị</h4>
        <div className="patient-profile-medication-cards">
          {treatmentPhases
            .flatMap((phase) =>
              phase.medications.map((med, medIndex) => {
                const isActive =
                  phase.status === "active" &&
                  med.period.includes("2024") &&
                  !med.period.includes("Dự kiến");
                return {
                  key: `${phase.id}-${medIndex}`,
                  isActive,
                  phase,
                  med,
                  medIndex,
                };
              })
            )
            .sort((a, b) => {
              if (a.isActive && !b.isActive) return -1;
              if (!a.isActive && b.isActive) return 1;
              return 0;
            })
            .map(({ key, isActive, phase, med }) => (
              <div
                key={key}
                className={`patient-profile-medication-card ${
                  isActive
                    ? "patient-profile-active"
                    : "patient-profile-completed"
                }`}
              >
                <div className="patient-profile-med-header">
                  <h5>{med.name}</h5>
                  <span
                    className={`patient-profile-status-badge ${
                      isActive
                        ? "patient-profile-active"
                        : "patient-profile-completed"
                    }`}
                  >
                    {isActive ? "Đang dùng" : "Đã hoàn thành"}
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
                    <strong>Giai đoạn:</strong>{" "}
                    {phase.title.replace("Giai đoạn ", "")}
                  </p>
                </div>
                <div className="patient-profile-med-actions">
                  <button className="patient-profile-btn-outline-blue">
                    Xem chi tiết
                  </button>
                  {isActive && (
                    <button className="patient-profile-btn-outline-red">
                      Ngừng
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "notes":
        return renderNotesTab();
      case "results":
        return renderResultsTab();
      case "medications":
        return renderMedicationsTab();
      case "service":
        return renderServiceTab();
      default:
        return renderNotesTab();
    }
  };

  if (!appointmentDetail) return <div>Đang tải dữ liệu cuộc hẹn...</div>;

  return (
    <div className="patient-profile">
      <div className="patient-profile-header">
        <div className="patient-profile-header-left">
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
          <div className="patient-profile-header-info">
            <h1>Cuộc hẹn với {patientData.doctor}</h1>
            <div className="patient-profile-appointment-info">
              <span className="patient-profile-appointment-type">
                {patientData.currentAppointment.type}
              </span>
              <span className="patient-profile-appointment-time">
                <Clock9 className="time-icon" size={18} />
                 {patientData.currentAppointment.date} |{" "}
                {patientData.currentAppointment.time}
              </span>
              <span className="patient-profile-appointment-status">
                {patientData.currentAppointment.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {showConfirmPopup && (
        <div className="patient-profile-popup">
          <div className="patient-profile-popup-content">
            <h3>Xác nhận cuộc hẹn</h3>
            <p>Bạn có chắc chắn muốn kết thúc cuộc hẹn này?</p>
            <div className="button-group">
              <button
                className="btn btn-danger"
                onClick={() => handleEndAppointment("canceled")}
              >
                Đánh dấu Thất bại
              </button>
              <button
                className="btn btn-outline"
                onClick={() => setShowConfirmPopup(false)}
              >
                Hủy
              </button>
              <button
                className="btn btn-primary"
                onClick={() => handleEndAppointment("done")}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}

      {showMessagePopup && (
        <div className="patient-profile-popup">
          <div className="patient-profile-popup-content">
            <h3>Gửi tin nhắn</h3>
            <p>Nhập tin nhắn cho {patientData.name}</p>
            <div className="form-group">
              <textarea
                className="form-textarea"
                rows={4}
                placeholder="Nhập nội dung tin nhắn..."
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
              />
            </div>
            <div className="button-group">
              <button className="btn btn-primary" onClick={handleSendMessage}>
                Gửi
              </button>
              <button
                className="btn btn-outline"
                onClick={() => {
                  setShowMessagePopup(false);
                  setMessageContent("");
                }}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="patient-profile-container">
        <div className="patient-profile-sidebar">
          <div className="patient-profile-patient-info">
            <div className="patient-profile-patient-avatar">
              <img src="/src/asset/ivf.jpg" alt="Patient Avatar" />
            </div>
            <div className="patient-profile-patient-details">
              <h2>{patientData.name}</h2>
              <p className="patient-profile-patient-id">ID: {patientData.id}</p>
              <span className="patient-profile-status-badge patient-profile-active">
                {patientData.status}
              </span>
            </div>
          </div>

          <div className="patient-profile-patient-basic-info">
            <div className="patient-profile-info-row">
              <span className="patient-profile-label">Tuổi:</span>
              <span className="patient-profile-value">{patientData.age}</span>
            </div>
            <div className="patient-profile-info-row">
              <span className="patient-profile-label">Ngày bắt đầu:</span>
              <span className="patient-profile-value">
                {patientData.startDate}
              </span>
            </div>
            <div className="patient-profile-info-row">
              <span className="patient-profile-label">Bác sĩ phụ trách:</span>
              <span className="patient-profile-value">
                {patientData.doctor}
              </span>
            </div>
          </div>

          <div className="patient-profile-sidebar-actions">
            <button
              className="patient-profile-btn-outline"
              onClick={() => setShowMessagePopup(true)}
            >
              <MessageSquare size={15} className="mr-2" /> Nhắn tin
            </button>
          </div>
        </div>

        <div className="patient-profile-main-content">
          <div className="patient-profile-tabs">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  className={`patient-profile-tab ${
                    activeTab === tab.id ? "patient-profile-active" : ""
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="tab-icon">
                    <TabIcon size={18} className="mr-2" />
                  </span>
                  {tab.label}
                </button>
              );
            })}
          </div>

          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsTuVan;
