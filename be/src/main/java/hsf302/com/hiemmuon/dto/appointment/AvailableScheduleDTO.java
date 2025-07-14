package hsf302.com.hiemmuon.dto.appointment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AvailableScheduleDTO {
    private int doctorId;
    private String name;
    private String specialization;
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
    private boolean isStatus;
}