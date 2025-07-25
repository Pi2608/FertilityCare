package hsf302.com.hiemmuon.dto.createDto;

import lombok.Data;

@Data
public class TreatmentStepDTO {

    private Integer stepOrder;
    private String title;
    private String description;
    private String expectedDuration;

}

