package hsf302.com.hiemmuon.entity;

import hsf302.com.hiemmuon.enums.StatusMedicineSchedule;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

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
    private LocalDate startDate;

    @Column(name = "enddate")
    private LocalDate endDate;

    @Column(name = "event_date")
    private LocalDateTime eventDate;

    @Column(name = "note", columnDefinition = "NVARCHAR(MAX)")
    private String note;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private StatusMedicineSchedule status;

    public MedicineSchedule() {
    }

    public MedicineSchedule(Medicine medicine, CycleStep cycleStep, LocalDate startDate, LocalDate endDate,
                            LocalDateTime eventDate, String note, StatusMedicineSchedule status) {
        this.medicine = medicine;
        this.cycleStep = cycleStep;
        this.startDate = startDate;
        this.endDate = endDate;
        this.eventDate = eventDate;
        this.note = note;
        this.status = status;
    }
}