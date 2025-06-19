package hsf302.com.hiemmuon.service;

import hsf302.com.hiemmuon.dto.entityDto.TreatmentStepDTO;
import hsf302.com.hiemmuon.entity.Cycle;
import hsf302.com.hiemmuon.entity.CycleStep;
import hsf302.com.hiemmuon.repository.CycleRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CycleService {

    @Autowired
    private CycleRepository cycleRepository;

    @Autowired
    private JwtService jwtService;

    public Cycle getCycleByMe(HttpServletRequest request, int cycleId) {
        final String authHeader = request.getHeader("Authorization");
        final String token = authHeader.substring(7);
        Claims claims = jwtService.extractAllClaims(token);

        Object id = claims.get("userId");
        Integer userId = Integer.parseInt(id.toString());
        return cycleRepository.findByCustomer_CustomerIdAndCycleId(userId, cycleId);
    }

}
