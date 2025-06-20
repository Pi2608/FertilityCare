import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Check, Phone, FileText } from 'lucide-react';
import './Booking.css';

const Booking = () => {

  const mockData = [
    {
      "schedule_id": 1,
      "date": "2025-06-30",
      "start_time": "08:00:00",
      "end_time": "09:30:00",
      "status": 0,
      "doctor_id": 3
    },
    {
      "schedule_id": 2,
      "date": "2025-06-30",
      "start_time": "09:30:00",
      "end_time": "11:00:00",
      "status": 0,
      "doctor_id": 3
    },
    {
      "schedule_id": 3,
      "date": "2025-06-30",
      "start_time": "13:00:00",
      "end_time": "14:30:00",
      "status": 0,
      "doctor_id": 3
    },
    {
      "schedule_id": 4,
      "date": "2025-06-30",
      "start_time": "14:30:00",
      "end_time": "16:00:00",
      "status": 0,
      "doctor_id": 3
    }
  ];
  
  // Data variables
  const doctors = [
    {
      id: 1,
      name: 'Bác sĩ Nguyễn Thị Minh',
      specialty: 'Chuyên gia Nội tiết Sinh sản',
      category: 'Tất Cả',
      subcategory: 'Nội Tiết Sinh Sản',
      experience: '15 năm kinh nghiệm',
      availableDate: '24/05/2023',
      workingHours: ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00'],
      image: null
    },
    {
      id: 2,
      name: 'Bác sĩ Trần Văn Hai',
      specialty: 'Chuyên gia Phổi học và IVF',
      category: 'Phổi Học',
      subcategory: 'Phổi Học',
      experience: '12 năm kinh nghiệm',
      availableDate: '22/05/2023',
      workingHours: ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00'],
      image: null
    },
    {
      id: 3,
      name: 'Bác sĩ Lê Thị Hương',
      specialty: 'Chuyên gia Nội tiết Sinh sản',
      category: 'Siêu Âm',
      subcategory: 'Nội Tiết Sinh Sản',
      experience: '10 năm kinh nghiệm',
      availableDate: '25/05/2023',
      workingHours: ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00'],
      image: null
    },
    {
      id: 4,
      name: 'Bác sĩ Vũ Thị Lan Anh',
      specialty: 'Chuyên gia Siêu âm và Chẩn đoán',
      category: 'Tất Cả',
      subcategory: 'Siêu âm và Chẩn đoán',
      experience: '8 năm kinh nghiệm',
      availableDate: '26/05/2023',
      workingHours: ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00'],
      image: null
    }
  ];

  const appointmentTypes = [
    { 
      id: 'consultation', 
      title: 'Tư Vấn Ban Đầu',
      description: 'Buổi tư vấn đầu tiên để thảo luận về các lựa chọn điều trị',
      icon: Calendar
    },
    { 
      id: 'followup', 
      title: 'Khám Theo Dõi',
      description: 'Buổi khám theo dõi cho bệnh nhân hiện tại',
      icon: Clock
    },
    { 
      id: 'procedure', 
      title: 'Thủ Thuật Điều Trị',
      description: 'Lịch hẹn cho thủ thuật điều trị cụ thể',
      icon: Check
    },
    // { 
    //   id: 'other', 
    //   title: 'Khác',
    //   description: 'Loại lịch hẹn khác không được liệt kê ở trên',
    //   icon: 'ℹ'
    // }
  ];

  const procedureTypes = [
    'Chọn loại thủ thuật',
    'Siêu âm đầu dò',
    'Xét nghiệm máu',
    'Thụ tinh trong ống nghiệm (IVF)',
    'Bơm tinh trùng vào buồng tử cung',
    'Trứng đông trúng',
    'Xét nghiệm di truyền',
    'Điều trị vô sinh nam'
  ];

  const categories = ['Tất Cả', 'Nội Tiết Sinh Sản', 'Phổi Học', 'Siêu Âm'];

  // State management
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAppointmentType, setSelectedAppointmentType] = useState('');
  const [selectedProcedureType, setSelectedProcedureType] = useState('');
  const [hasVisited, setHasVisited] = useState('no');
  const [selectedCategory, setSelectedCategory] = useState('Tất Cả');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    lastName: '',
    firstName: '',
    email: '',
    phone: '',
    birthDate: '',
    gender: 'female',
    address: '',
    city: '',
    reason: ''
  });
  const [bookingComplete, setBookingComplete] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const today = new Date();

  // Filter doctors by category
  const filteredDoctors = selectedCategory === 'Tất Cả' 
    ? doctors 
    : doctors.filter(doctor => doctor.category === selectedCategory || doctor.subcategory === selectedCategory);

  // Generate calendar dates for June 2025
  const generateCalendarDates = () => {
    const mockData = [
      {
        "schedule_id": 1,
        "date": "2025-06-30",
        "start_time": "08:00:00",
        "end_time": "09:30:00",
        "status": 0,
        "doctor_id": 3
      },
      {
        "schedule_id": 2,
        "date": "2025-06-30",
        "start_time": "09:30:00",
        "end_time": "11:00:00",
        "status": 0,
        "doctor_id": 3
      },
      {
        "schedule_id": 3,
        "date": "2025-06-30",
        "start_time": "13:30:00",
        "end_time": "14:30:00",
        "status": 0,
        "doctor_id": 3
      },
      {
        "schedule_id": 4,
        "date": "2025-06-30",
        "start_time": "14:30:00",
        "end_time": "16:00:00",
        "status": 0,
        "doctor_id": 3
      }
    ]
    const dates = [];
    const currentDate = new Date(2025, 5, 1); // June 2025
    const daysInMonth = new Date(2025, 5 + 1, 0).getDate();
    
    // Add empty cells for days before the first day of the month
    const firstDayOfWeek = currentDate.getDay();
    for (let i = 0; i < firstDayOfWeek; i++) {
      dates.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      dates.push(day);
    }
    
    return dates;
  };

  const handleStepNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleStepBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(`ngày ${date} tháng 06 năm 2025`);
    setShowCalendar(false);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isFormValid = () => {
    return Object.values(personalInfo).every(value => value.trim() !== '');
  };

  const handleFinalSubmit = () => {
    const details = {
      doctor: selectedDoctor,
      date: selectedDate,
      time: selectedTime,
      appointmentType: appointmentTypes.find(type => type.id === selectedAppointmentType),
      procedureType: selectedProcedureType,
      patientInfo: personalInfo,
      appointmentCode: 'APT-2740'
    };
    setAppointmentDetails(details);
    setBookingComplete(true);
  };

  // Step 1: Select Appointment Type
  const renderStep1 = () => (
    <div className="step-content">
      <h2>Chọn Loại Lịch Hẹn</h2>
      <p>Vui lòng chọn loại lịch hẹn phù hợp với nhu cầu của bạn</p>
      
      <div className="appointment-types">
        {appointmentTypes.map(type => (
          <div 
            key={type.id}
            className={`appointment-type ${selectedAppointmentType === type.id ? 'selected' : ''}`}
            onClick={() => setSelectedAppointmentType(type.id)}
          >
            <div className="appointment-icon">
              <type.icon size={24} />
            </div>
            <div className="appointment-info">
              <h3>{type.title}</h3>
              <p>{type.description}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedAppointmentType === 'procedure' && (
        <div className="procedure-selection">
          <h3>Loại Thủ Thuật</h3>
          <select 
            value={selectedProcedureType}
            onChange={(e) => setSelectedProcedureType(e.target.value)}
            className="procedure-select"
          >
            {procedureTypes.map((procedure, index) => (
              <option key={index} value={procedure}>{procedure}</option>
            ))}
          </select>
        </div>
      )}

      <div className="visited-question">
        <p>Bạn Đã Từng Đến Phòng Khám Của Chúng Tôi Chưa?</p>
        <div className="radio-group">
          <label>
            <input 
              type="radio" 
              name="visited" 
              value="yes"
              checked={hasVisited === 'yes'}
              onChange={(e) => setHasVisited(e.target.value)}
            />
            Có
          </label>
          <label>
            <input 
              type="radio" 
              name="visited" 
              value="no"
              checked={hasVisited === 'no'}
              onChange={(e) => setHasVisited(e.target.value)}
            />
            Không
          </label>
        </div>
      </div>

      <button 
        className="next-btn"
        onClick={handleStepNext}
        disabled={!selectedAppointmentType}
      >
        Tiếp Theo →
      </button>
    </div>
  );

  // Step 2: Select Doctor
  const renderStep2 = () => (
    <div className="step-content">
      <h2>Chọn Bác Sĩ</h2>
      <p>Vui lòng chọn bác sĩ bạn muốn đặt lịch hẹn</p>

      <div className="category-filters">
        {categories.map(category => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="doctors-list">
        {filteredDoctors.map(doctor => (
          <div 
            key={doctor.id}
            className={`doctor-card ${selectedDoctor?.id === doctor.id ? 'selected' : ''}`}
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
                <h3>{doctor.name}</h3>
                <p>{doctor.specialty}</p>
              </div>
            </div>
            
            <div className="lower">
              <span><Calendar size={16}/> Có lịch từ {doctor.availableDate}</span>
              <span><Check size={16}/> {doctor.experience}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="step-navigation">
        <button className="back-btn" onClick={handleStepBack}>Quay Lại</button>
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
          <h3>Chọn Ngày</h3>
          <div className="date-input" onClick={() => setShowCalendar(!showCalendar)}>
            {selectedDate || 'Chọn ngày'}
          </div>
          
          {showCalendar && (
            <div className="calendar">
              <div className="calendar-header">
                <h4>{today.getMonth()}-{today.getUTCFullYear()}</h4>
              </div>
              <div className="calendar-weekdays">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                  <div key={day} className="weekday">{day}</div>
                ))}
              </div>
              <div className="calendar-dates">
                {generateCalendarDates().map((date, index) => (
                  <div 
                    key={index} 
                    className={`calendar-date ${date ? 'available' : 'empty'} ${date === today.getDate() ? 'today' : ''}`}
                    onClick={() => date && handleDateSelect(date)}
                  >
                    {date}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="time-section">
          <h3>Chọn Giờ</h3>
          <div className="selected-doctor-info">
            <div className="doctor-avatar">
              <div className="avatar-placeholder"></div>
            </div>
            <div>
              <p><strong>{selectedDoctor?.name}</strong></p>
              <p>{selectedDoctor?.specialty}</p>
            </div>
          </div>
          
          <div className="time-slots">
          {selectedDoctor?.workingHours.map(time => {
  const matchedSchedule = mockData.find(
    s =>
      s.doctor_id === selectedDoctor.id &&
      s.date === "2025-06-30" &&
      s.start_time.slice(0, 5) === time &&
      s.status === 0
  );

  const isDisabled = !!matchedSchedule;

  return (
    <button
      key={time}
      className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
      onClick={() => !isDisabled && handleTimeSelect(time)}
      disabled={isDisabled}
    >
      {time}
    </button>
  );
})}

          </div>
        </div>
      </div>

      <div className="notes">
        <h4>Lưu ý:</h4>
        <ul>
          <li><Clock size={16}/> Vui lòng đến trước 15 phút để hoàn thành thủ tục đăng ký.</li>
          <li><Phone size={16}/> Nếu bạn cần hủy hoặc đổi lịch hẹn, vui lòng thông báo cho chúng tôi ít nhất 24 giờ trước lịch hẹn.</li>
          <li><FileText size={16}/> Mang theo hồ sơ y tế liên quan, kết quả xét nghiệm trước đây và danh sách thuốc hiện tại (nếu có).</li>
        </ul>
      </div>

      <div className="step-navigation">
        <button className="back-btn" onClick={handleStepBack}>Quay Lại</button>
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
      <h2>Thông Tin Cá Nhân</h2>
      <p>Vui lòng cung cấp thông tin cá nhân của bạn để hoàn tất đặt lịch</p>

      <div className="personal-form">
        <div className="form-row">
          <div className="booking-form">
            <label>Họ</label>
            <input
              type="text"
              placeholder="Nguyễn"
              value={personalInfo.lastName}
              onChange={(e) => handlePersonalInfoChange('lastName', e.target.value)}
            />
          </div>
          <div className="booking-form">
            <label>Giới Tính</label>
            <div className="radio-group">
              <label>
                <input 
                  type="radio" 
                  name="gender" 
                  value="male"
                  checked={personalInfo.gender === 'male'}
                  onChange={(e) => handlePersonalInfoChange('gender', e.target.value)}
                />
                Nam
              </label>
              <label>
                <input 
                  type="radio" 
                  name="gender" 
                  value="female"
                  checked={personalInfo.gender === 'female'}
                  onChange={(e) => handlePersonalInfoChange('gender', e.target.value)}
                />
                Nữ
              </label>
              <label>
                <input 
                  type="radio" 
                  name="gender" 
                  value="other"
                  checked={personalInfo.gender === 'other'}
                  onChange={(e) => handlePersonalInfoChange('gender', e.target.value)}
                />
                Khác
              </label>
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="booking-form">
            <label>Tên</label>
            <input
              type="text"
              placeholder="Văn A"
              value={personalInfo.firstName}
              onChange={(e) => handlePersonalInfoChange('firstName', e.target.value)}
            />
          </div>
          <div className="booking-form">
            <label>Địa Chỉ</label>
            <input
              type="text"
              placeholder="Số nhà, đường, phường/xã"
              value={personalInfo.address}
              onChange={(e) => handlePersonalInfoChange('address', e.target.value)}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="booking-form">
            <label>Email</label>
            <input
              type="email"
              placeholder="email@example.com"
              value={personalInfo.email}
              onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
            />
          </div>
          <div className="booking-form">
            <label>Thành Phố/Tỉnh</label>
            <input
              type="text"
              placeholder="Hà Nội"
              value={personalInfo.city}
              onChange={(e) => handlePersonalInfoChange('city', e.target.value)}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="booking-form">
            <label>Số Điện Thoại</label>
            <input
              type="tel"
              placeholder="(+84) 123 456 789"
              value={personalInfo.phone}
              onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
            />
          </div>
          <div className="booking-form">
            <label>Ngày Sinh</label>
            <input
              type="text"
              placeholder="mm/dd/yyyy"
              value={personalInfo.birthDate}
              onChange={(e) => handlePersonalInfoChange('birthDate', e.target.value)}
            />
          </div>
        </div>

        <div className="booking-form">
          <label>Lý Do Khám</label>
          <textarea
            placeholder="Vui lòng mô tả ngắn gọn lý do bạn đặt lịch hẹn này"
            value={personalInfo.reason}
            onChange={(e) => handlePersonalInfoChange('reason', e.target.value)}
            rows="3"
          />
        </div>
      </div>

      <div className="step-navigation">
        <button className="back-btn" onClick={handleStepBack}>Quay Lại</button>
        <button 
          className="complete-btn"
          onClick={handleFinalSubmit}
          disabled={!isFormValid()}
        >
          Hoàn Tất Đặt Lịch →
        </button>
      </div>
    </div>
  );

  // Booking Complete
  const renderBookingComplete = () => (
    <div className="step-content booking-complete">
      <div className="success-icon"><Check size={64}/></div>
      <h2>Đặt Lịch Hẹn Thành Công!</h2>
      <p>Cảm ơn bạn đã đặt lịch hẹn với chúng tôi. Chúng tôi đã gửi xác nhận đến email của bạn.</p>

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
          <span>Loại lịch hẹn:</span>
          <span>{appointmentDetails?.appointmentType?.title}</span>
        </div>
        <div className="summary-item">
          <span>Mã lịch hẹn:</span>
          <span>{appointmentDetails?.appointmentCode}</span>
        </div>
      </div>

      <div className="important-notes">
        <p>Vui lòng đến trước 15 phút để hoàn thành thủ tục đăng ký. Mang theo hồ sơ y tế liên quan và thẻ bảo hiểm (nếu có).</p>
        <p>Nếu bạn cần hủy hoặc đổi lịch hẹn, vui lòng thông báo cho chúng tôi ít nhất 24 giờ trước lịch hẹn qua số điện thoại (024) 123-4567.</p>
      </div>

      <div className="action-buttons">
        <button className="secondary-btn" onClick={() => navigate("/homepage")}>Quay Về Trang Chủ</button>
        <button className="primary-btn">Quản Lý Lịch Hẹn</button>
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
          <p>Đặt lịch hẹn với một trong các chuyên gia sinh sản của chúng tôi để bắt đầu hành trình điều trị hiếm muộn của bạn.</p>
        </div>

        {!bookingComplete && (
          <div className="progress-steps">
            {[1, 2, 3, 4].map(step => (
              <div key={step} className={`step ${currentStep >= step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}>
                <div className="step-number">{step}</div>
                <div className="step-label">
                  {step === 1 && 'Loại Lịch Hẹn'}
                  {step === 2 && 'Chọn Bác Sĩ'}
                  {step === 3 && 'Ngày & Giờ'}
                  {step === 4 && 'Thông Tin Cá Nhân'}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="booking-content">
          {bookingComplete ? renderBookingComplete() : (
            <>
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;