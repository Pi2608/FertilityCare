package hsf302.com.hiemmuon.service;

import hsf302.com.hiemmuon.dto.createDto.CreateDoctorDTO;
import hsf302.com.hiemmuon.dto.responseDto.DoctorDTO;
import hsf302.com.hiemmuon.dto.updateDto.UpdateDoctorDTO;
import hsf302.com.hiemmuon.entity.Doctor;
import hsf302.com.hiemmuon.entity.User;
import hsf302.com.hiemmuon.exception.NotFoundException;
import hsf302.com.hiemmuon.repository.DoctorRepository;
import hsf302.com.hiemmuon.repository.RoleRepository;
import hsf302.com.hiemmuon.repository.UserRepository;
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
    private UserService userService;

    public Doctor getDoctorById(int id) {
        return doctorRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy bác sĩ với ID: " + id));
    }

    public Doctor saveDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    public DoctorDTO getDoctorByDoctorId(int id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy bác sĩ với ID: " + id));
        DoctorDTO dto = convertToDoctorDTO(doctor);
        return dto;
    }

    public DoctorDTO getDoctorByName(String name) {
        Doctor doctor = doctorRepository.findByUser_Name(name);
        DoctorDTO dto = convertToDoctorDTO(doctor);
        return dto;
    }

    public List<DoctorDTO> getDoctorByIsActive() {
        return doctorRepository.findByUser_IsActive(true).stream()
                .map(this::convertToDoctorDTO)
                .collect(Collectors.toList());
    }

    public List<DoctorDTO> getAllDoctor() {
        return doctorRepository.findAll().stream()
                .map(this::convertToDoctorDTO)
                .collect(Collectors.toList());
    }

    public DoctorDTO getDoctorMe(HttpServletRequest request) {
        User existingDoctor = userService.getUserByJwt(request);
        DoctorDTO dto = convertToDoctorDTO(existingDoctor.getDoctor());
        return dto;
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
        doctor.getUser().setIsActive(true);

        return doctorRepository.save(doctor);
    }

    public DoctorDTO updateDoctorMe(HttpServletRequest request, UpdateDoctorDTO updateDoctorDTO) {

        User existingDoctor = userService.getUserByJwt(request);
        Doctor doctor = existingDoctor.getDoctor();

        //Cập nhật thông tin từ User
        if (updateDoctorDTO.getName() != null) {
            existingDoctor.setName(updateDoctorDTO.getName());
        }
        if (updateDoctorDTO.getPhone() != null) {
            existingDoctor.setPhone(updateDoctorDTO.getPhone());
        }
        if (updateDoctorDTO.getDob() != null) {
            existingDoctor.setDob(updateDoctorDTO.getDob());
        }
        if (updateDoctorDTO.getGender() != null) {
            existingDoctor.setGender(updateDoctorDTO.getGender());
        }

        //Cập nhật thông tin từ Doctor
        if (updateDoctorDTO.getSpecification() != null) {
            doctor.setSpecification(updateDoctorDTO.getSpecification());
        }
        if (updateDoctorDTO.getAbout() != null) {
            doctor.setAbout(updateDoctorDTO.getAbout());
        }
        if (updateDoctorDTO.getApproach() != null) {
            doctor.setApproach(updateDoctorDTO.getApproach());
        }
        if (updateDoctorDTO.getEducation() != null) {
            doctor.setEducation(updateDoctorDTO.getEducation());
        }
        if (updateDoctorDTO.getCertificates() != null) {
            doctor.setCertificates(updateDoctorDTO.getCertificates());
        }
        if (updateDoctorDTO.getWorkExperience() != null) {
            doctor.setWorkExperience(updateDoctorDTO.getWorkExperience());
        }

        //Lưu doctor (gồm cả user liên kết)
        return convertToDoctorDTO(saveDoctor(doctor));
    }

    public Doctor updateDoctorActive(int id, boolean active) {
        Doctor doctor = getDoctorById(id);
        doctor.getUser().setIsActive(active);
        return saveDoctor(doctor);
    }

    private DoctorDTO convertToDoctorDTO(Doctor doctor) {
        DoctorDTO dto = new DoctorDTO();
        dto.setUserId(doctor.getUser().getUserId());
        dto.setName(doctor.getUser().getName());
        dto.setGender(doctor.getUser().getGender());
        dto.setDob(doctor.getUser().getDob());
        dto.setEmail(doctor.getUser().getEmail());
        dto.setPhone(doctor.getUser().getPhone());
        dto.setSpecification(doctor.getSpecification());
        dto.setExperience(doctor.getExperience());
        dto.setRatingAvg(doctor.getRatingAvg());
        dto.setIsActive(doctor.getUser().getIsActive());
        dto.setAbout(doctor.getAbout());
        dto.setApproach(doctor.getApproach());
        dto.setEducation(doctor.getEducation());
        dto.setCertificates(doctor.getCertificates());
        dto.setWorkExperience(doctor.getWorkExperience());
        return dto;
    }
}