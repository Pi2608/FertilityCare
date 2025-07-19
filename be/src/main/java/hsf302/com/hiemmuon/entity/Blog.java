package hsf302.com.hiemmuon.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Nationalized;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "blogs")
public class Blog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "blog_id")
    private int blogId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Nationalized
    @Column(name = "title", length = 255, columnDefinition = "NVARCHAR(255)", nullable = false)
    private String title;

    @Nationalized
    @Column(name = "content", columnDefinition = "NVARCHAR(MAX)", nullable = false)
    private String content;

    @Nationalized
    @Column(name = "tags", length = 255)
    private String tags;

    @Column(name = "create_date", nullable = false)
    private LocalDate createDate;

    @Column(name = "view_count")
    private Integer viewCount;
}