package hsf302.com.hiemmuon.controller;

import hsf302.com.hiemmuon.dto.createDto.CreateFeedbackDTO;
import hsf302.com.hiemmuon.dto.createDto.UpdateFeedbackDTO;
import hsf302.com.hiemmuon.dto.responseDto.CustomerDTO;
import hsf302.com.hiemmuon.dto.responseDto.DoctorDTO;
import hsf302.com.hiemmuon.dto.responseDto.FeedbackViewDTO;
import hsf302.com.hiemmuon.entity.Customer;
import hsf302.com.hiemmuon.entity.Feedback;
import hsf302.com.hiemmuon.entity.User;
import hsf302.com.hiemmuon.service.CustomerService;
import hsf302.com.hiemmuon.service.DoctorService;
import hsf302.com.hiemmuon.service.FeedbackService;
import hsf302.com.hiemmuon.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedbacks")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private UserService userService;

    @Operation(
            summary = "Customer feedback cho doctor",
            description = "..."
    )
    @PostMapping
    public ResponseEntity<?> createFeedback(@RequestBody CreateFeedbackDTO dto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        CustomerDTO customer = customerService.getMyInfo(email);

        feedbackService.createFeedback(customer.getId(), dto);
        return ResponseEntity.ok("Gui danh gia thanh cong");

    }

    @Operation(
            summary = "Hien danh gia trung binh cua doctor",
            description = "...."
    )
    @GetMapping("/averagi-rating/{doctorId}")
    public ResponseEntity<Double> getAveragiRating(@PathVariable Integer doctorId) {
        Double averageRating = feedbackService.getAverageRatingForDoctorId(doctorId);
        return ResponseEntity.ok(averageRating);
    }
    @Operation(
            summary = "Lấy tất cả feedback",
            description = "...."
    )
    // Lấy tất cả feedback
    @GetMapping
    public ResponseEntity<List<FeedbackViewDTO>> getAll() {
        return ResponseEntity.ok(feedbackService.getAllFeedbacks());
    }
    @Operation(
            summary = "Lấy theo doctor",
            description = "...."
    )
    // Lấy theo doctor
    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<FeedbackViewDTO>> getByDoctor() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.getUserByEmail(email);
        return ResponseEntity.ok(feedbackService.getFeedbacksByDoctor(user.getUserId()));
    }
    @Operation(
            summary = "Lấy theo customer",
            description = "...."
    )
    // Lấy theo customer
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<FeedbackViewDTO>> getByCustomer() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.getUserByEmail(email);
        return ResponseEntity.ok(feedbackService.getFeedbacksByCustomer(user.getUserId()));
    }

    @Operation(
            summary = "customer cap nhat feedback",
            description = "...."
    )
    // Cập nhật feedback
    @PutMapping("/{id}")
    public ResponseEntity<String> updateFeedback(@PathVariable int id, @RequestBody UpdateFeedbackDTO dto) {
        feedbackService.updateFeedback(id, dto);
        return ResponseEntity.ok("Cập nhật thành công!");
    }

    @Operation(
            summary = "customer xoa feedback",
            description = "...."
    )
    // Xoá feedback
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFeedback(@PathVariable int id) {
        feedbackService.deleteFeedback(id);
        return ResponseEntity.ok("Xoá thành công!");
    }

}
