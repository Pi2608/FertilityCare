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
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@Tag(name = "9. Medicine Schedule Controller")
@RestController
@RequestMapping("/api/medicine")
public class MedicineController {

    @Autowired
    private MedicineScheduleService medicineScheduleService;

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
                "Get medicine schedule successfully",
                dto
        );
        return ResponseEntity.ok(response);
    }

    @Operation(
            summary = "Lấy lịch thuốc theo ngày, chu kỳ và bước điều trị",
            description = "Truy xuất lịch uống thuốc vào một ngày cụ thể trong bước điều trị của chu kỳ."
    )
    @GetMapping("/cycles/{cycleId}/steps/{stepOrder}/medicine-schedules/by-date")
    public ResponseEntity<ApiResponse<?>> getSchedulesByDateInCycleStep(
            @PathVariable int cycleId,
            @PathVariable int stepOrder,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
    ) {
        List<MedicineScheduleDTO> schedules = medicineScheduleService
                .getSchedulesByCycleStepAndDate(cycleId, stepOrder, date);

        ApiResponse<List<MedicineScheduleDTO>> response = new ApiResponse<>(
                200,
                "Lấy danh sách thuốc theo ngày trong bước điều trị thành công",
                schedules
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<ApiResponse<?>> getMedicineSchedulesByCustomer(@PathVariable int customerId) {
        List<MedicineScheduleDTO> schedules = medicineScheduleService.getSchedulesByCustomer(customerId);

        ApiResponse<List<MedicineScheduleDTO>> response = new ApiResponse<>(
                200,
                "Lấy lịch uống thuốc của bệnh nhân thành công",
                schedules
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

    @Operation(
            summary = "Cập nhật trạng thái uống thuốc",
            description = "API cho phép cập nhật trạng thái thuốc (đã uống, bỏ liều, uống sai giờ...) và ghi nhận thời điểm sự kiện diễn ra."
    )
    @PatchMapping("/medicine-schedules/{scheduleId}")
    public ResponseEntity<ApiResponse<?>> updateStatus(
            @PathVariable int scheduleId,
            @RequestParam StatusMedicineSchedule status) {
        StatusMedicineDTO dto = medicineScheduleService
                .updateMedicineStatus(scheduleId, status);
        ApiResponse<StatusMedicineDTO> response = new ApiResponse<>(
                200,
                "Update medicine status successfully",
                dto
        );
        return ResponseEntity.ok(response);
    }

    @Scheduled(fixedRate = 60000)
    public void autoUpdateExpired() {
        medicineScheduleService.updateExpiredSchedules();
    }

    @Scheduled(fixedRate = 60 * 1000) // mỗi 1 phút
    public void runReminder() {
        medicineScheduleService.sendReminderEmails();
    }
}