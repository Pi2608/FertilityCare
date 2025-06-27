package hsf302.com.hiemmuon.dto.responseDto;

import com.fasterxml.jackson.annotation.JsonInclude;
import hsf302.com.hiemmuon.enums.StatusCycle;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CycleDTO {
    private int cycleId;
    private int customerId;
    private int doctorId;
    private int serviceId;
    private LocalDate startDate;
    private LocalDate endDate;
    private StatusCycle status;
    private String note;
    private List<CycleStepDTO> cycleStep;
}