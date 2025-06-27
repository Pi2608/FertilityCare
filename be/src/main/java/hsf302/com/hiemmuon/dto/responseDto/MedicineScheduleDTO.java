package hsf302.com.hiemmuon.dto.responseDto;

import hsf302.com.hiemmuon.enums.StatusMedicineSchedule;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MedicineScheduleDTO {
    private int scheduleId;
    private int stepOrder;
    private String medicineName;
    private String Discription;
    private String dose;
    private String frequency;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalDateTime eventDate;
    private StatusMedicineSchedule status;
    private String note;
}