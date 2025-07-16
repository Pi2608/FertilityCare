import React, { useState, useEffect } from "react";
import "./Blog.css";
import apiBlog from "@features/service/apiBlog";
import blog1 from "@asset/blog1.png";
import blog2 from "@asset/blog2.png";
import blog3 from "@asset/blog3.png";
import blog4 from "@asset/blog4.png";
import blog5 from "@asset/blog5.png";
import blog6 from "@asset/blog6.png";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const staticImages = [blog1, blog2, blog3, blog4, blog5, blog6];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await apiBlog.getAllBlogs();
        if (res.status === 200 && Array.isArray(res.data)) {
          const blogsWithImage = res.data.map((blog, index) => ({
            ...blog,
            image: staticImages[index % staticImages.length],
          }));
          setBlogs(blogsWithImage);
        }
      } catch (error) {
        console.error("Lỗi khi tải blog:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="blog-page">
      <div className="title-section">
        <h2>Blog & Tài Nguyên</h2>
        <p>
          Khám phá các bài viết, tin tức và tài nguyên mới nhất về hiếm muộn và
          điều trị sinh sản.
        </p>
        <br></br>
      </div>

      {/* Nếu chưa chọn bài nào → Hiển thị danh sách */}
      {!selectedBlog ? (
        <div className="articles">
          {blogs.map((blog, index) => (
            <div className="article-card" key={index}>
              <img
                src={blog.image || "/placeholder.svg"}
                alt={blog.title}
                className="article-image"
              />
              <div className="article-info">
                <p className="article-date">Cập nhật gần đây</p>
                <h3>{blog.title}</h3>
                <button
                  className="read-more"
                  onClick={() => setSelectedBlog(blog)}
                >
                  Đọc Bài Viết →
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Nếu đã chọn → Hiển thị chi tiết bài viết
        <div className="blog-detail">
          <button onClick={() => setSelectedBlog(null)} className="back-button">
            ← Quay lại danh sách
          </button>
          <h2 className="blog-detail-title">{selectedBlog.title}</h2>
          <img
            src={selectedBlog.image || "/placeholder.svg"}
            alt={selectedBlog.title}
            className="blog-detail-image"
          />
          <div className="blog-detail-content">
            {selectedBlog.content?.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
