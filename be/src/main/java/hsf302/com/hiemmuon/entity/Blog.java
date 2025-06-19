package hsf302.com.hiemmuon.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@Table(name = "blogs")
public class Blog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "blog_id")
    private int blogId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "title", length = 255, nullable = false)
    private String title;

    @Column(name = "content", columnDefinition = "NVARCHAR(MAX)", nullable = false)
    private String content;

    @Column(name = "tags", length = 255)
    private String tags;

    @Column(name = "create_date", nullable = false)
    private LocalDate createDate;

    @Column(name = "view_count")
    private Integer viewCount;

    public Blog() {
    }

    public Blog(User user, String title, String content, String tags, LocalDate createDate, Integer viewCount) {
        this.user = user;
        this.title = title;
        this.content = content;
        this.tags = tags;
        this.createDate = createDate;
        this.viewCount = viewCount;
    }
}