package hsf302.com.hiemmuon.controller;

import hsf302.com.hiemmuon.dto.ApiResponse;
import hsf302.com.hiemmuon.dto.createDto.RegisterCustomerDTO;
import hsf302.com.hiemmuon.dto.responseDto.CustomerDTO;
import hsf302.com.hiemmuon.dto.updateDto.UpdateCustomerDTO;
import hsf302.com.hiemmuon.service.CustomerService;
import hsf302.com.hiemmuon.service.SendMailService;
import hsf302.com.hiemmuon.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "11. Customer Controller")
@RestController
@RequestMapping("/api")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private UserService userService;

    @Autowired
    private SendMailService sendMailService;

    @Operation(
            summary = "Lấy danh sách khách hàng",
            description = "Admin có thể xem toàn bộ danh sách khách hàng trong hệ thống."
    )
    @GetMapping("/admin/customers")
    @SecurityRequirement(name = "bearerAuth") // ⬅⬅⬅ THÊM DÒNG NÀY
    public ResponseEntity<ApiResponse<List<CustomerDTO>>> getAllCustomers() {
        List<CustomerDTO> customers = customerService.getAllCustomers();

        ApiResponse<List<CustomerDTO>> response = new ApiResponse<>(
                200,
                "List of customers retrieved successfully",
                customers
        );
        return ResponseEntity.ok(response);
    }

    @Operation(
            summary = "Đăng ký tài khoản khách hàng và gửi mã OTP",
            description = "API cho phép người dùng mới đăng ký tài khoản với vai trò khách hàng và nhận mã OTP."
    )
    @PostMapping("/register/request")
    public ResponseEntity<ApiResponse<String>> sendOtp(@RequestBody RegisterCustomerDTO dto) {
        if (userService.isEmailExists(dto.getEmail())) {
            throw new RuntimeException("Email đã tồn tại");
        }
        sendMailService.storePendingRegistration(dto);
        sendMailService.sendOtp(dto.getEmail(), dto.getName());
        return ResponseEntity.ok(new ApiResponse<>(200, "OTP đã được gửi đến email của bạn", null));
    }


    @Operation(
            summary = "Xác nhận mã OTP",
            description = "API cho phép người dùng xác nhận mã OTP để kích hoạt tài khoản."
    )
    @PostMapping("/register/confirm")
    public ResponseEntity<ApiResponse<String>> confirmRegister(@RequestParam String email, @RequestParam String otp) {
        if (!sendMailService.validOtp(email, otp)) {
            throw new RuntimeException("Mã OTP không đúng hoặc đã hết hạn");
        }

        RegisterCustomerDTO dto = sendMailService.getPendingRegistration(email);
        customerService.registerCustomer(dto);
        ApiResponse<String> response = new ApiResponse<>(
                200, "Đăng ký khách hàng thành công", null);
        return ResponseEntity.ok(response);
    }

    @Operation(
            summary = "Lấy thông tin cá nhân khách hàng",
            description = "Khách hàng có thể xem thông tin cá nhân của mình dựa trên token đăng nhập."
    )
    @GetMapping("/customer/info")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<CustomerDTO>> getMyInfo(Authentication authentication) {
        String email = authentication.getName();

        CustomerDTO customer = customerService.getMyInfo(email); // dùng email
        return ResponseEntity.ok(new ApiResponse<>(200, "Thông tin khách hàng", customer));
    }

    @Operation(
            summary = "Cập nhật thông tin khách hàng",
            description = "Khách hàng có thể cập nhật các thông tin cá nhân như họ tên, địa chỉ, số điện thoại, v.v."
    )
    @PutMapping("/customer/update")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<String>> updateCustomerInfo(
            @RequestBody UpdateCustomerDTO dto,
            Authentication authentication) {
        String email = authentication.getName();
        try {
            customerService.updateMyInfo(email, dto);
            ApiResponse<String> response = new ApiResponse<>(200, "Cập nhật thông tin thành công", null);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            ApiResponse<String> error = new ApiResponse<>(400, e.getMessage(), null);
            return ResponseEntity.badRequest().body(error);
        } catch (Exception e) {
            ApiResponse<String> error = new ApiResponse<>(500, "Lỗi server", null);
            return ResponseEntity.status(500).body(error);
        }
    }
}