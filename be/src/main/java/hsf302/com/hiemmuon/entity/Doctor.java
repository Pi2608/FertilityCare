package hsf302.com.hiemmuon.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Nationalized;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "doctors")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Doctor {

    @Id
    @Column(name = "doctor_id")
    private int doctorId;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @MapsId
    @JoinColumn(name = "doctor_id", referencedColumnName = "user_id")
    private User user;

    @Nationalized
    @Column(name = "specification", columnDefinition = "NVARCHAR(MAX)")
    private String specification;

    @Column(name = "experience")
    private int experience;

    @Column(name = "rating_avg")
    private Float ratingAvg;

    @Column(name = "is_active")
    private Boolean isActive;
}
