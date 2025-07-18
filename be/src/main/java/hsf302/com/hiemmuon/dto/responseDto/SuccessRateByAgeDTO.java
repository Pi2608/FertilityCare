package hsf302.com.hiemmuon.dto.responseDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SuccessRateByAgeDTO {
    private Long id;
    private String ageGroup;
    private Float clinicalPregnancyRate;
    private String comparedToNationalAverage;
    private int treatmentServiceId;

    public SuccessRateByAgeDTO(String ageGroup, Float clinicalPregnancyRate, String comparedToNationalAverage) {
        this.ageGroup = ageGroup;
        this.clinicalPregnancyRate = clinicalPregnancyRate;
        this.comparedToNationalAverage = comparedToNationalAverage;
    }

    public SuccessRateByAgeDTO(String ageGroup, Float clinicalPregnancyRate, String comparedToNationalAverage, int treatmentServiceId) {
        this.ageGroup = ageGroup;
        this.clinicalPregnancyRate = clinicalPregnancyRate;
        this.comparedToNationalAverage = comparedToNationalAverage;
        this.treatmentServiceId = treatmentServiceId;
    }
}
