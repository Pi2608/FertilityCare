package hsf302.com.hiemmuon.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

@Entity
@Getter
@Setter
@Table(name = "doctors")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Doctor {

    @Id
    @Column(name = "doctor_id")
    private int doctorId;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @MapsId
    @JoinColumn(name = "doctor_id")
    private User user;

    @Nationalized
    @Column(name = "description", columnDefinition = "NVARCHAR(MAX)")
    private String description;

    @Column(name = "experience")
    private int experience;

    @Column(name = "rating_avg")
    private Float ratingAvg;

    @Column(name = "is_active")
    private Boolean isActive;

    public Doctor() {
    }

    public Doctor(User user, String description, int experience, Float ratingAvg, Boolean isActive) {
        this.user = user;
        this.description = description;
        this.experience = experience;
        this.ratingAvg = ratingAvg;
        this.isActive = isActive;
    }
}
