package hsf302.com.hiemmuon.dto.testresult;

import hsf302.com.hiemmuon.entity.Appointment;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class CreateTestResultDTO {
    private int appointmentId;
    private String name;
    private Float value;
    private String unit;
    private String referenceRange;
    private LocalDate testDate;
    private String note;
}
