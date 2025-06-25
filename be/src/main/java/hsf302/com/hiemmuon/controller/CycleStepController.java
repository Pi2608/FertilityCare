package hsf302.com.hiemmuon.controller;

import hsf302.com.hiemmuon.dto.ApiResponse;
import hsf302.com.hiemmuon.dto.createDto.NoteMedicineScheduleDTO;
import hsf302.com.hiemmuon.dto.responseDto.CycleStepDTO;
import hsf302.com.hiemmuon.enums.StatusCycle;
import hsf302.com.hiemmuon.service.CycleStepService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cycle-steps")
public class CycleStepController {

    @Autowired
    private CycleStepService cycleStepService;


    //customer, doctor get list step theo cycleId
    @GetMapping("/cycleId/{cycleId}/step/all")
    public ResponseEntity<ApiResponse<?>> getMyAllCycleStep(
            @PathVariable("cycleId") int cycleId) {
        List<CycleStepDTO> steps = cycleStepService.getAllCycleStep(cycleId);

        ApiResponse<List<CycleStepDTO>> response = new ApiResponse<>(
                200,
                "Get all cycle steps successfully",
                steps);
        return ResponseEntity.ok(response);
    }

    //customer, doctor get step theo cycleId và stepId
    @GetMapping("/cycleId/{cycleId}/step/{stepOrder}")
    public ResponseEntity<ApiResponse<?>> getMyCycleStep(
            @PathVariable("cycleId") int cycleId,
            @PathVariable("stepOrder") int stepOrder) {
        CycleStepDTO step = cycleStepService.getCycleStep(cycleId, stepOrder);

        ApiResponse<CycleStepDTO> response = new ApiResponse<>(
                200,
                "Get cycle step successfully",
                step);

        return ResponseEntity.ok(response);
    }

    //doctor update status step
    @PatchMapping("/cycleId/{cycleId}/step/{stepOrder}/status")
    public ResponseEntity<ApiResponse<?>> updateCycleStepStatus(
            @PathVariable("cycleId") int cycleId,
            @PathVariable("stepOrder") int stepId,
            @RequestParam("status") StatusCycle status) {
        CycleStepDTO updatedStep = cycleStepService.updateCycleStepStatus(cycleId, stepId, status);

        ApiResponse<CycleStepDTO> response = new ApiResponse<>(
                200,
                "Update cycle step status successfully",
                updatedStep);

        return ResponseEntity.ok(response);
    }

    //doctor update note step
    @PatchMapping("cycleId/{cycleId}/step/{stepOrder}/note")
    public ResponseEntity<ApiResponse<?>> updateNote(
            @PathVariable("cycleId") int cycleId,
            @PathVariable("stepOrder") int stepOrder,
            @RequestParam("note") String note) {

        NoteMedicineScheduleDTO noteDto = cycleStepService.updateNote(cycleId, stepOrder, note);

        ApiResponse<NoteMedicineScheduleDTO> response = new ApiResponse<>(
                200,
                "Update note successfully",
                noteDto
        );
        return ResponseEntity.ok(response);
    }
}
