package hsf302.com.hiemmuon.dto.appointment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReExamAppointmentResponseDTO {
    private int appointmentId;
    private LocalDateTime date;
    private String doctorName;
    private String serviceName;
    private String note;
    private Enum status;
}