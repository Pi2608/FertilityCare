package hsf302.com.hiemmuon.dto.cycle;

import com.fasterxml.jackson.annotation.JsonInclude;
import hsf302.com.hiemmuon.dto.appointment.AppointmentOverviewDTO;
import hsf302.com.hiemmuon.dto.medicine.MedicineScheduleDTO;
import hsf302.com.hiemmuon.enums.StatusCycle;
import lombok.*;

import java.time.LocalDate;
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
    private LocalDate eventdate;
    private StatusCycle statusCycleStep;
    private String note;
    private List<MedicineScheduleDTO> medicineSchedule;
    private List<AppointmentOverviewDTO> appointment;
}