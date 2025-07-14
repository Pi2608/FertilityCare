package hsf302.com.hiemmuon.entity;

import hsf302.com.hiemmuon.utils.TimeListConverter;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Nationalized;

import java.sql.Time;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "medicine")
public class Medicine{

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
}