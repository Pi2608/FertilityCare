package hsf302.com.hiemmuon.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@Table(name = "treatment_services")
public class TreatmentService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "service_id")
    private int serviceId;

    @Column(name = "name")
    private String name;

    @Column(name = "description", columnDefinition = "NVARCHAR(MAX)")
    private String description;

    @Column(name = "success_rate")
    private Float successRate;

    @Column(name = "price", precision = 10, scale = 2)
    private BigDecimal price;

    @Column(name = "specialfications", length = 255)
    private String specialfications;

    public TreatmentService() {
    }

    public TreatmentService(int serviceId, String name, String description, Float successRate, BigDecimal price, String specialfications) {
        this.serviceId = serviceId;
        this.name = name;
        this.description = description;
        this.successRate = successRate;
        this.price = price;
        this.specialfications = specialfications;
    }
}