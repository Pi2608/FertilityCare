package hsf302.com.hiemmuon.dto.testresult;


import java.time.LocalDate;

@lombok.Getter
@lombok.Setter
public class UpdateTestResultDTO {
    private String name;
    private Float value;
    private String unit;
    private String referenceRange;
    private String note;
    private LocalDate testDate;
}
