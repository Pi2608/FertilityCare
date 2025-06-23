package hsf302.com.hiemmuon.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

@Entity
@Getter
@Setter
@Table(name = "medicine")
public class Medicine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "medicin_id")
    private int medicinId;

    @Nationalized
    @Column(name = "name", length = 50, nullable = false)
    private String name;

    @Nationalized
    @Column(name = "discription", columnDefinition = "NVARCHAR(MAX)")
    private String discription;

    @Nationalized
    @Column(name = "dose", length = 100, columnDefinition = "NVARCHAR(MAX)")
    private String dose;

    @Nationalized
    @Column(name = "frequency", length = 100, columnDefinition = "NVARCHAR(MAX)")
    private String frequency;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "treatment_step_id", nullable = false)
    private TreatmentStep treatmentStep;

    public Medicine() {
    }

    public Medicine(String name, String discription, String dose, String frequency, TreatmentStep treatmentStep) {
        this.name = name;
        this.discription = discription;
        this.dose = dose;
        this.frequency = frequency;
        this.treatmentStep = treatmentStep;
    }
}