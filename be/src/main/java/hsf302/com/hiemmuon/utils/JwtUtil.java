package hsf302.com.hiemmuon.utils;

import hsf302.com.hiemmuon.entity.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.*;

@Component
public class JwtUtil {

    private final String SECRET;

    public JwtUtil(@Value("${jwt.secret}") String SECRET) {
        this.SECRET = SECRET;
    }

    private final long EXPIRATION_TIME = 2 * 60 * 60 * 1000;

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));
    }

    // 👉 Dùng cho người dùng thông thường
    public String generateToken(String email, List<String> roles) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", roles);
        return createToken(claims, email);
    }

    // 👉 Dùng cho bác sĩ để thêm doctorId
    public String generateToken(User user) {
        Map<String, Object> claims = new HashMap<>();

        // Nhúng role vào token
        claims.put("roles", List.of("ROLE_" + user.getRole().getRoleName().toUpperCase()));

        // Nếu là bác sĩ, nhúng doctorId
        if (user.getDoctor() != null) {
            claims.put("doctorId", user.getDoctor().getDoctorId());
        }

        return createToken(claims, user.getEmail());
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String generateToken(String email, List<String> roles, Map<String, Object> extraClaims) {
        Map<String, Object> claims = new HashMap<>(extraClaims);
        claims.put("roles", roles);
        return createToken(claims, email);
    }
}
