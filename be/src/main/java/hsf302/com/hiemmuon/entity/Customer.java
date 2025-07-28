package hsf302.com.hiemmuon.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Nationalized;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
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


}
