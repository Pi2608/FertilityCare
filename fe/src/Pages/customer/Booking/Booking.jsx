import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BadgeCheck,
  Calendar,
  Clock,
  Check,
  Phone,
  FileText,
} from "lucide-react";
import "./Booking.css";
import apiConsultant from "../../../features/service/apiConsultant";

const Booking = () => {
  const appointmentTypes = [
    {
      id: "consultation",
      title: "Tư Vấn Ban Đầu",
      description: "Buổi tư vấn đầu tiên để thảo luận về các lựa chọn điều trị",
      icon: Calendar,
    },
    {
      id: "followup",
      title: "Khám Theo Dõi",
      description: "Buổi khám theo dõi cho bệnh nhân hiện tại",
      icon: Clock,
    },
    {
      id: "procedure",
      title: "Thủ Thuật Điều Trị",
      description: "Lịch hẹn cho thủ thuật điều trị cụ thể",
      icon: Check,
    },
  ];

  const procedureTypes = [
    "Chọn loại thủ thuật",
    "Siêu âm đầu dò",
    "Xét nghiệm máu",
    "Thụ tinh trong ống nghiệm (IVF)",
    "Bơm tinh trùng vào buồng tử cung",
    "Trứng đông trúng",
    "Xét nghiệm di truyền",
    "Điều trị vô sinh nam",
  ];

  const categories = [];

  // State management
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("Tất Cả");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    reason: "",
  });

  const [bookingComplete, setBookingComplete] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [availableSchedules, setAvailableSchedules] = useState([]);
  const minBookDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];
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

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const customerRes = await apiConsultant.getCustomerInfo();
        setCustomerId(customerRes.data.id);

        const doctorsRes = await apiConsultant.getActiveDoctors();
        setDoctors(doctorsRes.data); // ghi đè danh sách mock
      } catch (error) {
        console.error("Lỗi khi fetch dữ liệu:", error);
      }
    };

    fetchInitialData();
  }, []);

  // Filter doctors by category
  const filteredDoctors =
    selectedCategory === "Tất Cả"
      ? doctors
      : doctors.filter(
          (doctor) =>
            doctor.category === selectedCategory ||
            doctor.subcategory === selectedCategory
        );

  const handleStepNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handleStepBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDoctorSelect = async (doctor) => {
    setSelectedDoctor({
      ...doctor,
      id: doctor.userId,
    });

    // Nếu đã có ngày → gọi lại getUnavailableSchedules
    if (selectedDate) {
      try {
        const unavailable = await apiConsultant.getUnavailableSchedules(
          doctor.userId,
          selectedDate
        );

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
    }
  };

  const handleDateSelect = async (date) => {
    setSelectedDate(date);

    // Nếu chưa chọn bác sĩ thì vẫn hiển thị toàn bộ FIXED_TIME_SLOTS
    if (!selectedDoctor) {
      setAvailableSchedules(FIXED_TIME_SLOTS);
      return;
    }

    try {
      const unavailable = await apiConsultant.getUnavailableSchedules(
        selectedDoctor.userId,
        date
      );

      const busyTimes = unavailable.map((slot) => slot.startTime?.slice(0, 5));

      const available = FIXED_TIME_SLOTS.filter(
        (slot) => !busyTimes.includes(slot)
      );

      setAvailableSchedules(available);
    } catch (err) {
      console.error("Lỗi lấy lịch rảnh:", err);
      setAvailableSchedules(FIXED_TIME_SLOTS); // fallback khi lỗi
    }
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isFormValid = () => {
    return Object.values(personalInfo).every((value) => value.trim() !== "");
  };

  const handleFinalSubmit = async () => {
    try {
      const formattedTime = selectedTime.slice(0, 5); // Lấy đúng định dạng HH:mm (cắt bỏ nếu lỡ có giây)
      const payload = {
        doctorId: selectedDoctor?.userId,
        date: `${selectedDate}T${formattedTime}`,
        note: personalInfo.reason,
      };

      console.log("🟡 DỮ LIỆU GỬI LÊN API ĐẶT LỊCH:", payload);

      const res = await apiConsultant.registerAppointment(payload);

      const details = {
        doctor: selectedDoctor,
        date: selectedDate,
        time: selectedTime,
        reason: personalInfo.reason,
      };
      

      setAppointmentDetails(details);
      setBookingComplete(true);
    } catch (error) {
      console.error("🔴 ĐẶT LỊCH THẤT BẠI:", error);
      alert("Đặt lịch thất bại. Vui lòng thử lại.");
    }
  };

  // Step 2: Select Doctor
  const renderStep2 = () => (
    <div className="step-content">
      <h2>Chọn Bác Sĩ</h2>
      <p>Vui lòng chọn bác sĩ bạn muốn đặt lịch hẹn</p>

      <div className="category-filters">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-btn ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="doctors-list">
        {filteredDoctors.map((doctor) => (
          <div
            key={doctor.userId}
            className={`doctor-card ${
              selectedDoctor?.userId === doctor.userId ? "selected" : ""
            }`}
            onClick={() => handleDoctorSelect(doctor)}
          >
            <div className="upper">
              <div className="doctor-avatar">
                {doctor.image ? (
                  <img src={doctor.image} alt={doctor.name} />
                ) : (
                  <div className="avatar-placeholder"></div>
                )}
              </div>

              <div className="doctor-info">
                <h3>Bác sĩ {doctor.name}</h3>
                <p>Chuyên khoa {doctor.specification}</p>
              </div>
            </div>

            <div className="lower">
              <span>
                <BadgeCheck size={16} /> Có {doctor.experience} năm kinh nghiệm
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="step-navigation">
        <button className="back-btn" onClick={handleStepBack}>
          Quay Lại
        </button>
        <button
          className="next-btn"
          onClick={handleStepNext}
          disabled={!selectedDoctor}
        >
          Tiếp Theo →
        </button>
      </div>
    </div>
  );

  // Step 3: Select Date and Time
  const renderStep3 = () => (
    <div className="step-content">
      <h2>Chọn Ngày và Giờ</h2>
      <p>Vui lòng chọn ngày và giờ phù hợp cho lịch hẹn của bạn</p>

      <div className="datetime-selection">
        <div className="date-section">
          <div className="selected-doctor-info">
            <div className="doctor-avatar">
              <div className="avatar-placeholder"></div>
            </div>
            <div>
              <p>
                <strong>Bác sĩ {selectedDoctor?.name}</strong>
              </p>
              <p>Chuyên khoa {selectedDoctor?.specification}</p>
            </div>
          </div>
          <h3>Chọn Ngày</h3>
          <input
            type="date"
            onChange={(e) => {
              const dateOnly = e.target.value.split("T")[0];
              handleDateSelect(dateOnly);
            }}
            min={minBookDate}
          />
        </div>

        <div className="time-section">
          <h3>Chọn Giờ</h3>

          <div className="time-slots">
            {Array.isArray(availableSchedules) &&
            availableSchedules.length > 0 ? (
              availableSchedules.map((time) => {
                const isSelected = selectedTime === time;
                return (
                  <button
                    key={time}
                    className={`time-slot ${isSelected ? "selected" : ""}`}
                    onClick={() => handleTimeSelect(time)}
                  >
                    {time}
                  </button>
                );
              })
            ) : (
              <p style={{ color: "#999", fontStyle: "italic" }}>
                Bác sĩ không có lịch trống trong ngày đã chọn.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="notes">
        <h4>Lưu ý:</h4>
        <ul>
          <li>
            <Clock size={16} /> Vui lòng đến trước 15 phút để hoàn thành thủ tục
            đăng ký.
          </li>
          <li>
            <Phone size={16} /> Nếu bạn cần hủy hoặc đổi lịch hẹn, vui lòng
            thông báo cho chúng tôi ít nhất 24 giờ trước lịch hẹn.
          </li>
          <li>
            <FileText size={16} /> Mang theo hồ sơ y tế liên quan, kết quả xét
            nghiệm trước đây và danh sách thuốc hiện tại (nếu có).
          </li>
        </ul>
      </div>

      <div className="step-navigation">
        <button className="back-btn" onClick={handleStepBack}>
          Quay Lại
        </button>
        <button
          className="next-btn"
          onClick={handleStepNext}
          disabled={!selectedDate || !selectedTime}
        >
          Tiếp Theo →
        </button>
      </div>
    </div>
  );

  // Step 4: Personal Information
  const renderStep4 = () => (
    <div className="step-content">
      <h2>Thông Tin Đặt Lịch</h2>
      <p>Vui lòng cung cấp lý do bạn muốn tư vấn với bác sĩ</p>

      <div className="personal-form">
        <div className="booking-form">
          <label>Lý Do Khám</label>
          <textarea
            placeholder="Vui lòng mô tả ngắn gọn lý do bạn đặt lịch hẹn này"
            value={personalInfo.reason}
            onChange={(e) => handlePersonalInfoChange("reason", e.target.value)}
            rows="3"
          />
        </div>
      </div>

      <div className="step-navigation">
        <button className="back-btn" onClick={handleStepBack}>
          Quay Lại
        </button>
        <button
          className="complete-btn"
          onClick={handleFinalSubmit}
          // disabled={!isFormValid()}
        >
          Hoàn Tất Đặt Lịch →
        </button>
      </div>
    </div>
  );

  // Booking Complete
  const renderBookingComplete = () => (
    <div className="step-content booking-complete">
      <div className="success-icon">
        <Check size={48} />
      </div>
      <h2>Đặt Lịch Hẹn Thành Công!</h2>
      <p>Cảm ơn bạn đã đặt lịch hẹn với chúng tôi</p>

      <div className="appointment-summary">
        <h3>Chi Tiết Lịch Hẹn</h3>
        <div className="summary-item">
          <span>Bác sĩ:</span>
          <span>{appointmentDetails?.doctor?.name}</span>
        </div>
        <div className="summary-item">
          <span>Ngày:</span>
          <span>{appointmentDetails?.date}</span>
        </div>
        <div className="summary-item">
          <span>Giờ:</span>
          <span>{appointmentDetails?.time}</span>
        </div>
        <div className="summary-item">
          <span>Lý do khám:</span>
          <span>{appointmentDetails?.reason}</span>
        </div>
      </div>

      <div className="important-notes">
        <p>
          Vui lòng đến trước 15 phút để hoàn thành thủ tục đăng ký. Mang theo hồ
          sơ y tế liên quan và thẻ bảo hiểm (nếu có).
        </p>
        <p>
          Nếu bạn cần hủy hoặc đổi lịch hẹn, vui lòng thông báo cho chúng tôi ít
          nhất 24 giờ trước lịch hẹn qua số điện thoại (024) 123-4567.
        </p>
      </div>

      <div className="action-buttons">
        <button className="secondary-btn" onClick={() => navigate("/homepage")}>
          Quay Về Trang Chủ
        </button>
        <button
          className="primary-btn"
          onClick={() => navigate("/patient-dashboard/appointments")}
        >
          Quản Lý Lịch Hẹn
        </button>
      </div>
    </div>
  );

  return (
    <div className="booking">
      <div className="container">
        <div className="breadcrumb">
          <a href="/homepage">Trang Chủ</a> / <span>Đặt Lịch Hẹn</span>
        </div>

        <div className="booking-header">
          <h1>Đặt Lịch Hẹn</h1>
          <p>
            Đặt lịch hẹn với một trong các chuyên gia sinh sản của chúng tôi để
            bắt đầu hành trình điều trị hiếm muộn của bạn.
          </p>
        </div>

        {!bookingComplete && (
          <div className="progress-steps">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`step ${currentStep >= step ? "active" : ""} ${
                  currentStep > step ? "completed" : ""
                }`}
              >
                <div className="step-number">{step}</div>
                <div className="step-label">
                  {step === 1 && "Chọn Bác Sĩ"}
                  {step === 2 && "Ngày & Giờ"}
                  {step === 3 && "Thông Tin Cá Nhân"}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="booking-content">
          {bookingComplete ? (
            renderBookingComplete()
          ) : (
            <>
              {currentStep === 1 && renderStep2()}
              {currentStep === 2 && renderStep3()}
              {currentStep === 3 && renderStep4()}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;
