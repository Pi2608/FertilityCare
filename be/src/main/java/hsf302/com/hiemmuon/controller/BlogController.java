package hsf302.com.hiemmuon.controller;

import hsf302.com.hiemmuon.dto.ApiResponse;
import hsf302.com.hiemmuon.dto.createDto.BlogCreateDTO;
import hsf302.com.hiemmuon.dto.responseDto.BlogResponseDTO;
import hsf302.com.hiemmuon.entity.Blog;
import hsf302.com.hiemmuon.service.BlogService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Tag(name = "16. Blog Controller")
@RestController
@RequestMapping("/api/blogs")
public class BlogController {

    @Autowired
    private BlogService blogService;

    @Operation(summary = "Lấy tất cả blog", description = "Trả về danh sách tất cả blog dưới dạng danh sách các đoạn nội dung")
    @GetMapping
    public ResponseEntity<ApiResponse<List<BlogResponseDTO>>> getBlogs() {
        List<BlogResponseDTO> blogs = blogService.getAllBlogs()
                .stream()
                .map(blogService::convertToResponseDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(new ApiResponse<>(200, "Fetched all blogs successfully", blogs));
    }

    @Operation(summary = "Lấy blog theo ID", description = "Trả về 1 blog với nội dung chia thành 3 đoạn")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<BlogResponseDTO>> getBlogById(@PathVariable Integer id) {
        Blog blog = blogService.getBlogById(id);
        return ResponseEntity.ok(new ApiResponse<>(200, "Fetched blog successfully", blogService.convertToResponseDTO(blog)));
    }

    @Operation(summary = "Tạo blog mới", description = "Tạo mới một blog với tiêu đề, nội dung (dạng 3 đoạn nối bằng '|||'), tags và userId")
    @PostMapping
    public ResponseEntity<ApiResponse<Blog>> createBlog(@RequestBody BlogCreateDTO dto) {
        Blog created = blogService.createBlog(dto);
        return ResponseEntity.ok(new ApiResponse<>(201, "Blog created successfully", created));
    }

    @Operation(summary = "Cập nhật blog", description = "Cập nhật nội dung và tiêu đề blog theo ID. Nội dung vẫn là chuỗi nối bằng '|||'")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<BlogResponseDTO>> updateBlog(@PathVariable int id, @RequestBody Blog blog) {
        Blog updated = blogService.updateBlog(id, blog);
        return ResponseEntity.ok(new ApiResponse<>(200, "Blog updated successfully", blogService.convertToResponseDTO(updated)));
    }

    @Operation(summary = "Xoá blog", description = "Xoá blog theo ID")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteBlog(@PathVariable int id) {
        blogService.deleteBlog(id);
        return ResponseEntity.ok(new ApiResponse<>(200, "Blog deleted successfully", null));
    }

    @Operation(summary = "Tìm blog theo tag", description = "Trả về các blog chứa tag cụ thể trong nội dung tags (dưới dạng chuỗi)")
    @GetMapping("/tag")
    public ResponseEntity<ApiResponse<List<BlogResponseDTO>>> getBlogsByTag(@RequestParam String tag) {
        List<BlogResponseDTO> blogs = blogService.getBlogsByTag(tag)
                .stream()
                .map(blogService::convertToResponseDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(new ApiResponse<>(200, "Fetched blogs by tag successfully", blogs));
    }

    @Operation(summary = "Tìm blog theo userId", description = "Trả về tất cả blog được viết bởi user có userId tương ứng")
    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<List<BlogResponseDTO>>> getBlogsByUser(@PathVariable int userId) {
        List<BlogResponseDTO> blogs = blogService.getBlogsByUser(userId)
                .stream()
                .map(blogService::convertToResponseDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(new ApiResponse<>(200, "Fetched blogs by user successfully", blogs));
    }
}
