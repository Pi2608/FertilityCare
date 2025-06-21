package hsf302.com.hiemmuon.controller;

import hsf302.com.hiemmuon.dto.createDto.CreateAppointmentDTO;
import hsf302.com.hiemmuon.dto.createDto.ReExamAppointmentDTO;
import hsf302.com.hiemmuon.dto.entityDto.AppointmentHistoryDTO;
import hsf302.com.hiemmuon.dto.entityDto.AppointmentOverviewDTO;
import hsf302.com.hiemmuon.dto.entityDto.AvailableScheduleDTO;
import hsf302.com.hiemmuon.dto.entityDto.ReExamAppointmentResponseDTO;
import hsf302.com.hiemmuon.entity.Customer;
import hsf302.com.hiemmuon.entity.Doctor;
import hsf302.com.hiemmuon.entity.User;
import hsf302.com.hiemmuon.service.AppointmentService;
import hsf302.com.hiemmuon.service.CustomerService;
import hsf302.com.hiemmuon.service.DoctorService;
import hsf302.com.hiemmuon.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
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


    @GetMapping("/doctors/{doctorId}/available-schedules")
    public ResponseEntity<?> getDoctorSchedules(
            @PathVariable int doctorId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {

        List<AvailableScheduleDTO> schedules = appointmentService.getAvailableSchedules(doctorId, date);

        // Lọc các lịch có status == 1
        List<AvailableScheduleDTO> available = schedules.stream()
                .filter(s -> s.isStatus() == true)
                .toList();

        if (available.isEmpty()) {
            return ResponseEntity.ok("Bác sĩ bận vào ngày hôm nay");
        }

        return ResponseEntity.ok(available);
    }

    @PostMapping("/register/appointments")
    public ResponseEntity<String> createAppointment(@RequestBody CreateAppointmentDTO dto) {
        appointmentService.registerAppointment(dto);
        return ResponseEntity.ok("Đặt lịch hẹn thành công.");
    }

    @PostMapping("/appointments/reexam")
    public ResponseEntity<String> createReExam(@RequestBody ReExamAppointmentDTO dto) {
        appointmentService.scheduleReExam(dto);
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

    @GetMapping("/appointments/history")
    public ResponseEntity<List<AppointmentHistoryDTO>> getDoctorHistory() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.getUserByEmail(email);
        if (user == null) {
            throw new RuntimeException("Không tìm thấy user với email " + email);
        }
        Doctor doctor = doctorService.getDoctorById(user.getUserId());
        if (doctor == null) {
            throw new RuntimeException("Không tìm thấy bác sĩ tương ứng với user " + user.getName());
        }
        int doctorId = doctor.getDoctorId();
        List<AppointmentHistoryDTO> history = appointmentService.getAppointmentHistoryForDoctor(doctor.getDoctorId());
        return ResponseEntity.ok(history);
    }

    @GetMapping("/appointments/overview")
    public ResponseEntity<List<AppointmentOverviewDTO>> getAllAppointmentsForManager() {
        return ResponseEntity.ok(appointmentService.getAllAppointmentsForManager());
    }




}
