"use client";

import DoctorAPI from "../../../../features/service/apiDoctor";
import { useState, useEffect } from "react";
import "./ProfileLayout.css";

const ProfileLayout = () => {
  const [doctorInfo, setDoctorInfo] = useState({
    fullName: "",
    gender: "",
    birthDate: "",
    specialty: "",
    phone: "",
  });

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const data = await DoctorAPI.getCurrentDoctor();
        setDoctorInfo({
          fullName: data.name || "",
          gender: data.gender || "", // Đặt mặc định rõ ràng
          birthDate: data.dob || "",
          specialty: data.specification || "", // Đúng tên trường
          phone: data.phone || "",
        });
      } catch (err) {
        console.error("Lỗi khi lấy thông tin bác sĩ:", err);
      }
    };

    fetchDoctor();
    const averageRating =
      reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0;

    const fetchFeedbacks = async () => {
      try {
        const data = await DoctorAPI.getMyFeedbacks();
        setReviews(
          data.map((fb) => ({
            id: fb.feedbackId,
            patientName: fb.customerName,
            rating: fb.rating,
            date: fb.createAt,
            comment: fb.comment,
          }))
        );
      } catch (err) {
        console.error("Lỗi khi lấy feedback:", err);
      }
    };

    fetchFeedbacks();
  }, []);

  const [reviews, setReviews] = useState([]);

  const handleInputChange = (field, value) => {
    setDoctorInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const payload = {
        name: doctorInfo.fullName?.trim(),
        phone: doctorInfo.phone?.trim(), // fallback an toàn
        dob: doctorInfo.birthDate,
        gender: doctorInfo.gender,
        description: doctorInfo.specialty,
      };
      console.log("Payload gửi lên API:", payload); // Hiện log đầu vào
      const response = await DoctorAPI.updateCurrentDoctor(payload); // Gán vào biến
      console.log("Kết quả trả về từ API:", response); // Log kết quả

      alert("Đã lưu thông tin thành công!");
    } catch (err) {
      console.error("Lỗi khi cập nhật thông tin bác sĩ:", err);
      alert("Lưu thất bại!");
    }
  };
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`star ${index < rating ? "filled" : ""}`}>
        ⭐
      </span>
    ));
  };

  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  return (
    <div className="profile-container">
      {/* Header */}
      <div className="profile-header">
        <div>
          <h2>Hồ sơ bác sĩ</h2>
          <p>Quản lý thông tin cá nhân và xem đánh giá từ bệnh nhân</p>
        </div>
      </div>

      {/* Main Content - 2 columns */}
      <div className="profile-content">
        {/* Left Column - Doctor Information */}
        <div className="doctor-info-section">
          <h3>Thông Tin Cá Nhân</h3>
          <div className="doctor-card">
            <div className="doctor-details">
              <div className="info-grid">
                <div className="info-item">
                  <label>Họ và Tên</label>
                  <input
                    type="text"
                    className="edit-input"
                    value={doctorInfo.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    placeholder="Nhập họ và tên"
                  />
                </div>
                <div className="info-item">
                  <label>Giới Tính</label>
                  <select
                    className="edit-select"
                    value={doctorInfo.gender}
                    onChange={(e) =>
                      handleInputChange("gender", e.target.value)
                    }
                  >
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                  </select>
                </div>
                <div className="info-item">
                  <label>Ngày Sinh</label>
                  <input
                    type="date"
                    className="edit-input"
                    value={doctorInfo.birthDate}
                    onChange={(e) =>
                      handleInputChange("birthDate", e.target.value)
                    }
                  />
                </div>
                <div className="info-item">
                  <label>Chuyên Môn</label>
                  <select
                    className="edit-select"
                    value={doctorInfo.specialty}
                    onChange={(e) =>
                      handleInputChange("specialty", e.target.value)
                    }
                  >
                    <option value="IVF">IVF</option>
                    <option value="IUI">IUI</option>
                  </select>
                </div>
                <div className="info-item">
                  <label>Số điện thoại</label>
                  <input
                    type="text"
                    className="edit-input"
                    value={doctorInfo.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Nhập số điện thoại"
                  />
                </div>
              </div>
              <button className="btn-save" onClick={handleSave}>
                💾 Lưu Thông Tin
              </button>
            </div>
          </div>
        </div>
        <br></br>

        {/* Right Column - Reviews */}
        <div className="reviews-section">
          <h3>Đánh Giá Từ Bệnh Nhân</h3>

          {/* Rating Summary */}
          <div className="reviews-summary">
            <span className="rating-number">{averageRating.toFixed(1)}</span>
            <div className="stars">
              {renderStars(Math.round(averageRating))}
            </div>
            <div className="total-reviews">({reviews.length} đánh giá)</div>
          </div>

          {/* Individual Reviews */}
          <div className="reviews-list">
            {reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <div className="patient-info">
                    <h4>{review.patientName}</h4>
                  </div>
                  <div className="review-meta">
                    <div className="rating">{renderStars(review.rating)}</div>
                    <div className="review-date">{formatDate(review.date)}</div>
                  </div>
                </div>
                <div className="review-content">
                  <p>{review.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileLayout;
