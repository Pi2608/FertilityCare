package hsf302.com.hiemmuon.dto.appointment;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class AppointmentDetailDTO {
    private int appointmentId;
    private String type; // tư vấn - IUI - IVF
    private LocalDate date;
    private LocalTime startTime;
    private int cycleStepId;

    private int doctorId;
    private String doctorName;

    private int customerId;
    private String customerName;
    private int customerAge;

    private String status; // confirmed, cancelled, done
    private String note;
    private int serviceId;
    private int testResultId;
}
