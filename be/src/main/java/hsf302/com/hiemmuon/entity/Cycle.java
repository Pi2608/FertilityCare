package hsf302.com.hiemmuon.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@Table(name = "cycles")
public class Cycle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cycle_id")
    private int cycleId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service_id", nullable = false)
    private TreatmentService service;

    @Column(name = "startdate", nullable = false)
    private LocalDate startdate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private Status status;

    @Column(name = "note", columnDefinition = "TEXT")
    private String note;

    public enum Status {
        ongoing, finished, stopped
    }

    public Cycle() {
    }

    public Cycle(Customer customer, TreatmentService service, LocalDate startdate, Status status, String note) {
        this.customer = customer;
        this.service = service;
        this.startdate = startdate;
        this.status = status;
        this.note = note;
    }
}