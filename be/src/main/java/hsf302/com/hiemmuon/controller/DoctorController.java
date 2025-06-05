package hsf302.com.hiemmuon.controller;

import hsf302.com.hiemmuon.dto.ApiResponse;
import hsf302.com.hiemmuon.dto.CreateDoctorDTO;
import hsf302.com.hiemmuon.dto.UpdateDoctorDTO;
import hsf302.com.hiemmuon.entity.Doctor;
import hsf302.com.hiemmuon.service.DoctorServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    @Autowired
    private DoctorServiceImpl doctorService;

    @GetMapping
    public List<Doctor> getAllDoctors() {
        return doctorService.findAll();
    }

    @PostMapping
    public ResponseEntity<ApiResponse<?>> createDoctor(@RequestBody CreateDoctorDTO request) {

        Doctor doctor = doctorService.createDoctor(request);

        ApiResponse<Doctor> response = new ApiResponse<>(
                200,
                "Doctor created successfully",
                doctor
        );
        return ResponseEntity.ok(response);
    }


    @PutMapping("/{doctorId}")
    public ResponseEntity<ApiResponse<?>> updateDoctor(
            @PathVariable("doctorId") int id,
            @RequestBody UpdateDoctorDTO updateDoctorDTO) {
        Doctor savedDoctor = doctorService.updateDoctor(id, updateDoctorDTO);

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

        Doctor updatedDoctor = doctorService.updateDoctorActive(doctorId, active);
        String statusText = active ? "activated" : "deactivated";

        ApiResponse<Doctor> response = new ApiResponse<>(
                200,
                "Doctor " + updatedDoctor.getUser().getName() + " has been " + statusText,
                updatedDoctor
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/description")
    public ResponseEntity<ApiResponse<?>> getDoctorBySpecialization(
            @RequestParam("description") String description) {

        List<Doctor> doctors = doctorService.getDoctorByDescription(description);

        ApiResponse<List<Doctor>> response = new ApiResponse<>(
                200,
                "Doctors with specialization " + description + " retrieved successfully",
                doctors
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{doctorId}")
    public ResponseEntity<ApiResponse<?>> getDoctorById(
            @PathVariable("doctorId") int doctorId) {
        Doctor doctor = doctorService.getDoctorByUserId (doctorId);

        ApiResponse<Doctor> response = new ApiResponse<>(
                200,
                "Doctor retrieved successfully",
                doctor
        );
        return ResponseEntity.ok(response);
    }
}