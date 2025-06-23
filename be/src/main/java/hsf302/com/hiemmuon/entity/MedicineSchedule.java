package hsf302.com.hiemmuon.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@Table(name = "medication_schedule")
public class MedicineSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "medication_id")
    private int medicationId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medicin_id", nullable = false)
    private Medicine medicine;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "step_id", nullable = false)
    private CycleStep cycleStep;

    @Column(name = "startdate")
    private LocalDate startdate;

    @Column(name = "enddate")
    private LocalDate enddate;

    @Column(name = "note", columnDefinition = "NVARCHAR(MAX)")
    private String note;

    public MedicineSchedule() {
    }

    public MedicineSchedule(Medicine medicine, CycleStep cycleStep, LocalDate startdate, LocalDate enddate, String note) {
        this.medicine = medicine;
        this.cycleStep = cycleStep;
        this.startdate = startdate;
        this.enddate = enddate;
        this.note = note;
    }
}