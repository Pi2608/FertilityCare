import { useState, useEffect,  useCallback, memo } from "react"
import ApiGateway from "../../../../features/service/apiGateway"
import { useNavigate, useParams } from "react-router-dom"
import { HashLoader, BeatLoader } from "react-spinners";
import { showSuccess, showFail, confirmToast } from "@lib/toast/toast"
import "./PatientProfileLayout.css"

const PatientProfileLayout = () => {
  const navigate = useNavigate();
  const { appointmentId, customerId } = useParams();
  const [activeTab, setActiveTab] = useState("overview")
  const [expandedSections, setExpandedSections] = useState({
    medicalHistory: true,
    familyHistory: true,
    allergies: true,
    medicalRecords: false,
    prescribedMeds: false,
  })
  const [currentCycle, setCurrentCycle] = useState(null); // Chu kỳ điều trị hiện tại
  const [appointmentHistory, setAppointmentHistory] = useState([]); // Lịch sử cuộc hẹn
  const [appointmentDetail, setAppointmentDetail] = useState([]); // Chi tiết cuộc hẹn hiện tại
  const [testResult, setTestResult] = useState([]); // Test RS của Cus
  const [cycleSteps, setCycleSteps] = useState([]); // Bước điều trị của chu kỳ
  const [cycleStepNames, setCycleStepNames] = useState([]); // Tên các bước điều trị
  const [cycleStepDetails, setCycleStepDetails] = useState([]); // Chi tiết step
  const [allCycleStep, setAllCycleStep] = useState([]); // Chi tiết tất cả các step
  const [pastAndCurrentSteps, setPastAndCurrentSteps] = useState([]); // Các bước đã và đang thực hiện
  const [medicationSchedules, setMedicationSchedules] = useState([]); // Lịch uống thuốc theo bước
  const [allMedicines, setAllMedicines] = useState([]); // Danh sách thuốc
  const [loading, setLoading] = useState(false); // Loading chung cho các thao tác async

  const [updateCycleStepNoteForm, setUpdateCycleStepNoteForm] = useState({
    cycleId: "",
    stepOrder: "",
    note: ""
  });

  const [updateTestResultForm, setUpdateTestResultForm] = useState({
    id: "",
    name: "",
    value: "",
    unit: "",
    referenceRange: "",
    note: "",
    testDate: ""
  });

  const [isOpenCreateReExamModal, setIsOpenCreateReExamModal] = useState(false); // Modal tạo lịch hẹn tái khám
  const [isOpenCreateMedicationModal, setIsOpenCreateMedicationModal] = useState(false); // Modal tạo lịch uống thuốc
  const [isOpenCreateTestResultModal, setIsOpenCreateTestResultModal] = useState(false); // Modal tạo kết quả xét nghiệm
  const [isOpenUpdateCycleStepNoteModal, setIsOpenUpdateCycleStepNoteModal] = useState(false); // Modal cập nhật ghi chú chu kỳ
  const [isOpenUpdateTestResultModal, setIsOpenUpdateTestResultModal] = useState(false); // Modal cập nhật kết quả xét nghiệm
  const [isOpenNewOnNewCycleModal, setIsOpenNewOnNewCycleModal] = useState(false); // Modal tạo lịch hẹn tái khám cho bước sau
  const [showConfirmEnd, setShowConfirmEnd] = useState(false); //  Confirm modal
  const [showConfirmEndCycle, setShowConfirmEndCycle] = useState(false); //  Confirm modal
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
      date: "20/05/2024",
      time: "09:00 - 09:30",
      status: "Đang diễn ra",
     
    }
  }

  const tabs = [
    { id: "overview", label: "Tổng quan", icon: "👤" },
    { id: "schedule", label: "Lịch hẹn", icon: "📅" },
    { id: "notes", label: "Ghi chú khám", icon: "📝" },
    { id: "results", label: "Kết quả xét nghiệm", icon: "📋" },
    { id: "medications", label: "Thuốc", icon: "💊" },
  ]

  //Open handlers
  const handleOpenCreateReExamAppointmentModal = useCallback(() => {
    setIsOpenCreateReExamModal(true);
  }, []);

  const handleOpenCreateMedicationModal = useCallback(() => {
    setIsOpenCreateMedicationModal(true);
  }, []);

  const handleOpenCreateTestResultModal = useCallback(() => {
    setIsOpenCreateTestResultModal(true);
  }, []);

  const handleOpenUpdateCycleStepNoteModal = useCallback(() => {
    setIsOpenUpdateCycleStepNoteModal(true);
  }, []);

  const handleOpenUpdateTestResultModal = useCallback(() => {
    setIsOpenUpdateTestResultModal(true);
  }, []);

  const handleOpenNewOnNewCycleModal = useCallback(() => {
    setIsOpenNewOnNewCycleModal(true);
  }, []);

  const handleOpenConfirmModal = useCallback(() => {
    setShowConfirmEnd(true)
  },[])

  const handleOpenConfirmModalCycle = useCallback(() => {
    setShowConfirmEndCycle(true)
  },[])

  // Close handlers
  const handleCloseCreateReExamAppointmentModal = () => {
    setIsOpenCreateReExamModal(false);
  };

  const handleCloseCreateMedicationModal = () => {
    setIsOpenCreateMedicationModal(false);
  };

  const handleCloseCreateTestResultModal = () => {
    setIsOpenCreateTestResultModal(false);
  };

  const handleCloseUpdateCycleStepNoteModal = () => {
    setIsOpenUpdateCycleStepNoteModal(false);
  };

  const handleCloseUpdateTestResultModal = () => {
    setIsOpenUpdateTestResultModal(false);
  }; 

  const handleCloseNewOnNewCycleModal = () => {
    setIsOpenNewOnNewCycleModal(false);
  };  

  const handleCloseConfirmModal = () => {
    setShowConfirmEnd(false)
  }
  const handleCloseConfirmModalCycle = () => {
    setShowConfirmEndCycle(false)
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
  }

  const mappingStepsName = (stepOrder) => {
    if (!cycleStepNames || cycleStepNames.length === 0) {
      return `Bước ${stepOrder}`;
    }
    console.log(cycleStepNames)
    const step = cycleStepNames.find(name => name.stepOrder === stepOrder);
    return step ? step.title : `Bước ${stepOrder}`;
  }

  const getCurrentStepPeriod = (stepOrder) => {
    const step = cycleSteps.find(phase => phase.stepOrder === stepOrder);
    const nextStep = cycleSteps.find(phase => phase.stepOrder === stepOrder + 1);
    if (step && nextStep) {
      return `${new Date(step.eventdate).toLocaleDateString("vi-VN")} - ${new Date(nextStep.eventdate).toLocaleDateString("vi-VN")}`;
    } else if (step) {
      return `${new Date(step.eventdate).toLocaleDateString("vi-VN")} - Hiện tại`;
    }
  }

  const collectNotesFromAppointments = (cycleStepData) => {
    if (!cycleStepData?.appointment || !Array.isArray(cycleStepData.appointment)) {
      return [];
    }

    return cycleStepData.appointment
      .filter(app => app.note?.trim())      
      .map(app => ({
        note: app.note.trim(),
        date: app.date.split('T')[0],
        doctor: app.doctorName
      }));
  }

  const groupByCycleStepId = (results, stepId) => {
    if (!Array.isArray(results)) return [];
    return results.filter(item => item.cycleStepId === stepId);
  };

  const filterFirstOngoingStep = (steps) => {
    const finishedPhases = steps.filter(p => p.statusCycleStep === "finished");

    const firstOngoingPhase = steps.find(p => p.statusCycleStep === "ongoing");

    return firstOngoingPhase ? [...finishedPhases, firstOngoingPhase] : finishedPhases;
  }

  const currentStep = (steps) => {
    const finishedPhases = steps.filter(p => p.statusCycleStep === "finished");

    return (finishedPhases.length + 1);
  }

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Reset các state lưu mảng chi tiết trước khi fetch mới
      setCycleStepDetails([]);
      setPastAndCurrentSteps([]);
      setMedicationSchedules([]);
      
      let crtCycle = await getCurrentCyclesOfPatient(customerId);
      await getAppointmentDetail(appointmentId)

      await Promise.all([
        getAppointmentHistoryByCustomer(customerId),
        getCustomerTestResults(customerId),
        getAllMedicines(),
      ]);

      if (crtCycle?.data?.cycleId) {
        await Promise.all([
          getCycleStepNames(crtCycle.data.serviceId),
          getAllCycleStep(crtCycle.data.cycleId),
          getCycleStepsByCycle(crtCycle.data.cycleId),,
          ...crtCycle.data.cycleStep.map(element =>
            getCycleStepDetails(crtCycle.data.cycleId, element.stepOrder)
          ),
          ...crtCycle.data.cycleStep.map(element =>
            getSchedulesByCycleStep(crtCycle.data.cycleId, element.stepOrder)
          )
        ]);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    } finally {
      await new Promise(resolve => setTimeout(resolve, 500));
      setLoading(false);
    }
  }, [customerId]);

  // 1. Lấy chu kỳ điều trị hiện tại của bệnh nhân (bác sĩ)
  const getCurrentCyclesOfPatient = async (customerId) => {
    try {
      const res = await ApiGateway.getCurrentCyclesOfPatient(customerId);
      setCurrentCycle(res.data);
      return res;
    } catch (error) {
      throw error;
    }
  };

  const getAllCycleStep = async (cycleId) => {
    try {
      const res = await ApiGateway.getCycleStepsByCycleId(cycleId);
      console.log(res.data)
      setAllCycleStep(res.data)
    } catch (error) {
      throw error;
    }
  }

  // 2. Đặt lịch hẹn tái khám
  const createReExamAppointment = async (dto) => {
    try {
      const res = await ApiGateway.createReExamAppointment(dto);
      return res;
    } catch (error) {
      throw error;
    }
  };

  // 4. Cập nhật dịch vụ cho cuộc hẹn
  const updateAppointmentService = async (appointmentId, dto) => {
    try {
      const res = await ApiGateway.updateAppointmentService(appointmentId, dto);
      return res;
    } catch (error) {
      throw error;
    }
  };

  // 5. Lấy lịch sử cuộc hẹn của bệnh nhân
  const getAppointmentHistoryByCustomer = async (customerId) => {
    try {
      const res = await ApiGateway.getAppointmentHistoryByCustomer(customerId);
      console.log(res);
      setAppointmentHistory(res);
      return res;
    } catch (error) {
      throw error;
    }
  };

  // 6. Lấy danh sách bước điều trị của chu kỳ
  const getCycleStepsByCycle = async (cycleId) => {
    try {
      const res = await ApiGateway.getCycleStepsByCycleId(cycleId);
      setCycleSteps(res.data);
      return res;
    } catch (error) {
      throw error;
    }
  };

  // 7. Cập nhật trạng thái bước điều trị
  const updateCycleStepStatus = async (cycleId, stepOrder, status) => {
    try {
      const res = await ApiGateway.updateCycleStepStatus(cycleId, stepOrder, status);
      return res;
    } catch (error) {
      throw error;
    }
  };

  // 8. Cập nhật ghi chú cho bước điều trị
  const updateCycleStepNote = async (cycleId, stepOrder, note) => {
    try {
      const res = await ApiGateway.updateCycleStepNote(cycleId, stepOrder, note);
      return res;
    } catch (error) {
      throw error;
    }
  };

  // 9. Lấy chi tiết step (note, test, medician)
  const getCustomerTestResults = async (customerId) => {
    try {
      const res = await ApiGateway.getCustomerTestResults(customerId);
      console.log(res.data)
      setTestResult(res.data);
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  // 10. Tạo lịch uống thuốc
  const createMedicationSchedule = async (schedule) => {
    try {
      const res = await ApiGateway.createMedicationSchedule(schedule);
      return res;
    } catch (error) {
      throw error;
    }
  };

  // 11. Lấy lịch uống thuốc theo chu kỳ và bước điều trị
  const getSchedulesByCycleStep = async (cycleId, stepOrder) => {
    try {
      const res = await ApiGateway.getSchedulesByCycleStep(cycleId, stepOrder);
      setMedicationSchedules(res.data);
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  // 12. Lấy danh sách thuốc
  const getAllMedicines = async () => {
    try {
      const res = await ApiGateway.getAllMedicines();
      setAllMedicines(res.data);
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  // 14. Tạo mới kết quả xét nghiệm
  const createTestResult = async (dto) => {
    try {
      const res = await ApiGateway.createTestResult(dto);
      return res;
    } catch (error) {
      throw error;
    }
  };

  // 15. Cập nhật kết quả xét nghiệm
  const updateTestResult = async (id, dto) => {
    try {
      const res = await ApiGateway.updateTestResult(id, dto);
      return res;
    } catch (error) {
      throw error;
    }
  };

  // 16. Lấy tên các bước điều trị
  const getCycleStepNames = async (serviceId) => {
    try {
      const res = await ApiGateway.getTreatmentSteps(serviceId);
      setCycleStepNames(res.data);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  // 17. Lấy chi tiết các bước điều trị đã và đang thực hiện
  const getCycleStepDetails = async (cycleId, stepOrder) => {
    try {
      const res = await ApiGateway.getCycleStep(cycleId, stepOrder);
      setPastAndCurrentSteps(prev => [...prev, res.data]);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  const getAppointmentDetail = async (appointmentId) => {
    try {
      const res = await ApiGateway.getAppointmentDetailById(appointmentId);
      setAppointmentDetail(res);
      console.log(res);
    } catch (error) {
      throw error;
    }
  }
  
  useEffect(() => {
    if (customerId) {
      fetchData();
    }
  }, [customerId, fetchData]);

  const renderOverviewTab = () => (
    <div className="patient-profile-tab-content">
      <div className="patient-profile-treatment-plan">
        <h3>Kế hoạch điều trị</h3>
        <p className="patient-profile-treatment-subtitle">Thông tin về kế hoạch điều trị hiện tại</p>


        <div className="patient-profile-treatment-cards">
          <div className="patient-profile-treatment-card patient-profile-current">
            <div className="patient-profile-card-icon">
              <span className="patient-profile-icon-red">{allCycleStep.length > currentStep(allCycleStep) && "⚠️"}</span>
            </div>
            <div className="patient-profile-card-content">
              <h4>Giai đoạn hiện tại</h4>
              <p>{allCycleStep.length > currentStep(allCycleStep) ? (mappingStepsName(currentStep(allCycleStep))) : "Đã hoàn thành"}</p>
            </div>
          </div>

          {allCycleStep.length > currentStep(allCycleStep).length && 
            <div className="patient-profile-treatment-card patient-profile-next">
              <div className="patient-profile-card-icon">
                <span className="patient-profile-icon-blue">📅</span>
              </div>
              <div className="patient-profile-card-content">
                <h4>Giai đoạn tiếp theo</h4>
                <p>{mappingStepsName(currentStep(allCycleStep) + 1)}</p>
                <span className="patient-profile-date"></span>
              </div>
            </div>
          }
        </div>

        <div className="patient-profile-treatment-timeline">
          <h3>Toàn bộ giai đoạn điều trị</h3>
          <div className="patient-profile-timeline">
            {filterFirstOngoingStep(allCycleStep)?.map((phase, idx) => (
              <div key={`key-${phase.stepId}-${idx}`} className={`patient-profile-timeline-item patient-profile-${phase.statusCycleStep}`}>
                <div className="patient-profile-timeline-marker">
                  {phase.statusCycleStep === "finished" ? '✓' : phase.statusCycleStep === 'ongoing' ? '⏳' : '📅'}
                </div>
                <div className="patient-profile-timeline-content">
                  <div className="patient-profile-timeline-header">
                    <h4>Giai đoạn {phase.stepOrder}: {mappingStepsName(phase.stepOrder)}</h4>
                    <span className="patient-profile-timeline-date">{getCurrentStepPeriod(phase.stepOrder)}</span>
                  </div>
                  <div className="patient-profile-timeline-details">
                    {/* Ghi chú */}
                    {collectNotesFromAppointments(phase).length > 0 ? (
                      <div className="patient-profile-timeline-section">
                        {collectNotesFromAppointments(phase).map((note, index) => (
                          <div key={index} className="patient-profile-timeline-note">
                            <p><strong>{note.date}:</strong> {note.note}</p>
                            <span className="patient-profile-note-doctor">- BS. {note.doctor}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="patient-profile-timeline-section">
                        <p>{phase.statusCycleStep === "ongoing" ? "Chưa" : "Không"} có ghi chú cho giai đoạn này.</p>
                      </div>
                    )}


                    {/* Kết quả xét nghiệm */}
                    <h5>📋 Kết quả xét nghiệm:</h5>
                    {groupByCycleStepId(testResult, phase.stepId).length > 0 ? (
                      <div className="patient-profile-timeline-section">
                        <ul>
                          {groupByCycleStepId(testResult, phase.stepId).map((result, index) => (
                            <li key={index}>
                              <strong>{result.name}:</strong> {result.value} {result.unit} ({result.note} : {result.referenceRange}) - {formatDate(result.testDate)}
                            </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <div className="patient-profile-timeline-section">
                          <p>{phase.statusCycleStep === "ongoing" ? "Chưa" : "Không"} có kết quả xét nghiệm cho giai đoạn này.</p>
                        </div>
                      )
                    }


                    {/* Thuốc sử dụng */}
                    <h5>💊 Thuốc sử dụng:</h5>
                    {phase.medicineSchedule?.length > 0 ? (
                      <div className="patient-profile-timeline-section">
                        <ul>
                          {
                            Object.values(
                              phase.medicineSchedule.reduce((acc, med) => {
                                const key = `${med.medicineName}-${med.frequency}-${med.dose}`;
                                if (!acc[key]) {
                                  acc[key] = { ...med, count: 1 };
                                } else {
                                  acc[key].count += 1;
                                }
                                return acc;
                              }, {})
                            ).map((med, index) => (
                              <li key={index}>
                                <strong>{med.medicineName}:</strong> {med.frequency} - Mỗi lần {med.dose}
                              </li>
                            ))
                          }
                        </ul>
                      </div>
                    ) : (
                      <div className="patient-profile-timeline-section">
                        <p>{phase.statusCycleStep === "ongoing" ? "Chưa" : "Không"} có thuốc sử dụng cho giai đoạn này.</p> 
                      </div>
                    )}



                    {/* Action buttons cho từng giai đoạn */}
                    {phase.statusCycleStep === "ongoing" &&
                      <>
                        <h5>⚡ Cập nhật nhanh:</h5>
                        <div className="patient-profile-timeline-actions">
                          {phase.statusCycleStep === 'ongoing' && (
                            <div className="patient-profile-phase-actions">
                              <div className="patient-profile-quick-actions">
                                <button className="patient-profile-btn-outline-small" 
                                  onClick={() => {
                                    setUpdateCycleStepNoteForm({
                                      cycleId: currentCycle?.cycleId,
                                      stepOrder: phase?.stepOrder,
                                      note: phase.note || ''
                                    }),
                                    handleOpenUpdateCycleStepNoteModal()
                                  }}
                                >📝 Ghi chú</button>
                                <button className="patient-profile-btn-outline-small" 
                                  onClick={() => handleOpenCreateTestResultModal()}
                                >📋 Kết quả XN</button>
                                <button className="patient-profile-btn-outline-small" 
                                  onClick={() => handleOpenCreateMedicationModal()}>💊 Thuốc</button>
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    }
                  </div>
                </div>
              </div>
            ))}
            {filterFirstOngoingStep(allCycleStep).length < allCycleStep.length ? (
              <div className={`patient-profile-timeline-item patient-profile-upcoming`}>
                <div className="patient-profile-timeline-marker">
                  📅
                </div>
                <div className="patient-profile-timeline-content">
                  <div className="patient-profile-timeline-header">
                    <h4>Giai đoạn {filterFirstOngoingStep(allCycleStep).length + 1}: {mappingStepsName(filterFirstOngoingStep(allCycleStep).length + 1)}</h4>
                    <span className="patient-profile-timeline-date">Chưa bắt đầu</span>
                  </div>
                </div>
                <div className="patient-profile-timeline-details">
                  <div className="patient-profile-timeline-section">
                    <div className="patient-profile-timeline-note">
                      <p style={{marginBottom: '1rem'}}>Giai đoạn này sẽ bắt đầu sau khi hoàn thành giai đoạn hiện tại.</p>
                    </div>
                  </div>
                </div>
                <div className="patient-profile-timeline-actions">
                  <div className="patient-profile-phase-actions">
                    <div className="patient-profile-quick-actions">
                      <button className="patient-profile-btn-primary-small" onClick={() => handleOpenNewOnNewCycleModal()}>Bắt đầu</button>
                    </div>
                  </div>
                </div>
              </div>
            ) :(
              <button className="patient-profile-btn-primary-small" style={{backgroundColor: "#4caf50", padding: "10px 16px", fontSize: "1rem"}} onClick={() => handleOpenConfirmModalCycle()}>Hoàn thành chu kì</button>
            )}
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
        <button className="patient-profile-btn-primary" onClick={() => handleOpenCreateReExamAppointmentModal()}>📅 Đặt lịch hẹn mới</button>
      </div>


      <div className="patient-profile-schedule-section">
        {appointmentHistory.some(aptHis => aptHis.status === "done") && <h4>Lịch hẹn sắp tới</h4>}
        {appointmentHistory.map((aptHis, idx) =>(
          aptHis.status === "confirmed" && (
            <div key={`${idx}-${idx}`}>
              <div className="patient-profile-appointment-list">
                <div className="patient-profile-appointment-item patient-profile-upcoming">
                  <div className="patient-profile-appointment-time">
                    <span className="patient-profile-time-icon">🕘</span>
                  </div>
                  <div className="patient-profile-appointment-details">
                    <h5>{aptHis.type === "tu_van" ? "Tư vấn" : aptHis.type === "tai_kham" ? "Tái khám" : ""}</h5>
                    <p>{aptHis.date.split("T")[0]} - {aptHis.date.split("T")[1]}</p>
                  </div>
                  <button className="patient-profile-reschedule-btn">Đã lên lịch</button>
                </div>
              </div>
            </div>
          )))
        }

        {appointmentHistory.some(aptHis => aptHis.status === "done" || aptHis.status === "fail") && <h4>Lịch sử cuộc hẹn</h4>}
          {appointmentHistory.map((aptHis, idx) =>(
            (aptHis.status === "done"  || aptHis.status === "fail") && (
              <div key={`${idx}-${idx}`}>
                <div className="patient-profile-appointment-list">
                  <div className="patient-profile-appointment-item patient-profile-completed">
                    <div className="patient-profile-appointment-time">
                      <span className="patient-profile-time-icon patient-profile-completed">✅</span>
                    </div>
                    <div className="patient-profile-appointment-details">
                      <h5>{aptHis.type === "tu_van" ? "Tư vấn" : aptHis.type === "tai_kham" ? "Tái khám" : "Chịu"}</h5>
                      <p>{aptHis.date.split("T")[0]} - {aptHis.date.split("T")[1]}</p>
                      {aptHis.note && <p>Ghi chú: {aptHis.note}</p>}
                    </div>
                    <span className="patient-profile-status-badge patient-profile-completed">Hoàn thành</span>
                  </div>
                </div>
              </div>
            )))
          }
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
        {!allCycleStep?.[currentStep(allCycleStep) - 1]?.note && 
          <button className="patient-profile-btn-primary"
            onClick={() => 
              {setUpdateCycleStepNoteForm({
                  cycleId: currentCycle?.cycleId,
                  stepOrder: currentCycle?.cycleStep?.length,
                  note: allCycleStep?.[currentStep(allCycleStep) - 1]?.note || ''
                }),
                handleOpenUpdateCycleStepNoteModal()
              }}
          >📝 Thêm ghi chú</button>
        }
      </div>


      <div className="patient-profile-notes-section">
        <h4>Ghi chú theo giai đoạn điều trị</h4>
        <div className="patient-profile-notes-list">
          {allCycleStep.map((phase) =>
            phase?.note && (
              <>
                <div key={`${phase.id}`} className="patient-profile-note-item">
                    <div className="patient-profile-note-header">
                      <span className="patient-profile-note-type">Giai đoạn {phase.stepOrder}: {mappingStepsName(phase.stepOrder)}</span>
                    </div>
                    <div className="patient-profile-note-content">
                      <h5>Ghi chú khám:</h5>
                      <p>{phase.note}</p>
                    </div>
                    <div className="patient-profile-note-footer">
                      <div className="patient-profile-note-date">
                        <span>{formatDate(phase.eventdate)}</span>
                      </div>
                      {phase.stepOrder == currentCycle?.cycleStep?.length &&
                      <button className="patient-profile-btn-outline-blue" 
                        onClick={() => 
                          {setUpdateCycleStepNoteForm({
                              cycleId: currentCycle?.cycleId,
                              stepOrder: phase.stepOrder,
                              note: phase.note || ''
                            }),
                            handleOpenUpdateCycleStepNoteModal()
                          }}
                      >Thêm ghi chú</button>}
                    </div>
                </div>
              </>
            )
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
        <button className="patient-profile-btn-primary" onClick={() => handleOpenCreateTestResultModal()}>➕ Thêm kết quả mới</button>
      </div>


      <div className="patient-profile-results-by-phase">
        {testResult.map((phase) => {
          return (
            <div key={phase.id} className="patient-profile-phase-results-container">
              <div className="patient-profile-phase-results-header">
                <h4>Giai đoạn {phase.stepOrder}</h4>
                <span className="patient-profile-phase-period">{getCurrentStepPeriod(phase.stepOrder)}</span>
              </div>

              <div className="patient-profile-results-list">
                <div key={`${phase.id}`} className="patient-profile-result-item">
                  <div className="patient-profile-result-icon">
                    <span className="patient-profile-icon-purple">📋</span>
                  </div>
                  <div className="patient-profile-result-details">
                    <h4>{phase.name}</h4>
                    <p>Ngày: {formatDate(phase.testDate)}</p>
                    <p>Kết quả: {phase.value} {phase.unit}</p>
                    <p>Trạng thái: <strong>{phase.note}</strong></p>
                    <button className="patient-profile-btn-outline" 
                      onClick={() => {
                        setUpdateTestResultForm({
                        id: phase.resultId,
                        name: phase.name,
                        value: phase.value,
                        unit: phase.unit,
                        referenceRange: phase.referenceRange,
                        note: phase.note || '',
                        testDate: phase.testDate
                      })
                      handleOpenUpdateTestResultModal()}}
                    >Chỉnh sửa</button>
                  </div>
                  <span className="patient-profile-status-badge patient-profile-completed">Hoàn thành</span>
                </div>
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
        <button className="patient-profile-btn-primary" onClick={() => handleOpenCreateMedicationModal()}>➕ Thêm thuốc mới</button>
      </div>


      <div className="patient-profile-medications-section">
        <h4>Thuốc theo giai đoạn điều trị</h4>
        <div className="patient-profile-medication-cards">
          {allCycleStep 
            .flatMap((step) =>
              step.medicineSchedule.map((med, medIndex) => {
                const isActive =
                  step.statusCycleStep === 'ongoing' &&
                  !med.status?.includes('qua_han') &&
                  new Date(med.endDate) >= new Date(); // kiểm tra còn trong thời gian dùng

                return {
                  key: `${step.stepId}-${medIndex}`,
                  isActive,
                  step,
                  med,
                  medIndex
                };
              })
            )
            .sort((a, b) => {
              if (a.isActive && !b.isActive) return -1;
              if (!a.isActive && b.isActive) return 1;
              return 0;
            })
            .map(({ key, isActive, step, med }) => (
              <div key={key} className={`patient-profile-medication-card ${isActive ? 'patient-profile-active' : 'patient-profile-completed'}`}>
                <div className="patient-profile-med-header">
                  <h5>{med.medicineName}</h5>
                  <span className={`patient-profile-status-badge ${isActive ? 'patient-profile-active' : 'patient-profile-completed'}`}>
                    {isActive ? 'Đang dùng' : 'Đã hoàn thành'}
                  </span>
                </div>
                <div className="patient-profile-med-details">
                  <p>
                    <strong>Liều dùng:</strong> {med.dose}
                  </p>
                  <p>
                    <strong>Tần suất:</strong> {med.frequency}
                  </p>
                  <p>
                    <strong>Thời gian:</strong> {med.startDate} → {med.endDate}
                  </p>
                  <p>
                    <strong>Giai đoạn:</strong> Bước {step.stepOrder} – {step.serive}
                  </p>
                  {step.medicineSchedule.note && (
                    <p>
                      <strong>Ghi chú:</strong> {step.medicineSchedule.note}
                    </p>
                  )}
                </div>
              </div>
            ))}
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

  const CreateReExamAppointmentModal = memo(({ isOpen, onClose }) => {
    const FIXED_TIME_SLOTS = [
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
    ];

    const minDate = new Date(new Date().setDate(new Date().getDate() + 1));

    const [isLoading, setIsLoading] = useState(false);
    const [availableSchedules, setAvailableSchedules] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");

    const [formData, setFormData] = useState({
      customerId: "",
      serviceId: "",
      date: "",
      note: "",
      cycleStepId: "",
    });

    useEffect(() => {
      if (currentCycle) {
        setFormData((prev) => ({
          ...prev,
          customerId: currentCycle.customerId,
          serviceId: currentCycle.serviceId,
          cycleStepId: allCycleStep?.[currentStep(allCycleStep) - 1]?.stepId || "",
        }));
      }
    }, [currentCycle]);

    if (!isOpen) return null;

    const handleDateSelect = useCallback(async (dateStr) => {
      try {
        setSelectedDate(dateStr);
        setSelectedTime("");

        const unavailable = await ApiGateway.getMyUnavailableSchedules(dateStr);
        const busyTimes = unavailable.map((slot) =>
          slot.startTime?.slice(0, 5)
        );

        const available = FIXED_TIME_SLOTS.filter(
          (slot) => !busyTimes.includes(slot)
        );

        setAvailableSchedules(available);
      } catch (err) {
        console.error("Lỗi khi lấy lịch bận của bác sĩ:", err);
        setAvailableSchedules(FIXED_TIME_SLOTS);
      }
    }, []);

    const handleTimeSelect = (timeStr) => {
      setSelectedTime(timeStr);

      const fullDateTime = `${selectedDate}T${timeStr}`;
      setFormData((prev) => ({
        ...prev,
        date: fullDateTime,
      }));
    };

    const handleChange = useCallback((field, value) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }, []);

    const handleCreateReExamAppointment = useCallback(
      async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
          await createReExamAppointment(formData);
          showSuccess("Đặt lịch tái khám thành công");
          onClose();
          await fetchData();
        } catch {
          showFail("Đặt lịch thất bại");
        } finally {
          setIsLoading(false);
        }
      },
      [formData, fetchData, onClose]
    );

    return (
      <div className="patient-profile-modal">
        <div className="patient-profile-modal-content">
          <h3>Đặt lịch tái khám</h3>
          <form onSubmit={handleCreateReExamAppointment}>
            <label>
              Ngày tái khám:
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => handleDateSelect(e.target.value)}
                required
                min={minDate.toISOString().split("T")[0]}
              />
            </label>

            <label>
              Giờ khám:
              <select
                value={selectedTime}
                onChange={(e) => handleTimeSelect(e.target.value)}
                required
                disabled={!availableSchedules.length > 0}
              >
                <option value="">{availableSchedules.length > 0 ? "-- Chọn giờ khám --": "--Không có lịch trống--"}</option>
                {availableSchedules.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Ghi chú:
              <textarea
                value={formData.note}
                onChange={(e) => handleChange("note", e.target.value)}
                placeholder="Ghi chú"
              />
            </label>

            <button
              type="submit"
              className="patient-profile-btn-primary"
              disabled={!formData.date}
            >
              {isLoading ? <BeatLoader /> : "Đặt lịch"}
            </button>
          </form>

          <button className="patient-profile-btn-outline" onClick={onClose}>
            Đóng
          </button>
        </div>
      </div>
    );
  });

  const CreateMedicationScheduleModal = memo(({ isOpen, onClose, allMedicines }) => {

    const [isLoading, setIsLoading] = useState(false)

    const [formData, setFormData] = useState({
      medicineId: "",
      cycleId: "",
      stepId: "",
      startDate: "",
      endDate: ""
    });


    useEffect(() => {
      if (currentCycle) {
        setFormData(prev => ({
          ...prev, 
          cycleId: currentCycle.cycleId,
          stepId: allCycleStep?.[currentStep(allCycleStep) - 1]?.stepId
        }));
      }
    }, [currentCycle]);
    
    if (!isOpen) return null;

    const handleCreateMedicationSchedule = useCallback(async (e) => {
      e.preventDefault();
      setIsLoading(true)
      try {
        await createMedicationSchedule(formData);
        showSuccess("Tạo lịch uống thuốc thành công");
        onClose();
        await fetchData();
      } catch {
        showFail("Tạo lịch uống thuốc thất bại");
      } finally {
        setIsLoading(false);
      }
    }, [formData, fetchData, onClose]);
    
    const handleChange = useCallback((field, value) => {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }, [formData]);
    
    return (
      <div className="patient-profile-modal">
        <div className="patient-profile-modal-content">
          <h3>Tạo lịch uống thuốc</h3>
          <form onSubmit={handleCreateMedicationSchedule}>
            <label>
              Tên thuốc:
              <select
                value={formData.medicineId}
                onChange={(e) => handleChange('medicineId', e.target.value)}
                required
              >
                <option value="">Chọn thuốc</option>
                {allMedicines.map(med => (
                  <option key={med.medicinId} value={med.medicinId}>{med.name}</option>
                ))}
              </select>
            </label>
            <label>
              Ngày bắt đầu:
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => handleChange('startDate', e.target.value)}
                required
                min={new Date(Date.now()).toISOString().split('T')[0]}
              />
            </label>
            <label>
              Ngày kết thúc:
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => handleChange('endDate', e.target.value)}
                required
                min={new Date(Date.now()).toISOString().split('T')[0]}
              />
            </label>
            <button type="submit" className="patient-profile-btn-primary">{isLoading ? <BeatLoader /> : "Lưu"}</button>
          </form>
          <button
            className="patient-profile-btn-outline"
            onClick={onClose}
          >Đóng</button>
        </div>
      </div>
    );
  });

  const CreateTestResultModal = memo(({ isOpen, onClose }) => {

    const [isLoading, setIsLoading] = useState(false)

    const [formData, setFormData] = useState({
      appointmentId: "",
      name: "",
      value: null,
      unit: "",
      referenceRange: "",
      testDate: new Date(Date.now()).toISOString().split("T")[0],
      note: "",
      cycleStepId: ""
    });


  useEffect(() => {
    if (currentCycle) {
      setFormData(prev => ({ 
        ...prev, 
        appointmentId: appointmentId,
        cycleStepId: allCycleStep?.[currentStep(allCycleStep) - 1]?.stepId
      }));
    }
  }, [currentCycle]);
    
    if (!isOpen) return null;

    const handleCreateTestResult = useCallback(async (e) => {
      e.preventDefault();
      setIsLoading(true)
      try {
        console.log("Tạo test rù súc: ", formData)
        await createTestResult(formData);
        showSuccess("Tạo kết quả xét nghiệm thành công");
        onClose();
        await fetchData();
      } catch {
        showFail("Tạo kết quả xét nghiệm thất bại");
      } finally {
        setIsLoading(false);
      }
    }, [formData, fetchData, onClose]);
    
    const handleChange = useCallback((field, value) => {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }, [formData]);
    
    return (
      <div className="patient-profile-modal">
        <div className="patient-profile-modal-content">
          <h3>Tạo kết quả xét nghiệm</h3>
          <form onSubmit={handleCreateTestResult}>
            <label>
              Tên xét nghiệm:
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
            </label>
            <label>
              Kết quả:
              <input
                type="number"
                step="any"
                value={formData.value}
                onChange={(e) => handleChange('value', e.target.value === "" ? "" : parseFloat(e.target.value))}
                required
              />
            </label>
            <label>
              Đơn vị:
              <input
                type="text"
                value={formData.unit}
                onChange={(e) => handleChange('unit', e.target.value)}
                required
              />
            </label>
            <label>
              Khoảng tham chiếu:
              <input
                type="text"
                value={formData.referenceRange}
                onChange={(e) => handleChange('referenceRange', e.target.value)}
              />
            </label>
            <label>
              Ghi chú:
              <textarea
                value={formData.note}
                onChange={(e) => handleChange('note', e.target.value)}
              />
            </label>
            <button type="submit" className="patient-profile-btn-primary">{isLoading ? <BeatLoader /> : "Tạo"}</button>
          </form>
          <button
            className="patient-profile-btn-outline"
            onClick={onClose}
          >Đóng</button>
        </div>
      </div>
    );
  });

  const UpdateCycleStepNoteModal = memo(({ isOpen, onClose, form }) => {

    const [isLoading, setIsLoading] = useState(false)

    const [formData, setFormData] = useState({
      cycleId: "",
      stepOrder: "",
      note: ""
    });

    useEffect(() => {
      if (currentCycle) {
        setFormData(prev => ({ 
          ...prev, 
          cycleId: form.cycleId,
          stepOrder: form.stepOrder,
          note: form.note
        }));
      }
    }, [currentCycle]);

    if (!isOpen) return null;

    const handleUpdateCycleStepNote = useCallback(async (e) => {
      e.preventDefault();
      setIsLoading(true)
      try {
        const { cycleId, stepOrder, note } = formData;
        await updateCycleStepNote(cycleId, stepOrder, note);
        showSuccess("Cập nhật ghi chú thành công");
        onClose();
        await fetchData();
      } catch {
        showFail("Cập nhật ghi chú thất bại");
      } finally {
        setIsLoading(false);
      }
    }, [formData, fetchData, onClose]);
    
    const handleChange = useCallback((field, value) => {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }, [formData]);
    
    return (
      <div className="patient-profile-modal">
        <div className="patient-profile-modal-content">
          <h3>Cập nhật ghi chú bước điều trị</h3>
          <form onSubmit={handleUpdateCycleStepNote}>
            <label>
              Ghi chú:
              <textarea
                value={formData.note}
                onChange={(e) => handleChange('note', e.target.value)}
                required
              />
            </label>
            <button type="submit" className="patient-profile-btn-primary">{isLoading ? <BeatLoader /> : "Cập nhật"}</button>
          </form>
          <button
            className="patient-profile-btn-outline"
            onClick={onClose}
          >Đóng</button>
        </div>
      </div>
    );
  });

  const UpdateTestResultModal = memo(({ isOpen, onClose, form }) => {

    const [isLoading, setIsLoading] = useState(false)

    const [formData, setFormData] = useState({
      id: "",
      name: "",
      value: "",
      unit: "",
      referenceRange: "",
      note: "",
      testDate: ""
    });

    useEffect(() => {
      if (currentCycle) {
        setFormData({ 
          id: form.id,
          name: form.name,
          value: form.value,
          unit: form.unit,
          referenceRange: form.referenceRange,
          note: form.note,
          testDate: form.testDate
        });
      }
    }, [currentCycle]);
    
    if (!isOpen) return null;

    const handleUpdateTestResult = useCallback(async (e) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        const { id, ...dto } = formData;
        await updateTestResult(id, dto);
        showSuccess("Cập nhật kết quả xét nghiệm thành công");
        onClose();
        await fetchData();
      } catch {
        showFail("Cập nhật kết quả xét nghiệm thất bại");
      } finally {
        setIsLoading(false);
      }
    }, [formData, fetchData, onClose]);
    
    const handleChange = useCallback((field, value) => {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }, [formData]);
    
    return (
      <div className="patient-profile-modal">
        <div className="patient-profile-modal-content">
          <h3>Cập nhật kết quả xét nghiệm</h3>
          <form onSubmit={handleUpdateTestResult}>
            <label>
              Tên xét nghiệm:
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
            </label>
            <label>
              Kết quả:
              <input
                type="text"
                value={formData.value}
                onChange={(e) => handleChange('value', e.target.value)}
                required
              />
            </label>
            <label>
              Đơn vị:
              <input
                type="text"
                value={formData.unit}
                onChange={(e) => handleChange('unit', e.target.value)}
                required
              />
            </label>
            <label>
              Khoảng tham chiếu:
              <input
                type="text"
                value={formData.referenceRange}
                onChange={(e) => handleChange('referenceRange', e.target.value)}
              />
            </label>
            <label>
              Ghi chú:
              <textarea
                value={formData.note}
                onChange={(e) => handleChange('note', e.target.value)}
              />
            </label>
            <label>
              Ngày xét nghiệm:
              <input
                type="date"
                value={formData.testDate}
                onChange={(e) => handleChange('testDate', e.target.value)}
                required
              />
            </label>
            <button type="submit" className="patient-profile-btn-primary">{isLoading ? <BeatLoader /> : "Cập nhật"}</button>
          </form>
          <button
            className="patient-profile-btn-outline"
            onClick={onClose}
          >Đóng</button>
        </div>
      </div>
    );
  });

  const NewOnNewCycleModal = memo(({ isOpen, onClose }) => {
    const FIXED_TIME_SLOTS = [
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
    ];

    const minDate = new Date(new Date().setDate(new Date().getDate() + 1));

    const [isLoading, setIsLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [availableSchedules, setAvailableSchedules] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");

    const [formData, setFormData] = useState({
      customerId: "",
      serviceId: "",
      date: "",
      note: "",
      cycleStepId: "",
    });

    useEffect(() => {
      if (currentCycle) {
        setFormData((prev) => ({
          ...prev,
          customerId: currentCycle.customerId,
          serviceId: currentCycle.serviceId,
          cycleStepId: allCycleStep?.[currentStep(allCycleStep) - 1]?.stepId + 1 || "",
        }));
      }
    }, [currentCycle]);

    if (!isOpen) return null;

    const handleDateSelect = useCallback(async (dateStr) => {
      try {
        setSelectedDate(dateStr);
        setSelectedTime("");

        const unavailable = await ApiGateway.getMyUnavailableSchedules(dateStr);
        const busyTimes = unavailable.map((slot) =>
          slot.startTime?.slice(0, 5)
        );

        const available = FIXED_TIME_SLOTS.filter(
          (slot) => !busyTimes.includes(slot)
        );

        setAvailableSchedules(available);
      } catch (err) {
        console.error("Lỗi khi lấy lịch bận của bác sĩ:", err);
        setAvailableSchedules(FIXED_TIME_SLOTS);
      }
    }, []);

    const handleTimeSelect = (timeStr) => {
      setSelectedTime(timeStr);

      const fullDateTime = `${selectedDate}T${timeStr}`;
      setFormData((prev) => ({
        ...prev,
        date: fullDateTime,
      }));
    };

    const handleChange = useCallback((field, value) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }, []);

    const handleSubmitClick = (e) => {
      e.preventDefault();
      setShowConfirm(true); // Mở modal xác nhận
    };

    const confirmSubmit = async () => {
      setShowConfirm(false);
      setIsLoading(true);
      try {
        await createReExamAppointment(formData);
        await updateCycleStepStatus(currentCycle.cycleId, allCycleStep?.[currentStep(allCycleStep) - 1].stepOrder, "finished")
        showSuccess("Đặt lịch tái khám thành công");
        onClose();
        await fetchData();
      } catch {
        showFail("Đặt lịch thất bại");
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className="patient-profile-modal">
        <div className="patient-profile-modal-content">
          <h3>Đặt lịch tái khám</h3>
          <form onSubmit={handleSubmitClick}>
            <label>
              Ngày tái khám:
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => handleDateSelect(e.target.value)}
                required
                min={minDate.toISOString().split("T")[0]}
              />
            </label>

            <label>
              Giờ khám:
              <select
                value={selectedTime}
                onChange={(e) => handleTimeSelect(e.target.value)}
                required
                disabled={!availableSchedules.length > 0}
              >
                <option value="">{availableSchedules.length > 0 ? "-- Chọn giờ khám --": "--Không có lịch trống--"}</option>
                {availableSchedules.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Ghi chú:
              <textarea
                value={formData.note}
                onChange={(e) => handleChange("note", e.target.value)}
                placeholder="Ghi chú"
              />
            </label>

            <button
              type="submit"
              className="patient-profile-btn-primary"
              disabled={!formData.date}
            >
              {isLoading ? <BeatLoader /> : "Đặt lịch"}
            </button>
          </form>

          <button className="patient-profile-btn-outline" onClick={onClose}>
            Đóng
          </button>
        </div>
        {showConfirm && (
          <div className="patient-profile-confirm-overlay">
            <div className="patient-profile-confirm-modal">
              <p>Bạn có chắc chắn đi tới bước tiếp theo và kết thúc bước hiện tại hay không?</p>
              <p>(Xác nhận cũng sẽ kết thúc cuộc hẹn hiện tại)</p>
              <div className="patient-profile-confirm-actions">
                <button
                  onClick={() => setShowConfirm(false)}
                >
                  Hủy
                </button>
                <button
                  onClick={confirmSubmit}
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    );
  });

  const ConfirmModal = memo(({ isOpen, onClose, type, message }) => {
    if (!isOpen) return null;

    const confirmSubmit = async () => {
      try {
        const dto = {
          status: "done"
        }
        if (type == "cycle") {
          await updateCycleStepStatus(currentCycle.cycleId, allCycleStep?.[currentStep(allCycleStep) - 1].stepOrder, "finished")
        }
        await updateAppointmentService(appointmentId, dto);
        showSuccess("Lịch hẹn đã cập nhật trạng thái");
        onClose();
        navigate("/doctor-dashboard/appointments")
      } catch (error) {
        showFail("Cập nhật trạng thái thất bại");
      }
    }

    return (
      <div className="patient-profile-confirm-overlay">
        <div className="patient-profile-confirm-modal">
          <p>{message || "Bạn có chắc chắn muốn tiếp tục?"}</p>
          <div className="patient-profile-confirm-actions">
            <button onClick={onClose}>Hủy</button>
            <button onClick={() => confirmSubmit()}>Xác nhận</button>
          </div>
        </div>
      </div>
    );
  });


  return (
    <div className="patient-profile">
      <div className="patient-profile-header">
        <div className="patient-profile-header-left">
          <a href="#" onClick={(e) => { e.preventDefault(); window.history.back(); }} className="patient-profile-back-btn">← Quay lại</a>
          <div className="patient-profile-header-info">
            <h1>Cuộc hẹn với {appointmentDetail.customerName}</h1>
            <div className="patient-profile-appointment-info">
              <span className="patient-profile-appointment-type">{patientData.currentAppointment.type}</span>
              <span className="patient-profile-appointment-time">🕘 {patientData.currentAppointment.date} | {patientData.currentAppointment.time}</span>
              <span className="patient-profile-appointment-status">{appointmentDetail.status}</span>
            </div>
            <p className="patient-profile-appointment-details">{patientData.currentAppointment.details}</p>
          </div>
        </div>
        <div className="patient-profile-header-actions">
          <button className="patient-profile-btn-danger" onClick={() => handleOpenConfirmModal()}>Kết thúc cuộc hẹn</button>
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
          
          { loading ? 
            (
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
                <HashLoader size={80} color="#36d7b7" />
              </div>
            ) : (renderTabContent())
          }
        </div>
      </div>
        
      <CreateReExamAppointmentModal
        isOpen={isOpenCreateReExamModal}
        onClose={handleCloseCreateReExamAppointmentModal}
      />
      
      <CreateMedicationScheduleModal
        isOpen={isOpenCreateMedicationModal}
        onClose={handleCloseCreateMedicationModal}
        allMedicines={allMedicines}
      />
      
      <CreateTestResultModal
        isOpen={isOpenCreateTestResultModal}
        onClose={handleCloseCreateTestResultModal}
      />
      
      <UpdateCycleStepNoteModal
        isOpen={isOpenUpdateCycleStepNoteModal}
        onClose={handleCloseUpdateCycleStepNoteModal}
        form={updateCycleStepNoteForm}
      />
      
      <UpdateTestResultModal
        isOpen={isOpenUpdateTestResultModal}
        onClose={handleCloseUpdateTestResultModal}
        form={updateTestResultForm}
      />

      <NewOnNewCycleModal
        isOpen={isOpenNewOnNewCycleModal}
        onClose={handleCloseNewOnNewCycleModal}
      />
      
      <ConfirmModal
        isOpen={showConfirmEnd}
        onClose={handleCloseConfirmModal}
        message="Bạn có chắc chắn muốn kết thúc cuộc hẹn này?"
      />

      <ConfirmModal
        isOpen={showConfirmEndCycle}
        onClose={handleCloseConfirmModalCycle}
        type={"cycle"}
        message="Bạn có chắc chắn muốn kết thúc chu kì này?"
      />
    </div>
  )
}

export default PatientProfileLayout
