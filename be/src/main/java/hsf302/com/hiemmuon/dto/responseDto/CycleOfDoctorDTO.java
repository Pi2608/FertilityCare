package hsf302.com.hiemmuon.dto.responseDto;

import hsf302.com.hiemmuon.enums.StatusCycle;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CycleOfDoctorDTO {

    private int cycleId;
    private String customer;
    private String service;
    private LocalDate startDate;
    private LocalDate endDate;
    private StatusCycle status;
    private String note;
}
