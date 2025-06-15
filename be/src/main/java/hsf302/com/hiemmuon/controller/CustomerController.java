package hsf302.com.hiemmuon.controller;

import hsf302.com.hiemmuon.dto.ApiResponse;
import hsf302.com.hiemmuon.dto.CustomerDTO;
import hsf302.com.hiemmuon.dto.RegisterCustomerDTO;
import hsf302.com.hiemmuon.dto.UpdateCustomerDTO;
import hsf302.com.hiemmuon.entity.User;
import hsf302.com.hiemmuon.service.CustomerService;
import hsf302.com.hiemmuon.service.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private UserService userService;


    @GetMapping("/admin/customers")
    @SecurityRequirement(name = "bearerAuth") // ⬅⬅⬅ THÊM DÒNG NÀY
    public ResponseEntity<ApiResponse<List<CustomerDTO>>> getAllCustomers(){
        List<CustomerDTO> customers = customerService.getAllCustomers();

        ApiResponse<List<CustomerDTO>> response = new ApiResponse<>(
                200,
                "List of customers retrieved successfully",
                customers
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register/customer")
    public ResponseEntity<ApiResponse<String>> registerCustomer(@Valid @RequestBody RegisterCustomerDTO dto) {
        customerService.registerCustomer(dto);
        ApiResponse<String> response = new ApiResponse<>(200, "Đăng ký khách hàng thành công", null);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/customer/info")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<CustomerDTO>> getMyInfo(Authentication authentication) {
        String email = authentication.getName(); // ✅ email đã đúng
        System.out.println("Email extracted from authentication: " + email);

        CustomerDTO customer = customerService.getMyInfo(email); // dùng email
        return ResponseEntity.ok(new ApiResponse<>(200, "Thông tin khách hàng", customer));
    }

    @PutMapping("/customer/update")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<String>> updateCustomerInfo(
            @RequestBody UpdateCustomerDTO dto,
            Authentication authentication) {

        String email = authentication.getName();

        customerService.updateMyInfo(email, dto);
        ApiResponse<String> response = new ApiResponse<>(200, "Cập nhật thông tin thành công", null);
        return ResponseEntity.ok(response);
    }


}
