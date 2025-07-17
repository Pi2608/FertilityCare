// import { useState, useEffect } from "react";
// import ApiGateway from "../../../features/service/apiGateway";
// import apiAppointment from "../../../features/service/apiAppointment";
// import { useParams } from "react-router-dom";
// import { showSuccess, showFail, confirmToast } from "@lib/toast/toast";
// import "./AppointmentsDieuTri.css";

// const AppointmentsDieuTri = () => {
//   const { customerId } = useParams();
//   const [activeTab, setActiveTab] = useState("overview");
//   const [expandedSections, setExpandedSections] = useState({
//     medicalHistory: true,
//     familyHistory: true,
//     allergies: true,
//     medicalRecords: false,
//     prescribedMeds: false,
//   });
//   const [allCycles, setAllCycles] = useState([]);
//   const [selectedCycle, setSelectedCycle] = useState(null);
//   const [cycleStepNames, setCycleStepNames] = useState([]);
//   const [allCycleSteps, setAllCycleSteps] = useState([]);
//   const [cycleSteps, setCycleSteps] = useState([]);
//   const [appointmentHistory, setAppointmentHistory] = useState([]); // Lịch sử cuộc hẹn
//   const [medicationSchedules, setMedicationSchedules] = useState([]); // Lịch uống thuốc theo bước
//   const [allMedicines, setAllMedicines] = useState([]); // Danh sách thuốc
//   const [testResults, setTestResults] = useState([]); // Kết quả xét nghiệm
//   const [loading, setLoading] = useState(false); // Loading chung cho các thao tác async

//   const [createReExamAppointmentForm, setCreateReExamAppointmentForm] =
//     useState({
//       customerId: customerId || "", // Sử dụng customerId từ useParams
//       serviceId: "",
//       date: "",
//       note: "",
//       cycleStepId: "",
//     });

//   const [createMedicationScheduleForm, setCreateMedicationScheduleForm] =
//     useState({
//       medicineId: "",
//       cycleId: "",
//       stepId: "",
//       startDate: "",
//       endDate: "",
//     }); // Form tạo lịch uống thuốc

//   const [createTestResultForm, setCreateTestResultForm] = useState({
//     appointmentId: "",
//     name: "",
//     value: "",
//     unit: "",
//     referenceRange: "",
//     testDate: "",
//     note: "",
//     cycleStepId: "",
//   }); // Form tạo kết quả xét nghiệm

//   const [updateCycleStepNoteForm, setUpdateCycleStepNoteForm] = useState({
//     cycleId: "",
//     stepOrder: "",
//     note: "",
//   }); // Form cập nhật ghi chú chu kỳ điều trị

//   const [updateTestResultForm, setUpdateTestResultForm] = useState({
//     id: "",
//     name: "",
//     value: "",
//     unit: "",
//     referenceRange: "",
//     note: "",
//     testDate: "",
//   }); // Form cập nhật kết quả xét nghiệm

//   const [isOpenCreateReExamModal, setIsOpenCreateReExamModal] = useState(false); // Modal tạo lịch hẹn tái khám
//   const [isOpenCreateMedicationModal, setIsOpenCreateMedicationModal] =
//     useState(false); // Modal tạo lịch uống thuốc
//   const [isOpenCreateTestResultModal, setIsOpenCreateTestResultModal] =
//     useState(false); // Modal tạo kết quả xét nghiệm
//   const [isOpenUpdateCycleStepNoteModal, setIsOpenUpdateCycleStepNoteModal] =
//     useState(false); // Modal cập nhật ghi chú chu kỳ
//   const [isOpenUpdateTestResultModal, setIsOpenUpdateTestResultModal] =
//     useState(false); // Modal cập nhật kết quả xét nghiệm

//   const toggleSection = (section) => {
//     setExpandedSections((prev) => ({
//       ...prev,
//       [section]: !prev[section],
//     }));
//   };

//   const patientData = selectedCycle
//     ? {
//         name: selectedCycle.customerName,
//         id: `PT-${selectedCycle.customerId}`,
//         status:
//           selectedCycle.status === "ongoing" ? "Đang điều trị" : "Hoàn thành",
//         age: selectedCycle.customerAge,
//         treatment: selectedCycle.serviceName,
//         startDate: selectedCycle.startDate,
//         doctor: selectedCycle.doctorName,
//         phone: "0912345678",
//         email: "customer@email.com",
//         address: "Địa chỉ bệnh nhân",
//         currentAppointment: {
//           type: "Tái khám", // Thêm dòng này
//           date: "",
//           time: "",
//           status: "Đang diễn ra",
//           details: "", // Thêm dòng này nếu cần
//         },
//       }
//     : {
//         name: "Đang tải...",
//         id: "",
//         status: "",
//         age: 0,
//         treatment: "",
//         startDate: "",
//         doctor: "",
//         currentAppointment: {
//           type: "",
//           date: "",
//           time: "",
//           status: "",
//           details: "",
//         },
//       };

//   const tabs = [
//     { id: "overview", label: "Tổng quan", icon: "👤" },
//     { id: "schedule", label: "Lịch hẹn", icon: "📅" },
//     { id: "notes", label: "Ghi chú khám", icon: "📝" },
//     { id: "results", label: "Kết quả xét nghiệm", icon: "📋" },
//     { id: "medications", label: "Thuốc", icon: "💊" },
//   ];

//   // Data for timeline - linked to other tabs
//   const treatmentPhases = [
//     {
//       id: 1,
//       title: "Giai đoạn 1: Chuẩn bị",
//       period: "01/04 - 30/04/2024",
//       status: "completed",
//       notes: [
//         {
//           date: "30/04/2024",
//           content:
//             "Bệnh nhân đã hoàn thành tất cả xét nghiệm cần thiết. Kết quả tốt, sẵn sàng cho chu kỳ điều trị IVF.",
//           doctor: "BS. Nguyễn Lan Anh",
//         },
//       ],
//       results: [
//         {
//           name: "AMH",
//           value: "2.8 ng/ml",
//           status: "Bình thường",
//           date: "25/04/2024",
//         },
//         { name: "FSH", value: "6.2 mIU/ml", status: "Tốt", date: "25/04/2024" },
//         {
//           name: "Siêu âm buồng trứng",
//           value: "12 nang trứng",
//           status: "Tốt",
//           date: "28/04/2024",
//         },
//       ],
//       medications: [
//         {
//           name: "Folic Acid 5mg",
//           usage: "Uống 1 viên/ngày, sau ăn",
//           period: "01/04 - 30/04/2024",
//         },
//         {
//           name: "Vitamin D3 1000IU",
//           usage: "Uống 1 viên/ngày, buổi sáng",
//           period: "01/04 - 30/04/2024",
//         },
//       ],
//     },
//     {
//       id: 2,
//       title: "Giai đoạn 2: Kích thích buồng trứng",
//       period: "01/05 - 20/05/2024",
//       status: "active",
//       notes: [
//         {
//           date: "20/05/2024",
//           content:
//             "Phản ứng tốt với thuốc kích thích. Nang trứng phát triển đều, kích thước phù hợp. Chuẩn bị trigger shot.",
//           doctor: "BS. Nguyễn Lan Anh",
//         },
//         {
//           date: "15/05/2024",
//           content:
//             "Theo dõi phản ứng kích thích. E2 tăng tốt, nang trứng phát triển đồng đều. Tiếp tục protocol.",
//           doctor: "BS. Nguyễn Lan Anh",
//         },
//       ],
//       results: [
//         { name: "E2", value: "1200 pg/ml", status: "Tốt", date: "18/05/2024" },
//         {
//           name: "Siêu âm theo dõi",
//           value: "8 nang trứng >14mm",
//           status: "Đạt yêu cầu",
//           date: "18/05/2024",
//         },
//         {
//           name: "LH",
//           value: "2.1 mIU/ml",
//           status: "Ổn định",
//           date: "18/05/2024",
//         },
//       ],
//       medications: [
//         {
//           name: "Gonal-F 450 IU",
//           usage: "Tiêm dưới da, buổi tối (21:00)",
//           period: "01/05 - 18/05/2024",
//         },
//         {
//           name: "Cetrotide 0.25mg",
//           usage: "Tiêm dưới da, buổi sáng (08:00)",
//           period: "10/05 - 18/05/2024",
//         },
//         {
//           name: "Ovitrelle 250mcg",
//           usage: "Tiêm dưới da, trigger shot",
//           period: "20/05/2024",
//         },
//       ],
//     },
//     {
//       id: 3,
//       title: "Giai đoạn 3: Lấy trứng",
//       period: "",
//       status: "upcoming",
//       notes: [],
//       results: [],
//       medications: [],
//     },
//   ];

//   const handleReExamChange = (field, value) => {
//     setCreateReExamAppointmentForm((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleCreateReExamAppointment = async (e) => {
//     e.preventDefault();
//     try {
//       await createReExamAppointment(createReExamAppointmentForm);
//       showSuccess("Đặt lịch tái khám thành công");
//       setIsOpenCreateReExamModal(false);
//     } catch {
//       showFail("Đặt lịch thất bại");
//     }
//   };

//   const handleMedicationChange = (field, value) => {
//     setCreateMedicationScheduleForm((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleCreateMedicationSchedule = async (e) => {
//     e.preventDefault();
//     try {
//       await createMedicationSchedule(createMedicationScheduleForm);
//       showSuccess("Tạo lịch uống thuốc thành công");
//       setIsOpenCreateMedicationModal(false);
//     } catch {
//       showFail("Tạo lịch uống thuốc thất bại");
//     }
//   };

//   const handleTestResultChange = (field, value) => {
//     setCreateTestResultForm((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleCreateTestResult = async (e) => {
//     e.preventDefault();
//     try {
//       await createTestResult(createTestResultForm);
//       showSuccess("Tạo kết quả xét nghiệm thành công");
//       setIsOpenCreateTestResultModal(false);
//     } catch {
//       showFail("Tạo kết quả xét nghiệm thất bại");
//     }
//   };

