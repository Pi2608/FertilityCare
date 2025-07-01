package hsf302.com.hiemmuon.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "test_results")
public class TestResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "result_id")
    private int resultId;

    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @Column(name = "value")
    private Float value;

    @Column(name = "unit", length = 50)
    private String unit;

    @Column(name = "reference_range", length = 100)
    private String referenceRange;

    @Column(name = "test_date", nullable = false)
    private LocalDate testDate;

    @Column(name = "note", columnDefinition = "NVARCHAR(MAX)")
    private String note;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "appointment_id")
    private Appointment appointment;
    
    @ManyToOne
    @JoinColumn(name = "step_id")
    private CycleStep cycleStep;

    public TestResult(int resultId, String name, Float value, String unit, String referenceRange,
                      LocalDate testDate, String note, CycleStep cycleStep, Appointment appointment) {
        this.resultId = resultId;
        this.name = name;
        this.value = value;
        this.unit = unit;
        this.referenceRange = referenceRange;
        this.testDate = testDate;
        this.note = note;
        this.cycleStep = cycleStep;
        this.appointment = appointment;
    }

}