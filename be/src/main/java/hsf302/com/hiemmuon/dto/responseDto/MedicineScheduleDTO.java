package hsf302.com.hiemmuon.dto.responseDto;

import hsf302.com.hiemmuon.enums.StatusMedicineSchedule;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MedicineScheduleDTO {
    private int scheduleId;
    private int stepOrder;
    private String medicineName;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalDateTime eventDate;
    private StatusMedicineSchedule status;
    private String note;
}
