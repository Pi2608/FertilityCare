package hsf302.com.hiemmuon.dto.dto.entityDto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = false)
@lombok.Getter
@lombok.Setter
public class TreatmentStepDTO {
    private int stepOrder;
    private String title;
    private String description;
}
