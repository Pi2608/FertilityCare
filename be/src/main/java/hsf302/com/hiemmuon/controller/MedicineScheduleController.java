package hsf302.com.hiemmuon.controller;

import hsf302.com.hiemmuon.dto.ApiResponse;
import hsf302.com.hiemmuon.dto.createDto.CreateMedicationScheduleDTO;
import hsf302.com.hiemmuon.dto.responseDto.MedicineScheduleDTO;
import hsf302.com.hiemmuon.service.MedicineScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/medicine-schedules")
public class MedicineScheduleController {

    @Autowired
    private MedicineScheduleService medicationScheduleService;

    @PostMapping("/medication-schedule")
    public ResponseEntity<ApiResponse<?>> createMedicationSchedule(
            @RequestBody CreateMedicationScheduleDTO dto) {
        List<MedicineScheduleDTO> scheduleDto = medicationScheduleService.createSchedule(dto);
        ApiResponse<List<MedicineScheduleDTO>> response = new ApiResponse<>(
                201,
                "Create medication schedule successfully",
                scheduleDto
        );
        return ResponseEntity.ok(response);
    }
}
