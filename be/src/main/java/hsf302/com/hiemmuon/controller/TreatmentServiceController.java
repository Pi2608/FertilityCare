package hsf302.com.hiemmuon.controller;

import hsf302.com.hiemmuon.dto.ApiResponse;
import hsf302.com.hiemmuon.dto.createDto.CreateTreatmentServiceDTO;
import hsf302.com.hiemmuon.dto.responseDto.TreatmentStepDTO;
import hsf302.com.hiemmuon.dto.updateDto.UpdateServiceDTO;
import hsf302.com.hiemmuon.entity.TreatmentService;
import hsf302.com.hiemmuon.entity.TreatmentStep;
import hsf302.com.hiemmuon.service.TreatmentServiceService;
import hsf302.com.hiemmuon.service.TreatmentStepService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "4. Service Controller")
@RestController
@RequestMapping("/api/treatment-services")
public class TreatmentServiceController {

    @Autowired
    private TreatmentServiceService treatmentServiceServicee;

    @Autowired
    private TreatmentStepService treatmentStepService;

    @Operation(
            summary = "Lấy tất cả dịch vụ điều trị",
            description = "Trả về danh sách các dịch vụ hỗ trợ sinh sản như IUI, IVF, xét nghiệm nội tiết, v.v."
    )
    @GetMapping("/all")
    public List<TreatmentService> getTreatmentServices() {
        return treatmentServiceServicee.findAll();
    }

    @Operation(
            summary = "Lấy dịch vụ theo ID",
            description = "Truy xuất thông tin chi tiết của một dịch vụ điều trị dựa theo mã định danh."
    )
    @GetMapping("/id/{id}")
    public ResponseEntity<ApiResponse<?>> getServiceById(
            @PathVariable("id") int id) {
        TreatmentService doctor = treatmentServiceServicee.getServiceById(id);

        ApiResponse<TreatmentService> response = new ApiResponse<>(
                200,
                "Service retrieved successfully",
                doctor
        );
        return ResponseEntity.ok(response);
    }

    @Operation(
            summary = "Tìm dịch vụ theo tên",
            description = "Tìm kiếm một dịch vụ điều trị theo tên cụ thể."
    )
    @GetMapping("/name/{name}")
    public ResponseEntity<ApiResponse<?>> getServiceByName(
            @PathVariable("name") String name) {
        TreatmentService doctor = treatmentServiceServicee.getServiceByName(name);

        ApiResponse<TreatmentService> response = new ApiResponse<>(
                200,
                "Service retrieved successfully",
                doctor
        );
        return ResponseEntity.ok(response);
    }

    @Operation(
            summary = "Lọc các dịch vụ đang hoạt động",
            description = "Trả về các dịch vụ đang được kích hoạt và có thể sử dụng."
    )
    @GetMapping("/active")
    public ResponseEntity<ApiResponse<?>> getServiceByStatus() {
        List<TreatmentService> services = treatmentServiceServicee.getServiceByStatus();

        ApiResponse<List<TreatmentService>> response = new ApiResponse<List<TreatmentService>>(
                200,
                "Services retrieved successfully",
                services
        );
        return ResponseEntity.ok(response);
    }

    @Operation(
            summary = "Tạo mới dịch vụ điều trị",
            description = "Thêm mới một dịch vụ hỗ trợ sinh sản vào hệ thống (IUI, IVF, xét nghiệm...)."
    )
    @PostMapping()
    public ResponseEntity<ApiResponse<TreatmentService>> createTreatmentService(@RequestBody @Valid CreateTreatmentServiceDTO treatmentServiceDTO) {
        TreatmentService service = treatmentServiceServicee.createTreatmentService(treatmentServiceDTO);

        ApiResponse<TreatmentService> response = new ApiResponse<>(
                200,
                "Treatment service created successfully",
                service);
        return ResponseEntity.ok(response);
    }

    @Operation(
            summary = "Cập nhật dịch vụ điều trị",
            description = "Cập nhật giá tiền, mô tả... cho một dịch vụ đã tồn tại."
    )
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> updateService(
            @PathVariable("id") int id,
            @RequestBody UpdateServiceDTO updateServiceDTO) {
        TreatmentService service = treatmentServiceServicee.updateTreatmentService(id, updateServiceDTO);

        ApiResponse<TreatmentService> response = new ApiResponse<>(
                200,
                "Service updated successfully",
                service
        );
        return ResponseEntity.ok(response);
    }

    @Operation(
            summary = "Cập nhật trạng thái dịch vụ",
            description = "Cho phép bật/tắt trạng thái hoạt động của dịch vụ điều trị. Chỉ dành cho admin."
    )
    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<?>> updateServiceStatus(
            @PathVariable("id") int id,
            @RequestParam("active") boolean active) {

        TreatmentService service = treatmentServiceServicee.updateServiceActive(id, active);
        String statusText = active ? "activated" : "deactivated";

        ApiResponse<TreatmentService> response = new ApiResponse<>(
                200,
                "Service " + service.getName() + " has been " + statusText,
                service
        );
        return ResponseEntity.ok(response);
    }

    @Operation(
            summary = "Lấy bước điều trị theo thứ tự",
            description = "Truy xuất một bước điều trị cụ thể theo thứ tự stepOrder trong dịch vụ đã chọn."
    )
    @GetMapping("/{serviceId}/step-order/{stepOrder}")
    public ResponseEntity<ApiResponse<?>> getStepByServiceAndStepOrder(
            @PathVariable int serviceId,
            @PathVariable int stepOrder) {

        TreatmentStep step = treatmentStepService.getStepByServiceAndStepOrder(serviceId, stepOrder);

        ApiResponse<TreatmentStep> response = new ApiResponse<>(
                200,
                "Service step retrieved successfully",
                step
        );
        return ResponseEntity.ok(response);
    }

    @Operation(
            summary = "Lấy tất cả các bước điều trị",
            description = "Truy xuất toàn bộ các bước điều trị liên quan đến một dịch vụ cụ thể."
    )
    @GetMapping("/{serviceId}/steps/all")
    public ResponseEntity<ApiResponse<?>> getAllStep(
            @PathVariable int serviceId) {

        List<TreatmentStepDTO> steps = treatmentStepService.findAllStepsByServiceId(serviceId);

        ApiResponse<List<TreatmentStepDTO>> response = new ApiResponse<>(
                200,
                "Service steps retrieved successfully",
                steps
        );
        return ResponseEntity.ok(response);
    }
}