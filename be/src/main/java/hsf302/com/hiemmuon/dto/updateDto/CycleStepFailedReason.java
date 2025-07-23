package hsf302.com.hiemmuon.dto.updateDto;

import hsf302.com.hiemmuon.enums.StatusCycle;
import lombok.Data;

@Data
public class CycleStepFailedReason{
    private String reason;
    private StatusCycle status;
}
