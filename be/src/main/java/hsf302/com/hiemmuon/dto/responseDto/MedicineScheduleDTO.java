package hsf302.com.hiemmuon.dto.responseDto;

import hsf302.com.hiemmuon.enums.StatusMedicineSchedule;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MedicineScheduleDTO {
    private int scheduleId;
    private int stepOrder;
    private String medicineName;
    private LocalTime time;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalDateTime eventDate;
    private StatusMedicineSchedule status;
    private String note;
    private Boolean isReminded;
}