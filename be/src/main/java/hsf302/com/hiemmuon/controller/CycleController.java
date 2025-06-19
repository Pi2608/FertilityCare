package hsf302.com.hiemmuon.controller;

import hsf302.com.hiemmuon.dto.ApiResponse;
import hsf302.com.hiemmuon.dto.entityDto.CycleNoteDTO;
import hsf302.com.hiemmuon.dto.entityDto.CycleOfCustomerDTO;
import hsf302.com.hiemmuon.dto.entityDto.CycleOfDoctorDTO;
import hsf302.com.hiemmuon.dto.entityDto.CycleStepDTO;
import hsf302.com.hiemmuon.enums.StatusCycle;
import hsf302.com.hiemmuon.service.CycleService;
import hsf302.com.hiemmuon.service.CycleStepService;
import hsf302.com.hiemmuon.service.DoctorService;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/cycles")
public class CycleController {

    @Autowired
    private CycleService cycleService;

    @Autowired
    private CycleStepService cycleStepService;

    //customer get list cycle của mình
    @GetMapping("/meC/cycle/all")
    public ResponseEntity<ApiResponse<?>> getMyAllCycle(HttpServletRequest request) {
        List<CycleOfCustomerDTO> cycles = cycleService.getAllCycleOfCustomer(request);

        ApiResponse<List<CycleOfCustomerDTO>> response = new ApiResponse<>(
                200,
                "Get all cycles of customer successfully",
                cycles);
        return ResponseEntity.ok(response);
    }

    //doctor lấy list cycle của mình
    @GetMapping("/meD/cycle/all")
    public ResponseEntity<ApiResponse<?>> getCustomerCycleStep(
            HttpServletRequest request){
        List<CycleOfDoctorDTO> steps = cycleService.getCycleOfDoctor(request);

        ApiResponse<List<CycleOfDoctorDTO>> response = new ApiResponse<>(
                200,
                "Get all cycle of doctor successfully",
                steps);

        return ResponseEntity.ok(response);
    }

    //customer, doctor get list step theo cycleId
    @GetMapping("/cycleId/{cycleId}/step/all")
    public ResponseEntity<ApiResponse<?>> getMyAllCycleStep(
            @PathVariable("cycleId") int cycleId) {
        List<CycleStepDTO> steps = cycleStepService.getAllCycleStepByMe(cycleId);

        ApiResponse<List<CycleStepDTO>> response = new ApiResponse<>(
                200,
                "Get all cycle steps successfully",
                steps);
        return ResponseEntity.ok(response);
    }

    //customer, doctor get step theo cycleId và stepId
    @GetMapping("/cycleId/{cycleId}/stepId/{stepId}")
    public ResponseEntity<ApiResponse<?>> getMyCycleStep(
            @PathVariable("cycleId") int cycleId,
            @PathVariable("stepId") int stepId) {
        CycleStepDTO step = cycleStepService.getCycleStepByMe(cycleId, stepId);

        ApiResponse<CycleStepDTO> response = new ApiResponse<>(
                200,
                "Get cycle step successfully",
                step);

        return ResponseEntity.ok(response);
    }

    //doctor update status step
    @PatchMapping("/cycleId/{cycleId}/stepId/{stepId}/status")
    public ResponseEntity<ApiResponse<?>> updateCycleStepStatus(
            @PathVariable("cycleId") int cycleId,
            @PathVariable("stepId") int stepId,
            @RequestParam("status") StatusCycle status) {
        CycleStepDTO updatedStep = cycleStepService.updateCycleStepStatus(cycleId, stepId, status);

        ApiResponse<CycleStepDTO> response = new ApiResponse<>(
                200,
                "Update cycle step status successfully",
                updatedStep);

        return ResponseEntity.ok(response);
    }

    //doctor update status note
    @PatchMapping("/cycleId/{cycleId}/note")
    public ResponseEntity<ApiResponse<?>> updateCycleNote(
            @PathVariable("cycleId") int cycleId,
            @RequestParam("note") String note) {
        CycleNoteDTO updatedCycleNote = cycleService.updateCycleNote(cycleId, note);

        ApiResponse<CycleNoteDTO> response = new ApiResponse<>(
                200,
                "Update cycle note successfully",
                updatedCycleNote);

        return ResponseEntity.ok(response);
    }
}