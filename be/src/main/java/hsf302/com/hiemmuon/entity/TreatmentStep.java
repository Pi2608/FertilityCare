    package hsf302.com.hiemmuon.entity;

    import jakarta.persistence.*;
    import lombok.Getter;
    import lombok.Setter;
    import org.hibernate.annotations.Nationalized;

    @Entity
    @Getter
    @Setter
    @Table(name = "treatment_steps")
    public class TreatmentStep {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "treatment_step_id")
        private int id;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "service_id", nullable = false)
        private TreatmentService service;

        @Column(name = "step_order", nullable = false)
        private int stepOrder;

        @Nationalized
        @Column(name = "title", columnDefinition = "NVARCHAR(MAX)", nullable = false, length = 255)
        private String title;

        @Nationalized
        @Column(name = "description", columnDefinition = "NVARCHAR(MAX)", nullable = false)
        private String description;

        public TreatmentStep() {
        }

        public TreatmentStep(TreatmentService service, int stepOrder, String title, String description) {
            this.service = service;
            this.stepOrder = stepOrder;
            this.title = title;
            this.description = description;
        }
    }
