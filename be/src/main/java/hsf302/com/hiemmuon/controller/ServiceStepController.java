package hsf302.com.hiemmuon.controller;

import hsf302.com.hiemmuon.dto.ApiResponse;
import hsf302.com.hiemmuon.dto.createDto.TreatmentStepDTO;
import hsf302.com.hiemmuon.entity.TreatmentStep;
import hsf302.com.hiemmuon.service.TreatmentServiceService;
import hsf302.com.hiemmuon.service.TreatmentStepService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "9. Service Step Controller")
@RestController
@RequestMapping("/api/service-steps")
public class ServiceStepController {

    @Autowired
    private TreatmentServiceService treatmentServiceService;

    @Autowired
    private TreatmentStepService treatmentStepService;


    @Operation(
            summary = "Lấy tất cả các bước điều trị",
            description = "Truy xuất toàn bộ các bước điều trị liên quan đến một dịch vụ cụ thể."
    )
    @GetMapping("/{serviceId}")
    public ResponseEntity<ApiResponse<?>> getAllStep(
            @PathVariable int serviceId) {

        List<TreatmentStep> steps = treatmentStepService.findAllStepsByServiceId(serviceId);

        ApiResponse<List<TreatmentStep>> response = new ApiResponse<>(
                200,
                "Service steps retrieved successfully",
                steps
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

    @PostMapping("/service/{serviceId}")
    public ResponseEntity<ApiResponse<?>> createStep(@PathVariable Integer serviceId,
                                                     @RequestBody TreatmentStepDTO dto) {
        TreatmentStep step = treatmentStepService.createStep(serviceId, dto);
        ApiResponse<TreatmentStep> response = new ApiResponse<>(
                200,
                "Service step retrieved successfully",
                step
        );
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{stepId}")
    public ResponseEntity<ApiResponse<?>> updateStep(@PathVariable Integer stepId,
                                                     @RequestBody TreatmentStepDTO dto) {
        TreatmentStep step = treatmentStepService.updateStep(stepId, dto);
        ApiResponse<TreatmentStep> response = new ApiResponse<>(
                200,
                "Service step retrieved successfully",
                step
        );
        return ResponseEntity.ok(response);
    }


}
