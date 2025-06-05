package hsf302.com.hiemmuon.controller;

import hsf302.com.hiemmuon.dto.ApiResponse;
import hsf302.com.hiemmuon.dto.CreateDoctorDTO;
import hsf302.com.hiemmuon.dto.UpdateDoctorDTO;
import hsf302.com.hiemmuon.entity.Doctor;
import hsf302.com.hiemmuon.service.DoctorServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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

//    @PostMapping
//    public ResponseEntity<ApiResponse<?>> createDoctor(@RequestBody CreateDoctorDTO request) {
//        try {
//            doctorService.createDoctor(request);
//        } catch (Exception e) {
//            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
//        }
//    }

    @PutMapping("/{doctorId}")
    public ResponseEntity<ApiResponse<?>> updateDoctor(
            @PathVariable("doctorId") int id,
            @RequestBody UpdateDoctorDTO updateDoctorDTO) {
        try {
            Doctor savedDoctor = doctorService.updateDoctor(id, updateDoctorDTO);

            ApiResponse<Doctor> response = new ApiResponse<>(
                    200,
                    "Doctor updated successfully",
                    savedDoctor
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {

            ApiResponse<?> errResponse = new ApiResponse<>(
                    400,
                    "Error: " + e.getMessage(),
                    e.getMessage()
            );
            return ResponseEntity.badRequest().body(errResponse);
        }
    }

    @PatchMapping("/{doctorId}/status")
    public ResponseEntity<ApiResponse<?>> updateDoctorStatus(
            @PathVariable("doctorId") int doctorId,
            @RequestParam("active") boolean active) {
        try {
            Doctor updatedDoctor = doctorService.updateDoctorActive(doctorId, active);
            String statusText = active ? "activated" : "deactivated";

            ApiResponse<Doctor> response = new ApiResponse<>(
                    200,
                    "Doctor " + updatedDoctor.getUser().getName() + " has been " + statusText,
                    updatedDoctor
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            ApiResponse<?> errorResponse = new ApiResponse<>(
                    400,
                    "Error: " + e.getMessage(),
                    e.getMessage()
            );
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
}
