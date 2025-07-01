package hsf302.com.hiemmuon.dto.testresult;

import lombok.*;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateTestResultDTO {
    private int appointmentId;
    private String name;
    private Float value;
    private String unit;
    private String referenceRange;
    private LocalDate testDate;
    private String note;
    private int cycleStepId;
}