package hsf302.com.hiemmuon.service;

import hsf302.com.hiemmuon.entity.User;
import hsf302.com.hiemmuon.repository.UserRepository;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

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
}