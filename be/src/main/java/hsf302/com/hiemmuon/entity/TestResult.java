package hsf302.com.hiemmuon.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@Table(name = "test_results")
public class TestResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "result_id")
    private int resultId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "step_id", nullable = false)
    private CycleStep cycleStep;

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

    @Column(name = "note", columnDefinition = "TEXT")
    private String note;

    public TestResult() {
    }

    public TestResult(CycleStep cycleStep, String name, Float value, String unit, String referenceRange, LocalDate testDate, String note) {
        this.cycleStep = cycleStep;
        this.name = name;
        this.value = value;
        this.unit = unit;
        this.referenceRange = referenceRange;
        this.testDate = testDate;
        this.note = note;
    }
}