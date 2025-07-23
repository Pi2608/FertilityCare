package hsf302.com.hiemmuon.dto.createDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateMedicationScheduleDTO {
    private int stepId;
    private String medicineName;
    private LocalTime time;
    private LocalDate startDate;
    private LocalDate endDate;
}

