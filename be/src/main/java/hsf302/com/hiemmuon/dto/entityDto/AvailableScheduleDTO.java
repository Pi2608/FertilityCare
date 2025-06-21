package hsf302.com.hiemmuon.dto.entityDto;

import java.time.LocalDate;
import java.time.LocalTime;

@lombok.Getter
@lombok.Setter
public class AvailableScheduleDTO {
    private int doctorId;
    private String name;
    private String specialization;
    private LocalDate date;
    private LocalTime startTime;
    private boolean status;
}
