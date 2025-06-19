package hsf302.com.hiemmuon.service;

import hsf302.com.hiemmuon.dto.createDto.CreateDoctorDTO;
import hsf302.com.hiemmuon.dto.entityDto.DoctorDTOForCustomer;
import hsf302.com.hiemmuon.dto.entityDto.DoctorDTOForManager;
import hsf302.com.hiemmuon.dto.updateDto.UpdateDoctorDTO;
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

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DoctorService {

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

        Object doctorIdObj = claims.get("userId");
        Integer doctorId = Integer.parseInt(doctorIdObj.toString());
        return doctorRepository.findById(doctorId).get();
    }

    public Doctor getDoctorById(int id) {
        return doctorRepository.findById(id);
    }

    public Doctor saveDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    public DoctorDTOForCustomer getDoctorByDoctorId(int id) {
        Doctor doctor = doctorRepository.findById(id);
        DoctorDTOForCustomer dto = convertToCustomerDTO(doctor);
        return dto;
    }

    public DoctorDTOForCustomer getDoctorByName(String name) {
        Doctor doctor = doctorRepository.findByUser_Name(name);
        DoctorDTOForCustomer dto = convertToCustomerDTO(doctor);
        return dto;
    }

    public List<DoctorDTOForManager> getAllDoctor() {
        return doctorRepository.findAll().stream()
                .map(this::convertToManagerDTO)
                .collect(Collectors.toList());
    }

    public List<DoctorDTOForCustomer> getDoctorBySpecification(String specification) {
        return doctorRepository.findBySpecification(specification).stream()
                .map(this::convertToCustomerDTO)
                .collect(Collectors.toList());
    }

    public List<DoctorDTOForCustomer> getDoctorByIsActive() {
        return doctorRepository.findByIsActive(true).stream()
                .map(this::convertToCustomerDTO)
                .collect(Collectors.toList());
    }

    public Doctor createDoctor(CreateDoctorDTO request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }

        User user = new User();
        user.setEmail(request.getEmail());

        String encodedPassword = passwordEncoder.encode(request.getPassword());
        user.setPassword(encodedPassword);
        user.setCreateAt(LocalDate.now());
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
        Doctor doctor = getDoctorById(id);
        doctor.setIsActive(active);
        return saveDoctor(doctor);
    }

    private DoctorDTOForCustomer convertToCustomerDTO(Doctor doctor) {
        DoctorDTOForCustomer dto = new DoctorDTOForCustomer();
        dto.setName(doctor.getUser().getName());
        dto.setGender(doctor.getUser().getGender());
        dto.setEmail(doctor.getUser().getEmail());
        dto.setPhone(doctor.getUser().getPhone());
        dto.setSpecification(doctor.getSpecification());
        dto.setRatingAvg(doctor.getRatingAvg());
        dto.setExperience(doctor.getExperience());
        return dto;
    }

    private DoctorDTOForManager convertToManagerDTO(Doctor doctor) {
        DoctorDTOForManager dto = new DoctorDTOForManager();
        dto.setUserId(doctor.getUser().getUserId());
        dto.setName(doctor.getUser().getName());
        dto.setGender(doctor.getUser().getGender());
        dto.setDob(doctor.getUser().getDob());
        dto.setEmail(doctor.getUser().getEmail());
        dto.setPhone(doctor.getUser().getPhone());
        dto.setSpecification(doctor.getSpecification());
        dto.setExperience(doctor.getExperience());
        dto.setRatingAvg(doctor.getRatingAvg());
        dto.setIsActive(doctor.getIsActive());
        return dto;
    }

    public Doctor getDoctorByUserId(int userId) {
        return doctorRepository.findByUser_UserId(userId);
    }

}
