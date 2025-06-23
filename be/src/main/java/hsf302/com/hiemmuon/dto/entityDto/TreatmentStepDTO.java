package hsf302.com.hiemmuon.dto.entityDto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;

@JsonIgnoreProperties(ignoreUnknown = false)
@lombok.Getter
@lombok.Setter
public class TreatmentStepDTO {

    private int stepOrder;
    private String title;
    private String description;
}
