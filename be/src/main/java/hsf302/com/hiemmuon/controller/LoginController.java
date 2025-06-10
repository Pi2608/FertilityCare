package hsf302.com.hiemmuon.controller;

import hsf302.com.hiemmuon.dto.ApiResponse;
import hsf302.com.hiemmuon.dto.LoginRequest;
import hsf302.com.hiemmuon.entity.User;
import hsf302.com.hiemmuon.service.UserService;
import hsf302.com.hiemmuon.utils.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/login")
public class LoginController {
    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/manager")
    public ResponseEntity<ApiResponse<String>> login(@RequestBody @Valid LoginRequest request) {
        User user = userService.getUserByEmail(request.getEmail());

        if (user == null || !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Email hoặc mật khẩu không đúng");
        }

        List<String> roles = List.of("ROLE_" + user.getRole().getRoleName().toUpperCase());

        String token = jwtUtil.generateToken(user.getEmail(), roles);

        ApiResponse<String> response = new ApiResponse<>(
                200,
                "Đăng nhập tài khoản quản lý thành công",
                token
        );

        return ResponseEntity.ok(response);
    }

    @PostMapping("/doctor")
    public ResponseEntity<ApiResponse<String>> loginDoctor(@RequestBody @Valid LoginRequest request) {
        User user = userService.getUserByEmail(request.getEmail());

        if (user == null || !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Email hoặc mật khẩu không đúng");
        }

        List<String> roles = List.of("ROLE_" + user.getRole().getRoleName().toUpperCase());

        Map<String, Object> extraClaims = Map.of("doctorId", user.getDoctor().getDoctorId());

        String token = jwtUtil.generateToken(user.getEmail(), roles, extraClaims);

        ApiResponse<String> response = new ApiResponse<>(
                200,
                "Đăng nhập tài khoản bác sĩ thành công",
                token
        );

        return ResponseEntity.ok(response);
    }

    @PostMapping("/customer")
    public ResponseEntity<ApiResponse<String>> loginCustomer(@RequestBody @Valid LoginRequest request) {
        User user = userService.getUserByEmail(request.getEmail());

        if (user == null || !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Email hoặc mật khẩu không đúng");
        }

        List<String> roles = List.of("ROLE_" + user.getRole().getRoleName().toUpperCase());

        String token = jwtUtil.generateToken(user.getEmail(), roles);

        ApiResponse<String> response = new ApiResponse<>(
                200,
                "Đăng nhập tài khoản khách hàng thành công",
                token
        );

        return ResponseEntity.ok(response);
    }
}