//   const handleUpdateCycleNoteChange = (field, value) => {
//     setUpdateCycleStepNoteForm((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleUpdateCycleStepNote = async (e) => {
//     e.preventDefault();
//     try {
//       const { cycleId, stepOrder, note } = updateCycleStepNoteForm;
//       await updateCycleStepNote(cycleId, stepOrder, note);
//       showSuccess("Cập nhật ghi chú thành công");
//       setIsOpenUpdateCycleStepNoteModal(false);
//     } catch {
//       showFail("Cập nhật ghi chú thất bại");
//     }
//   };

//   const handleUpdateTestResultChange = (field, value) => {
//     setUpdateTestResultForm((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleUpdateTestResult = async (e) => {
//     e.preventDefault();
//     try {
//       const { id, ...dto } = updateTestResultForm;
//       await updateTestResult(id, dto);
//       showSuccess("Cập nhật kết quả xét nghiệm thành công");
//       setIsOpenUpdateTestResultModal(false);
//     } catch {
//       showFail("Cập nhật kết quả xét nghiệm thất bại");
//     }
//   };

//   const formatDate = (dateString) => {
//     const options = { year: "numeric", month: "2-digit", day: "2-digit" };
//     return new Date(dateString).toLocaleDateString("vi-VN", options);
//   };

//   const mappingStepsName = (stepOrder) => {
//     if (!cycleStepNames || cycleStepNames.length === 0) {
//       return `Bước ${stepOrder}`;
//     }
//     const step = cycleStepNames.find((name) => name.stepOrder === stepOrder);
//     return step ? step.title : `Bước ${stepOrder}`;
//   };

//   const getCurrentStepPeriod = (stepOrder) => {
//     const step = cycleSteps.find((phase) => phase.stepOrder === stepOrder);
//     const nextStep = cycleSteps.find(
//       (phase) => phase.stepOrder === stepOrder + 1
//     );
//     if (step && nextStep) {
//       return `${new Date(step.eventdate).toLocaleDateString(
//         "vi-VN"
//       )} - ${new Date(nextStep.eventdate).toLocaleDateString("vi-VN")}`;
//     } else if (step) {
//       return `${new Date(step.eventdate).toLocaleDateString(
//         "vi-VN"
//       )} - Hiện tại`;
//     }
//   };

//   const collectNotesFromAppointments = (cycleStepData) => {
//     console.log("Cycle Step Data:", cycleStepData);
//     if (
//       !cycleStepData?.appointment ||
//       !Array.isArray(cycleStepData.appointment)
//     ) {
//       return [];
//     }

//     let abc = cycleStepData.appointment
//       .filter((app) => app.note?.trim())
//       .map((app) => ({
//         note: app.note.trim(),
//         date: app.date?.split("T")[0] || "",
//         doctor: app.doctorName || "",
//       }));

//     console.log("Filtered Notes:", abc);
//     return abc;
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       // 1. Lấy tất cả chu kỳ điều trị
//       const cyclesResponse = await getAllCyclesOfCustomer(customerId);

//       if (cyclesResponse?.data?.length > 0) {
//         // Chọn chu kỳ đang ongoing hoặc chu kỳ đầu tiên
//         const currentCycle =
//           cyclesResponse.data.find((cycle) => cycle.status === "ongoing") ||
//           cyclesResponse.data[0];

//         setSelectedCycle(currentCycle);

//         // 2. Lấy chi tiết bước điều trị của chu kỳ được chọn
//         await getCycleStepsByCycleId(currentCycle.cycleId);
//       }

//       // 3. Lấy lịch uống thuốc và kết quả xét nghiệm song song
//       await Promise.all([
//         getMedicationSchedulesByCustomer(customerId),
//         getTestResultsByCustomer(customerId),
//       ]);
//     } catch (error) {
//       console.error("Lỗi khi lấy dữ liệu:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 1. Lấy chu kỳ điều trị hiện tại của bệnh nhân (bác sĩ)
//   const getAllCyclesOfCustomer = async (customerId) => {
//     try {
//       const res = await apiAppointment.getAllCyclesOfCustomer(customerId);
//       console.log("All Cycles:", res.data);
//       setAllCycles(res.data);
//       return res;
//     } catch (error) {
//       console.error("Lỗi lấy chu kỳ điều trị:", error);
//       throw error;
//     }
//   };

//   // 2. Đặt lịch hẹn tái khám
//   const createReExamAppointment = async (dto) => {
//     try {
//       const res = await ApiGateway.createReExamAppointment(dto);
//       return res;
//     } catch (error) {
//       console.error("Lỗi đặt lịch tái khám:", error);
//       throw error;
//     }
//   };

//   // 3. Hủy cuộc hẹn
//   const cancelAppointment = async (appointmentId) => {
//     try {
//       const res = await ApiGateway.cancelAppointment(appointmentId);
//       return res;
//     } catch (error) {
//       console.error("Lỗi hủy cuộc hẹn:", error);
//       throw error;
//     }
//   };

//   // 4. Cập nhật dịch vụ cho cuộc hẹn
//   const updateAppointmentService = async (appointmentId, dto) => {
//     try {
//       const res = await ApiGateway.updateAppointmentService(appointmentId, dto);
//       return res;
//     } catch (error) {
//       console.error("Lỗi cập nhật dịch vụ cuộc hẹn:", error);
//       throw error;
//     }
//   };

//   // 5. Lấy lịch sử cuộc hẹn của bệnh nhân
//   const getAppointmentHistoryByCustomer = async (customerId) => {
//     try {
//       const res = await ApiGateway.getAppointmentHistoryByCustomer(customerId);
//       console.log("Appointment History:", res);
//       setAppointmentHistory(res);
//       return res;
//     } catch (error) {
//       console.error("Lỗi lấy lịch sử cuộc hẹn:", error);
//       throw error;
//     }
//   };

//   // 6. Lấy danh sách bước điều trị của chu kỳ
//   const getCycleStepsByCycleId = async (cycleId) => {
//     try {
//       const res = await apiAppointment.getCycleStepsByCycleId(cycleId);
//       console.log("Cycle Steps:", res.data);
//       setAllCycleSteps(res.data);
//       return res;
//     } catch (error) {
//       console.error("Lỗi lấy bước điều trị:", error);
//       throw error;
//     }
//   };

//   // 7. Cập nhật trạng thái bước điều trị
//   const updateCycleStepStatus = async (cycleId, stepOrder, status) => {
//     try {
//       const res = await ApiGateway.updateCycleStepStatus(
//         cycleId,
//         stepOrder,
//         status
//       );
//       return res;
//     } catch (error) {
//       console.error("Lỗi cập nhật trạng thái bước điều trị:", error);
//       throw error;
//     }
//   };

//   // 8. Cập nhật ghi chú cho bước điều trị
//   const updateCycleStepNote = async (cycleId, stepOrder, note) => {
//     try {
//       const res = await ApiGateway.updateCycleStepNote(
//         cycleId,
//         stepOrder,
//         note
//       );
//       return res;
//     } catch (error) {
//       console.error("Lỗi cập nhật ghi chú bước điều trị:", error);
//       throw error;
//     }
//   };

//   // 10. Tạo lịch uống thuốc
//   const createMedicationSchedule = async (schedule) => {
//     try {
//       const res = await ApiGateway.createMedicationSchedule(schedule);
//       return res;
//     } catch (error) {
//       console.error("Lỗi tạo lịch uống thuốc:", error);
//       throw error;
//     }
//   };

//   // 11. Lấy lịch uống thuốc theo chu kỳ và bước điều trị
//   // Lấy lịch uống thuốc của bệnh nhân
//   const getMedicationSchedulesByCustomer = async (customerId) => {
//     try {
//       const res = await apiAppointment.getMedicationSchedulesByCustomer(
//         customerId
//       );
//       console.log("Medicine Schedules:", res.data);
//       setMedicationSchedules(res.data);
//       return res;
//     } catch (error) {
//       console.error("Lỗi lấy lịch uống thuốc:", error);
//       throw error;
//     }
//   };

//   // 12. Lấy danh sách thuốc
//   const getAllMedicines = async () => {
//     try {
//       const res = await ApiGateway.getAllMedicines();
//       console.log("All Medicines:", res.data);
//       setAllMedicines(res.data);
//       return res.data;
//     } catch (error) {
//       console.error("Lỗi lấy danh sách thuốc:", error);
//       throw error;
//     }
//   };

//   // 13. Lấy kết quả xét nghiệm của bệnh nhân
//   const getTestResultsByCustomer = async (customerId) => {
//     try {
//       const res = await apiAppointment.getTestResultsByCustomer(customerId);
//       console.log("Test Results:", res);
//       setTestResults(res); // res đã là array, không cần res.data
//       return res;
//     } catch (error) {
//       console.error("Lỗi lấy kết quả xét nghiệm:", error);
//       throw error;
//     }
//   };

//   // 14. Tạo mới kết quả xét nghiệm
//   const createTestResult = async (dto) => {
//     try {
//       const res = await ApiGateway.createTestResult(dto);
//       return res;
//     } catch (error) {
//       console.error("Lỗi tạo kết quả xét nghiệm:", error);
//       throw error;
//     }
//   };

//   // 15. Cập nhật kết quả xét nghiệm
//   const updateTestResult = async (id, dto) => {
//     try {
//       const res = await ApiGateway.updateTestResult(id, dto);
//       return res;
//     } catch (error) {
//       console.error("Lỗi cập nhật kết quả xét nghiệm:", error);
//       throw error;
//     }
//   };

