package hsf302.com.hiemmuon.dto.responseDto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReExamAppointmentDTO {
    private int doctorId;
    private int customerId;
    private int serviceId;
    private LocalDateTime date; // ngay tai kham
    private String note; // ghi chu tai kham
}