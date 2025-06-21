import React, { useState } from "react";
import "./Blog.css";
import blog1 from "@asset/blog1.png";
import blog2 from "@asset/blog2.png";
import blog3 from "@asset/blog3.png";
import blog4 from "@asset/blog4.png";
import blog5 from "@asset/blog5.png";
import blog6 from "@asset/blog6.png";

const Blog = () => {
  const [activeTab, setActiveTab] = useState("Tất Cả");

  const tabs = [];

  const articles = [
    {
      date: "5 Tháng 4, 2023",
      title: "Lời Khuyên Dinh Dưỡng Cho Sức Khỏe Sinh Sản",
      category: "Hiếm Muộn",
      image: blog1,
    },
    {
      date: "28 Tháng 3, 2023",
      title: "Tiến Bộ Đổi Mới Trong Công Nghệ điều trị hiếm muộn IVF",
      category: "Điều Trị",
      image: blog2,
    },
    {
      date: "12 Tháng 2, 2023",
      title: "Hỗ Trợ Tinh Thần Trong Quá Trình Điều Trị",
      category: "Lối Sống",
      image: blog3,
    },
    {
      date: "5 Tháng 2, 2023",
      title: "Hiểu Về Vô Sinh Nam: Nguyên Nhân Và Giải Pháp",
      category: "Hiếm Muộn",
      image: blog4,
    },
    {
      date: "20 Tháng 1, 2023",
      title: "Sống Khỏe Với Hội Chứng Buồng Trứng Đa Nang (PCOS)",
      category: "Hiếm Muộn",
      image: blog5,
    },
    {
      date: "10 Tháng 1, 2023",
      title: "Hành Trình IVF Của Chúng Tôi: Một Câu Chuyện Thành Công",
      category: "Câu Chuyện Thành Công",
       image: blog6,
    },
  ];

  const filteredArticles =
    activeTab === "Tất Cả"
      ? articles
      : articles.filter((article) => article.category === activeTab);

  return (
    <div className="blog-page">
      <div className="title-section">
        <h2>Blog & Tài Nguyên</h2>
        <p>
          Khám phá các bài viết, tin tức và tài nguyên mới nhất về hiếm muộn và
          điều trị sinh sản.
        </p>
      </div>

      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="articles">
        {filteredArticles.map((article, index) => (
          <div className="article-card" key={index}>
            <img
              src={article.image || "/placeholder.svg"}
              alt={article.title}
              className="article-image"
            />
            <div className="article-info">
              <p className="article-date">{article.date}</p>
              <h3>{article.title}</h3>
              <button className="read-more">Đọc Bài Viết →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
