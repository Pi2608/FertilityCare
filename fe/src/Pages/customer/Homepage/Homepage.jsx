import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Homepage.css";

const Homepage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

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

      <section className="stats">
        <div className="stat">
          <h2>95%</h2>
          <p>Sự Hài Lòng Của Bệnh Nhân</p>
        </div>
        <div className="stat">
          <h2>15+</h2>
          <p>Năm Kinh Nghiệm</p>
        </div>
        <div className="stat">
          <h2>5000+</h2>
          <p>Ca Mang Thai Thành Công</p>
        </div>
        <div className="stat">
          <h2>12</h2>
          <p>Bác Sĩ Chuyên Khoa</p>
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
          <div className="service-item">
            <h3>Thụ Tinh Trong Ống Nghiệm (IVF)</h3>
            <p>
              Chương trình IVF tiên tiến kết hợp công nghệ hiện đại và chăm sóc
              cá nhân hóa để đạt kết quả tối ưu.
            </p>
            <a href="#">
              Tìm hiểu thêm
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 1024 1024"
              >
                <path
                  fill="currentColor"
                  d="M754.752 480H160a32 32 0 1 0 0 64h594.752L521.344 777.344a32 32 0 0 0 45.312 45.312l288-288a32 32 0 0 0 0-45.312l-288-288a32 32 0 1 0-45.312 45.312z"
                />
              </svg>
            </a>
          </div>
          <div className="service-item">
            <h3>Bơm Tinh Trùng Vào Buồng Tử Cung</h3>
            <p>
              Phương pháp ít xâm lấn, đưa tinh trùng trực tiếp vào tử cung để
              tạo điều kiện thụ tinh thuận lợi.
            </p>
            <a href="#">
              Tìm hiểu thêm
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 1024 1024"
              >
                <path
                  fill="currentColor"
                  d="M754.752 480H160a32 32 0 1 0 0 64h594.752L521.344 777.344a32 32 0 0 0 45.312 45.312l288-288a32 32 0 0 0 0-45.312l-288-288a32 32 0 1 0-45.312 45.312z"
                />
              </svg>
            </a>
          </div>
          <div className="service-item">
            <h3>Trữ Đông Trứng</h3>
            <p>
              Lưu trữ khả năng sinh sản trong tương lai bằng công nghệ trữ đông
              hiện đại.
            </p>
            <a href="#">
              Tìm hiểu thêm
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 1024 1024"
              >
                <path
                  fill="currentColor"
                  d="M754.752 480H160a32 32 0 1 0 0 64h594.752L521.344 777.344a32 32 0 0 0 45.312 45.312l288-288a32 32 0 0 0 0-45.312l-288-288a32 32 0 1 0-45.312 45.312z"
                />
              </svg>
            </a>
          </div>
          <div className="service-item">
            <h3>Xét Nghiệm Di Truyền</h3>
            <p>
              Sàng lọc các rối loạn di truyền tiềm ẩn và cải thiện kết quả điều
              trị.
            </p>
            <a href="#">
              Tìm hiểu thêm
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 1024 1024"
              >
                <path
                  fill="currentColor"
                  d="M754.752 480H160a32 32 0 1 0 0 64h594.752L521.344 777.344a32 32 0 0 0 45.312 45.312l288-288a32 32 0 0 0 0-45.312l-288-288a32 32 0 1 0-45.312 45.312z"
                />
              </svg>
            </a>
          </div>
          <div className="service-item">
            <h3>Điều Trị Vô Sinh Nam</h3>
            <p>
              Phác đồ điều trị dành riêng cho vô sinh nam với các kỹ thuật tiên
              tiến.
            </p>
            <a href="#">
              Tìm hiểu thêm
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 1024 1024"
              >
                <path
                  fill="currentColor"
                  d="M754.752 480H160a32 32 0 1 0 0 64h594.752L521.344 777.344a32 32 0 0 0 45.312 45.312l288-288a32 32 0 0 0 0-45.312l-288-288a32 32 0 1 0-45.312 45.312z"
                />
              </svg>
            </a>
          </div>
          <div className="service-item">
            <h3>Bảo Tồn Khả Năng Sinh Sản</h3>
            <p>
              Lưu trữ khả năng sinh sản trước điều trị y tế có thể ảnh hưởng đến
              sức khỏe sinh sản.
            </p>
            <a href="#">
              Tìm hiểu thêm
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 1024 1024"
              >
                <path
                  fill="currentColor"
                  d="M754.752 480H160a32 32 0 1 0 0 64h594.752L521.344 777.344a32 32 0 0 0 45.312 45.312l288-288a32 32 0 0 0 0-45.312l-288-288a32 32 0 1 0-45.312 45.312z"
                />
              </svg>
            </a>
          </div>
        </div>
        <div className="services-footer">
          <button className="all-services-btn">Xem Tất Cả Dịch Vụ</button>
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
