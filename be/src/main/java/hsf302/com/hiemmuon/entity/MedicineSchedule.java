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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medicin_id", nullable = false)
    private Medicine medicine;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "step_id", nullable = false)
    private CycleStep cycleStep;

    @Column(name = "name", length = 100)
    private String name;

    @Column(name = "dose", length = 100)
    private String dose;

    @Column(name = "frequency", length = 100)
    private String frequency;

    @Column(name = "startdate")
    private LocalDate startdate;

    @Column(name = "enddate")
    private LocalDate enddate;

    @Column(name = "note", columnDefinition = "NVARCHAR(MAX)")
    private String note;

    public MedicineSchedule() {
    }

    public MedicineSchedule(Medicine medicine, CycleStep cycleStep, String name, String dose, String frequency, LocalDate startdate, LocalDate enddate, String note) {
        this.medicine = medicine;
        this.cycleStep = cycleStep;
        this.name = name;
        this.dose = dose;
        this.frequency = frequency;
        this.startdate = startdate;
        this.enddate = enddate;
        this.note = note;
    }

    public MedicineSchedule(Medicine medicine, CycleStep step, String name, String dose, String frequency, java.time.LocalDate startDate, Object o, java.time.LocalDate endDate, Object o1, String note) {
    }
}