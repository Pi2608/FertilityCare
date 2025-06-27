package hsf302.com.hiemmuon.controller;

import hsf302.com.hiemmuon.dto.ApiResponse;
import hsf302.com.hiemmuon.dto.LoginRequest;
import hsf302.com.hiemmuon.entity.Role;
import hsf302.com.hiemmuon.entity.User;
import hsf302.com.hiemmuon.service.JwtService;
import hsf302.com.hiemmuon.service.UserService;
import hsf302.com.hiemmuon.utils.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Tag(name = "1. Login Controller")
@RestController
@RequestMapping("/api/login")
public class LoginController {
    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private JwtService jwtService;

    @Operation(
            summary = "Đăng nhập hệ thống",
            description = "API này cho phép người dùng đăng nhập vào hệ thống bằng email và mật khẩu."
    )
    @PostMapping()
    public ResponseEntity<ApiResponse<String>> loginAdmin(@RequestBody @Valid LoginRequest request) {
        User user = userService.getUserByEmail(request.getEmail());

        if (user == null || !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Email hoặc mật khẩu không đúng");
        }

        List<String> roles = List.of("ROLE_" + user.getRole().getRoleName().toUpperCase());

        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("roles", roles);

        extraClaims.put("userId", user.getUserId());

        String token = jwtUtil.generateToken(user.getEmail(), roles, extraClaims);

        ApiResponse<String> response = new ApiResponse<>(
                200,
                "Đăng nhập tài khoản thành công",
                token
        );

        return ResponseEntity.ok(response);
    }

    @Operation(
            summary = "Kiểm tra token xác thực",
            description = "Kiểm tra token JWT từ client có còn hiệu lực hay không.")
    @GetMapping("/roles")
    public ResponseEntity<?> getRolesFromToken(HttpServletRequest request) {
        Role role = jwtService.getRoleByJwt(request);
        ApiResponse<Role> response = new ApiResponse<>(
                200,
                "Get role successfully",
                role
        );
        return ResponseEntity.ok(response);
    }
}