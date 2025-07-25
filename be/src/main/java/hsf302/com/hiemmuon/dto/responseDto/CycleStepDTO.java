package hsf302.com.hiemmuon.dto.responseDto;

import com.fasterxml.jackson.annotation.JsonInclude;
import hsf302.com.hiemmuon.enums.StatusCycle;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CycleStepDTO {
    private int stepId;
    private int stepOrder;
    private String serive;
    private String description;
    private LocalDateTime eventdate;
    private StatusCycle statusCycleStep;
    private String note;
    private String failedReason;
    private Boolean isReminded;
    private List<MedicineScheduleDTO> medicineSchedule;
    private List<AppointmentOverviewDTO> appointment;
}