package hsf302.com.hiemmuon.repository;

import hsf302.com.hiemmuon.entity.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Integer> {
    List<Blog> findBlogByTagsContaining(String tag);

    List<Blog> findByUser_UserId(int userId);


}