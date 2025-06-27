package hsf302.com.hiemmuon.service;

import hsf302.com.hiemmuon.dto.appointment.AppointmentDetailDTO;
import hsf302.com.hiemmuon.dto.appointment.UpdateAppointmentServiceDTO;
import hsf302.com.hiemmuon.dto.createDto.CreateAppointmentDTO;
import hsf302.com.hiemmuon.dto.createDto.ReExamAppointmentDTO;
import hsf302.com.hiemmuon.dto.entityDto.AppointmentHistoryDTO;
import hsf302.com.hiemmuon.dto.entityDto.AppointmentOverviewDTO;
import hsf302.com.hiemmuon.dto.entityDto.AvailableScheduleDTO;
import hsf302.com.hiemmuon.dto.entityDto.ReExamAppointmentResponseDTO;
import hsf302.com.hiemmuon.entity.*;
import hsf302.com.hiemmuon.enums.StatusAppointment;
import hsf302.com.hiemmuon.enums.TypeAppointment;
import hsf302.com.hiemmuon.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
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
        Doctor doctor = doctorRepository.findById(dto.getDoctorId());
        if (doctor == null) {
            throw new RuntimeException("Không tìm thấy bác sĩ");
        }

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


    public void scheduleReExam(ReExamAppointmentDTO dto, Doctor doctor) {
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
        appointmentRepository.save(appointment);

        // Ghi nhận lịch bận mới cho bác sĩ
        DoctorSchedule newSchedule = new DoctorSchedule();
        newSchedule.setDoctor(doctor);
        newSchedule.setDate(date);
        newSchedule.setStartTime(time);
        newSchedule.setEndTime(time.plusHours(2)); // ví dụ mặc định 2 tiếng
        newSchedule.setStatus(false); // true = bận
        doctorScheduleRepository.save(newSchedule);
    }


    public List<ReExamAppointmentResponseDTO> getReExamAppointmentsForaDoctor(int doctorId){
        List<Appointment> appointments = appointmentRepository.findByDoctor_DoctorId(
                doctorId);

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
                        app.getTypeAppointment() != null ? app.getTypeAppointment().toString() : null,
                        app.getStatusAppointment() != null ? app.getStatusAppointment().toString() : null,
                        app.getNote(),
                        app.getService() != null ? app.getService().getName() : null
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
            dto.setServiceName(app.getService().getName());
            return dto;
        }).toList();
    }

    public void updateServiceForAppointment(int appointmentId, int doctorId, UpdateAppointmentServiceDTO dto) {
        Appointment appointment = appointmentRepository.findById(appointmentId);
                if(appointment == null){
                    throw new RuntimeException("Không có cuộc hẹn đó!");
                }

        if (appointment.getDoctor().getDoctorId() != (doctorId)){
            throw new RuntimeException("Bạn không có quyền truy cập cuộc hẹn này.");
        }

        if(!"confirmed".equalsIgnoreCase(String.valueOf(appointment.getStatusAppointment()))){
            throw new RuntimeException("Chỉ có thể cap nhật dịch vụ khi cuộc hẹn là confirmed");
        }

        appointment.setService(treatmentServiceRepository.findById(dto.getServiceId()));
        appointment.setNote(dto.getNote());
        appointment.setStatusAppointment(StatusAppointment.valueOf(dto.getStatus()));

        // ✅ Liên kết với testResult nếu bạn muốn
        if (dto.getTestResultId() != null) {
            TestResult testResult = testResultRepository.findById(dto.getTestResultId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy kết quả xét nghiệm"));
            // Gán logic liên kết tại đây — ví dụ:
            testResult.setAppointment(appointment); // nếu bạn muốn update ngược lại
            testResultRepository.save(testResult);
        }

        appointmentRepository.save(appointment);
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

        // Nếu appointment.getDate() là LocalDateTime
        dto.setDate(appointment.getDate().toLocalDate());
        dto.setStartTime(appointment.getDate().toLocalTime());

        // Doctor info
        if (appointment.getDoctor() != null && appointment.getDoctor().getUser() != null) {
            dto.setDoctorId(appointment.getDoctor().getDoctorId());
            dto.setDoctorName(appointment.getDoctor().getUser().getName());
        }

        // Customer info
        if (appointment.getCustomer() != null && appointment.getCustomer().getUser() != null) {
            dto.setCustomerId(appointment.getCustomer().getCustomerId());
            dto.setCustomerName(appointment.getCustomer().getUser().getName());

            if (appointment.getCustomer().getUser().getDob() != null) {
                dto.setCustomerAge(
                        LocalDate.now().getYear() - appointment.getCustomer().getUser().getDob().getYear()
                );
            }
        }

        dto.setStatus(String.valueOf(appointment.getStatusAppointment()));
        dto.setNote(appointment.getNote());

        if (appointment.getService() != null) {
            dto.setServiceId(appointment.getService().getServiceId());
        }

        // ✅ TestResult — nếu bạn muốn lấy ID kết quả xét nghiệm theo appointment
        List<TestResult> results = testResultRepository.findByAppointment_AppointmentId(appointment.getAppointmentId());
        if (results != null && !results.isEmpty()) {
            dto.setTestResultId(results.getFirst().getResultId()); // lấy ID đầu tiên (tuỳ bạn chọn logic)
        }

        return dto;
    }

    public AppointmentDetailDTO getAppointmentDetailById(int appointmentId) {
        Appointment appointment = appointmentRepository.findById(appointmentId);
        if (appointment == null) {
            throw new RuntimeException("Không tìm thấy cuộc hẹn với ID: " + appointmentId);
        }

        return convertToDto(appointment);
    }



}
