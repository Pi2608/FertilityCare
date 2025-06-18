package hsf302.com.hiemmuon.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

@Getter
@Setter
@Entity
@Table(name = "customer")
public class Customer {

    @Id
    @Column(name = "customer_id")
    private int customerId;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @MapsId
    @JoinColumn(name = "customer_id", referencedColumnName = "user_id")
    private User user;

    @Nationalized
    @Column(name = "medical_history", columnDefinition = "NVARCHAR(MAX)")
    private String medicalHistory;

    @Column(name = "is_active")
    private boolean isActive;

    public Customer() {
    }

    public Customer(int customerId, User user, String medicalHistory, boolean isActive) {
        this.customerId = customerId;
        this.user = user;
        this.medicalHistory = medicalHistory;
        this.isActive = isActive;
    }
}
