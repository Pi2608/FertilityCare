package hsf302.com.hiemmuon.dto.appointment;

import hsf302.com.hiemmuon.dto.testresult.TestResultViewDTO;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentDetailDTO {
    private int appointmentId;
    private String type; // tư vấn - IUI - IVF
    private LocalDate date;
    private LocalTime startTime;
    private Integer cycleStepId;

    private int doctorId;
    private String doctorName;

    private int customerId;
    private String customerName;
    private int customerAge;

    private String status; // confirmed, cancelled, done
    private String note;
    private int serviceId;
    private List<TestResultViewDTO> testResultViewDTOList;
}