package hsf302.com.hiemmuon.service;

import hsf302.com.hiemmuon.dto.CreateDoctorDTO;
import hsf302.com.hiemmuon.dto.UpdateDoctorDTO;
import hsf302.com.hiemmuon.entity.Doctor;
import hsf302.com.hiemmuon.entity.User;
import hsf302.com.hiemmuon.repository.DoctorRepository;
import hsf302.com.hiemmuon.repository.RoleRepository;
import hsf302.com.hiemmuon.repository.UserRepository;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService{

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;


    public Doctor getDoctorByJwt(HttpServletRequest request) {
        final String authHeader = request.getHeader("Authorization");
        final String token = authHeader.substring(7);
        Claims claims = jwtService.extractAllClaims(token);

        Object doctorIdObj = claims.get("doctorId");
        Integer doctorId = Integer.parseInt(doctorIdObj.toString());
        return doctorRepository.findById(doctorId).get();
    }

    public Doctor getDoctorByDoctorId(int id) {
        return doctorRepository.findById(id);
    }

    public Doctor saveDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    public List<Doctor> findAll() {
        return doctorRepository.findAll();
    }

    public Doctor createDoctor(CreateDoctorDTO request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }

        User user = new User();
        user.setEmail(request.getEmail());

        String encodedPassword = passwordEncoder.encode(request.getPassword());
        user.setPassword(encodedPassword);
        user.setRole(roleRepository.findByRoleName("doctor"));

        User savedUser = userRepository.save(user);

        Doctor doctor = new Doctor();
        doctor.setUser(savedUser);
        doctor.setIsActive(true);

        return doctorRepository.save(doctor);
    }

    public Doctor updateDoctor(HttpServletRequest request, UpdateDoctorDTO updateDoctorDTO) {

        Doctor existingDoctor = getDoctorByJwt(request);
        User existingUser = existingDoctor.getUser();

        if (updateDoctorDTO.getName() != null) {
            existingUser.setName(updateDoctorDTO.getName());
        }
        if (updateDoctorDTO.getPhone() != null) {
            existingUser.setPhone(updateDoctorDTO.getPhone());
        }
        if (updateDoctorDTO.getDob() != null) {
            existingUser.setDob(updateDoctorDTO.getDob());
        }
        if (updateDoctorDTO.getGender() != null) {
            existingUser.setGender(updateDoctorDTO.getGender());
        }
        if (updateDoctorDTO.getDescription() != null) {
            existingDoctor.setSpecification(updateDoctorDTO.getDescription());
        }
        return saveDoctor(existingDoctor);
    }

    public Doctor updateDoctorActive(int id, boolean active) {
        Doctor doctor = getDoctorByDoctorId(id);
        doctor.setIsActive(active);
        return saveDoctor(doctor);
    }

    public List<Doctor> getDoctorBySpecification(String specification) {
        return doctorRepository.findBySpecification(specification);
    }

    public List<Doctor> getDoctorByIsActive() {
        return doctorRepository.findByIsActive(true);
    }
}
