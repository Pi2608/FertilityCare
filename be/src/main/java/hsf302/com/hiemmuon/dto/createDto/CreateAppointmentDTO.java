package hsf302.com.hiemmuon.dto.createDto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CreateAppointmentDTO {
    private int doctorId;
    private int customerId;
    private LocalDateTime date;
    private String type; // "tu_van" hoặc "tai_kham"
    private String note;
    private int serviceId;
}
