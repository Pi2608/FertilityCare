package hsf302.com.hiemmuon.controller;

import hsf302.com.hiemmuon.dto.ApiResponse;
import hsf302.com.hiemmuon.dto.createDto.CreateDoctorDTO;
import hsf302.com.hiemmuon.dto.entityDto.DoctorDTOForCustomer;
import hsf302.com.hiemmuon.dto.entityDto.DoctorDTOForManager;
import hsf302.com.hiemmuon.dto.updateDto.UpdateDoctorDTO;
import hsf302.com.hiemmuon.entity.Doctor;
import hsf302.com.hiemmuon.service.DoctorService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @GetMapping("/all")
    public List<DoctorDTOForManager> getAllDoctors() {
        return doctorService.getAllDoctor();
    }

    @GetMapping("/id/{doctorId}")
    public ResponseEntity<ApiResponse<?>> getDoctorById(
            @PathVariable("doctorId") int doctorId) {
        DoctorDTOForCustomer doctor = doctorService.getDoctorByDoctorId(doctorId);

        ApiResponse<DoctorDTOForCustomer> response = new ApiResponse<>(
                200,
                "Doctor retrieved successfully",
                doctor
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<ApiResponse<?>> getDoctorByName(
            @PathVariable("name") String name) {
        DoctorDTOForCustomer doctor = doctorService.getDoctorByName(
                name);

        ApiResponse<DoctorDTOForCustomer> response = new ApiResponse<>(
                200,
                "Doctor retrieved successfully",
                doctor
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/active")
    public ResponseEntity<ApiResponse<?>> getDoctorByStatus() {
        List<DoctorDTOForCustomer> doctors = doctorService.getDoctorByIsActive();

        ApiResponse<List<DoctorDTOForCustomer>> response = new ApiResponse<>(
                200,
                "Doctors retrieved successfully",
                doctors
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/specification")
    public ResponseEntity<ApiResponse<?>> getDoctorBySpecialization(
            @RequestParam("specification") String specification) {

        List<DoctorDTOForCustomer> doctors = doctorService.getDoctorBySpecification(specification);

        ApiResponse<List<DoctorDTOForCustomer>> response = new ApiResponse<>(
                200,
                "Doctors with specialization " + specification + " retrieved successfully",
                doctors
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<?>> createDoctor(@RequestBody @Valid CreateDoctorDTO request) {

        Doctor doctor = doctorService.createDoctor(request);

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
        Doctor savedDoctor = doctorService.updateDoctorMe(request, updateDoctorDTO);

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

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<?>> getDoctorByToken(HttpServletRequest request) {
        DoctorDTOForCustomer doctor = doctorService.getDoctorMe(request);

        ApiResponse<DoctorDTOForCustomer> response = new ApiResponse<>(
                200,
                "Doctor retrieved successfully",
                doctor
        );
        return ResponseEntity.ok(response);
    }
}