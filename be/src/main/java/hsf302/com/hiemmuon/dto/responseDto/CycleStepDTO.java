package hsf302.com.hiemmuon.dto.responseDto;

import hsf302.com.hiemmuon.enums.StatusCycle;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CycleStepDTO {

    private int stepOrder;
    private String serive;
    private String description;
    private LocalDate eventdate;
    private StatusCycle statusCycleStep;
    private List<MedicineScheduleDTO> medicineScheduleDTO;
    private String note;
}
