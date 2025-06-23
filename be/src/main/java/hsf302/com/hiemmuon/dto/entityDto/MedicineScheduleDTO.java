package hsf302.com.hiemmuon.dto.entityDto;

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
public class MedicineScheduleDTO {
    private int medicationId;
    private List<MedicineDTO> medicine;
    private LocalDate startdate;
    private LocalDate enddate;
    private String note;
}
