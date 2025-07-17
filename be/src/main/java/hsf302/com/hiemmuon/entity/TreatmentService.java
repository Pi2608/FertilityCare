package hsf302.com.hiemmuon.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
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

    @Column(name = "target_patient", columnDefinition = "NVARCHAR(MAX)")
    private String targetPatient;

    @Column(name = "success_rate")
    private Float successRate;

    @Column(name = "benefit")
    private String benefit;

    @Column(name = "faq", columnDefinition = "NVARCHAR(MAX)")
    private String faq;

    @Column(name = "price", precision = 10, scale = 2)
    private BigDecimal price;

    @Column(name = "specifications", columnDefinition = "NVARCHAR(MAX)")
    private String specifications;

    @Column(name = "isActive")
    private boolean isActive;
}