//   // 16. Lấy tên các bước điều trị
//   const getCycleStepNames = async (cycleId) => {
//     try {
//       const res = await ApiGateway.getTreatmentSteps(cycleId);
//       console.log("Cycle Step Names:", res.data);
//       setCycleStepNames(res.data);
//       return res.data;
//     } catch (error) {
//       console.error("Lỗi lấy tên các bước điều trị:", error);
//       throw error;
//     }
//   };

//   const renderOverviewTab = () => (
//     <div className="patient-profile-tab-content">
//       <div className="patient-profile-treatment-plan">
//         <h3>Kế hoạch điều trị</h3>
//         <p className="patient-profile-treatment-subtitle">
//           Thông tin về kế hoạch điều trị hiện tại
//         </p>

//         <div className="patient-profile-treatment-cards">
//           <div className="patient-profile-treatment-card patient-profile-current">
//             <div className="patient-profile-card-icon">
//               <span className="patient-profile-icon-red">⚠️</span>
//             </div>
//             <div className="patient-profile-card-content">
//               <h4>Giai đoạn hiện tại</h4>
//               <p>{mappingStepsName(selectedCycle?.cycleStep?.length || 0)}</p>
//             </div>
//           </div>
//           <div className="patient-profile-treatment-card patient-profile-next">
//             <div className="patient-profile-card-icon">
//               <span className="patient-profile-icon-blue">📅</span>
//             </div>
//             <div className="patient-profile-card-content">
//               <h4>Giai đoạn tiếp theo</h4>
//               <p>
//                 {mappingStepsName((selectedCycle?.cycleStep?.length || 0) + 1)}
//               </p>
//               <span className="patient-profile-date"></span>
//             </div>
//           </div>
//         </div>

//         <div className="patient-profile-treatment-timeline">
//           <h3>Toàn bộ giai đoạn điều trị</h3>
//           <div className="patient-profile-timeline">
//             {(allCycleSteps || []).map((step) => (
//               <div key={step.stepId} className="patient-profile-timeline-item">
//                 <div className="patient-profile-timeline-status">
//                   {step.statusCycleStep === "completed"
//                     ? "✅"
//                     : step.statusCycleStep === "ongoing"
//                     ? "⏳"
//                     : "📅"}
//                 </div>

//                 <h4>
//                   Giai đoạn {step.stepOrder}: {step.serive}
//                 </h4>
//                 <p className="patient-profile-timeline-period">
//                   {formatDate(step.eventdate)}
//                 </p>

//                 {/* Ghi chú */}
//                 {step.note && (
//                   <div className="patient-profile-timeline-notes">
//                     <p>
//                       <strong>Ghi chú:</strong> {step.note}
//                     </p>
//                   </div>
//                 )}

//                 {/* Cuộc hẹn */}
//                 {step.appointment?.length > 0 && (
//                   <div className="patient-profile-timeline-appointments">
//                     <strong>📅 Cuộc hẹn:</strong>
//                     {step.appointment.map((apt) => (
//                       <p key={apt.appointmentId}>
//                         {formatDate(apt.date)} - BS. {apt.doctorName} (
//                         {apt.status}){apt.note && <span> - {apt.note}</span>}
//                       </p>
//                     ))}
//                   </div>
//                 )}

//                 {/* Thuốc sử dụng trong step này */}
//                 {step.medicineSchedule?.length > 0 && (
//                   <div className="patient-profile-timeline-medications">
//                     <strong>💊 Thuốc sử dụng:</strong>
//                     {step.medicineSchedule.map((med, index) => (
//                       <p key={index}>
//                         <strong>{med.medicineName}:</strong> {med.dose} -{" "}
//                         {med.frequency}({med.startDate} - {med.endDate}) -{" "}
//                         {med.status}
//                       </p>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const renderScheduleTab = () => (
//     <div className="patient-profile-tab-content">
//       <div className="patient-profile-schedule-header">
//         <div>
//           <h3>Lịch hẹn</h3>
//           <p>Lịch sử và lịch hẹn sắp tới</p>
//         </div>
//       </div>

