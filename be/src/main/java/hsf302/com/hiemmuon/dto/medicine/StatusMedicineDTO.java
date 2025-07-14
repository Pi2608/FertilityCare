package hsf302.com.hiemmuon.dto.medicine;

import hsf302.com.hiemmuon.enums.StatusMedicineSchedule;
import lombok.*;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StatusMedicineDTO {
    private StatusMedicineSchedule status;
    private LocalDateTime eventDate;
    private LocalTime time;
}