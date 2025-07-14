package hsf302.com.hiemmuon.dto.service;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@JsonIgnoreProperties(ignoreUnknown = false)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TreatmentStepDTO {

    private int stepOrder;
    private String title;
    private String description;
}