package hsf302.com.hiemmuon.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "reminders")
public class Reminder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "remind_id")
    private int remindId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @Enumerated(EnumType.STRING)
    @Column(name = "related_type", nullable = false, length = 20)
    private RelatedType relatedType;

    @Column(name = "related_id", nullable = false)
    private int relatedId;

    @Column(name = "title", length = 255, nullable = false)
    private String title;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "remind_at", nullable = false)
    private LocalDateTime remindAt;

    @Column(name = "is_sent", nullable = false)
    private Boolean isSent;

    @Column(name = "status", columnDefinition = "NVARCHAR")
    private String status;

    @Column(name = "create_at", nullable = false)
    private LocalDateTime createAt;

    public enum RelatedType {
        medication, appointment
    }

    public Reminder() {
    }

    public Reminder(Customer customer, RelatedType relatedType, int relatedId, String title, String description, LocalDateTime remindAt, Boolean isSent, String status, LocalDateTime createAt) {
        this.customer = customer;
        this.relatedType = relatedType;
        this.relatedId = relatedId;
        this.title = title;
        this.description = description;
        this.remindAt = remindAt;
        this.isSent = isSent;
        this.status = status;
        this.createAt = createAt;
    }
}