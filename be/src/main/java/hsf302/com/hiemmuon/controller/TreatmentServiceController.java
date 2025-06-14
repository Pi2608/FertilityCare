package hsf302.com.hiemmuon.controller;

import hsf302.com.hiemmuon.dto.ApiResponse;
import hsf302.com.hiemmuon.dto.createDto.CreateTreatmentServiceDTO;
import hsf302.com.hiemmuon.dto.updateDto.UpdateServiceDTO;
import hsf302.com.hiemmuon.entity.TreatmentService;
import hsf302.com.hiemmuon.service.TreatmentServiceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/treatment-services")
public class TreatmentServiceController {

    @Autowired
    private TreatmentServiceService treatmentServiceServicee;

    @GetMapping("/all")
    public List<TreatmentService> getTreatmentServices() {
        return treatmentServiceServicee.findAll();
    }

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


    @PostMapping()
    public ResponseEntity<ApiResponse<TreatmentService>> createTreatmentService(@RequestBody @Valid CreateTreatmentServiceDTO treatmentServiceDTO) {
        TreatmentService service = treatmentServiceServicee.createTreatmentService(treatmentServiceDTO);

        ApiResponse<TreatmentService> response = new ApiResponse<>(
                200,
                "Treatment service created successfully",
                service);
        return ResponseEntity.ok(response);
    }

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
}
