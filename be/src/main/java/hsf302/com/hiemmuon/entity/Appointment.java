package hsf302.com.hiemmuon.entity;

import hsf302.com.hiemmuon.enums.StatusAppointment;
import hsf302.com.hiemmuon.enums.TypeAppointment;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "appointments")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "appointment_id")
    private int appointmentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doc_id", nullable = false)
    private Doctor doctor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @Column(name = "date", nullable = false)
    private LocalDateTime date;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false, length = 20)
    private TypeAppointment typeAppointment;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private StatusAppointment statusAppointment;

    @Column(name = "note", columnDefinition = "NVARCHAR(MAX)")
    private String note;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service_id")
    private TreatmentService service;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "step_id")
    private CycleStep cycleStep;



    public Appointment() {
    }

    public Appointment(Doctor doctor, Customer customer, LocalDateTime date, TypeAppointment typeAppointment, StatusAppointment statusAppointment, String note, TreatmentService service, CycleStep cycleStep) {
        this.doctor = doctor;
        this.customer = customer;
        this.date = date;
        this.typeAppointment = typeAppointment;
        this.statusAppointment = statusAppointment;
        this.note = note;
        this.service = service;
        this.cycleStep = cycleStep;
    }
}