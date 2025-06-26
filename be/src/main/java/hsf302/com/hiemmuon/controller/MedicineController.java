package hsf302.com.hiemmuon.controller;

import hsf302.com.hiemmuon.dto.ApiResponse;
import hsf302.com.hiemmuon.dto.createDto.CreateMedicationScheduleDTO;
import hsf302.com.hiemmuon.dto.responseDto.MedicineScheduleDTO;
import hsf302.com.hiemmuon.dto.responseDto.StatusMedicineDTO;
import hsf302.com.hiemmuon.enums.StatusMedicineSchedule;
import hsf302.com.hiemmuon.service.MedicineScheduleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "9. Medicine Schedule Controller")
@RestController
@RequestMapping("/api/medicine")
public class MedicineController {

    @Autowired
    private MedicineScheduleService medicineScheduleService;

    @Operation(
            summary = "Cập nhật trạng thái uống thuốc",
            description = "API cho phép cập nhật trạng thái thuốc (đã uống, bỏ liều, uống sai giờ...) và ghi nhận thời điểm sự kiện diễn ra."
    )
    @PatchMapping("/cycle/{cycleId}/step/{stepOrder}/order/{orderInStep}")
    public ResponseEntity<ApiResponse<?>> updateStatus(
            @PathVariable int cycleId,
            @PathVariable int stepOrder,
            @RequestParam StatusMedicineSchedule status,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) String eventDate
    ) {
        StatusMedicineDTO dto = medicineScheduleService
                .updateMedicineStatus(cycleId, stepOrder, status, eventDate);
        ApiResponse<StatusMedicineDTO> response = new ApiResponse<>(
                200,
                "Update medicine status successfully",
                dto
        );
        return ResponseEntity.ok(response);
    }

    @Operation(
            summary = "Lấy lịch uống thuốc theo chu kỳ và bước điều trị",
            description = "Truy xuất toàn bộ lịch uống thuốc trong một bước cụ thể của chu kỳ điều trị."
    )
    @GetMapping("/cycles/{cycleId}/steps/{stepOrder}/medicine-schedules")
    public ResponseEntity<ApiResponse<?>> getMedicineSchedulesByCycleStep(
            @PathVariable int cycleId,
            @PathVariable int stepOrder
    ) {
        List<MedicineScheduleDTO> dto = medicineScheduleService
                .getMedicineSchedulesByCycleAndStep(cycleId, stepOrder);

        ApiResponse<List<MedicineScheduleDTO>> response = new ApiResponse<>(
                200,
                "Update medicine status successfully",
                dto
        );
        return ResponseEntity.ok(response);
    }

    @Operation(
            summary = "Tạo lịch uống thuốc",
            description = "API tạo mới lịch uống thuốc cho bệnh nhân dựa trên phác đồ điều trị. Dành cho bác sĩ hoặc hệ thống tự động."
    )
    @PostMapping("/medication-schedule")
    public ResponseEntity<ApiResponse<?>> createMedicationSchedule(
            @RequestBody CreateMedicationScheduleDTO dto) {
        List<MedicineScheduleDTO> scheduleDto = medicineScheduleService.createSchedule(dto);
        ApiResponse<List<MedicineScheduleDTO>> response = new ApiResponse<>(
                201,
                "Create medication schedule successfully",
                scheduleDto
        );
        return ResponseEntity.ok(response);
    }
}