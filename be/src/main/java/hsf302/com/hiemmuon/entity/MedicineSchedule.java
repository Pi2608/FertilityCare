package hsf302.com.hiemmuon.entity;

import hsf302.com.hiemmuon.enums.StatusMedicineSchedule;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
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

    @Column(name = "startdate")
    private LocalDate startDate;

    @Column(name = "enddate")
    private LocalDate endDate;

    @Column(name = "event_date")
    private LocalDateTime eventDate;

    @Column(name = "time", columnDefinition = "TIME")
    private LocalTime time;

    @Column(name = "note", columnDefinition = "NVARCHAR(MAX)")
    private String note;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private StatusMedicineSchedule status;

    @Column(name = "is_reminded")
    private Boolean isReminded = false;
}