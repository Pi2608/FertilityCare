package hsf302.com.hiemmuon.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Nationalized;

@Data
@Entity
@NoArgsConstructor
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

    public Customer(int customerId, User user, String medicalHistory) {
        this.customerId = customerId;
        this.user = user;
        this.medicalHistory = medicalHistory;
    }

    public Customer(User user, String medicalHistory) {
        this.user = user;
        this.medicalHistory = medicalHistory;
    }

    public int getCustomerId() {
        return customerId;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getMedicalHistory() {
        return medicalHistory;
    }

    public void setMedicalHistory(String medicalHistory) {
        this.medicalHistory = medicalHistory;
    }
}
