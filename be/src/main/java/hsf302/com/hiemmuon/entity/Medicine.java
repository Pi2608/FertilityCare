package hsf302.com.hiemmuon.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "medicine")
public class Medicine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "medicin_id")
    private int medicinId;

    @Column(name = "name", length = 50, nullable = false)
    private String name;

    @Column(name = "discription", columnDefinition = "TEXT")
    private String discription;

    @Column(name = "number")
    private int number;

    public Medicine() {
    }

    public Medicine(String name, String discription, int number) {
        this.name = name;
        this.discription = discription;
        this.number = number;
    }
}