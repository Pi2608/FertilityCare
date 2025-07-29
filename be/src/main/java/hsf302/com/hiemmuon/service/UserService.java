package hsf302.com.hiemmuon.service;

import hsf302.com.hiemmuon.dto.createDto.CreateManagerRequest;
import hsf302.com.hiemmuon.dto.createDto.RegisterCustomerDTO;
import hsf302.com.hiemmuon.entity.Role;
import hsf302.com.hiemmuon.entity.User;
import hsf302.com.hiemmuon.enums.Genders;
import hsf302.com.hiemmuon.repository.RoleRepository;
import hsf302.com.hiemmuon.repository.UserRepository;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoleRepository roleRepository;

    public boolean isEmailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User getUserByJwt(HttpServletRequest request) {
        final String authHeader = request.getHeader("Authorization");
        final String token = authHeader.substring(7);
        Claims claims = jwtService.extractAllClaims(token);

        Object userIdObj = claims.get("userId");
        Integer userId = Integer.parseInt(userIdObj.toString());
        return userRepository.findById(userId).get();
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public int count() {
        return (int) userRepository.count();
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User createManager(CreateManagerRequest dto) {
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email đã tồn tại");
        }

        Role customerRole = roleRepository.findByRoleName("MANAGER");
        if (customerRole == null) {
            throw new RuntimeException("Không tìm thấy role MANAGER");
        }

        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setPhone(dto.getPhone());
        user.setDob(dto.getDob());
        user.setGender(dto.getGender());
        user.setRole(customerRole);
        user.setCreateAt(LocalDate.now());
        userRepository.save(user);
        return user;
}
}