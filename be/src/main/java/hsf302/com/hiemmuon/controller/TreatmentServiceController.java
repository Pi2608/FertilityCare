package hsf302.com.hiemmuon.controller;

import hsf302.com.hiemmuon.dto.ApiResponse;
import hsf302.com.hiemmuon.dto.CreateTreatmentServiceDTO;
import hsf302.com.hiemmuon.entity.TreatmentService;
import hsf302.com.hiemmuon.service.TreatmentServiceService;
import jakarta.validation.Valid;
import org.apache.coyote.Response;
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

    @PostMapping("/")
    public ResponseEntity<ApiResponse<TreatmentService>> createTreatmentService(@RequestBody @Valid CreateTreatmentServiceDTO treatmentServiceDTO) {
        TreatmentService service = treatmentServiceServicee.createTreatmentService(treatmentServiceDTO);

        ApiResponse<TreatmentService> response = new ApiResponse<>(
                200,
                "Treatment service created successfully",
                service);
        return ResponseEntity.ok(response);
    }
}
