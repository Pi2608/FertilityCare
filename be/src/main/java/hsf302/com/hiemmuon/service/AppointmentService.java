package hsf302.com.hiemmuon.service;

import hsf302.com.hiemmuon.dto.createDto.CreateAppointmentDTO;
import hsf302.com.hiemmuon.dto.createDto.ReExamAppointmentDTO;
import hsf302.com.hiemmuon.dto.entityDto.AppointmentHistoryDTO;
import hsf302.com.hiemmuon.dto.entityDto.AppointmentOverviewDTO;
import hsf302.com.hiemmuon.dto.entityDto.AvailableScheduleDTO;
import hsf302.com.hiemmuon.dto.entityDto.ReExamAppointmentResponseDTO;
import hsf302.com.hiemmuon.entity.*;
import hsf302.com.hiemmuon.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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



    public List<AvailableScheduleDTO> getAvailableSchedules(int doctorId, LocalDate date) {
        List<DoctorSchedule> schedules = doctorScheduleRepository
                .findByDoctor_DoctorIdAndDateAndStatus(doctorId, date, true);

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

    public void registerAppointment(CreateAppointmentDTO dto) {
        // Tìm bác sĩ
        Doctor doctor = doctorRepository.findById(dto.getDoctorId());
        if (doctor == null) {
            throw new RuntimeException("Không tìm thấy bác sĩ");
        }

        // Lấy khách hàng
        Customer customer = customerRepository.findById(dto.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy khách hàng"));


        // Tìm khung giờ bác sĩ khả dụng đúng ngày & giờ
        List<DoctorSchedule> schedules = doctorScheduleRepository
                .findByDoctor_DoctorIdAndDateAndStatus(
                        dto.getDoctorId(),
                        dto.getDate().toLocalDate(),
                        true
                );

        DoctorSchedule schedule = null;
        for (DoctorSchedule s : schedules) {
            if (s.getStartTime().equals(dto.getDate().toLocalTime())) {
                schedule = s;
                break;
            }
        }

        if (schedule == null) {
            throw new RuntimeException("Khung giờ không còn khả dụng");
        }

        // Tạo cuộc hẹn
        Appointment appointment = new Appointment();
        appointment.setDoctor(doctor);
        appointment.setCustomer(customer);
        appointment.setDate(dto.getDate());
        appointment.setType(Appointment.Type.tu_van);
        appointment.setStatus(Appointment.Status.confirmed);
        appointment.setNote(dto.getNote());
        TreatmentService treatmentService = treatmentServiceRepository.findById(3);
        appointment.setService(treatmentService);
        appointmentRepository.save(appointment);

        // Cập nhật lịch: đánh dấu đã được đặt
        schedule.setStatus(false);
        doctorScheduleRepository.save(schedule);
    }

    public void scheduleReExam(ReExamAppointmentDTO dto) {
        Doctor doctor = doctorRepository.findById(dto.getDoctorId());
        if (doctor == null) {
            throw new RuntimeException("Không tìm thấy bác sĩ");
        }

        // Lấy khách hàng
        Customer customer = customerRepository.findById(dto.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy khách hàng"));

        TreatmentService service = treatmentServiceRepository.findById(dto.getServiceId());
        if (service == null) {
            throw new RuntimeException("Không tìm thấy dịch vụ");
        }

        // Kiểm tra khung giờ có rảnh không
        List<DoctorSchedule> schedules = doctorScheduleRepository.findByDoctor_DoctorIdAndDateAndStatus(
                dto.getDoctorId(), dto.getDate().toLocalDate(), true);

        DoctorSchedule schedule = schedules.stream()
                .filter(s -> s.getStartTime().equals(dto.getDate().toLocalTime()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Khung giờ không còn khả dụng"));

        // Tạo appointment tái khám
        Appointment appointment = new Appointment();
        appointment.setDoctor(doctor);
        appointment.setCustomer(customer);
        appointment.setDate(dto.getDate());
        appointment.setType(Appointment.Type.tai_kham);
        appointment.setStatus(Appointment.Status.confirmed);
        appointment.setNote(dto.getNote());
        appointment.setService(service);

        appointmentRepository.save(appointment);

        // Cập nhật lịch
        schedule.setStatus(false);
        doctorScheduleRepository.save(schedule);
    }

    public List<ReExamAppointmentResponseDTO> getReExamAppointmentsForCustomer(int customerId){
        List<Appointment> appointments = appointmentRepository.findByCustomer_CustomerIdAndType(
                customerId, Appointment.Type.tai_kham
        );

        return appointments.stream().map(app -> {
            ReExamAppointmentResponseDTO dto = new ReExamAppointmentResponseDTO();
            dto.setAppointmentId(app.getAppointmentId());
            dto.setDate(app.getDate());
            dto.setDoctorName(app.getDoctor().getUser().getName());
            dto.setServiceName(app.getService().getName());
            dto.setNote(app.getNote());
            dto.setStatus(app.getStatus());
            return dto;
        }).toList();
    }

    public void cancelAppointment(int appointmentId, int customerId) {
        Appointment appointment = appointmentRepository
                .findByAppointmentIdAndCustomer_CustomerId(appointmentId, customerId)
                .orElseThrow(() -> new RuntimeException("Cuộc hẹn không tồn tại hoặc không thuộc quyền của bạn"));

        // Hủy cuộc hẹn
        appointment.setStatus(Appointment.Status.canceled);
        appointmentRepository.save(appointment);

        // Mở lại giờ trong lịch bác sĩ
        LocalDate date = appointment.getDate().toLocalDate();
        LocalTime time = appointment.getDate().toLocalTime();

        DoctorSchedule schedule = doctorScheduleRepository.findScheduleByDoctorDateTime(
                appointment.getDoctor().getDoctorId(),
                date,
                time
        );

        schedule.setStatus(true);
        doctorScheduleRepository.save(schedule);
    }

    public List<AppointmentHistoryDTO> getAppointmentsForDoctorAndCustomer(int doctorId, int customerId) {
        List<Appointment> appointments = appointmentRepository
                .findByDoctor_DoctorIdAndCustomer_CustomerIdOrderByDateDesc(doctorId, customerId);

        return appointments.stream()
                .map(app -> new AppointmentHistoryDTO(
                        app.getAppointmentId(),
                        app.getDate(),
                        app.getType() != null ? app.getType().toString() : null,
                        app.getStatus() != null ? app.getStatus().toString() : null,
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
            dto.setType(app.getType().name());
            dto.setStatus(app.getStatus().name());
            dto.setNote(app.getNote());
            dto.setServiceName(app.getService().getName());
            return dto;
        }).toList();
    }





}
