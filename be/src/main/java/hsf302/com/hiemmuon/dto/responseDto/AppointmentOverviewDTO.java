package hsf302.com.hiemmuon.dto.responseDto;

import java.time.LocalDateTime;

@lombok.Getter
@lombok.Setter
public class AppointmentOverviewDTO {
    private int appointmentId;
    private String doctorName;
    private String customerName;
    private LocalDateTime date;
    private String type;
    private String status;
    private String note;
    private String serviceName;
}
