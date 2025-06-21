package hsf302.com.hiemmuon.dto.entityDto;

import hsf302.com.hiemmuon.entity.Appointment;
import hsf302.com.hiemmuon.entity.TreatmentService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@lombok.Getter
@lombok.Setter
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentHistoryDTO {
    private Integer appointmentId;
    private LocalDateTime date;
    private String type;
    private String status;
    private String note;
    private String serviceName;
}

