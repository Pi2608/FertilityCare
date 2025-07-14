package hsf302.com.hiemmuon.controller;

import hsf302.com.hiemmuon.dto.common.ApiResponse;
import hsf302.com.hiemmuon.dto.doctor.CreateDoctorDTO;
import hsf302.com.hiemmuon.dto.doctor.DoctorDTO;
import hsf302.com.hiemmuon.dto.doctor.UpdateDoctorDTO;
import hsf302.com.hiemmuon.entity.Doctor;
import hsf302.com.hiemmuon.service.DoctorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "3. Doctor Controller")
@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @Operation(
            summary = "Lấy danh sách tất cả bác sĩ",
            description = "API cho phép truy xuất toàn bộ danh sách bác sĩ có trong hệ thống."
    )
    @GetMapping("/all")
    public List<DoctorDTO> getAllDoctors() {
        return doctorService.getAllDoctor();
    }

    @Operation(
            summary = "Lấy thông tin bác sĩ theo ID",
            description = "Truy xuất thông tin chi tiết của một bác sĩ dựa theo mã định danh."
    )
    @GetMapping("/id/{doctorId}")
    public ResponseEntity<ApiResponse<?>> getDoctorById(
            @PathVariable("doctorId") int doctorId) {
        DoctorDTO doctor = doctorService.getDoctorByDoctorId(doctorId);

        ApiResponse<DoctorDTO> response = new ApiResponse<>(
                200,
                "Doctor retrieved successfully",
                doctor
        );
        return ResponseEntity.ok(response);
    }

    @Operation(
            summary = "Tìm bác sĩ theo tên",
            description = "Tìm kiếm một bác sĩ dựa theo tên được cung cấp."
    )
    @GetMapping("/name/{name}")
    public ResponseEntity<ApiResponse<?>> getDoctorByName(
            @PathVariable("name") String name) {
        DoctorDTO doctor = doctorService.getDoctorByName(
                name);

        ApiResponse<DoctorDTO> response = new ApiResponse<>(
                200,
                "Doctor retrieved successfully",
                doctor
        );
        return ResponseEntity.ok(response);
    }

    @Operation(
            summary = "Lấy danh sách bác sĩ đang hoạt động",
            description = "API trả về danh sách các bác sĩ đang có trạng thái hoạt động (isActive = true)."
    )
    @GetMapping("/active")
    public ResponseEntity<ApiResponse<?>> getDoctorByStatus() {
        List<DoctorDTO> doctors = doctorService.getDoctorByIsActive();

        ApiResponse<List<DoctorDTO>> response = new ApiResponse<>(
                200,
                "Doctors retrieved successfully",
                doctors
        );
        return ResponseEntity.ok(response);
    }

    @Operation(
            summary = "Tạo tài khoản bác sĩ mới",
            description = "Admin sử dụng API này để tạo mới tài khoản bác sĩ với các thông tin chuyên môn."
    )
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

    @Operation(
            summary = "Cập nhật thông tin cá nhân bác sĩ",
            description = "Bác sĩ sử dụng API này để chỉnh sửa thông tin cá nhân của chính mình."
    )
    @PutMapping("/me")
    public ResponseEntity<ApiResponse<?>> updateDoctor(
            HttpServletRequest request,
            @RequestBody UpdateDoctorDTO updateDoctorDTO) {
        DoctorDTO savedDoctor = doctorService.updateDoctorMe(request, updateDoctorDTO);

        ApiResponse<DoctorDTO> response = new ApiResponse<>(
                200,
                "Doctor updated successfully",
                savedDoctor
        );
        return ResponseEntity.ok(response);

    }

    @Operation(
            summary = "Cập nhật trạng thái tài khoản bác sĩ",
            description = "Cho phép bật/tắt trạng thái hoạt động của tài khoản bác sĩ (chỉ dành cho admin)."
    )
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

    @Operation(
            summary = "Lấy thông tin bác sĩ đang đăng nhập",
            description = "Trả về thông tin chi tiết của bác sĩ đang đăng nhập dựa trên JWT token."
    )
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<?>> getDoctorByToken(HttpServletRequest request) {
        DoctorDTO doctor = doctorService.getDoctorMe(request);

        ApiResponse<DoctorDTO> response = new ApiResponse<>(
                200,
                "Doctor retrieved successfully",
                doctor
        );
        return ResponseEntity.ok(response);
    }
}