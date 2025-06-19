//package hsf302.com.hiemmuon.controller;
//
//import hsf302.com.hiemmuon.dto.appointment.*;
//import hsf302.com.hiemmuon.dto.createDto.CreateAppointmentDTO;
//import hsf302.com.hiemmuon.dto.createDto.ReExamAppointmentDTO;
//import hsf302.com.hiemmuon.dto.entityDto.AppointmentHistoryDTO;
//import hsf302.com.hiemmuon.dto.entityDto.AppointmentOverviewDTO;
//import hsf302.com.hiemmuon.dto.entityDto.AvailableScheduleDTO;
//import hsf302.com.hiemmuon.dto.entityDto.ReExamAppointmentResponseDTO;
//import hsf302.com.hiemmuon.entity.*;
//import hsf302.com.hiemmuon.repository.CustomerRepository;
//import hsf302.com.hiemmuon.repository.DoctorRepository;
//import hsf302.com.hiemmuon.repository.UserRepository;
//import hsf302.com.hiemmuon.service.AppointmentService;
//import hsf302.com.hiemmuon.service.DoctorService;
//import jakarta.websocket.server.PathParam;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.format.annotation.DateTimeFormat;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.web.bind.annotation.*;
//
//import java.time.LocalDate;
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/appointment-services")
//public class AppointmentController {
//
//    @Autowired
//    AppointmentService appointmentService;
//
//    @Autowired
//    UserRepository userRepository;
//
//    @Autowired
//    CustomerRepository customerRepository;
//
//    @Autowired
//    DoctorRepository doctorRepository;
//
//
//    @GetMapping("/doctors/{doctorId}/available-schedules")
//    public List<AvailableScheduleDTO> getDoctorSchedules(
//            @PathVariable int doctorId,
//            @RequestParam@DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
//        return appointmentService.getAvailableSchedules(doctorId, date);
//    }
//
//    @PostMapping("/register/appointments")
//    public ResponseEntity<String> createAppointment(@RequestBody CreateAppointmentDTO dto) {
//        appointmentService.registerAppointment(dto);
//        return ResponseEntity.ok("Đặt lịch hẹn thành công.");
//    }
//
//    @PostMapping("/appointments/reexam")
//    public ResponseEntity<String> createReExam(@RequestBody ReExamAppointmentDTO dto) {
//        appointmentService.scheduleReExam(dto);
//        return ResponseEntity.ok("Đặt lịch tái khám thành công.");
//    }
//
//    @GetMapping("/appointments/reexam")
//    public ResponseEntity<List<ReExamAppointmentResponseDTO>> getOwnReExamAppointments() {
//        String email = SecurityContextHolder.getContext().getAuthentication().getName();
//        User user = userRepository.findByEmail(email);
//        Customer customer = customerRepository.findByUser(user);
//
//        List<ReExamAppointmentResponseDTO> result = appointmentService.getReExamAppointmentsForCustomer(customer.getCustomerId());
//        return ResponseEntity.ok(result);
//    }
//
//    @PatchMapping("/appointments/cancel/{appointmentId}")
//    public ResponseEntity<String> cancelAppointment(@PathVariable int appointmentId) {
//        String email = SecurityContextHolder.getContext().getAuthentication().getName();
//        User user = userRepository.findByEmail(email);
//        Customer customer = customerRepository.findByUser(user);
//
//        appointmentService.cancelAppointment(appointmentId, customer.getCustomerId());
//
//        return ResponseEntity.ok("Cuộc hẹn đã được hủy thành công và khung giờ được mở lại.");
//    }
//
//    @GetMapping("/appointments/history")
//    public ResponseEntity<List<AppointmentHistoryDTO>> getDoctorHistory() {
//        String email = SecurityContextHolder.getContext().getAuthentication().getName();
//        User user = userRepository.findByEmail(email);
//        if (user == null) {
//            throw new RuntimeException("Không tìm thấy user với email " + email);
//        }
//        Doctor doctor = doctorRepository.findByUser(user);
//        if (doctor == null) {
//            throw new RuntimeException("Không tìm thấy bác sĩ tương ứng với user " + user.getName());
//        }
//        int doctorId = doctor.getDoctorId();
//        List<AppointmentHistoryDTO> history = appointmentService.getAppointmentHistoryForDoctor(doctor.getDoctorId());
//        return ResponseEntity.ok(history);
//    }
//
//    @GetMapping("/appointments/overview")
//    public ResponseEntity<List<AppointmentOverviewDTO>> getAllAppointmentsForManager() {
//        return ResponseEntity.ok(appointmentService.getAllAppointmentsForManager());
//    }
//
//
//
//
//}
