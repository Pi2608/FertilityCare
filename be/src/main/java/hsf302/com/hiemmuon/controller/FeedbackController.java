package hsf302.com.hiemmuon.controller;

import hsf302.com.hiemmuon.dto.ApiResponse;
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
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.List;

@Tag(name = "11. Feedback")
@RestController
@RequestMapping("/api/feedback")
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

    @PostMapping("/feedback")
    public ResponseEntity<ApiResponse<Void>> createFeedback(@RequestBody CreateFeedbackDTO dto) {
        // Lấy email từ token đăng nhập
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        // Lấy thông tin customer theo email
        CustomerDTO customer = customerService.getMyInfo(email);

        // Tạo feedback
        feedbackService.createFeedback(customer.getId(), dto);

        // Tạo response chuẩn hóa
        ApiResponse<Void> response = new ApiResponse<>(
                200,
                "Gửi đánh giá thành công",
                null
        );

        return ResponseEntity.ok(response);
    }

    @Operation(
            summary = "Hien danh gia trung binh cua doctor",
            description = "...."
    )
    @GetMapping("/average-rating/{doctorId}")
    public ResponseEntity<ApiResponse<Double>> getAverageRating(@PathVariable Integer doctorId) {
        Double averageRating = feedbackService.getAverageRatingForDoctorId(doctorId);

        ApiResponse<Double> response = new ApiResponse<>(
                200,
                "Lấy điểm đánh giá trung bình của bác sĩ thành công",
                averageRating
        );

        return ResponseEntity.ok(response);
    }

    @Operation(
            summary = "Lấy tất cả feedback",
            description = "...."
    )
    // Lấy tất cả feedback
    @GetMapping("/feedbacks")
    public ResponseEntity<ApiResponse<List<FeedbackViewDTO>>> getAllFeedbacks() {
        List<FeedbackViewDTO> feedbacks = feedbackService.getAllFeedbacks();

        ApiResponse<List<FeedbackViewDTO>> response = new ApiResponse<>(
                200,
                "Lấy danh sách đánh giá thành công",
                feedbacks
        );

        return ResponseEntity.ok(response);
    }

    @SneakyThrows
    @Operation(
            summary = "Lấy feedback theo người đăng nhập (doctor hoặc customer)",
            description = "Trả về danh sách đánh giá tương ứng với vai trò: DOCTOR hoặc CUSTOMER"
    )
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<List<FeedbackViewDTO>>> getMyFeedbacks() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.getUserByEmail(email);
        String role = user.getRole().getRoleName(); // Giả sử roleName là "DOCTOR", "CUSTOMER"

        List<FeedbackViewDTO> feedbacks;

        switch (role.toUpperCase()) {
            case "DOCTOR":
                feedbacks = feedbackService.getFeedbacksByDoctor(user.getUserId());
                break;
            case "CUSTOMER":
                feedbacks = feedbackService.getFeedbacksByCustomer(user.getUserId());
                break;
            default:
                throw new AccessDeniedException("Bạn không có quyền truy cập đánh giá.");
        }

        ApiResponse<List<FeedbackViewDTO>> response = new ApiResponse<>(
                200,
                "Lấy đánh giá thành công",
                feedbacks
        );

        return ResponseEntity.ok(response);
    }



    @Operation(
            summary = "Khách hàng cập nhật feedback",
            description = "Cho phép khách hàng đã gửi đánh giá trước đó chỉnh sửa nội dung hoặc điểm đánh giá."
    )
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> updateFeedback(@PathVariable int id, @RequestBody UpdateFeedbackDTO dto) {
        feedbackService.updateFeedback(id, dto);

        ApiResponse<Void> response = new ApiResponse<>(
                200,
                "Cập nhật đánh giá thành công!",
                null
        );

        return ResponseEntity.ok(response);
    }


    @Operation(
            summary = "Khách hàng xoá feedback",
            description = "Cho phép khách hàng xoá đánh giá mà họ đã gửi trước đó."
    )
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteFeedback(@PathVariable int id) {
        feedbackService.deleteFeedback(id);

        ApiResponse<Void> response = new ApiResponse<>(
                200,
                "Xoá đánh giá thành công!",
                null
        );

        return ResponseEntity.ok(response);
    }


}
