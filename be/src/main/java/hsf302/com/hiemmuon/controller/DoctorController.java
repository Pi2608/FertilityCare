package hsf302.com.hiemmuon.controller;

import hsf302.com.hiemmuon.dto.ApiResponse;
import hsf302.com.hiemmuon.dto.CreateDoctorDTO;
import hsf302.com.hiemmuon.dto.UpdateDoctorDTO;
import hsf302.com.hiemmuon.entity.Doctor;
import hsf302.com.hiemmuon.service.DoctorService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    @Autowired
    private DoctorService doctorServiceImpl;

    @GetMapping("/all")
    public List<Doctor> getAllDoctors() {
        return doctorServiceImpl.findAll();
    }

    @PostMapping
    public ResponseEntity<ApiResponse<?>> createDoctor(@RequestBody @Valid CreateDoctorDTO request) {

        Doctor doctor = doctorServiceImpl.createDoctor(request);

        ApiResponse<Doctor> response = new ApiResponse<>(
                200,
                "Doctor created successfully",
                doctor
        );
        return ResponseEntity.ok(response);
    }

    @PutMapping("/me")
    public ResponseEntity<ApiResponse<?>> updateDoctor(
            HttpServletRequest request,
            @RequestBody UpdateDoctorDTO updateDoctorDTO) {
        Doctor savedDoctor = doctorServiceImpl.updateDoctor(request, updateDoctorDTO);

        ApiResponse<Doctor> response = new ApiResponse<>(
                200,
                "Doctor updated successfully",
                savedDoctor
        );
        return ResponseEntity.ok(response);

    }

    @PatchMapping("/{doctorId}/status")
    public ResponseEntity<ApiResponse<?>> updateDoctorStatus(
            @PathVariable("doctorId") int doctorId,
            @RequestParam("active") boolean active) {

        Doctor updatedDoctor = doctorServiceImpl.updateDoctorActive(doctorId, active);
        String statusText = active ? "activated" : "deactivated";

        ApiResponse<Doctor> response = new ApiResponse<>(
                200,
                "Doctor " + updatedDoctor.getUser().getName() + " has been " + statusText,
                updatedDoctor
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/specification")
    public ResponseEntity<ApiResponse<?>> getDoctorBySpecialization(
            @RequestParam("specification") String specification) {

        List<Doctor> doctors = doctorServiceImpl.getDoctorBySpecification(specification);

        ApiResponse<List<Doctor>> response = new ApiResponse<>(
                200,
                "Doctors with specialization " + specification + " retrieved successfully",
                doctors
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{doctorId}")
    public ResponseEntity<ApiResponse<?>> getDoctorById(
            @PathVariable("doctorId") int doctorId) {
        Doctor doctor = doctorServiceImpl.getDoctorByDoctorId(doctorId);

        ApiResponse<Doctor> response = new ApiResponse<>(
                200,
                "Doctor retrieved successfully",
                doctor
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/active")
    public ResponseEntity<ApiResponse<?>> getDoctorByStatus() {
        List<Doctor> doctors = doctorServiceImpl.getDoctorByIsActive();

        ApiResponse<List<Doctor>> response = new ApiResponse<>(
                200,
                "Doctors retrieved successfully",
                doctors
        );
        return ResponseEntity.ok(response);
    }
}