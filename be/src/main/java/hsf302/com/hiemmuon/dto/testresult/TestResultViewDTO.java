package hsf302.com.hiemmuon.dto.testresult;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TestResultViewDTO {
    private String testName;
    private Float value;
    private String unit;
    private String referenceRange;
    private LocalDate testDate;
    private String note;
    private String cycleNote;
    private String stepDescription;
}


