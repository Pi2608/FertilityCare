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
    @Column(name = "about", columnDefinition = "NVARCHAR(MAX)")
    private String about;

    @Nationalized
    @Column(name = "specification", columnDefinition = "NVARCHAR(MAX)")
    private String specification;

    @Nationalized
    @Column(name = "approach", columnDefinition = "NVARCHAR(MAX)")
    private String approach;

    @Column(name = "experience")
    private int experience;

    @Nationalized
    @Column(name = "work_experience", columnDefinition = "NVARCHAR(MAX)")
    private String workExperience;

    @Nationalized
    @Column(name = "education", columnDefinition = "NVARCHAR(MAX)")
    private String education;

    @Nationalized
    @Column(name = "certificates", columnDefinition = "NVARCHAR(MAX)")
    private String certificates;

    @Column(name = "rating_avg")
    private Float ratingAvg;

    public Doctor(User user, String about, String specification, String approach, int experience, String workExperience, String education, String certificates, Float ratingAvg) {
        this.user = user;
        this.about = about;
        this.specification = specification;
        this.approach = approach;
        this.experience = experience;
        this.workExperience = workExperience;
        this.education = education;
        this.certificates = certificates;
        this.ratingAvg = ratingAvg;
    }
}
