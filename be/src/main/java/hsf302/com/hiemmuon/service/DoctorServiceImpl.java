package hsf302.com.hiemmuon.service;

import hsf302.com.hiemmuon.dto.CreateDoctorDTO;
import hsf302.com.hiemmuon.dto.UpdateDoctorDTO;
import hsf302.com.hiemmuon.entity.Doctor;
import hsf302.com.hiemmuon.entity.User;
import hsf302.com.hiemmuon.repository.DoctorRepository;
import hsf302.com.hiemmuon.repository.RoleRepository;
import hsf302.com.hiemmuon.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class DoctorServiceImpl implements DoctorService {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Doctor getDoctorByDoctorId(int id) {
        Doctor doctor = doctorRepository.findByDoctorId(id);
        if (doctor == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Thís User Id is not Doctor!");
        }
        return doctor;
    }

    @Override
    public Doctor saveDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    @Override
    public List<Doctor> findAll() {
        return doctorRepository.findAll();
    }

    @Override
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

    @Override
    public Doctor updateDoctor(int id, UpdateDoctorDTO updateDoctorDTO) {
        Doctor existingDoctor = getDoctorByDoctorId(id);

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

    @Override
    public Doctor updateDoctorActive(int id, boolean active) {
        Doctor doctor = getDoctorByDoctorId(id);
        doctor.setIsActive(active);
        return saveDoctor(doctor);
    }

    @Override
    public List<Doctor> getDoctorBySpecification(String specification) {
        return doctorRepository.findBySpecification(specification);
    }

    @Override
    public List<Doctor> getDoctorByIsActive() {
        return doctorRepository.findByIsActive(true);
    }
}
