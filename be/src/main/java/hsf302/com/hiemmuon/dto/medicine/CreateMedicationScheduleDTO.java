package hsf302.com.hiemmuon.dto.medicine;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateMedicationScheduleDTO {
    private int medicineId;
    private int cycleId;
    private int stepId;
    private LocalDate startDate;
    private LocalDate endDate;
}

