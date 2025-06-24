package hsf302.com.hiemmuon.dto.testresult;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class CreateTestResultDTO {
    private int stepId;
    private String name;
    private Float value;
    private String unit;
    private String referenceRange;
    private LocalDate testDate;
    private String note;
}
