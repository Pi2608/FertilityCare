package hsf302.com.hiemmuon.controller;

import hsf302.com.hiemmuon.dto.ApiResponse;
import hsf302.com.hiemmuon.dto.entityDto.CycleStepDTO;
import hsf302.com.hiemmuon.service.CycleService;
import hsf302.com.hiemmuon.service.CycleStepService;
import hsf302.com.hiemmuon.service.DoctorService;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController("/api/cycle")
public class CycleController {

    @Autowired
    private CycleService cycleService;

    @Autowired
    private DoctorService doctorService;
    @Autowired
    private CycleStepService cycleStepService;

    @GetMapping("/me/cycle/{cycleId}/step")
    public ResponseEntity<ApiResponse<?>> getMyAllCycleStep(
            @PathVariable("cycleId") int cycleId,
            HttpServletRequest request) {
        List<CycleStepDTO> steps = cycleStepService.getAllCycleStepByMe(request, cycleId);

        ApiResponse<List<CycleStepDTO>> response = new ApiResponse<>(
                200,
                "Get my cycle steps successfully",
                steps);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me/cycle/{cycleId}/step/{stepId}")
    public ResponseEntity<ApiResponse<?>> getMyCycleStep(
            HttpServletRequest request,
            @PathVariable("cycleId") int cycleId,
            @PathVariable("stepId") int stepId) {
        CycleStepDTO step = cycleStepService.getCycleStepByMe(request, cycleId, stepId);

        ApiResponse<CycleStepDTO> response = new ApiResponse<>(
                200,
                "Get my cycle step successfully",
                step);

        return ResponseEntity.ok(response);
    }

//    @GetMapping("/customerId/{customerId}/cycle/{cycleId}/step")
}