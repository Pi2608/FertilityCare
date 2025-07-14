package hsf302.com.hiemmuon.dto.appointment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentHistoryDTO {
    private int appointmentId;
    private LocalDateTime date;
    private String customerName;
    private String type;
    private String status;
    private String note;
}