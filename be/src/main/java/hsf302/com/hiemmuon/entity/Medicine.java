package hsf302.com.hiemmuon.entity;

import hsf302.com.hiemmuon.dto.responseDto.MedicineDTO;
import hsf302.com.hiemmuon.utils.TimeListConverter;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

import java.sql.Time;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "medicine")
public class Medicine extends MedicineDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "medicin_id")
    private int medicinId;

    @Nationalized
    @Column(name = "name", length = 50, nullable = false)
    private String name;

    @Nationalized
    @Column(name = "discription", columnDefinition = "NVARCHAR(MAX)")
    private String discription;

    @Nationalized
    @Column(name = "dose", length = 100, columnDefinition = "NVARCHAR(MAX)")
    private String dose;

    @Nationalized
    @Column(name = "frequency", length = 100, columnDefinition = "NVARCHAR(MAX)")
    private String frequency;

    @Convert(converter = TimeListConverter.class)
    @Column(name = "time", columnDefinition = "VARCHAR(255)")
    private List<Time> useAt;

    public Medicine() {
    }

    public Medicine(String name, String discription, String dose, String frequency, List<Time> useAt) {
        this.name = name;
        this.discription = discription;
        this.dose = dose;
        this.frequency = frequency;
        this.useAt = useAt;
    }
}