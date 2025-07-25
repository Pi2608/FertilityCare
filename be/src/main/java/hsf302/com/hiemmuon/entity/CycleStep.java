package hsf302.com.hiemmuon.entity;

import hsf302.com.hiemmuon.enums.StatusCycle;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "cycle_steps")
public class CycleStep{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "step_id")
    private int stepId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cycle_id", nullable = false)
    private Cycle cycle;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "treatment_step_id", nullable = false)
    private TreatmentStep treatmentStep;

    @Column(name = "step_order", nullable = false)
    private int stepOrder;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private StatusCycle statusCycleStep;

    @Column(name = "description", columnDefinition = "NVARCHAR(MAX)")
    private String description;

    @Column(name = "eventdate", nullable = true)
    private LocalDateTime eventdate;

    @Column(name = "note", columnDefinition = "NVARCHAR(MAX)")
    private String note;

    @Column(name = "failed_reason", columnDefinition = "NVARCHAR(MAX)")
    private String failedReason;

    @OneToMany(mappedBy = "cycleStep", fetch = FetchType.LAZY)
    private List<Appointment> appointments;

    @Column(name = "is_reminded")
    private Boolean isReminded = false;
}