package hsf302.com.hiemmuon.service;

import hsf302.com.hiemmuon.dto.createDto.BlogCreateDTO;
import hsf302.com.hiemmuon.dto.responseDto.BlogResponseDTO;
import hsf302.com.hiemmuon.entity.Blog;
import hsf302.com.hiemmuon.entity.User;
import hsf302.com.hiemmuon.repository.BlogRepository;
import hsf302.com.hiemmuon.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class BlogService {
    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Blog> getAllBlogs(){
        return blogRepository.findAll();
    }

    public BlogResponseDTO convertToResponseDTO(Blog blog) {
        BlogResponseDTO dto = new BlogResponseDTO();
        dto.setTitle(blog.getTitle());

        // ⚠️ Giả sử bạn lưu content theo kiểu nối: "đoạn1|||đoạn2|||đoạn3"
        String[] parts = blog.getContent().split("\\|\\|\\|");
        dto.setContent(Arrays.asList(parts));

        return dto;
    }


    public Blog getBlogById(int id){
        return blogRepository.getReferenceById(id);
    }

    public Blog createBlog(BlogCreateDTO blog){
        Blog b = new Blog();
        b.setTitle(blog.getTitle());
        b.setContent(blog.getContent());
        b.setTags(blog.getTags());
        b.setViewCount(0);
        b.setCreateDate(LocalDate.now());
        User user = userRepository.getUserByUserId(blog.getUserId());
        b.setUser(user);
        return blogRepository.save(b);
    }

    public Blog updateBlog(int id, Blog blog){
        Optional<Blog> existing = blogRepository.findById(id);
        if(existing.isPresent()){
            Blog b = existing.get();
            b.setTitle(blog.getTitle());
            b.setContent(blog.getContent());
            b.setTags(blog.getTags());
            return blogRepository.save(b);
        }
        return null;
    }

    public void deleteBlog(int id){
        blogRepository.deleteById(id);
    }

    public List<Blog> getBlogsByTag(String tag){
        return blogRepository.findBlogByTagsContaining(tag);
    }

    public List<Blog> getBlogsByUser(int userId){
        return blogRepository.findByUser_UserId(userId);
    }

    public Blog save(Blog blog){
        return blogRepository.save(blog);
    }
}

