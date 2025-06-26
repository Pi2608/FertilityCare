package hsf302.com.hiemmuon.controller;

import hsf302.com.hiemmuon.dto.appointment.AppointmentDetailDTO;
import hsf302.com.hiemmuon.dto.appointment.UpdateAppointmentServiceDTO;
import hsf302.com.hiemmuon.dto.createDto.CreateAppointmentDTO;
import hsf302.com.hiemmuon.dto.createDto.ReExamAppointmentDTO;
import hsf302.com.hiemmuon.dto.entityDto.AppointmentHistoryDTO;
import hsf302.com.hiemmuon.dto.entityDto.AppointmentOverviewDTO;
import hsf302.com.hiemmuon.dto.entityDto.AvailableScheduleDTO;
import hsf302.com.hiemmuon.dto.entityDto.ReExamAppointmentResponseDTO;
import hsf302.com.hiemmuon.entity.Appointment;
import hsf302.com.hiemmuon.entity.Customer;
import hsf302.com.hiemmuon.entity.Doctor;
import hsf302.com.hiemmuon.entity.User;
import hsf302.com.hiemmuon.service.AppointmentService;
import hsf302.com.hiemmuon.service.CustomerService;
import hsf302.com.hiemmuon.service.DoctorService;
import hsf302.com.hiemmuon.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/appointment-services")
public class AppointmentController {

    @Autowired
    UserService userService;

    @Autowired
    AppointmentService appointmentService;

    @Autowired
    DoctorService doctorService;
    @Autowired
    private CustomerService customerService;


    @GetMapping("/doctors/{doctorId}/unavailable-schedules")
    public ResponseEntity<?> getDoctorSchedules(
            @PathVariable int doctorId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {

        List<AvailableScheduleDTO> unSchedules = appointmentService.getAvailableSchedules(doctorId, date);

        // Lọc các lịch có status == 1
        List<AvailableScheduleDTO> available = unSchedules.stream()
                .filter(s -> !s.isStatus())
                .toList();

        if (available.isEmpty()) {
            return ResponseEntity.ok("Bác sĩ ranh ca ngay ngày hôm nay");
        }

        return ResponseEntity.ok(available);
    }

    @PostMapping("/register/appointments")
    public ResponseEntity<String> createAppointment(@RequestBody CreateAppointmentDTO dto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.getUserByEmail(email);
        Customer customer = customerService.getCustomerById(user.getUserId());
        appointmentService.registerAppointment(dto, customer.getCustomerId());
        return ResponseEntity.ok("Đặt lịch hẹn thành công.");
    }

    @PostMapping("/appointments/reexam")
    public ResponseEntity<String> createReExam(@RequestBody ReExamAppointmentDTO dto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.getUserByEmail(email);
        Doctor doctor = doctorService.getDoctorById(user.getUserId());
        appointmentService.scheduleReExam(dto, doctor);
        return ResponseEntity.ok("Đặt lịch tái khám thành công.");
    }

    @GetMapping("/appointments/reexam")
    public ResponseEntity<List<ReExamAppointmentResponseDTO>> getOwnReExamAppointments() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.getUserByEmail(email);
        Customer customer = customerService.getCustomerById(user.getUserId());
        List<ReExamAppointmentResponseDTO> result = appointmentService.getReExamAppointmentsForCustomer(customer.getCustomerId());
        return ResponseEntity.ok(result);
    }

    @PatchMapping("/appointments/cancel/{appointmentId}")
    public ResponseEntity<String> cancelAppointment(@PathVariable int appointmentId) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.getUserByEmail(email);
        Customer customer = customerService.getCustomerById(user.getUserId());

        appointmentService.cancelAppointment(appointmentId, customer.getCustomerId());

        return ResponseEntity.ok("Cuộc hẹn đã được hủy thành công và khung giờ được mở lại.");
    }

    @GetMapping("/appointments/history/{customerId}")
    public ResponseEntity<List<AppointmentHistoryDTO>> getDoctorHistory(@PathVariable int customerId) {
        // Lấy email của người dùng hiện tại (bác sĩ đang đăng nhập)
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        // Lấy thông tin user & doctor tương ứng
        User user = userService.getUserByEmail(email);
        Doctor doctor = doctorService.getDoctorById(user.getUserId());



        // Lấy danh sách lịch sử cuộc hẹn giữa bác sĩ này và bệnh nhân được truyền vào
        List<AppointmentHistoryDTO> history = appointmentService
                .getAppointmentsForDoctorAndCustomer(doctor.getDoctorId(), customerId);

        return ResponseEntity.ok(history);
    }

    @GetMapping("/appointments/overview")
    public ResponseEntity<List<AppointmentOverviewDTO>> getAllAppointmentsForManager() {
        return ResponseEntity.ok(appointmentService.getAllAppointmentsForManager());
    }

    @PatchMapping("/appointments/{appointmentId}/update-service")
    public ResponseEntity<String> updateServiceForAppointment(
            @PathVariable int appointmentId,
            @RequestBody UpdateAppointmentServiceDTO dto) {

        // Lấy doctor đang đăng nhập
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.getUserByEmail(email);
        Doctor doctor = doctorService.getDoctorById(user.getUserId());


        appointmentService.updateServiceForAppointment(appointmentId, doctor.getDoctorId(), dto);

        return ResponseEntity.ok("Cập nhật dịch vụ thành công");

    }

    @GetMapping("/appointments/detail")
    public ResponseEntity<List<AppointmentDetailDTO>> getAppointmentDetails() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.getUserByEmail(email);

        System.out.println(user.getRole().getRoleName());

        if(user.getRole().getRoleName().equalsIgnoreCase("CUSTOMER")) {
            Customer customer = customerService.getCustomerById(user.getUserId());
            return ResponseEntity.ok(appointmentService.getAppointmentsByCustomerId(customer.getCustomerId()));
        } else if (user.getRole().getRoleName().equalsIgnoreCase("DOCTOR")){
            Doctor doctor = doctorService.getDoctorById(user.getUserId());
            return ResponseEntity.ok(appointmentService.getAppointmentsByDoctorId(doctor.getDoctorId()));
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    @GetMapping("/appointments/{appointmentId}/detail")
    public ResponseEntity<AppointmentDetailDTO> getAppointmentDetailById(@PathVariable int appointmentId) {
        AppointmentDetailDTO dto = appointmentService.getAppointmentDetailById(appointmentId);
        return ResponseEntity.ok(dto);
    }




}
