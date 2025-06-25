package hsf302.com.hiemmuon.controller;

import hsf302.com.hiemmuon.dto.ApiResponse;
import hsf302.com.hiemmuon.dto.responseDto.MedicineScheduleDTO;
import hsf302.com.hiemmuon.dto.responseDto.StatusMedicineDTO;
import hsf302.com.hiemmuon.enums.StatusMedicineSchedule;
import hsf302.com.hiemmuon.service.MedicineScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicine")
public class MedicineController {

    @Autowired
    private MedicineScheduleService medicineScheduleService;

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

}
