package hsf302.com.hiemmuon.dto.responseDto;

import hsf302.com.hiemmuon.enums.StatusMedicineSchedule;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StatusMedicineDTO {
    private int cycleId;
    private int stepOrder;
    private StatusMedicineSchedule status;
    private LocalDateTime eventDate;
}
