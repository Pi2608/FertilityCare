package hsf302.com.hiemmuon.dto.createDto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ReExamAppointmentDTO {
    private int doctorId;
    private int customerId;
    private int serviceId;
    private LocalDateTime date; // ngay tai kham
    private String note; // ghi chu tai kham
}
