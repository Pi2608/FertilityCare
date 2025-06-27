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

    public TestResult() {
    }

    public TestResult(String name, Float value, String unit, String referenceRange, LocalDate testDate, String note, Appointment appointment) {
        this.name = name;
        this.value = value;
        this.unit = unit;
        this.referenceRange = referenceRange;
        this.testDate = testDate;
        this.note = note;
        this.appointment = appointment;
    }
}