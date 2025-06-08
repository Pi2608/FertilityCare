package hsf302.com.hiemmuon.service;

import hsf302.com.hiemmuon.dto.CreateDoctorDTO;
import hsf302.com.hiemmuon.dto.UpdateDoctorDTO;
import hsf302.com.hiemmuon.entity.Doctor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface DoctorService {

    Doctor getDoctorByDoctorId(int doctorId);

    Doctor createDoctor(CreateDoctorDTO request);

    Doctor saveDoctor(Doctor doctor);

    List<Doctor> findAll();

    Doctor updateDoctor(int id, UpdateDoctorDTO updateDoctorDTO);

    Doctor updateDoctorActive(int id, boolean active);

    List<Doctor> getDoctorBySpecification(String specification);

    List<Doctor> getDoctorByIsActive();
}

