package hsf302.com.hiemmuon.service;

import hsf302.com.hiemmuon.dto.createDto.CreateAppointmentDTO;
import hsf302.com.hiemmuon.dto.createDto.ReExamAppointmentDTO;
import hsf302.com.hiemmuon.dto.responseDto.*;
import hsf302.com.hiemmuon.dto.testresult.TestResultViewDTO;
import hsf302.com.hiemmuon.entity.*;
import hsf302.com.hiemmuon.enums.StatusAppointment;
import hsf302.com.hiemmuon.enums.TypeAppointment;
import hsf302.com.hiemmuon.exception.NotFoundException;
import hsf302.com.hiemmuon.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import hsf302.com.hiemmuon.enums.StatusCycle;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AppointmentService {

    @Autowired
    private DoctorScheduleRepository doctorScheduleRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private TreatmentServiceRepository treatmentServiceRepository;

    @Autowired
    private CustomerRepository  customerRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private TestResultRepository testResultRepository;

    @Autowired
    private CycleStepRepository cycleStepRepository;

    @Autowired
    private SendMailService sendMailService;

    public List<AvailableScheduleDTO> getAvailableSchedules(int doctorId, LocalDate date) {
        List<DoctorSchedule> schedules = doctorScheduleRepository
                .findByDoctor_DoctorIdAndDateAndStatus(doctorId, date, false);

        return schedules.stream().map(schedule ->{
            AvailableScheduleDTO dto = new AvailableScheduleDTO();
            dto.setDoctorId(schedule.getDoctor().getDoctorId());
            dto.setName(schedule.getDoctor().getUser().getName());
            dto.setSpecialization(schedule.getDoctor().getSpecification());
            dto.setDate(schedule.getDate());
            dto.setStartTime(schedule.getStartTime());
            dto.setStatus(schedule.isStatus());
            return dto;
        }).collect(Collectors.toList());
    }

    public void registerAppointment(CreateAppointmentDTO dto, int customerId) {
        // Tìm bác sĩ
        Doctor doctor = doctorRepository.findById(dto.getDoctorId())
                .orElseThrow(() -> new NotFoundException("Không tìm thấy bác sĩ với ID: " + dto.getDoctorId()));

        // Lấy khách hàng
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy khách hàng"));

        // Lấy giờ hẹn của bệnh nhân
        LocalDateTime appointmentTime = dto.getDate();
        LocalDate date = appointmentTime.toLocalDate();
        LocalTime time = appointmentTime.toLocalTime();

        // Lấy tất cả khung giờ bận của bác sĩ trong ngày đó
        List<DoctorSchedule> busySchedules = doctorScheduleRepository
                .findByDoctor_DoctorIdAndDateAndStatus(dto.getDoctorId(), date, false);

        // Kiểm tra xem giờ hẹn của bệnh nhân có trùng với bất kỳ khung giờ bận nào không
        boolean isBusy = busySchedules.stream().anyMatch(s ->
                s.getStartTime().equals(time)
        );

        if (isBusy) {
            throw new RuntimeException("Bác sĩ bận vào khung giờ này");
        }

        // Tạo cuộc hẹn
        Appointment appointment = new Appointment();
        appointment.setDoctor(doctor);
        appointment.setCustomer(customer);
        appointment.setDate(appointmentTime);
        appointment.setTypeAppointment(TypeAppointment.tu_van);
        appointment.setStatusAppointment(StatusAppointment.confirmed);
        appointment.setNote(dto.getNote());

        TreatmentService treatmentService = treatmentServiceRepository.findById(3);
        appointment.setService(treatmentService);
        appointmentRepository.save(appointment);

        // Thêm lịch bận mới cho bác sĩ (vì bác sĩ vừa bị chiếm thêm khung giờ này)
        DoctorSchedule newSchedule = new DoctorSchedule();
        newSchedule.setDate(date);
        newSchedule.setStartTime(time);
        newSchedule.setEndTime(time.plusHours(2));
        newSchedule.setDoctor(doctor);
        newSchedule.setStatus(false);
        doctorScheduleRepository.save(newSchedule);
    }


    public AppointmentHistoryDTO scheduleReExam(ReExamAppointmentDTO dto, Doctor doctor) {
        // Tìm bác sĩ
        if (doctor == null) {
            throw new RuntimeException("Không tìm thấy bác sĩ");
        }

        // Lấy khách hàng
        Customer customer = customerRepository.findById(dto.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy khách hàng"));

        // Lấy dịch vụ
        TreatmentService service = treatmentServiceRepository.findById(dto.getServiceId());
        if (service == null) {
            throw new RuntimeException("Không tìm thấy dịch vụ");
        }

        CycleStep cycleStep = cycleStepRepository.findById(dto.getCycleStepId());
        if(cycleStep == null || cycleStep.getStatusCycleStep() != StatusCycle.ongoing){
                    throw new RuntimeException("bác sĩ chọn sai cycleStep cho bênh nhân hoặc bênh nhân not ongoing - bênh nhân không trong giai đoanaj này ");
                }

        // Lấy thông tin thời gian hẹn
        LocalDateTime appointmentTime = dto.getDate();
        LocalDate date = appointmentTime.toLocalDate();
        LocalTime time = appointmentTime.toLocalTime();

        // Lấy tất cả khung giờ bác sĩ đã bận trong ngày đó
        List<DoctorSchedule> busySchedules = doctorScheduleRepository
                .findByDoctor_DoctorIdAndDateAndStatus(doctor.getDoctorId(), date, false); // status = false = đã bận

        // Kiểm tra giờ bệnh nhân chọn có trùng khung giờ bận không
        boolean isBusy = busySchedules.stream().anyMatch(s ->
                s.getStartTime().equals(time)
        );

        if (isBusy) {
            throw new RuntimeException("Bác sĩ bận vào khung giờ này");
        }

        // Tạo cuộc hẹn tái khám
        Appointment appointment = new Appointment();
        appointment.setDoctor(doctor);
        appointment.setCustomer(customer);
        appointment.setDate(appointmentTime);
        appointment.setTypeAppointment(TypeAppointment.tai_kham);
        appointment.setStatusAppointment(StatusAppointment.confirmed);
        appointment.setNote(dto.getNote());
        appointment.setService(service);
        appointment.setCycleStep(cycleStep);
        appointmentRepository.save(appointment);

        // Ghi nhận lịch bận mới cho bác sĩ
        DoctorSchedule newSchedule = new DoctorSchedule();
        newSchedule.setDoctor(doctor);
        newSchedule.setDate(date);
        newSchedule.setStartTime(time);
        newSchedule.setEndTime(time.plusHours(2)); // ví dụ mặc định 2 tiếng
        newSchedule.setStatus(false); // true = bận
        doctorScheduleRepository.save(newSchedule);

        return new AppointmentHistoryDTO(
                appointment.getAppointmentId(),
                appointment.getDate(),
                customer.getUser().getName(),
                appointment.getTypeAppointment() != null ? appointment.getTypeAppointment().toString() : null,
                appointment.getStatusAppointment() != null ? appointment.getStatusAppointment().toString() : null,
                appointment.getNote()
        );
    }


    public List<ReExamAppointmentResponseDTO> getReExamAppointmentsForCustomer(int customerId){
        List<Appointment> appointments = appointmentRepository.findByCustomer_CustomerIdAndTypeAppointment(
                customerId, TypeAppointment.tai_kham
        );

        return appointments.stream().map(app -> {
            ReExamAppointmentResponseDTO dto = new ReExamAppointmentResponseDTO();
            dto.setAppointmentId(app.getAppointmentId());
            dto.setDate(app.getDate());
            dto.setDoctorName(app.getDoctor().getUser().getName());
            dto.setServiceName(app.getService().getName());
            dto.setNote(app.getNote());
            dto.setStatus(app.getStatusAppointment());
            return dto;
        }).toList();
    }

    public void cancelAppointment(int appointmentId, int customerId) {
        Appointment appointment = appointmentRepository
                .findByAppointmentIdAndCustomer_CustomerId(appointmentId, customerId)
                .orElseThrow(() -> new RuntimeException("Cuộc hẹn không tồn tại hoặc không thuộc quyền của bạn"));

        // Chỉ cho phép hủy loại tư vấn
        if (appointment.getTypeAppointment() == TypeAppointment.tai_kham) {
            throw new RuntimeException("Tái khám không được phép hủy");
        }

        // Hủy cuộc hẹn
        appointment.setStatusAppointment(StatusAppointment.canceled);
        appointmentRepository.save(appointment);

        // Tìm khung giờ tương ứng trong DoctorSchedule
        LocalDate date = appointment.getDate().toLocalDate();
        LocalTime time = appointment.getDate().toLocalTime();

        DoctorSchedule schedule = doctorScheduleRepository.findScheduleByDoctorDateTime(
                appointment.getDoctor().getDoctorId(),
                date,
                time
        );

        if (schedule != null) {
            // Xoá khung giờ khỏi bảng doctor_schedule
            doctorScheduleRepository.delete(schedule);
        }
    }

    public List<AppointmentHistoryDTO> getAppointmentsForDoctorAndCustomer(int doctorId, int customerId) {
        List<Appointment> appointments = appointmentRepository
                .findByDoctor_DoctorIdAndCustomer_CustomerIdOrderByDateDesc(doctorId, customerId);

        return appointments.stream()
                .map(app -> new AppointmentHistoryDTO(
                        app.getAppointmentId(),
                        app.getDate(),
                        app.getCustomer().getUser().getName() != null ? app.getCustomer().getUser().getName() : null,
                        app.getTypeAppointment() != null ? app.getTypeAppointment().toString() : null,
                        app.getStatusAppointment() != null ? app.getStatusAppointment().toString() : null,
                        app.getNote()
                ))
                .collect(Collectors.toList());

    }

    public List<AppointmentOverviewDTO> getAllAppointmentsForManager() {
        List<Appointment> appointments = appointmentRepository.findAll();



        return appointments.stream().map(app -> {
            AppointmentOverviewDTO dto = new AppointmentOverviewDTO();
            dto.setAppointmentId(app.getAppointmentId());
            dto.setDoctorName(app.getDoctor().getUser().getName());
            dto.setCustomerName(app.getCustomer().getUser().getName());
            dto.setDate(app.getDate());
            dto.setType(app.getTypeAppointment().name());
            dto.setStatus(app.getStatusAppointment().name());
            dto.setNote(app.getNote());
            if (app.getService() != null) {
                dto.setServiceName(app.getService().getName());
            } else {
                dto.setServiceName("Chưa có dịch vụ");
            }

            return dto;
        }).toList();
    }

    public void updateServiceForAppointment(int appointmentId, int doctorId, UpdateAppointmentServiceDTO dto) {
        Appointment appointment = appointmentRepository.findById(appointmentId);
        if (appointment == null) {
            throw new RuntimeException("Không có cuộc hẹn đó!");
        }

        if (appointment.getDoctor().getDoctorId() != doctorId) {
            throw new RuntimeException("Bạn không có quyền truy cập cuộc hẹn này.");
        }

        if (!"confirmed".equalsIgnoreCase(String.valueOf(appointment.getStatusAppointment()))) {
            throw new RuntimeException("Chỉ có thể cập nhật dịch vụ khi cuộc hẹn là confirmed");
        }

        if (appointment.getTypeAppointment().equals(TypeAppointment.tu_van) && dto.getServiceId() != null) {
            Optional<TreatmentService> optionalService = treatmentServiceRepository.findById(dto.getServiceId());
            if (optionalService.isPresent()) {
                appointment.setService(optionalService.get());
            } else {
                throw new RuntimeException("Không tìm thấy dịch vụ!");
            }
        }

        if (dto.getNote() != null && !dto.getNote().trim().isEmpty()) {
            appointment.setNote(dto.getNote());
        }

        if (dto.getTestResultId() != null) {
            TestResult testResult = testResultRepository.findById(dto.getTestResultId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy kết quả xét nghiệm"));
            testResult.setAppointment(appointment);
            testResultRepository.save(testResult);
        }

        // ✅ Chỉ set trạng thái done nếu người dùng bấm nút “Kết thúc cuộc hẹn”
        if (Boolean.TRUE.equals(dto.getMarkAsDone())) {
            appointment.setStatusAppointment(StatusAppointment.done);
        }
        // ket thuc cuoc hen la true va them ghi chu moi la false
        appointmentRepository.save(appointment);

        String subject = "Thông báo loại hình dịch vụ điều trị: ";
        String content = String.format("""
                Chào %s,
                
                Đây là thông báo về loại hình dịch vụ của bạn sẽ điều trị trong thời gian tới.
                
                Bác sĩ đã chỉ định dịch vụ %s phù hợp với bạn.
                
                Vui lòng thanh toán tại mục "Lịch hẹn" để bắt đầu quy trình điều trị bạn nhé!
                
                Trân trọng,
                Hệ thống hỗ trợ điều trị HiemMuon.
                """,appointment.getCustomer().getUser().getName(), appointment.getService().getName());

        sendMailService.sendEmail(appointment.getCustomer().getUser().getEmail(), subject, content);
        System.out.println("Sending email to: " + appointment.getCustomer().getUser().getEmail());
        System.out.println("Service name: " + (appointment.getService() != null ? appointment.getService().getName() : "null"));

    }

    public List<AppointmentDetailDTO> getAppointmentsByDoctorId(int doctorId){
     List<Appointment> appointments = appointmentRepository.findByDoctor_DoctorId(doctorId);
     return appointments.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public List<AppointmentDetailDTO> getAppointmentsByCustomerId(int customerId){
        List<Appointment> appointments = appointmentRepository.findByCustomer_CustomerId(customerId);
        return appointments.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    private AppointmentDetailDTO convertToDto(Appointment appointment) {
        AppointmentDetailDTO dto = new AppointmentDetailDTO();

        dto.setAppointmentId(appointment.getAppointmentId());
        dto.setType(String.valueOf(appointment.getTypeAppointment()));
        dto.setDate(appointment.getDate().toLocalDate());
        dto.setStartTime(appointment.getDate().toLocalTime());

        // ✅ Check null trước khi gọi getStepId()
        if (appointment.getCycleStep() != null) {
            dto.setCycleStepId(appointment.getCycleStep().getStepId());
        } else {
            dto.setCycleStepId(null);  // hoặc không set gì nếu bạn để default null
        }

        if (appointment.getDoctor() != null && appointment.getDoctor().getUser() != null) {
            dto.setDoctorId(appointment.getDoctor().getDoctorId());
            dto.setDoctorName(appointment.getDoctor().getUser().getName());
        }

        if (appointment.getCustomer() != null && appointment.getCustomer().getUser() != null) {
            dto.setCustomerId(appointment.getCustomer().getCustomerId());
            dto.setCustomerName(appointment.getCustomer().getUser().getName());

            if (appointment.getCustomer().getUser().getDob() != null) {
                dto.setCustomerAge(LocalDate.now().getYear() - appointment.getCustomer().getUser().getDob().getYear());
            }
        }

        dto.setStatus(appointment.getStatusAppointment().name());
        dto.setNote(appointment.getNote());

        if (appointment.getService() != null) {
            dto.setServiceId(appointment.getService().getServiceId());
        }

        // ✅ Lấy toàn bộ test result theo appointmentId
        List<TestResultViewDTO> testResults = testResultRepository.getAllByAppointmentId(appointment.getAppointmentId());
        dto.setTestResultViewDTOList(testResults);

        return dto;
    }


    public AppointmentDetailDTO getAppointmentDetailById(int appointmentId) {
        Appointment appointment = appointmentRepository.findById(appointmentId);
        if (appointment == null) {
            throw new RuntimeException("Không tìm thấy cuộc hẹn với ID: " + appointmentId);
        }

        return convertToDto(appointment);
    }

    @Transactional
    public void sendAppointmentReminders() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime from = now.plusMinutes(10);
        LocalDateTime to = now.plusDays(1);

        List<Appointment> appointments = appointmentRepository.findByStatusAppointmentAndDateBetweenAndIsReminded(
                StatusAppointment.confirmed, from, to, false
        );

        for (Appointment appt : appointments) {
            String email = appt.getCustomer().getUser().getEmail();
            String name = appt.getCustomer().getUser().getName();
            String doctor = appt.getDoctor().getUser().getName();
            String time = appt.getDate().format(DateTimeFormatter.ofPattern("HH:mm dd-MM-yyyy"));

            String subject = "⏰ Nhắc nhở lịch hẹn với bác sĩ " + doctor;
            String content = String.format("""
                Chào %s,

                Bạn có lịch hẹn với bác sĩ %s vào lúc %s.

                Vui lòng đến đúng giờ và chuẩn bị các giấy tờ cần thiết nếu có.

                Trân trọng,
                Hệ thống hỗ trợ điều trị HiemMuon.
                """, name, doctor, time);

            sendMailService.sendEmail(email, subject, content);

            appt.setIsReminded(true);
        }
    }
}