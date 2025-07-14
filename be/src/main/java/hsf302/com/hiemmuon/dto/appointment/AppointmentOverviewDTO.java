package hsf302.com.hiemmuon.dto.appointment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
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