import React, { useState } from 'react';
import './Blog.css';

const Blog = () => {
  const [activeTab, setActiveTab] = useState('Tất Cả');

  const tabs = [];

  const articles = [
    {
      date: '5 Tháng 4, 2023',
      title: 'Lời Khuyên Dinh Dưỡng Cho Sức Khỏe Sinh Sản',
      category: 'Hiếm Muộn',
    },
    {
      date: '28 Tháng 3, 2023',
      title: 'Tiến Bộ Đổi Mới Trong Công Nghệ điều trị hiếm muộn IVF',
      category: 'Điều Trị',
    },
    {
      date: '12 Tháng 2, 2023',
      title: 'Hỗ Trợ Tinh Thần Trong Quá Trình Điều Trị',
      category: 'Lối Sống',
    },
    {
      date: '5 Tháng 2, 2023',
      title: 'Hiếu Về Vô Sinh Nam: Nguyên Nhân Và Giải Pháp',
      category: 'Hiếm Muộn',
    },
    {
      date: '20 Tháng 1, 2023',
      title: 'Sống Khỏe Với Hội Chứng Buông Trứng Đa Nang (PCOS)',
      category: 'Hiếm Muộn',
    },
    {
      date: '10 Tháng 1, 2023',
      title: 'Hành Trình IVF Của Chúng Tôi: Một Câu Chuyện Thành Công',
      category: 'Câu Chuyện Thành Công',
    },
  ];

  const filteredArticles =
    activeTab === 'Tất Cả'
      ? articles
      : articles.filter((article) => article.category === activeTab);

  return (
    <div className="blog-page">
      <div className="title-section">
        <h2>Blog & Tài Nguyên</h2>
        <p>Khám phá các bài viết, tin tức và tài nguyên mới nhất về hiếm muộn và điều trị sinh sản.</p>
        
      </div>

      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? 'active' : ''}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="articles">
        {filteredArticles.map((article, index) => (
          <div className="article-card" key={index}>
            <div className="article-image-placeholder"></div>
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
