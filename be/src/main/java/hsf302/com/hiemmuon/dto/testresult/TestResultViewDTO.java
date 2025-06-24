package hsf302.com.hiemmuon.dto.testresult;


import lombok.Data;

import java.time.LocalDate;

@Data
public class TestResultViewDTO {
    private String testName;
    private Float value;
    private String unit;
    private String referenceRange;
    private LocalDate testDate;
    private String note;
    private String cycleNote;
    private String stepDescription;

    public TestResultViewDTO(String testName, Float value, String unit, String referenceRange, LocalDate testDate, String note, String cycleNote, String stepDescription) {
        this.testName = testName;
        this.value = value;
        this.unit = unit;
        this.referenceRange = referenceRange;
        this.testDate = testDate;
        this.note = note;
        this.cycleNote = cycleNote;
        this.stepDescription = stepDescription;
    }

    public TestResultViewDTO() {
    }
}


