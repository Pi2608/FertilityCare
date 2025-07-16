import { useState, useEffect } from "react";
import ApiGateway from "@features/service/apiGateway";
import "./PatientProfileLayout1.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import apiAppointment from "@features/service/apiAppointment";




const PatientProfileLayout1 = () => {
  const [appointmentDetail, setAppointmentDetail] = useState(null);
  const [activeTab, setActiveTab] = useState("notes");
  const [showResultForm, setShowResultForm] = useState(false);
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
    { id: "notes", label: "Ghi chú khám", icon: "📝" },
    { id: "results", label: "Kết quả xét nghiệm", icon: "📋" },
    { id: "service", label: "Chỉ định dịch vụ", icon: "🧪" },
  ];


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
          content:
            "Bệnh nhân đã hoàn thành tất cả xét nghiệm cần thiết. Kết quả tốt, sẵn sàng cho chu kỳ điều trị IVF.",
          doctor: "BS. Nguyễn Lan Anh",
        },
      ],
      results: [
        {
          name: "AMH",
          value: "2.8 ng/ml",
          status: "Bình thường",
          date: "25/04/2024",
        },
        { name: "FSH", value: "6.2 mIU/ml", status: "Tốt", date: "25/04/2024" },
        {
          name: "Siêu âm buồng trứng",
          value: "12 nang trứng",
          status: "Tốt",
          date: "28/04/2024",
        },
      ],
      medications: [
        {
          name: "Folic Acid 5mg",
          usage: "Uống 1 viên/ngày, sau ăn",
          period: "01/04 - 30/04/2024",
        },
        {
          name: "Vitamin D3 1000IU",
          usage: "Uống 1 viên/ngày, buổi sáng",
          period: "01/04 - 30/04/2024",
        },
      ],
    },
    {
      id: 2,
      title: "Giai đoạn 2: Kích thích buồng trứng",
      period: "01/05 - 20/05/2024",
      status: "active",
      notes: [
        {
          date: "20/05/2024",
          content:
            "Phản ứng tốt với thuốc kích thích. Nang trứng phát triển đều, kích thước phù hợp. Chuẩn bị trigger shot.",
          doctor: "BS. Nguyễn Lan Anh",
        },
        {
          date: "15/05/2024",
          content:
            "Theo dõi phản ứng kích thích. E2 tăng tốt, nang trứng phát triển đồng đều. Tiếp tục protocol.",
          doctor: "BS. Nguyễn Lan Anh",
        },
      ],
      results: [
        { name: "E2", value: "1200 pg/ml", status: "Tốt", date: "18/05/2024" },
        {
          name: "Siêu âm theo dõi",
          value: "8 nang trứng >14mm",
          status: "Đạt yêu cầu",
          date: "18/05/2024",
        },
        {
          name: "LH",
          value: "2.1 mIU/ml",
          status: "Ổn định",
          date: "18/05/2024",
        },
      ],
      medications: [
        {
          name: "Gonal-F 450 IU",
          usage: "Tiêm dưới da, buổi tối (21:00)",
          period: "01/05 - 18/05/2024",
        },
        {
          name: "Cetrotide 0.25mg",
          usage: "Tiêm dưới da, buổi sáng (08:00)",
          period: "10/05 - 18/05/2024",
        },
        {
          name: "Ovitrelle 250mcg",
          usage: "Tiêm dưới da, trigger shot",
          period: "20/05/2024",
        },
      ],
    },
    {
      id: 3,
      title: "Giai đoạn 3: Lấy trứng",
      period: "",
      status: "upcoming",
      notes: [],
      results: [],
      medications: [],
    },
  ];


  const renderServiceTab = () => <ServiceTabContent />;


  const renderNotesTab = () => (
    <div className="patient-profile-tab-content">
      <div className="patient-profile-notes-header">
        <div>
          <h3>Ghi chú khám bệnh</h3>
          <p>Ghi chú và theo dõi quá trình điều trị</p>
        </div>
        <button className="patient-profile-btn-primary">
          📝 Thêm ghi chú mới
        </button>
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


  // const renderResultsTab = () => {
  //   // Lấy testResults từ API
  //   const testResults = appointmentDetail?.testResultViewDTOList || [];


  //   return (
  //     <div className="patient-profile-tab-content">
  //       <div className="patient-profile-results-header">
  //         <div>
  //           <h3>Kết quả xét nghiệm</h3>
  //           <p>Lịch sử các xét nghiệm và kết quả</p>
  //         </div>
  //         <button className="patient-profile-btn-primary">
  //           ➕ Thêm kết quả mới
  //         </button>
  //       </div>
  //       <div className="patient-profile-results-by-phase">
  //         {/* Hiển thị testResult từ API chi tiết lịch hẹn */}
  //         {testResults.length > 0 ? (
  //           <div className="patient-profile-phase-results-container">
  //             <div className="patient-profile-phase-results-header">
  //               <h4>Kết quả từ cuộc hẹn</h4>
  //               <span className="patient-profile-phase-period">
  //                 {new Date(appointmentDetail.date).toLocaleDateString("vi-VN")}
  //               </span>
  //             </div>
  //             <div className="patient-profile-results-list">
  //               {testResults.map((result) => (
  //                 <div
  //                   key={result.resultId}
  //                   className="patient-profile-result-item"
  //                 >
  //                   <div className="patient-profile-result-icon">
  //                     <span className="patient-profile-icon-purple">📋</span>
  //                   </div>
  //                   <div className="patient-profile-result-details">
  //                     <h4>
  //                       {decodeURIComponent(
  //                         escape(result.name || "Không rõ tên")
  //                       )}
  //                     </h4>
  //                     <p>
  //                       Ngày:{" "}
  //                       {result.testDate
  //                         ? new Date(result.testDate).toLocaleDateString(
  //                             "vi-VN"
  //                           )
  //                         : "Không rõ"}
  //                     </p>
  //                     <p>
  //                       Kết quả: {result.value} {result.unit || ""}
  //                     </p>
  //                     <p>Ghi chú: {result.note || "Không có ghi chú"}</p>
  //                   </div>
  //                 </div>
  //               ))}
  //             </div>
  //           </div>
  //         ) : (
  //           <div>Chưa có kết quả xét nghiệm nào.</div>
  //         )}
  //       </div>
  //     </div>
  //   );
  // };


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
            <h1>Cuộc hẹn với {patientData.name}</h1>
            <div className="patient-profile-appointment-info">
              <span className="patient-profile-appointment-type">
                {patientData.currentAppointment.type}
              </span>
              <span className="patient-profile-appointment-time">
                🕘 {patientData.currentAppointment.date} |{" "}
                {patientData.currentAppointment.time}
              </span>
              <span className="patient-profile-appointment-status">
                {patientData.currentAppointment.status}
              </span>
            </div>
            {/* <p className="patient-profile-appointment-details">
              {patientData.currentAppointment.details}
            </p> */}
          </div>
        </div>
        <div className="patient-profile-header-actions">
          <button className="patient-profile-btn-danger">
            Kết thúc cuộc hẹn
          </button>
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
            {/* <div className="patient-profile-info-row">
              <span className="patient-profile-label">Ngày sinh:</span>
              <span className="patient-profile-value">
                {patientData.birthDate}
              </span>
            </div>
            <div className="patient-profile-info-row">
              <span className="patient-profile-label">Giới tính:</span>
              <span className="patient-profile-value patient-profile-gender-female">
                {patientData.gender}
              </span>
            </div>
            <div className="patient-profile-info-row">
              <span className="patient-profile-label">Điều trị:</span>
              <span className="patient-profile-value">
                {patientData.treatment}
              </span>
            </div> */}
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
            <button className="patient-profile-btn-outline">💬 Nhắn tin</button>
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


export default PatientProfileLayout1;


const ServiceTabContent = () => {
  const navigate = useNavigate();
  const { appointmentId } = useParams();
  const today = new Date();
  const [paymentForm, setPaymentForm] = useState({
    customerId: "",
    serviceId: "",
    appointmentId: appointmentId,
    appointmentDate: "",
    note: "",
    total: 0,
    type: "",
  });


  const [services, setServices] = useState([
    { id: 1, name: "IUI", price: 5000000 },
    { id: 2, name: "IVF", price: 70000000 },
  ]);


  const typeOptions = [
    { value: "test", label: "Test" },
    { value: "treatment", label: "Điều trị" },
  ];


  useEffect(() => {
    if (paymentForm.serviceId) {
      const selectedService = services.find(
        (service) => service.id.toString() === paymentForm.serviceId
      );
      if (selectedService) {
        setPaymentForm((prev) => ({ ...prev, total: selectedService.price }));
      }
    } else {
      setPaymentForm((prev) => ({ ...prev, total: 0 }));
    }
  }, [paymentForm.serviceId, services]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentForm((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async () => {
    try {
      const res = await ApiGateway.createPayment(paymentForm);
      console.log("Tạo chỉ định thành công:", res);
      alert("Tạo chỉ định thành công!");
    } catch (error) {
      console.error("Tạo chỉ định thất bại:", error);
      alert("Đã xảy ra lỗi khi tạo chỉ định.");
    }
  };


  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };


  const isFormValid =
    paymentForm.serviceId && paymentForm.appointmentDate && paymentForm.type;


  return (
    <div className="patient-profile-tab-content">
      <h3>Chỉ định dịch vụ</h3>
      <p>Điền thông tin chỉ định dịch vụ cho bệnh nhân</p>
      <div className="form-group">
        <label className="form-label required">Phương pháp</label>
        <select
          className="form-select"
          name="serviceId"
          value={paymentForm.serviceId}
          onChange={handleInputChange}
        >
          <option value="">Chọn phương pháp</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label className="form-label required">Ngày & Giờ khám</label>
        <input
          type="datetime-local"
          className="form-input"
          name="appointmentDate"
          value={paymentForm.appointmentDate}
          min={today.toISOString().slice(0, 16)}
          step={3600}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label className="form-label required">Loại</label>
        <select
          className="form-select"
          name="type"
          value={paymentForm.type}
          onChange={handleInputChange}
        >
          <option value="">Chọn loại khám</option>
          {typeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Ghi chú</label>
        <textarea
          className="form-textarea"
          name="note"
          rows={3}
          value={paymentForm.note}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Tổng số tiền</label>
        <input
          type="text"
          className="form-input"
          value={formatCurrency(paymentForm.total)}
          disabled
        />
      </div>
      <div className="button-group">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={!isFormValid}
        >
          Tạo lịch khám
        </button>
      </div>
    </div>
  );
};
