package hsf302.com.hiemmuon.dto.createDto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CreateAppointmentDTO {
    private int doctorId;
    private LocalDateTime date;
    private String note;
}
