package hsf302.com.hiemmuon.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.*;
import org.hibernate.annotations.Nationalized;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "success_rates")
public class SuccessRateByAge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Nationalized
    @Column(name = "age_group")
    private String ageGroup;

    @Column(name = "clinical_pregnancy_rate")
    private Float clinicalPregnancyRate;

    @Nationalized
    @Column(name = "compared_to_national_avg")
    private String comparedToNationalAverage; // "+7% cao hơn", v.v.

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "treatment_service_id")
    private TreatmentService treatmentService;

    public SuccessRateByAge(String ageGroup, Float clinicalPregnancyRate, String comparedToNationalAverage, TreatmentService treatmentService) {
        this.ageGroup = ageGroup;
        this.clinicalPregnancyRate = clinicalPregnancyRate;
        this.comparedToNationalAverage = comparedToNationalAverage;
        this.treatmentService = treatmentService;
    }
}
