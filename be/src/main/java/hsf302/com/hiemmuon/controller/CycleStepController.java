package hsf302.com.hiemmuon.controller;

import hsf302.com.hiemmuon.dto.ApiResponse;
import hsf302.com.hiemmuon.dto.responseDto.CycleStepDetailsDTO;
import hsf302.com.hiemmuon.dto.updateDto.CycleStepFailedReason;
import hsf302.com.hiemmuon.dto.updateDto.NoteMedicineScheduleDTO;
import hsf302.com.hiemmuon.dto.responseDto.CycleStepDTO;
import hsf302.com.hiemmuon.enums.StatusCycle;
import hsf302.com.hiemmuon.service.CycleStepService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "8. Cycle Step Controller")
@RestController
@RequestMapping("/api/cycle-steps")
public class CycleStepController {

    @Autowired
    private CycleStepService cycleStepService;

    @Operation(
            summary = "Lấy tất cả các bước điều trị trong chu kỳ",
            description = "API cho phép khách hàng và bác sĩ truy xuất toàn bộ các bước (step) của một chu kỳ điều trị cụ thể."
    )
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

    @Operation(
            summary = "Lấy một bước điều trị cụ thể",
            description = "API giúp truy xuất thông tin chi tiết của một bước điều trị trong chu kỳ dựa trên thứ tự stepOrder."
    )
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

    @Operation(
            summary = "Cập nhật trạng thái bước điều trị",
            description = "Bác sĩ cập nhật trạng thái (đang thực hiện, hoàn thành...) của một bước điều trị cụ thể trong chu kỳ."
    )
    @PatchMapping("/cycleId/{cycleId}/step/{stepOrder}/status")
    public ResponseEntity<ApiResponse<?>> updateCycleStepStatus(
            @PathVariable("cycleId") int cycleId,
            @PathVariable("stepOrder") int stepId,
            @RequestParam("status") StatusCycle status,
            @RequestParam("reason") String reason) {
        CycleStepDTO updatedStep = cycleStepService.updateCycleStepStatus(cycleId, stepId, status, reason);

        ApiResponse<CycleStepDTO> response = new ApiResponse<>(
                200,
                "Update cycle step status successfully",
                updatedStep);

        return ResponseEntity.ok(response);
    }

    @Operation(
            summary = "Cập nhật ghi chú cho bước điều trị",
            description = "Bác sĩ ghi chú thêm vào bước điều trị để theo dõi và hướng dẫn bệnh nhân chi tiết hơn."
    )
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

    @Operation(
            summary = "lay note, medician, test theo cyclestep_id",
            description = "....."
    )
    @GetMapping("/{cycleStepId}/details(note,test,medician)")
    public ResponseEntity<CycleStepDetailsDTO> getCycleStepDetails(@PathVariable int cycleStepId) {
        CycleStepDetailsDTO details = cycleStepService.getCycleStepDetails(cycleStepId);
        return ResponseEntity.ok(details);
    }

    @Scheduled(fixedRate = 60 * 1000) // mỗi 1 phút
    public void runReminder() {
        cycleStepService.sendCycleStepReminders();
    }
}