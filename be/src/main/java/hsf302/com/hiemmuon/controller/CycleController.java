package hsf302.com.hiemmuon.controller;

import hsf302.com.hiemmuon.dto.ApiResponse;
import hsf302.com.hiemmuon.dto.createDto.CreateCycleDTO;
import hsf302.com.hiemmuon.dto.responseDto.CycleNoteDTO;
import hsf302.com.hiemmuon.dto.responseDto.CycleOfCustomerDTO;
import hsf302.com.hiemmuon.dto.responseDto.CycleOfDoctorDTO;
import hsf302.com.hiemmuon.dto.responseDto.CycleStepDTO;
import hsf302.com.hiemmuon.entity.Cycle;
import hsf302.com.hiemmuon.service.CycleService;
import hsf302.com.hiemmuon.service.CycleStepService;
import jakarta.servlet.http.HttpServletRequest;
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
            HttpServletRequest request) {
        List<CycleOfDoctorDTO> steps = cycleService.getCycleOfDoctor(request);

        ApiResponse<List<CycleOfDoctorDTO>> response = new ApiResponse<>(
                200,
                "Get all cycle of doctor successfully",
                steps);

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

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<?>> createCycle(
            @RequestBody CreateCycleDTO dto,
            HttpServletRequest request) {

        Cycle cycle = cycleService.createCycle(dto, request);

        ApiResponse<Cycle> response = new ApiResponse<>(
                201,
                "Cycle created successfully",
                cycle);
        return ResponseEntity.ok(response);

    }
}