package hsf302.com.hiemmuon.dto.responseDto;

import com.fasterxml.jackson.annotation.JsonInclude;
import hsf302.com.hiemmuon.enums.StatusCycle;
import lombok.*;

import java.time.LocalDate;
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
    private String service;
    private String description;
    private LocalDate startDate;
    private LocalDateTime eventDate;
    private StatusCycle statusCycleStep;
    private String note;
    private String failedReason;
    private Boolean isReminded;
    private List<MedicineScheduleDTO> medicineSchedule;
    private List<AppointmentOverviewDTO> appointment;
}