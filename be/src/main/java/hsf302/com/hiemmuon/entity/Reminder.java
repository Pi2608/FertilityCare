package hsf302.com.hiemmuon.entity;

import hsf302.com.hiemmuon.enums.RelatedTypeReminder;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "reminders")
public class    Reminder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "remind_id")
    private int remindId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @Enumerated(EnumType.STRING)
    @Column(name = "related_type", nullable = false, length = 20)
    private RelatedTypeReminder relatedType;

    @Column(name = "related_id", nullable = false)
    private int relatedId;

    @Column(name = "title", length = 255, nullable = false)
    private String title;

    @Column(name = "description", columnDefinition = "NVARCHAR(MAX)")
    private String description;

    @Column(name = "remind_at", nullable = false)
    private LocalDateTime remindAt;

    @Column(name = "is_sent", nullable = false)
    private Boolean isSent;

    @Column(name = "status", columnDefinition = "NVARCHAR(MAX)")
    private String status;

    @Column(name = "create_at", nullable = false)
    private LocalDateTime createAt;
}