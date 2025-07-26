import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import apiBlog from "@features/service/apiBlog";
import "./Homepage.css";

const Homepage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await apiBlog.getAllBlogs();
        setBlogs(response.data || []);
      } catch (error) {
        console.error("Lỗi khi tải blog:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div id="homepage">
      <section className="hero">
        <span className="tag">Phòng Khám Hiếm Muộn Hàng Đầu</span>
        <h1>Hành Trình Làm Cha Mẹ Bắt Đầu Từ Đây</h1>
        <p>
          Chúng tôi kết hợp công nghệ sinh sản tiên tiến với sự chăm sóc tận tâm
          để giúp bạn xây dựng gia đình mà bạn luôn mơ ước.
        </p>
        <div className="hero-buttons">
          <button
            className="consult-btn"
            onClick={() =>
              isAuthenticated
                ? navigate("book-appointment")
                : navigate("/authentication?redirect=book-appointment")
            }
          >
            Đặt Lịch Tư Vấn
          </button>

          <button
            className="method-btn"
            onClick={() => navigate("treatment-method")}
          >
            Khám Phá Phương Pháp Điều Trị
          </button>
        </div>
      </section>

      <section className="services">
        <div className="services-intro">
          <span className="section-tag">Dịch Vụ Của Chúng Tôi</span>
          <h2>Giải Pháp Điều Trị Hiếm Muộn Toàn Diện</h2>
          <p>
            Chúng tôi cung cấp nhiều phương pháp điều trị hiếm muộn được thiết
            kế riêng cho nhu cầu của bạn
          </p>
        </div>
        <div className="services-grid">
          {blogs.slice(0, 6).map((blog, index) => (
            <div className="service-item" key={index}>
              <h3>{blog.title}</h3>
              <p>{blog.content[0].split("\n")[0]}</p>
            </div>
          ))}
        </div>

        <div className="services-footer">
          <button
            className="all-services-btn"
            onClick={() => navigate("/homepage/treatment-method")}
          >
            Xem Tất Cả Dịch Vụ
          </button>
        </div>
      </section>

      <section className="care-quality">
        <span className="section-tag">Tại Sao Chọn Chúng Tôi</span>
        <h2>Chăm Sóc Tận Tâm, Kết Quả Xuất Sắc</h2>
        <p className="care-subtitle">
          Phương pháp lấy bệnh nhân làm trung tâm của chúng tôi kết hợp sự xuất
          sắc về y tế với hỗ trợ tinh thần trong suốt hành trình điều trị hiếm
          muộn của bạn.
        </p>
        <ul className="care-list">
          <li>Kế hoạch điều trị cá nhân hóa theo nhu cầu riêng của bạn</li>
          <li>Bác sĩ nội tiết sinh sản được chứng nhận</li>
          <li>Phòng thí nghiệm và thiết bị hiện đại</li>
          <li>Hỗ trợ tinh thần và tư vấn toàn diện</li>
          <li>Minh bạch về chi phí và các lựa chọn tài chính</li>
        </ul>
        <div className="care-buttons">
          <button
            className="care-btn outline"
            onClick={() => navigate("doctor-list")}
          >
            Gặp Gỡ Đội Ngũ Bác Sĩ
          </button>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
