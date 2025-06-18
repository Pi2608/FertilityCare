package hsf302.com.hiemmuon.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@Table(name = "cycle_steps")
public class CycleStep {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "step_id")
    private int stepId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cycle_id", nullable = false)
    private Cycle cycle;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service_id", nullable = false)
    private TreatmentService service;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private Status status;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "eventdate", nullable = false)
    private LocalDate eventdate;

    public enum Status {
        ongoing, finished, stopped
    }

    public CycleStep() {
    }

    public CycleStep(Cycle cycle, TreatmentService service, Status status, String description, LocalDate eventdate) {
        this.cycle = cycle;
        this.service = service;
        this.status = status;
        this.description = description;
        this.eventdate = eventdate;
    }
}