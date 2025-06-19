package hsf302.com.hiemmuon.dto.dto.entityDto;

import java.time.LocalDateTime;

@lombok.Getter
@lombok.Setter
public class AppointmentHistoryDTO {
    private int appointmentId;
    private LocalDateTime date;
    private String customerName;
    private String type;
    private String status;
    private String note;
}
