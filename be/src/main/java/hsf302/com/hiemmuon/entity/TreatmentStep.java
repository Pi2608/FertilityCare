package hsf302.com.hiemmuon.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Nationalized;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "treatment_steps")
public class TreatmentStep {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "treatment_step_id")
    private int stepId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service_id", nullable = false)
    private TreatmentService service;

    @Column(name = "step_order", nullable = false)
    private int stepOrder;

    @Nationalized
    @Column(name = "title", columnDefinition = "NVARCHAR(MAX)", nullable = false, length = 255)
    private String title;

    @Nationalized
    @Column(name = "description", columnDefinition = "NVARCHAR(MAX)", nullable = false)
    private String description;

    @Column(name = "expected_duration", columnDefinition = "NVARCHAR(255)")
    private int expectedDuration;

    public TreatmentStep(TreatmentService service, int stepOrder, String title, String description, int expectedDuration) {
        this.service = service;
        this.stepOrder = stepOrder;
        this.title = title;
        this.description = description;
        this.expectedDuration = expectedDuration;
    }
}
