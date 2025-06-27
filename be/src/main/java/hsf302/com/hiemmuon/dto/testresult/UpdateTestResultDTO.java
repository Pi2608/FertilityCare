package hsf302.com.hiemmuon.dto.testresult;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateTestResultDTO {
    private String name;
    private Float value;
    private String unit;
    private String referenceRange;
    private String note;
    private LocalDate testDate;
}