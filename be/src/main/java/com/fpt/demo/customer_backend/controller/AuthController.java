package com.fpt.demo.customer_backend.controller;


import com.fpt.demo.customer_backend.dto.LoginRequest;
import com.fpt.demo.customer_backend.dto.LoginResponse;
import com.fpt.demo.customer_backend.model.User;
import com.fpt.demo.customer_backend.repository.UserRepository;
import com.fpt.demo.customer_backend.util.JwtUtil;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest login) {
        Optional<User> userOpt = userRepo.findByEmail(login.getEmail());

        if (userOpt.isEmpty()) {
            throw new RuntimeException("Email không tồn tại");
        }

        User user = userOpt.get();

        if (!BCrypt.checkpw(login.getPassword(), user.getPassword_hash())) {
            throw new RuntimeException("Sai mật khẩu");
        }

        // Sinh token
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole_id());

        // Trả response đầy đủ
        return new LoginResponse("Đăng nhập thành công", token, user);
    }



}
