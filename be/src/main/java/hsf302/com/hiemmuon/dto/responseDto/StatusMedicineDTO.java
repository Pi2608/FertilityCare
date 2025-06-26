package hsf302.com.hiemmuon.dto.responseDto;

import hsf302.com.hiemmuon.enums.StatusMedicineSchedule;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StatusMedicineDTO {
    private int cycleId;
    private int stepOrder;
    private StatusMedicineSchedule status;
    private LocalDateTime eventDate;
}