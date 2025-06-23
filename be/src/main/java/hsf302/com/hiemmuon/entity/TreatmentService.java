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

    @Column(name = "name", columnDefinition = "NVARCHAR(MAX)")
    private String name;

    @Column(name = "description", columnDefinition = "NVARCHAR(MAX)")
    private String description;

    @Column(name = "success_rate")
    private Float successRate;

    @Column(name = "price", precision = 10, scale = 2)
    private BigDecimal price;

    @Column(name = "specifications", length = 255, columnDefinition = "NVARCHAR(MAX)")
    private String specifications;

    @Column(name = "isActive", length = 255)
    private boolean isActive;

    public TreatmentService() {
    }

    public TreatmentService(int serviceId, String name, String description, Float successRate, BigDecimal price, String specifications, boolean isActive) {
        this.serviceId = serviceId;
        this.name = name;
        this.description = description;
        this.successRate = successRate;
        this.price = price;
        this.specifications = specifications;
        this.isActive = isActive;
    }
}