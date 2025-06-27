package hsf302.com.hiemmuon.dto.responseDto;

import hsf302.com.hiemmuon.enums.StatusCycle;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CycleStepDTO {
    private int stepOrder;
    private String serive;
    private String description;
    private LocalDate eventdate;
    private StatusCycle statusCycleStep;
    private String note;
    private List<MedicineScheduleDTO> medicineSchedule;
    private List<AppointmentOverviewDTO> appointment;
}