//       <div className="patient-profile-schedule-section">
//         <h4>Lịch hẹn sắp tới</h4>
//         <div className="patient-profile-appointment-list">
//           <div className="patient-profile-appointment-item patient-profile-upcoming">
//             <div className="patient-profile-appointment-time">
//               <span className="patient-profile-time-icon"></span>
//             </div>
//             <div className="patient-profile-appointment-details">
//               <h5>Siêu âm theo dõi</h5>
//               <p>25/05/2024 | 10:15 - 10:45</p>
//               <p>BS. Nguyễn Lan Anh</p>
//               <div className="patient-profile-appointment-actions">
//                 {/* <button className="patient-profile-btn-outline-red">Chi tiết</button> */}
//                 <button className="patient-profile-btn-outline-blue">
//                   Dời lịch
//                 </button>
//               </div>
//             </div>
//             <button className="patient-profile-reschedule-btn">
//               Đã lên lịch
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="patient-profile-schedule-section">
//         <h4>Lịch sử cuộc hẹn</h4>
//         <div className="patient-profile-appointment-list">
//           <div className="patient-profile-appointment-item patient-profile-completed">
//             <div className="patient-profile-appointment-time">
//               <span className="patient-profile-time-icon patient-profile-completed">
//                 ✅
//               </span>
//             </div>
//             <div className="patient-profile-appointment-details">
//               <h5>Tư vấn</h5>
//               <p>05/05/2024 | 14:00 - 14:30</p>
//               <p>BS. Nguyễn Lan Anh</p>
//               {/* <button className="patient-profile-btn-outline-red">Xem ghi chú</button> */}
//             </div>
//             <span className="patient-profile-status-badge patient-profile-completed">
//               Hoàn thành
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const renderNotesTab = () => (
//     <div className="patient-profile-tab-content">
//       <div className="patient-profile-notes-header">
//         <div>
//           <h3>Ghi chú khám bệnh</h3>
//           <p>Ghi chú và theo dõi quá trình điều trị</p>
//         </div>
//       </div>
//       <div className="patient-profile-notes-section">
//         <h4>Ghi chú theo giai đoạn điều trị</h4>
//         <div className="patient-profile-notes-list">
//           {allCycleSteps.map((phase) => (
//             <div key={phase.stepId} className="patient-profile-note-item">
//               <div className="patient-profile-note-header">
//                 <div className="patient-profile-note-date">
//                   <span className="patient-profile-date-icon">📅</span>
//                   <span>{formatDate(phase.eventdate)}</span>
//                 </div>
//                 <span className="patient-profile-note-type">
//                   Giai đoạn {phase.stepOrder}: {phase.serive}
//                 </span>
//               </div>
//               <div className="patient-profile-note-content">
//                 <h5>Ghi chú khám:</h5>
//                 <p>{phase.note || "Chưa có ghi chú"}</p>
//               </div>
//               <div className="patient-profile-note-footer">
//                 <span className="patient-profile-doctor-name">
//                   {/* Sửa lỗi: Kiểm tra appointment array trước khi truy cập */}
//                   {phase.appointment && phase.appointment.length > 0
//                     ? phase.appointment[0].doctorName
//                     : "Chưa có thông tin bác sĩ"}
//                 </span>

//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );

//   const renderResultsTab = () => (
//     <div className="patient-profile-tab-content">
//       <div className="patient-profile-results-header">
//         <div>
//           <h3>Kết quả xét nghiệm</h3>
//           <p>Lịch sử các xét nghiệm và kết quả</p>
//         </div>
//       </div>
//       <div className="patient-profile-results-by-phase">
//         {/* Sử dụng testResults thay vì cycleStepDetails */}
//         {testResults && testResults.length > 0 ? (
//           testResults.map((result, index) => (
//             <div
//               key={result.resultId}
//               className="patient-profile-phase-results-container"
//             >
//               <div className="patient-profile-phase-results-header">
//                 <h4>Kết quả xét nghiệm {index + 1}</h4>
//                 <span className="patient-profile-phase-period">
//                   {formatDate(result.testDate)}
//                 </span>
//               </div>
//               <div className="patient-profile-results-list">
//                 <div className="patient-profile-result-item">
//                   <div className="patient-profile-result-icon">
//                     <span className="patient-profile-icon-purple">📋</span>
//                   </div>
//                   <div className="patient-profile-result-details">
//                     <h4>{result.name}</h4>
//                     <p>Ngày: {formatDate(result.testDate)}</p>
//                     <p>
//                       Kết quả: {result.value} {result.unit}
//                     </p>
//                     <p>Khoảng tham chiếu: {result.referenceRange}</p>
//                     <p>
//                       Ghi chú: <strong>{result.note || "Không có"}</strong>
//                     </p>

//                   </div>
//                   <span className="patient-profile-status-badge patient-profile-completed">
//                     Hoàn thành
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>Chưa có kết quả xét nghiệm nào.</p>
//         )}
//       </div>
//     </div>
//   );

//   const renderMedicationsTab = () => (
//     <div className="patient-profile-tab-content">
//       <div className="patient-profile-medications-header">
//         <div>
//           <h3>Thuốc</h3>
//           <p>Thuốc hiện tại và lịch sử thuốc</p>
//         </div>
//       </div>
//       <div className="patient-profile-medications-section">
//         <h4>Thuốc theo giai đoạn điều trị</h4>
//         <div className="patient-profile-medication-cards">
//           {allCycleSteps
//             .flatMap((step) =>
//               (step.medicineSchedule || []).map((med, medIndex) => {
//                 const isActive =
//                   step.statusCycleStep === "ongoing" &&
//                   !med.status?.includes("qua_han") &&
//                   new Date(med.endDate) >= new Date();
//                 return {
//                   key: `${step.stepId}-${medIndex}`,
//                   isActive,
//                   step,
//                   med,
//                   medIndex,
//                 };
//               })
//             )
//             .sort((a, b) => {
//               if (a.isActive && !b.isActive) return -1;
//               if (!a.isActive && b.isActive) return 1;
//               return 0;
//             })
//             .map(({ key, isActive, step, med }) => (
//               <div
//                 key={key}
//                 className={`patient-profile-medication-card ${
//                   isActive
//                     ? "patient-profile-active"
//                     : "patient-profile-completed"
//                 }`}
//               >
//                 <div className="patient-profile-med-header">
//                   <h5>{med.medicineName}</h5>
//                   <span
//                     className={`patient-profile-status-badge ${
//                       isActive
//                         ? "patient-profile-active"
//                         : "patient-profile-completed"
//                     }`}
//                   >
//                     {isActive ? "Đang dùng" : "Đã hoàn thành"}
//                   </span>
//                 </div>
//                 <div className="patient-profile-med-details">
//                   <p>
//                     <strong>Liều dùng:</strong> {med.dose}
//                   </p>
//                   <p>
//                     <strong>Tần suất:</strong> {med.frequency}
//                   </p>
//                   <p>
//                     <strong>Thời gian:</strong> {med.startDate} → {med.endDate}
//                   </p>
//                   <p>
//                     <strong>Giai đoạn:</strong> Bước {step.stepOrder} –{" "}
//                     {step.serive}
//                   </p>
//                   {step.note && (
//                     <p>
//                       <strong>Ghi chú:</strong> {step.note}
//                     </p>
//                   )}
//                 </div>

//               </div>
//             ))}
//         </div>
//       </div>
//     </div>
//   );

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case "overview":
//         return renderOverviewTab();
//       case "schedule":
//         return renderScheduleTab();
//       case "notes":
//         return renderNotesTab();
//       case "results":
//         return renderResultsTab();
//       case "medications":
//         return renderMedicationsTab();
//       default:
//         return renderOverviewTab();
//     }
//   };

//   const CreateReExamAppointmentModal = ({
//     isOpen,
//     onClose,
//     form,
//     onChange,
//     onSubmit,
//   }) => {
//     return (
//       isOpen && (
//         <div className="patient-profile-modal">
//           <div className="patient-profile-modal-content">
//             <h3>Đặt lịch tái khám</h3>
//             <form onSubmit={onSubmit}>
//               <label>
//                 Ngày tái khám:
//                 <input
//                   type="date"
//                   value={form.date}
//                   onChange={(e) => onChange("date", e.target.value)}
//                   required
//                 />
//               </label>
//               <label>
//                 Ghi chú:
//                 <textarea
//                   value={form.note}
//                   onChange={(e) => onChange("note", e.target.value)}
//                   placeholder="Ghi chú (nếu có)"
//                 />
//               </label>
//               <button type="submit" className="patient-profile-btn-primary">
//                 Đặt lịch
//               </button>
//             </form>
//             <button className="patient-profile-btn-outline" onClick={onClose}>
//               Đóng
//             </button>
//           </div>
//         </div>
//       )
//     );
//   };

//   const CreateMedicationScheduleModal = ({
//     isOpen,
//     onClose,
//     form,
//     onChange,
//     onSubmit,
//   }) => {
//     return (
//       isOpen && (
//         <div className="patient-profile-modal">
//           <div className="patient-profile-modal-content">
//             <h3>Tạo lịch uống thuốc</h3>
//             <form onSubmit={onSubmit}>
//               <label>
//                 Tên thuốc:
//                 <select
//                   value={form.medicineId}
//                   onChange={(e) => onChange("medicineId", e.target.value)}
//                   required
//                 >
//                   <option value="">Chọn thuốc</option>
//                   {allMedicines.map((med) => (
//                     <option key={med.id} value={med.id}>
//                       {med.name}
//                     </option>
//                   ))}
//                 </select>
//               </label>
//               <label>
//                 Ngày bắt đầu:
//                 <input
//                   type="date"
//                   value={form.startDate}
//                   onChange={(e) => onChange("startDate", e.target.value)}
//                   required
//                 />
//               </label>
//               <label>
//                 Ngày kết thúc:
//                 <input
//                   type="date"
//                   value={form.endDate}
//                   onChange={(e) => onChange("endDate", e.target.value)}
//                   required
//                 />
//               </label>
//               <button type="submit" className="patient-profile-btn-primary">
//                 Lưu
//               </button>
//             </form>
//             <button className="patient-profile-btn-outline" onClick={onClose}>
//               Đóng
//             </button>
//           </div>
//         </div>
//       )
//     );
//   };

//   const CreateTestResultModal = ({
//     isOpen,
//     onClose,
//     form,
//     onChange,
//     onSubmit,
//   }) => {
//     return (
//       isOpen && (
//         <div className="patient-profile-modal">
//           <div className="patient-profile-modal-content">
//             <h3>Tạo kết quả xét nghiệm</h3>
//             <form onSubmit={onSubmit}>
//               <label>
//                 Tên xét nghiệm:
//                 <input
//                   type="text"
//                   value={form.name}
//                   onChange={(e) => onChange("name", e.target.value)}
//                   required
//                 />
//               </label>
//               <label>
//                 Kết quả:
//                 <input
//                   type="text"
//                   value={form.value}
//                   onChange={(e) => onChange("value", e.target.value)}
//                   required
//                 />
//               </label>
//               <label>
//                 Đơn vị:
//                 <input
//                   type="text"
//                   value={form.unit}
//                   onChange={(e) => onChange("unit", e.target.value)}
//                   required
//                 />
//               </label>
//               <label>
//                 Khoảng tham chiếu:
//                 <input
//                   type="text"
//                   value={form.referenceRange}
//                   onChange={(e) => onChange("referenceRange", e.target.value)}
//                 />
//               </label>
//               <label>
//                 Ghi chú:
//                 <textarea
//                   value={form.note}
//                   onChange={(e) => onChange("note", e.target.value)}
//                 />
//               </label>
//               <label>
//                 Ngày xét nghiệm:
//                 <input
//                   type="date"
//                   value={form.testDate}
//                   onChange={(e) => onChange("testDate", e.target.value)}
//                   required
//                 />
//               </label>
//               <button type="submit" className="patient-profile-btn-primary">
//                 Tạo
//               </button>
//             </form>
//             <button className="patient-profile-btn-outline" onClick={onClose}>
//               Đóng
//             </button>
//           </div>
//         </div>
//       )
//     );
//   };

//   const UpdateCycleStepNoteModal = ({
//     isOpen,
//     onClose,
//     form,
//     onChange,
//     onSubmit,
//   }) => {
//     return (
//       isOpen && (
//         <div className="patient-profile-modal">
//           <div className="patient-profile-modal-content">
//             <h3>Cập nhật ghi chú bước điều trị</h3>
//             <form onSubmit={onSubmit}>
//               <label>
//                 Ghi chú:
//                 <textarea
//                   value={form.note}
//                   onChange={(e) => onChange("note", e.target.value)}
//                   required
//                 />
//               </label>
//               <button type="submit" className="patient-profile-btn-primary">
//                 Cập nhật
//               </button>
//             </form>
//             <button className="patient-profile-btn-outline" onClick={onClose}>
//               Đóng
//             </button>
//           </div>
//         </div>
//       )
//     );
//   };

//   const UpdateTestResultModal = ({
//     isOpen,
//     onClose,
//     form,
//     onChange,
//     onSubmit,
//   }) => {
//     return (
//       isOpen && (
//         <div className="patient-profile-modal">
//           <div className="patient-profile-modal-content">
//             <h3>Cập nhật kết quả xét nghiệm</h3>
//             <form onSubmit={onSubmit}>
//               <label>
//                 Tên xét nghiệm:
//                 <input
//                   type="text"
//                   value={form.name}
//                   onChange={(e) => onChange("name", e.target.value)}
//                   required
//                 />
//               </label>
//               <label>
//                 Kết quả:
//                 <input
//                   type="text"
//                   value={form.value}
//                   onChange={(e) => onChange("value", e.target.value)}
//                   required
//                 />
//               </label>
//               <label>
//                 Đơn vị:
//                 <input
//                   type="text"
//                   value={form.unit}
//                   onChange={(e) => onChange("unit", e.target.value)}
//                   required
//                 />
//               </label>
//               <label>
//                 Khoảng tham chiếu:
//                 <input
//                   type="text"
//                   value={form.referenceRange}
//                   onChange={(e) => onChange("referenceRange", e.target.value)}
//                 />
//               </label>
//               <label>
//                 Ghi chú:
//                 <textarea
//                   value={form.note}
//                   onChange={(e) => onChange("note", e.target.value)}
//                 />
//               </label>
//               <label>
//                 Ngày xét nghiệm:
//                 <input
//                   type="date"
//                   value={form.testDate}
//                   onChange={(e) => onChange("testDate", e.target.value)}
//                   required
//                 />
//               </label>
//               <button type="submit" className="patient-profile-btn-primary">
//                 Cập nhật
//               </button>
//             </form>
//             <button className="patient-profile-btn-outline" onClick={onClose}>
//               Đóng
//             </button>
//           </div>
//         </div>
//       )
//     );
//   };

//   return (
//     <div className="patient-profile">
//       <div className="patient-profile-header">
//         <div className="patient-profile-header-left">
//           <a
//             href="#"
//             onClick={(e) => {
//               e.preventDefault();
//               window.history.back();
//             }}
//             className="patient-profile-back-btn"
//           >
//             ← Quay lại
//           </a>
//           <div className="patient-profile-header-info">
//             <h1>Cuộc hẹn với {patientData.name}</h1>
//             <div className="patient-profile-appointment-info">
//               <span className="patient-profile-appointment-type">
//                 {patientData.currentAppointment.type}
//               </span>
//               <span className="patient-profile-appointment-time">
//                  {patientData.currentAppointment.date} |{" "}
//                 {patientData.currentAppointment.time}
//               </span>
//               <span className="patient-profile-appointment-status">
//                 {patientData.currentAppointment.status}
//               </span>
//             </div>
//             <p className="patient-profile-appointment-details">
//               {patientData.currentAppointment.details}
//             </p>
//           </div>
//         </div>

//       </div>

//       <div className="patient-profile-container">
//         <div className="patient-profile-sidebar">
//           <div className="patient-profile-patient-info">
//             <div className="patient-profile-patient-avatar">
//               <img src="/src/asset/ivf.jpg" alt="Patient Avatar" />
//             </div>
//             <div className="patient-profile-patient-details">
//               <h2>{patientData.name}</h2>
//               <p className="patient-profile-patient-id">ID: {patientData.id}</p>
//               <span className="patient-profile-status-badge patient-profile-active">
//                 {patientData.status}
//               </span>
//             </div>
//           </div>

//           <div className="patient-profile-patient-basic-info">
//             <div className="patient-profile-info-row">
//               <span className="patient-profile-label">Tuổi:</span>
//               <span className="patient-profile-value">{patientData.age}</span>
//             </div>

//             <div className="patient-profile-info-row">
//               <span className="patient-profile-label">Điều trị:</span>
//               <span className="patient-profile-value">
//                 {patientData.treatment}
//               </span>
//             </div>
//             <div className="patient-profile-info-row">
//               <span className="patient-profile-label">Ngày bắt đầu:</span>
//               <span className="patient-profile-value">
//                 {patientData.startDate}
//               </span>
//             </div>
//             <div className="patient-profile-info-row">
//               <span className="patient-profile-label">Bác sĩ phụ trách:</span>
//               <span className="patient-profile-value">
//                 {patientData.doctor}
//               </span>
//             </div>
//           </div>

//           <div className="patient-profile-sidebar-actions">
//             <button className="patient-profile-btn-outline">💬 Nhắn tin</button>
//           </div>
//         </div>

//         <div className="patient-profile-main-content">
//           <div className="patient-profile-tabs">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.id}
//                 className={`patient-profile-tab ${
//                   activeTab === tab.id ? "patient-profile-active" : ""
//                 }`}
//                 onClick={() => setActiveTab(tab.id)}
//               >
//                 <span>{tab.icon}</span>
//                 {tab.label}
//               </button>
//             ))}
//           </div>

//           {renderTabContent()}
//         </div>
//       </div>
//       <CreateReExamAppointmentModal
//         isOpen={isOpenCreateTestResultModal}
//         onClose={() => setIsOpenCreateTestResultModal(false)}
//         form={createTestResultForm}
//         onChange={handleTestResultChange}
//         onSubmit={handleCreateTestResult}
//       />
//       <CreateMedicationScheduleModal
//         isOpen={isOpenCreateMedicationModal}
//         onClose={() => setIsOpenCreateMedicationModal(false)}
//         form={createMedicationScheduleForm}
//         onChange={handleMedicationChange}
//         onSubmit={handleCreateMedicationSchedule}
//       />
//       <CreateTestResultModal
//         isOpen={isOpenCreateTestResultModal}
//         onClose={() => setIsOpenCreateTestResultModal(false)}
//         form={createTestResultForm}
//         onChange={handleTestResultChange}
//         onSubmit={handleCreateTestResult}
//       />
//       <UpdateCycleStepNoteModal
//         isOpen={isOpenUpdateCycleStepNoteModal}
//         onClose={() => setIsOpenUpdateCycleStepNoteModal(false)}
//         form={updateCycleStepNoteForm}
//         onChange={handleUpdateCycleNoteChange}
//         onSubmit={handleUpdateCycleStepNote}
//       />
//       <UpdateTestResultModal
//         isOpen={isOpenUpdateTestResultModal}
//         onClose={() => setIsOpenUpdateTestResultModal(false)}
//         form={updateTestResultForm}
//         onChange={handleUpdateTestResultChange}
//         onSubmit={handleUpdateTestResult}
//       />
//     </div>
//   );
// };

// export default AppointmentsDieuTri;

import { useState, useEffect } from "react";
import ApiGateway from "../../../features/service/apiGateway";
import apiMessage from "@features/service/apiMessage";
import apiAppointment from "../../../features/service/apiAppointment";
import { useParams } from "react-router-dom";
import { showSuccess, showFail, confirmToast } from "@lib/toast/toast";
import "./AppointmentsDieuTri.css";

const AppointmentsDieuTri = () => {
  const { customerId } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [showMessagePopup, setShowMessagePopup] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    medicalHistory: true,
    familyHistory: true,
    allergies: true,
    medicalRecords: false,
    prescribedMeds: false,
  });
  const [allCycles, setAllCycles] = useState([]);
  const [selectedCycle, setSelectedCycle] = useState(null);
  const [cycleStepNames, setCycleStepNames] = useState([]);
  const [allCycleSteps, setAllCycleSteps] = useState([]);
  const [messageContent, setMessageContent] = useState("");
  const [cycleSteps, setCycleSteps] = useState([]);
  const [appointmentHistory, setAppointmentHistory] = useState([]); // Lịch sử cuộc hẹn
  const [medicationSchedules, setMedicationSchedules] = useState([]); // Lịch uống thuốc theo bước
  const [allMedicines, setAllMedicines] = useState([]); // Danh sách thuốc
  const [testResults, setTestResults] = useState([]); // Kết quả xét nghiệm
  const [loading, setLoading] = useState(false); // Loading chung cho các thao tác async

  const [createReExamAppointmentForm, setCreateReExamAppointmentForm] =
    useState({
      customerId: customerId || "", // Sử dụng customerId từ useParams
      serviceId: "",
      date: "",
      note: "",
      cycleStepId: "",
    });

  const [createMedicationScheduleForm, setCreateMedicationScheduleForm] =
    useState({
      medicineId: "",
      cycleId: "",
      stepId: "",
      startDate: "",
      endDate: "",
    }); // Form tạo lịch uống thuốc

  const [createTestResultForm, setCreateTestResultForm] = useState({
    appointmentId: "",
    name: "",
    value: "",
    unit: "",
    referenceRange: "",
    testDate: "",
    note: "",
    cycleStepId: "",
  }); // Form tạo kết quả xét nghiệm

  const [updateCycleStepNoteForm, setUpdateCycleStepNoteForm] = useState({
    cycleId: "",
    stepOrder: "",
    note: "",
  }); // Form cập nhật ghi chú chu kỳ điều trị

  const [updateTestResultForm, setUpdateTestResultForm] = useState({
    id: "",
    name: "",
    value: "",
    unit: "",
    referenceRange: "",
    note: "",
    testDate: "",
  }); // Form cập nhật kết quả xét nghiệm

  const [isOpenCreateReExamModal, setIsOpenCreateReExamModal] = useState(false); // Modal tạo lịch hẹn tái khám
  const [isOpenCreateMedicationModal, setIsOpenCreateMedicationModal] =
    useState(false); // Modal tạo lịch uống thuốc
  const [isOpenCreateTestResultModal, setIsOpenCreateTestResultModal] =
    useState(false); // Modal tạo kết quả xét nghiệm
  const [isOpenUpdateCycleStepNoteModal, setIsOpenUpdateCycleStepNoteModal] =
    useState(false); // Modal cập nhật ghi chú chu kỳ
  const [isOpenUpdateTestResultModal, setIsOpenUpdateTestResultModal] =
    useState(false); // Modal cập nhật kết quả xét nghiệm

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const patientData = selectedCycle
    ? {
        name: selectedCycle.customerName,
        id: `PT-${selectedCycle.customerId}`,
        status:
          selectedCycle.status === "ongoing" ? "Đang điều trị" : "Hoàn thành",
        age: selectedCycle.customerAge,
        treatment: selectedCycle.serviceName,
        startDate: selectedCycle.startDate,
        doctor: selectedCycle.doctorName,
        phone: "0912345678",
        email: "customer@email.com",
        address: "Địa chỉ bệnh nhân",
        currentAppointment: {
          type: "Tái khám", // Thêm dòng này
          date: "",
          time: "",
          status: "Đang diễn ra",
          details: "", // Thêm dòng này nếu cần
        },
      }
    : {
        name: "Đang tải...",
        id: "",
        status: "",
        age: 0,
        treatment: "",
        startDate: "",
        doctor: "",
        currentAppointment: {
          type: "",
          date: "",
          time: "",
          status: "",
          details: "",
        },
      };

  const tabs = [
    { id: "overview", label: "Tổng quan", icon: "👤" },
    { id: "schedule", label: "Lịch hẹn", icon: "📅" },
    { id: "notes", label: "Ghi chú khám", icon: "📝" },
    { id: "results", label: "Kết quả xét nghiệm", icon: "📋" },
    { id: "medications", label: "Thuốc", icon: "💊" },
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

  const handleSendMessage = async () => {
    try {
      if (!messageContent.trim()) {
        alert("Vui lòng nhập nội dung tin nhắn.");
        return;
      }

      const payload = {
        receiverId: selectedCycle.customerId, // Lấy customerId từ appointmentDetail
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

  const handleReExamChange = (field, value) => {
    setCreateReExamAppointmentForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCreateReExamAppointment = async (e) => {
    e.preventDefault();
    try {
      await createReExamAppointment(createReExamAppointmentForm);
      showSuccess("Đặt lịch tái khám thành công");
      setIsOpenCreateReExamModal(false);
    } catch {
      showFail("Đặt lịch thất bại");
    }
  };

  const handleMedicationChange = (field, value) => {
    setCreateMedicationScheduleForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCreateMedicationSchedule = async (e) => {
    e.preventDefault();
    try {
      await createMedicationSchedule(createMedicationScheduleForm);
      showSuccess("Tạo lịch uống thuốc thành công");
      setIsOpenCreateMedicationModal(false);
    } catch {
      showFail("Tạo lịch uống thuốc thất bại");
    }
  };

  const handleTestResultChange = (field, value) => {
    setCreateTestResultForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCreateTestResult = async (e) => {
    e.preventDefault();
    try {
      await createTestResult(createTestResultForm);
      showSuccess("Tạo kết quả xét nghiệm thành công");
      setIsOpenCreateTestResultModal(false);
    } catch {
      showFail("Tạo kết quả xét nghiệm thất bại");
    }
  };

  const handleUpdateCycleNoteChange = (field, value) => {
    setUpdateCycleStepNoteForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdateCycleStepNote = async (e) => {
    e.preventDefault();
    try {
      const { cycleId, stepOrder, note } = updateCycleStepNoteForm;
      await updateCycleStepNote(cycleId, stepOrder, note);
      showSuccess("Cập nhật ghi chú thành công");
      setIsOpenUpdateCycleStepNoteModal(false);
    } catch {
      showFail("Cập nhật ghi chú thất bại");
    }
  };

  const handleUpdateTestResultChange = (field, value) => {
    setUpdateTestResultForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdateTestResult = async (e) => {
    e.preventDefault();
    try {
      const { id, ...dto } = updateTestResultForm;
      await updateTestResult(id, dto);
      showSuccess("Cập nhật kết quả xét nghiệm thành công");
      setIsOpenUpdateTestResultModal(false);
    } catch {
      showFail("Cập nhật kết quả xét nghiệm thất bại");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const datePart = date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const timePart = date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${datePart} ${timePart}`;
  };

  const mappingStepsName = (stepOrder) => {
    if (!cycleStepNames || cycleStepNames.length === 0) {
      return `Bước ${stepOrder}`;
    }
    const step = cycleStepNames.find((name) => name.stepOrder === stepOrder);
    return step ? step.title : `Bước ${stepOrder}`;
  };

  const getCurrentStepPeriod = (stepOrder) => {
    const step = cycleSteps.find((phase) => phase.stepOrder === stepOrder);
    const nextStep = cycleSteps.find(
      (phase) => phase.stepOrder === stepOrder + 1
    );
    if (step && nextStep) {
      return `${new Date(step.eventdate).toLocaleDateString(
        "vi-VN"
      )} - ${new Date(nextStep.eventdate).toLocaleDateString("vi-VN")}`;
    } else if (step) {
      return `${new Date(step.eventdate).toLocaleDateString(
        "vi-VN"
      )} - Hiện tại`;
    }
  };

  const collectNotesFromAppointments = (cycleStepData) => {
    console.log("Cycle Step Data:", cycleStepData);
    if (
      !cycleStepData?.appointment ||
      !Array.isArray(cycleStepData.appointment)
    ) {
      return [];
    }

    let abc = cycleStepData.appointment
      .filter((app) => app.note?.trim())
      .map((app) => ({
        note: app.note.trim(),
        date: app.date?.split("T")[0] || "",
        doctor: app.doctorName || "",
      }));

    console.log("Filtered Notes:", abc);
    return abc;
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Lấy tất cả chu kỳ điều trị
      const cyclesResponse = await getAllCyclesOfCustomer(customerId);

      if (cyclesResponse?.data?.length > 0) {
        // Chọn chu kỳ đang ongoing hoặc chu kỳ đầu tiên
        const currentCycle =
          cyclesResponse.data.find((cycle) => cycle.status === "ongoing") ||
          cyclesResponse.data[0];

        setSelectedCycle(currentCycle);

        // 2. Lấy chi tiết bước điều trị của chu kỳ được chọn
        await getCycleStepsByCycleId(currentCycle.cycleId);
      }

      // 3. Lấy lịch uống thuốc và kết quả xét nghiệm song song
      await Promise.all([
        getMedicationSchedulesByCustomer(customerId),
        getTestResultsByCustomer(customerId),
      ]);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  };

  // 1. Lấy chu kỳ điều trị hiện tại của bệnh nhân (bác sĩ)
  const getAllCyclesOfCustomer = async (customerId) => {
    try {
      const res = await apiAppointment.getAllCyclesOfCustomer(customerId);
      console.log("All Cycles:", res.data);
      setAllCycles(res.data);
      return res;
    } catch (error) {
      console.error("Lỗi lấy chu kỳ điều trị:", error);
      throw error;
    }
  };

  // 2. Đặt lịch hẹn tái khám
  const createReExamAppointment = async (dto) => {
    try {
      const res = await ApiGateway.createReExamAppointment(dto);
      return res;
    } catch (error) {
      console.error("Lỗi đặt lịch tái khám:", error);
      throw error;
    }
  };

  // 3. Hủy cuộc hẹn
  const cancelAppointment = async (appointmentId) => {
    try {
      const res = await ApiGateway.cancelAppointment(appointmentId);
      return res;
    } catch (error) {
      console.error("Lỗi hủy cuộc hẹn:", error);
      throw error;
    }
  };

  // 4. Cập nhật dịch vụ cho cuộc hẹn
  const updateAppointmentService = async (appointmentId, dto) => {
    try {
      const res = await ApiGateway.updateAppointmentService(appointmentId, dto);
      return res;
    } catch (error) {
      console.error("Lỗi cập nhật dịch vụ cuộc hẹn:", error);
      throw error;
    }
  };

  // 5. Lấy lịch sử cuộc hẹn của bệnh nhân
  const getAppointmentHistoryByCustomer = async (customerId) => {
    try {
      const res = await ApiGateway.getAppointmentHistoryByCustomer(customerId);
      console.log("Appointment History:", res);
      setAppointmentHistory(res);
      return res;
    } catch (error) {
      console.error("Lỗi lấy lịch sử cuộc hẹn:", error);
      throw error;
    }
  };

  // 6. Lấy danh sách bước điều trị của chu kỳ
  const getCycleStepsByCycleId = async (cycleId) => {
    try {
      const res = await apiAppointment.getCycleStepsByCycleId(cycleId);
      console.log("Cycle Steps:", res.data);
      setAllCycleSteps(res.data);
      return res;
    } catch (error) {
      console.error("Lỗi lấy bước điều trị:", error);
      throw error;
    }
  };

  // 7. Cập nhật trạng thái bước điều trị
  const updateCycleStepStatus = async (cycleId, stepOrder, status) => {
    try {
      const res = await ApiGateway.updateCycleStepStatus(
        cycleId,
        stepOrder,
        status
      );
      return res;
    } catch (error) {
      console.error("Lỗi cập nhật trạng thái bước điều trị:", error);
      throw error;
    }
  };

  // 8. Cập nhật ghi chú cho bước điều trị
  const updateCycleStepNote = async (cycleId, stepOrder, note) => {
    try {
      const res = await ApiGateway.updateCycleStepNote(
        cycleId,
        stepOrder,
        note
      );
      return res;
    } catch (error) {
      console.error("Lỗi cập nhật ghi chú bước điều trị:", error);
      throw error;
    }
  };

  // 10. Tạo lịch uống thuốc
  const createMedicationSchedule = async (schedule) => {
    try {
      const res = await ApiGateway.createMedicationSchedule(schedule);
      return res;
    } catch (error) {
      console.error("Lỗi tạo lịch uống thuốc:", error);
      throw error;
    }
  };

  // 11. Lấy lịch uống thuốc theo chu kỳ và bước điều trị
  // Lấy lịch uống thuốc của bệnh nhân
  const getMedicationSchedulesByCustomer = async (customerId) => {
    try {
      const res = await apiAppointment.getMedicationSchedulesByCustomer(
        customerId
      );
      console.log("Medicine Schedules:", res.data);
      setMedicationSchedules(res.data);
      return res;
    } catch (error) {
      console.error("Lỗi lấy lịch uống thuốc:", error);
      throw error;
    }
  };

  // 12. Lấy danh sách thuốc
  const getAllMedicines = async () => {
    try {
      const res = await ApiGateway.getAllMedicines();
      console.log("All Medicines:", res.data);
      setAllMedicines(res.data);
      return res.data;
    } catch (error) {
      console.error("Lỗi lấy danh sách thuốc:", error);
      throw error;
    }
  };

  // 13. Lấy kết quả xét nghiệm của bệnh nhân
  const getTestResultsByCustomer = async (customerId) => {
    try {
      const res = await apiAppointment.getTestResultsByCustomer(customerId);
      console.log("Test Results:", res);
      setTestResults(res); // res đã là array, không cần res.data
      return res;
    } catch (error) {
      console.error("Lỗi lấy kết quả xét nghiệm:", error);
      throw error;
    }
  };

  // 14. Tạo mới kết quả xét nghiệm
  const createTestResult = async (dto) => {
    try {
      const res = await ApiGateway.createTestResult(dto);
      return res;
    } catch (error) {
      console.error("Lỗi tạo kết quả xét nghiệm:", error);
      throw error;
    }
  };

  // 15. Cập nhật kết quả xét nghiệm
  const updateTestResult = async (id, dto) => {
    try {
      const res = await ApiGateway.updateTestResult(id, dto);
      return res;
    } catch (error) {
      console.error("Lỗi cập nhật kết quả xét nghiệm:", error);
      throw error;
    }
  };

  // 16. Lấy tên các bước điều trị
  const getCycleStepNames = async (cycleId) => {
    try {
      const res = await ApiGateway.getTreatmentSteps(cycleId);
      console.log("Cycle Step Names:", res.data);
      setCycleStepNames(res.data);
      return res.data;
    } catch (error) {
      console.error("Lỗi lấy tên các bước điều trị:", error);
      throw error;
    }
  };

  const renderOverviewTab = () => {
    const today = new Date("2025-07-17T15:08:00+07:00"); // Thời gian hiện tại

    // Sắp xếp allCycleSteps theo eventdate tăng dần
    const sortedSteps = [...(allCycleSteps || [])].sort(
      (a, b) => new Date(a.eventdate) - new Date(b.eventdate)
    );

    // Tìm giai đoạn hiện tại (gần nhất với hoặc đã qua ngày hiện tại)
    const currentPhaseIndex = sortedSteps.findIndex(
      (step) => new Date(step.eventdate) >= today
    );
    const currentPhase =
      currentPhaseIndex !== -1 ? sortedSteps[currentPhaseIndex] : null;

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
                <p>{mappingStepsName(selectedCycle?.cycleStep?.length || 0)}</p>
              </div>
            </div>
            <div className="patient-profile-treatment-card patient-profile-next">
              <div className="patient-profile-card-icon">
                <span className="patient-profile-icon-blue">📅</span>
              </div>
              <div className="patient-profile-card-content">
                <h4>Giai đoạn tiếp theo</h4>
                <p>
                  {mappingStepsName(
                    (selectedCycle?.cycleStep?.length || 0) + 1
                  )}
                </p>
                <span className="patient-profile-date"></span>
              </div>
            </div>
          </div>

          <div className="patient-profile-treatment-timeline">
            <h3>Toàn bộ giai đoạn điều trị</h3>
            <div className="patient-profile-timeline">
              {sortedSteps.map((step) => {
                const isCompleted = new Date(step.eventdate) < today;
                const isOngoing =
                  currentPhase &&
                  step.stepOrder === currentPhase.stepOrder &&
                  new Date(step.eventdate) <= today;
                const isUpcoming =
                  !isCompleted &&
                  !isOngoing &&
                  new Date(step.eventdate) > today &&
                  step.stepOrder > (currentPhase?.stepOrder || 0);

                return (
                  <div
                    key={step.stepId}
                    className={`patient-profile-timeline-item ${
                      isCompleted
                        ? "patient-profile-completed"
                        : isOngoing
                        ? "patient-profile-ongoing"
                        : isUpcoming
                        ? "patient-profile-upcoming"
                        : ""
                    }`}
                  >
                    <div className="patient-profile-timeline-header">
                      <h4>
                        Giai đoạn {step.stepOrder}: {step.serive}
                      </h4>
                      <span className="patient-profile-timeline-date">
                        {formatDate(step.eventdate)}
                      </span>
                    </div>
                    <div className="patient-profile-timeline-status">
                      {isCompleted && "✅ Hoàn thành"}
                      {isOngoing && "⏳ Đang diễn ra"}
                      {isUpcoming && "📅 Chưa diễn ra"}
                      {!isCompleted &&
                        !isOngoing &&
                        !isUpcoming &&
                        "📅 Đang diễn ra"}
                    </div>

                    {/* Ghi chú */}
                    {step.note && step.note.trim() && (
                      <div className="patient-profile-timeline-section">
                        <h5>Ghi chú:</h5>
                        <p>{step.note}</p>
                      </div>
                    )}

                    {/* Cuộc hẹn */}
                    {step.appointment?.length > 0 && (
                      <div className="patient-profile-timeline-section">
                        <h5>Cuộc hẹn:</h5>
                        <ul>
                          {step.appointment.map((apt) => (
                            <li key={apt.appointmentId}>
                              {formatDate(apt.date)} - Bác sĩ {apt.doctorName}
                              {apt.note && ` `}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Thuốc sử dụng */}
                    {step.medicineSchedule?.length > 0 && (
                      <div className="patient-profile-timeline-section">
                        <h5>Thuốc sử dụng:</h5>
                        {Object.entries(
                          step.medicineSchedule.reduce((acc, med) => {
                            const key = med.medicineName;
                            if (!acc[key]) {
                              acc[key] = {
                                dose: med.dose,
                                frequency: med.frequency,
                                startDate: med.startDate,
                                endDate: med.endDate,
                              };
                            } else {
                              acc[key].startDate =
                                acc[key].startDate < med.startDate
                                  ? acc[key].startDate
                                  : med.startDate;
                              acc[key].endDate =
                                acc[key].endDate > med.endDate
                                  ? acc[key].endDate
                                  : med.endDate;
                            }
                            return acc;
                          }, {})
                        ).map(([medicineName, details]) => (
                          <p key={medicineName}>
                            <strong>{medicineName}:</strong> {details.dose} -{" "}
                            {details.frequency} ({formatDate(details.startDate)}{" "}
                            - {formatDate(details.endDate)})
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderScheduleTab = () => {
    // Thu thập tất cả lịch hẹn từ allCycleSteps
    const allAppointments = allCycleSteps
      .flatMap((step) => step.appointment || [])
      .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sắp xếp theo ngày giảm dần

    // Phân loại lịch hẹn
    const today = new Date();
    const upcomingAppointments = allAppointments.filter(
      (apt) => new Date(apt.date) >= today && apt.status === "confirmed"
    );
    const pastAppointments = allAppointments.filter(
      (apt) => new Date(apt.date) < today || apt.status !== "confirmed"
    );

    return (
      <div className="patient-profile-tab-content">
        <div className="patient-profile-schedule-header">
          <div>
            <h3>Lịch hẹn</h3>
            <p>Lịch sử và lịch hẹn sắp tới</p>
          </div>
        </div>

        {/* Lịch hẹn sắp tới */}
        <div className="patient-profile-schedule-section">
          <h4>Lịch hẹn sắp tới</h4>
          {upcomingAppointments.length > 0 ? (
            <div className="patient-profile-appointment-list">
              {upcomingAppointments.map((apt) => (
                <div
                  key={apt.appointmentId}
                  className="patient-profile-appointment-item patient-profile-upcoming"
                >
                  <div className="patient-profile-appointment-time">
                    <span className="patient-profile-time-icon">📅</span>
                  </div>
                  <div className="patient-profile-appointment-details">
                    <h5>
                      {apt.serviceName} (
                      {apt.type === "tai_kham" ? "Tái khám" : "Khác"})
                    </h5>
                    <p>
                      {formatDate(apt.date)} |{" "}
                      {new Date(apt.date).toLocaleTimeString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p>BS. {apt.doctorName}</p>
                    {apt.note && (
                      <p>
                        <strong>Ghi chú:</strong> {apt.note}
                      </p>
                    )}
                    <div className="patient-profile-appointment-actions"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Không có lịch hẹn sắp tới.</p>
          )}
        </div>

        {/* Lịch sử cuộc hẹn */}
        <div className="patient-profile-schedule-section">
          <h4>Lịch sử cuộc hẹn</h4>
          {pastAppointments.length > 0 ? (
            <div className="patient-profile-appointment-list">
              {pastAppointments.map((apt) => (
                <div
                  key={apt.appointmentId}
                  className="patient-profile-appointment-item patient-profile-completed"
                >
                  <div className="patient-profile-appointment-time">
                    <span className="patient-profile-time-icon patient-profile-completed">
                      ✅
                    </span>
                  </div>
                  <div className="patient-profile-appointment-details">
                    <h5>
                      {apt.serviceName} (
                      {apt.type === "tai_kham" ? "Tái khám" : "Khác"})
                    </h5>
                    <p>
                      {formatDate(apt.date)} |{" "}
                      {new Date(apt.date).toLocaleTimeString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p>BS. {apt.doctorName}</p>
                    {apt.note && (
                      <p>
                        <strong>Ghi chú:</strong> {apt.note}
                      </p>
                    )}
                  </div>
                  <span className="patient-profile-status-badge patient-profile-completed">
                    {apt.status === "confirmed" ? "Hoàn thành" : apt.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p>Không có lịch sử cuộc hẹn.</p>
          )}
        </div>
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
      </div>
      <div className="patient-profile-notes-section">
        <h4>Ghi chú theo giai đoạn điều trị</h4>
        <div className="patient-profile-notes-list">
          {allCycleSteps.map((phase) => {
            // Chỉ render nếu note tồn tại và không rỗng
            if (phase.note && phase.note.trim()) {
              return (
                <div key={phase.stepId} className="patient-profile-note-item">
                  <div className="patient-profile-note-header">
                    <div className="patient-profile-note-date">
                      <span className="patient-profile-date-icon">📅</span>
                      <span>{formatDate(phase.eventdate)}</span>
                    </div>
                    <span className="patient-profile-note-type">
                      Giai đoạn {phase.stepOrder}: {phase.serive}
                    </span>
                  </div>
                  <div className="patient-profile-note-content">
                    <h5>Ghi chú khám:</h5>
                    <p>{phase.note}</p>
                  </div>
                  <div className="patient-profile-note-footer">
                    <span className="patient-profile-doctor-name">
                      {phase.appointment && phase.appointment.length > 0
                        ? phase.appointment[0].doctorName
                        : "Chưa có thông tin bác sĩ"}
                    </span>
                  </div>
                </div>
              );
            }
            return null; // Trả về null cho các giai đoạn không có note
          })}
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
      </div>
      <div className="patient-profile-results-by-phase">
        {/* Sử dụng testResults thay vì cycleStepDetails */}
        {testResults && testResults.length > 0 ? (
          testResults.map((result, index) => (
            <div
              key={result.resultId}
              className="patient-profile-phase-results-container"
            >
              <div className="patient-profile-phase-results-header">
                <h4>Kết quả xét nghiệm {index + 1}</h4>
                <span className="patient-profile-phase-period">
                  {formatDate(result.testDate)}
                </span>
              </div>
              <div className="patient-profile-results-list">
                <div className="patient-profile-result-item">
                  <div className="patient-profile-result-icon">
                    <span className="patient-profile-icon-purple">📋</span>
                  </div>
                  <div className="patient-profile-result-details">
                    <h4>{result.name}</h4>
                    <p>Ngày: {formatDate(result.testDate)}</p>
                    <p>
                      Kết quả: {result.value} {result.unit}
                    </p>
                    <p>Khoảng tham chiếu: {result.referenceRange}</p>
                    <p>
                      Ghi chú: <strong>{result.note || "Không có"}</strong>
                    </p>
                  </div>
                  <span className="patient-profile-status-badge patient-profile-completed">
                    Hoàn thành
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Chưa có kết quả xét nghiệm nào.</p>
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
      </div>
      <div className="patient-profile-medications-section">
        <h4>Thuốc theo giai đoạn điều trị</h4>
        <div className="patient-profile-medication-cards">
          {allCycleSteps
            .flatMap((step) =>
              (step.medicineSchedule || []).map((med, medIndex) => {
                const isActive =
                  step.statusCycleStep === "ongoing" &&
                  !med.status?.includes("qua_han") &&
                  new Date(med.endDate) >= new Date();
                return {
                  key: `${step.stepId}-${medIndex}`,
                  isActive,
                  step,
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
            .map(({ key, isActive, step, med }) => (
              <div
                key={key}
                className={`patient-profile-medication-card ${
                  isActive
                    ? "patient-profile-active"
                    : "patient-profile-completed"
                }`}
              >
                <div className="patient-profile-med-header">
                  <h5>{med.medicineName}</h5>
                  <span
                    className={`patient-profile-status-badge ${
                      isActive
                        ? "patient-profile-active"
                        : "patient-profile-completed"
                    }`}
                  >
                    {isActive ? "Chưa uống" : "Đã uống"}
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
                    <strong>Thời gian:</strong> {formatDate(med.eventDate)}
                  </p>
                  <p>
                    <strong>Giai đoạn:</strong> Bước {step.stepOrder} –{" "}
                    {step.serive}
                  </p>
                  {step.note && (
                    <p>
                      <strong>Ghi chú:</strong> {step.note}
                    </p>
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
      case "overview":
        return renderOverviewTab();
      case "schedule":
        return renderScheduleTab();
      case "notes":
        return renderNotesTab();
      case "results":
        return renderResultsTab();
      case "medications":
        return renderMedicationsTab();
      default:
        return renderOverviewTab();
    }
  };

  const CreateReExamAppointmentModal = ({
    isOpen,
    onClose,
    form,
    onChange,
    onSubmit,
  }) => {
    return (
      isOpen && (
        <div className="patient-profile-modal">
          <div className="patient-profile-modal-content">
            <h3>Đặt lịch tái khám</h3>
            <form onSubmit={onSubmit}>
              <label>
                Ngày tái khám:
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => onChange("date", e.target.value)}
                  required
                />
              </label>
              <label>
                Ghi chú:
                <textarea
                  value={form.note}
                  onChange={(e) => onChange("note", e.target.value)}
                  placeholder="Ghi chú (nếu có)"
                />
              </label>
              <button type="submit" className="patient-profile-btn-primary">
                Đặt lịch
              </button>
            </form>
            <button className="patient-profile-btn-outline" onClick={onClose}>
              Đóng
            </button>
          </div>
        </div>
      )
    );
  };

  const CreateMedicationScheduleModal = ({
    isOpen,
    onClose,
    form,
    onChange,
    onSubmit,
  }) => {
    return (
      isOpen && (
        <div className="patient-profile-modal">
          <div className="patient-profile-modal-content">
            <h3>Tạo lịch uống thuốc</h3>
            <form onSubmit={onSubmit}>
              <label>
                Tên thuốc:
                <select
                  value={form.medicineId}
                  onChange={(e) => onChange("medicineId", e.target.value)}
                  required
                >
                  <option value="">Chọn thuốc</option>
                  {allMedicines.map((med) => (
                    <option key={med.id} value={med.id}>
                      {med.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Ngày bắt đầu:
                <input
                  type="date"
                  value={form.startDate}
                  onChange={(e) => onChange("startDate", e.target.value)}
                  required
                />
              </label>
              <label>
                Ngày kết thúc:
                <input
                  type="date"
                  value={form.endDate}
                  onChange={(e) => onChange("endDate", e.target.value)}
                  required
                />
              </label>
              <button type="submit" className="patient-profile-btn-primary">
                Lưu
              </button>
            </form>
            <button className="patient-profile-btn-outline" onClick={onClose}>
              Đóng
            </button>
          </div>
        </div>
      )
    );
  };

  const CreateTestResultModal = ({
    isOpen,
    onClose,
    form,
    onChange,
    onSubmit,
  }) => {
    return (
      isOpen && (
        <div className="patient-profile-modal">
          <div className="patient-profile-modal-content">
            <h3>Tạo kết quả xét nghiệm</h3>
            <form onSubmit={onSubmit}>
              <label>
                Tên xét nghiệm:
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => onChange("name", e.target.value)}
                  required
                />
              </label>
              <label>
                Kết quả:
                <input
                  type="text"
                  value={form.value}
                  onChange={(e) => onChange("value", e.target.value)}
                  required
                />
              </label>
              <label>
                Đơn vị:
                <input
                  type="text"
                  value={form.unit}
                  onChange={(e) => onChange("unit", e.target.value)}
                  required
                />
              </label>
              <label>
                Khoảng tham chiếu:
                <input
                  type="text"
                  value={form.referenceRange}
                  onChange={(e) => onChange("referenceRange", e.target.value)}
                />
              </label>
              <label>
                Ghi chú:
                <textarea
                  value={form.note}
                  onChange={(e) => onChange("note", e.target.value)}
                />
              </label>
              <label>
                Ngày xét nghiệm:
                <input
                  type="date"
                  value={form.testDate}
                  onChange={(e) => onChange("testDate", e.target.value)}
                  required
                />
              </label>
              <button type="submit" className="patient-profile-btn-primary">
                Tạo
              </button>
            </form>
            <button className="patient-profile-btn-outline" onClick={onClose}>
              Đóng
            </button>
          </div>
        </div>
      )
    );
  };

  const UpdateCycleStepNoteModal = ({
    isOpen,
    onClose,
    form,
    onChange,
    onSubmit,
  }) => {
    return (
      isOpen && (
        <div className="patient-profile-modal">
          <div className="patient-profile-modal-content">
            <h3>Cập nhật ghi chú bước điều trị</h3>
            <form onSubmit={onSubmit}>
              <label>
                Ghi chú:
                <textarea
                  value={form.note}
                  onChange={(e) => onChange("note", e.target.value)}
                  required
                />
              </label>
              <button type="submit" className="patient-profile-btn-primary">
                Cập nhật
              </button>
            </form>
            <button className="patient-profile-btn-outline" onClick={onClose}>
              Đóng
            </button>
          </div>
        </div>
      )
    );
  };

  const UpdateTestResultModal = ({
    isOpen,
    onClose,
    form,
    onChange,
    onSubmit,
  }) => {
    return (
      isOpen && (
        <div className="patient-profile-modal">
          <div className="patient-profile-modal-content">
            <h3>Cập nhật kết quả xét nghiệm</h3>
            <form onSubmit={onSubmit}>
              <label>
                Tên xét nghiệm:
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => onChange("name", e.target.value)}
                  required
                />
              </label>
              <label>
                Kết quả:
                <input
                  type="text"
                  value={form.value}
                  onChange={(e) => onChange("value", e.target.value)}
                  required
                />
              </label>
              <label>
                Đơn vị:
                <input
                  type="text"
                  value={form.unit}
                  onChange={(e) => onChange("unit", e.target.value)}
                  required
                />
              </label>
              <label>
                Khoảng tham chiếu:
                <input
                  type="text"
                  value={form.referenceRange}
                  onChange={(e) => onChange("referenceRange", e.target.value)}
                />
              </label>

              <label>
                Ghi chú:
                <textarea
                  value={form.note}
                  onChange={(e) => onChange("note", e.target.value)}
                />
              </label>
              <label>
                Ngày xét nghiệm:
                <input
                  type="date"
                  value={form.testDate}
                  onChange={(e) => onChange("testDate", e.target.value)}
                  required
                />
              </label>
              <button type="submit" className="patient-profile-btn-primary">
                Cập nhật
              </button>
            </form>
            <button className="patient-profile-btn-outline" onClick={onClose}>
              Đóng
            </button>
          </div>
        </div>
      )
    );
  };

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
                {patientData.currentAppointment.date} |{" "}
                {patientData.currentAppointment.time}
              </span>
              <span className="patient-profile-appointment-status">
                {patientData.currentAppointment.status}
              </span>
            </div>
            <p className="patient-profile-appointment-details">
              {patientData.currentAppointment.details}
            </p>
          </div>
        </div>
      </div>

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
              <span className="patient-profile-label">Điều trị:</span>
              <span className="patient-profile-value">
                {patientData.treatment}
              </span>
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
              💬 Nhắn tin
            </button>
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
      <CreateReExamAppointmentModal
        isOpen={isOpenCreateTestResultModal}
        onClose={() => setIsOpenCreateTestResultModal(false)}
        form={createTestResultForm}
        onChange={handleTestResultChange}
        onSubmit={handleCreateTestResult}
      />
      <CreateMedicationScheduleModal
        isOpen={isOpenCreateMedicationModal}
        onClose={() => setIsOpenCreateMedicationModal(false)}
        form={createMedicationScheduleForm}
        onChange={handleMedicationChange}
        onSubmit={handleCreateMedicationSchedule}
      />
      <CreateTestResultModal
        isOpen={isOpenCreateTestResultModal}
        onClose={() => setIsOpenCreateTestResultModal(false)}
        form={createTestResultForm}
        onChange={handleTestResultChange}
        onSubmit={handleCreateTestResult}
      />
      <UpdateCycleStepNoteModal
        isOpen={isOpenUpdateCycleStepNoteModal}
        onClose={() => setIsOpenUpdateCycleStepNoteModal(false)}
        form={updateCycleStepNoteForm}
        onChange={handleUpdateCycleNoteChange}
        onSubmit={handleUpdateCycleStepNote}
      />
      <UpdateTestResultModal
        isOpen={isOpenUpdateTestResultModal}
        onClose={() => setIsOpenUpdateTestResultModal(false)}
        form={updateTestResultForm}
        onChange={handleUpdateTestResultChange}
        onSubmit={handleUpdateTestResult}
      />
    </div>
  );
};

export default AppointmentsDieuTri;
