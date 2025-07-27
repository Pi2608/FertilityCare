package hsf302.com.hiemmuon.controller;

import hsf302.com.hiemmuon.dto.createDto.CreateAppointmentDTO;
import hsf302.com.hiemmuon.dto.createDto.ReExamAppointmentDTO;
import hsf302.com.hiemmuon.dto.responseDto.*;
import hsf302.com.hiemmuon.entity.Customer;
import hsf302.com.hiemmuon.entity.Doctor;
import hsf302.com.hiemmuon.entity.User;
import hsf302.com.hiemmuon.service.*;
import io.jsonwebtoken.Claims;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@Tag(name = "2. Appointment Controller")
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

    @Autowired
    private JwtService jwtService;

    @Operation(
            summary = "Xem lịch ban của bác sĩ",
            description = "Lấy danh sách các khung giờ bác sĩ còn ban trong ngày đã chọn. Dùng để đặt lịch mới."
    )
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

    @Operation(
            summary = "Xem lịch bận của chính bác sĩ",
            description = "Lấy danh sách các khung giờ bác sĩ còn bận trong ngày đã chọn. Dùng để đặt lịch mới."
    )
    @GetMapping("/doctors/unavailable-schedules")
    public ResponseEntity<?> getMySchedules(
            HttpServletRequest request,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        final String authHeader = request.getHeader("Authorization");
        final String token = authHeader.substring(7);
        Claims claims = jwtService.extractAllClaims(token);

        Object doctorIdObj = claims.get("userId");
        Integer doctorId = Integer.parseInt(doctorIdObj.toString());

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

    @Operation(
            summary = "Đặt lịch hẹn mới",
            description = "Khách hàng đặt lịch hẹn với bác sĩ và dịch vụ mong muốn."
    )
    @PostMapping("/register/appointments")
    public ResponseEntity<String> createAppointment(@RequestBody CreateAppointmentDTO dto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.getUserByEmail(email);
        Customer customer = customerService.getCustomerById(user.getUserId());
        appointmentService.registerAppointment(dto, customer.getCustomerId());
        return ResponseEntity.ok("Đặt lịch hẹn thành công.");
    }

    @Operation(
            summary = "Đặt lịch tái khám",
            description = "Bác sĩ có thể đặt lịch tái khám cho bệnh nhân dựa trên quy trình điều trị."
    )
    @PostMapping("/appointments/reexam")
    public ResponseEntity<String> createReExam(@RequestBody ReExamAppointmentDTO dto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.getUserByEmail(email);
        Doctor doctor = doctorService.getDoctorById(user.getUserId());
        appointmentService.scheduleReExam(dto, doctor);
        return ResponseEntity.ok("Đặt lịch tái khám thành công.");
    }

//    @Operation(
//            summary = "Lịch tái khám của khách hàng",
//            description = "Trả về tất cả các lịch tái khám đã được bác sĩ đặt cho khách hàng hiện tại."
//    )
//    @GetMapping("/appointments/reexam")
//    public ResponseEntity<List<ReExamAppointmentResponseDTO>> getOwnReExamAppointments() {
//        String email = SecurityContextHolder.getContext().getAuthentication().getName();
//        User user = userService.getUserByEmail(email);
//        Customer customer = customerService.getCustomerById(user.getUserId());
//        Doctor doctor = doctorService.getDoctorById(user.getUserId());
//        List<ReExamAppointmentResponseDTO> result = appointmentService.getReExamAppointmentsForaDoctor(doctor.getDoctorId());
//        return ResponseEntity.ok(result);
//    }

    @Operation(
            summary = "Hủy cuộc hẹn",
            description = "Khách hàng có thể hủy cuộc hẹn đã đặt. Hệ thống sẽ mở lại khung giờ đó cho người khác."
    )
    @PatchMapping("/appointments/cancel/{appointmentId}")
    public ResponseEntity<String> cancelAppointment(@PathVariable int appointmentId) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.getUserByEmail(email);
        Customer customer = customerService.getCustomerById(user.getUserId());

        appointmentService.cancelAppointment(appointmentId, customer.getCustomerId());

        return ResponseEntity.ok("Cuộc hẹn đã được hủy thành công và khung giờ được mở lại.");
    }

    @Operation(
            summary = "Lịch sử cuộc hẹn với bệnh nhân",
            description = "Bác sĩ xem lại tất cả các lần hẹn với một bệnh nhân cụ thể."
    )
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

    @Operation(
            summary = "Tổng quan lịch hẹn toàn hệ thống",
            description = "Quản lý có thể xem toàn bộ danh sách các cuộc hẹn đã được tạo trong hệ thống."
    )
    @GetMapping("/appointments/overview")
    public ResponseEntity<List<AppointmentOverviewDTO>> getAllAppointmentsForManager() {
        return ResponseEntity.ok(appointmentService.getAllAppointmentsForManager());
    }

    @Operation(
            summary = "Cập nhật dịch vụ",
            description = "Bác sĩ có thể cập nhật dịch vụ hỗ trợ sinh sản cho một cuộc hẹn cụ thể."
    )
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

    @Operation(
            summary = "Xem tất cả lịch hẹn của mình",
            description = "Khách hàng hoặc bác sĩ có thể xem toàn bộ lịch hẹn liên quan đến mình."
    )
    @GetMapping("/appointments/detail")
    public ResponseEntity<List<AppointmentDetailDTO>> getAppointmentDetails() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.getUserByEmail(email);

        System.out.println(user.getRole().getRoleName());

        if (user.getRole().getRoleName().equalsIgnoreCase("CUSTOMER")) {
            Customer customer = customerService.getCustomerById(user.getUserId());
            return ResponseEntity.ok(appointmentService.getAppointmentsByCustomerId(customer.getCustomerId()));
        } else if (user.getRole().getRoleName().equalsIgnoreCase("DOCTOR")) {
            Doctor doctor = doctorService.getDoctorById(user.getUserId());
            return ResponseEntity.ok(appointmentService.getAppointmentsByDoctorId(doctor.getDoctorId()));
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    @Operation(
            summary = "Chi tiết lịch hẹn theo ID",
            description = "Truy xuất chi tiết một lịch hẹn cụ thể theo mã định danh cuộc hẹn."
    )
    @GetMapping("/appointments/{appointmentId}/detail")
    public ResponseEntity<AppointmentDetailDTO> getAppointmentDetailById(@PathVariable int appointmentId) {
        AppointmentDetailDTO dto = appointmentService.getAppointmentDetailById(appointmentId);
        return ResponseEntity.ok(dto);
    }

    @Scheduled(fixedRate = 60 * 1000) // Mỗi phút
    public void runAppointmentReminder() {
        appointmentService.sendAppointmentReminders();
    }
}