package hsf302.com.hiemmuon.dto.entityDto;

import hsf302.com.hiemmuon.entity.CycleStep;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CycleStepDTO {
    private String serive;
    private String description;
    private LocalDate eventdate;
    private CycleStep.Status statusCycleStep;
}
