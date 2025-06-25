package hsf302.com.hiemmuon.dto.responseDto;

import java.time.LocalDateTime;

@lombok.Getter
@lombok.Setter
public class ReExamAppointmentResponseDTO {
    private int appointmentId;
    private LocalDateTime date;
    private String doctorName;
    private String serviceName;
    private String note;
    private Enum status;
}
