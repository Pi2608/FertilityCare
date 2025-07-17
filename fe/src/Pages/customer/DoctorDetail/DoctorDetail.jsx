import React, { useState, useEffect } from "react";
import "./DoctorDetail.css";
import { useParams } from "react-router-dom";
import { Star } from "lucide-react";
import DoctorAPI from "../../../features/service/apiDoctor";
import MaleDoc from "@asset/male-fertility-specialist.png";
import FemaleDoc from "@asset/asian-female-doctor.png";
import apiFeedback from "../../../features/service/apiFeedback";

const DoctorDetail = () => {
  const [activeTab, setActiveTab] = useState("introduce");

  const [doctorData, setDoctorData] = useState(null);
  const { doctorId } = useParams();
  console.log("🆔 doctorId từ URL:", doctorId);

  useEffect(() => {
    fetchDoctorDetail();
  }, []);

  useEffect(() => {
    if (doctorData) {
      console.log("✅ doctorData đã sẵn sàng:", doctorData);
    }
  }, [doctorData]);

  const fetchDoctorDetail = async () => {
    try {
      const response = await DoctorAPI.getDoctorById(doctorId);
      console.log("📦 Dữ liệu raw từ API:", response);

      const doctor = response.data;

      const allFeedbackRes = await apiFeedback.getAllFeedbacks();
      const feedbacks = allFeedbackRes.filter(
        (fb) => fb.doctorId === parseInt(doctorId)
      );
      const avgRating =
        feedbacks.reduce((sum, fb) => sum + fb.rating, 0) / feedbacks.length ||
        0;

      // Giả lập các trường còn thiếu nếu API chưa trả về
      const mapped = {
        name: doctor.name,
        specialty: doctor.specification || "Đang cập nhật",
        gender: doctor.gender,
        email: doctor.email,
        phone: doctor.phone,
        rating: avgRating.toFixed(1),
        overallRating: avgRating.toFixed(1),
        totalReviews: feedbacks.length,
        location: "Hồ Chí Minh",
        joinDate: "22/05/2023", // có thể lấy từ trường khác nếu backend hỗ trợ
        avatar: doctor.gender === "male" ? MaleDoc : FemaleDoc,
        specialties: [`${doctor.specification} - Chuyên khoa Hiếm muộn`],
        introduction:
          doctor.about?.replace(/<br>/g, "\n") ||
          "Chưa có thông tin giới thiệu.",
        treatmentApproach: {
          description: doctor.approach || "Chưa cập nhật phương pháp.",
        },
        workingHours: {
          "Thứ 2": "08:00 - 17:00",
          "Thứ 4": "08:00 - 17:00",
          "Thứ 6": "08:00 - 17:00",
        },
        education: doctor.education
          ? [
              {
                period: "", // hoặc tách từ chuỗi nếu có thông tin thời gian
                degree: doctor.education,
                institution: "",
              },
            ]
          : [],
        certifications: doctor.certificates
          ? [
              {
                year: "", // hoặc tách nếu có năm
                title: doctor.certificates,
                organization: "",
              },
            ]
          : [],
        experience: doctor.workExperience
          ? [
              {
                period: "", // nếu có thời gian
                position: "Chuyên môn",
                workplace: "",
                responsibilities: doctor.workExperience
                  .split("<br>")
                  .map((item) => item.trim())
                  .filter(Boolean),
              },
            ]
          : [],
        activities: [], // có thể cập nhật sau
        ratingBreakdown: [],
        reviews: feedbacks.map((fb) => ({
          comment: fb.comment,
          rating: fb.rating,
          customerName: fb.customerName,
          date: fb.createAt,
        })),
      };

      setDoctorData(mapped);
    } catch (error) {
      console.error("Lỗi khi fetch bác sĩ theo ID:", error);
    }
  };

  const DoctorCard = ({ doctor }) => {
    return (
      <div className="doctor-card">
        {/* <div className="img-container">
                    <img src={doctor.avatar} alt={doctor.name} className="doctor-avatar" />
                </div> */}

        <div className="doctor-info">
          <h3 className="doctor-name">Bác sĩ {doctor.name}</h3>
          <p className="doctor-specialty">{doctor.specialty}</p>

          <div className="doctor-rating">
            <span className="stars">
              {renderStars(doctorData.overallRating)}
            </span>
            <span className="rating-value">{doctor.rating}</span>
            <span className="rating-count">
              ({doctor.totalReviews} đánh giá)
            </span>
          </div>

          <button className="appointment-button">Đặt Lịch Hẹn</button>
        </div>
      </div>
    );
  };

  const SpecialtiesList = ({ specialties }) => {
    return (
      <ul className="specialties-list">
        {specialties.map((item, index) => {
          const [label, description] = item.split(" - ");
          return (
            <li key={index} className="specialty-item">
              <span className="specialty-label">{label}</span>
              <span className="specialty-description">{description}</span>
            </li>
          );
        })}
      </ul>
    );
  };

  const WorkingHours = ({ workingHours }) => {
    return (
      <div className="working-hours-grid">
        {Object.entries(workingHours).map(([day, hours]) => (
          <div key={day} className="working-hours-card">
            <div className="day">{day}</div>
            <div className="time">{hours}</div>
          </div>
        ))}
      </div>
    );
  };

  const renderRatingBar = (value) => {
    const percentage = (value / 5) * 100;
    return (
      <div className="rating-bar">
        <div
          className="rating-bar-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    );
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={i < Math.floor(rating) ? "star-filled" : "star-empty"}
        fill={i < Math.floor(rating) ? "#ffc107" : "none"}
      />
    ));
  };

  const navItems = [
    { key: "introduce", label: "Giới thiệu" },
    { key: "certifications", label: "Học vấn" },
    { key: "experience", label: "Kinh nghiệm" },
    { key: "feedback", label: "Đánh giá" },
  ];

  const renderIntroduce = () => (
    <div className="intro">
      <div className="about">
        <h1>Về bác sĩ {doctorData.name}</h1>
        <p>
          {doctorData.introduction.split("\n").map((line, i) => (
            <p key={i} className="content-paragraph">
              {line}
            </p>
          ))}
        </p>
      </div>
      <div className="approach">
        <h1>Phương pháp tiếp cận</h1>
        <p>{doctorData.treatmentApproach.description}</p>
      </div>
      <div className="schedule">
        <h1>Lịch làm việc</h1>

        <div className="working-hours-text">
          <p>
            Bác sĩ hiện có lịch khám từ <strong>Thứ 2 đến Thứ 6</strong>, từ{" "}
            <strong>08:00 - 17:00</strong> mỗi ngày.
          </p>
        </div>
        <button className="appointment-button">Đặt Lịch Hẹn</button>
      </div>
    </div>
  );

  const renderCertifications = () => (
    <div className="edu-cert">
      <div className="education">
        <h1>Học vấn và Chứng chỉ</h1>
        <div className="edu-list">
          {doctorData.education.map((item, index) => (
            <div key={index}>
              <p>{item.period}</p>
              <p className="degree">
                <p> {item.degree} </p>
              </p>
              <p>{item.institution}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="certificate">
        <h2>Chứng chỉ chuyên môn</h2>
        <div className="cert-list">
          {doctorData.certifications.map((cert, index) => (
            <div key={index}>
              <p>{cert.year}</p>
              <p className="degree">
                <p>{cert.title}</p>
              </p>
              <p>{cert.organization}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="schedule">
        <h1>Lịch làm việc</h1>

        <div className="working-hours-text">
          <p>
            Bác sĩ hiện có lịch khám từ <strong>Thứ 2 đến Thứ 6</strong>, từ{" "}
            <strong>08:00 - 17:00</strong> mỗi ngày.
          </p>
        </div>
        <button className="appointment-button">Đặt Lịch Hẹn</button>
      </div>
    </div>
  );

  const renderExperience = () => (
    <div className="exp">
      <div className="exprience">
        <h1>Kinh nghiệm chuyên môn</h1>
        <div className="exp-list">
          {doctorData.experience.map((item, index) => (
            <div key={index}>
              <p>{item.period}</p>
              <p className="position">
                <strong>{item.position}</strong>
              </p>
              <p>{item.workplace}</p>
              {item.responsibilities.map((resp, respIndex) => (
                <p key={respIndex} className="content-paragraph">
                  {resp}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="schedule">
        <h1>Lịch làm việc</h1>

        <div className="working-hours-text">
          <p>
            Bác sĩ hiện có lịch khám từ <strong>Thứ 2 đến Thứ 6</strong>, từ{" "}
            <strong>08:00 - 17:00</strong> mỗi ngày.
          </p>
        </div>
        <button className="appointment-button">Đặt Lịch Hẹn</button>
      </div>
    </div>
  );

  const renderReviews = () => (
    <div className="reviews">
      <div className="reviews-header">
        <h1 className="title">Đánh Giá Từ Bệnh Nhân</h1>
        <p className="subtitle">
          Dựa trên {doctorData.totalReviews} đánh giá từ bệnh nhân đã điều trị
          với Bác sĩ {doctorData.name}
        </p>

        <div className="overall-rating">
          <span className="rating-number">{doctorData.overallRating}</span>
          <div className="stars-container">
            {renderStars(doctorData.overallRating)}
          </div>
          <span className="total-reviews">
            {doctorData.totalReviews} đánh giá
          </span>
        </div>

        {doctorData.ratingBreakdown.map((rating, index) => (
          <div key={index} className="rating-item">
            <span className="rating-label">{rating.label}</span>
            {renderRatingBar(rating.value)}
            <span className="rating-value">{rating.value}</span>
          </div>
        ))}
      </div>

      {/* ✅ Thêm đoạn này vào bên trong renderReviews */}
      <div className="reviews-list">
        {doctorData.reviews.map((review, idx) => (
          <div key={idx} className="review-card">
            <div className="review-header">
              <strong>{review.customerName}</strong>{" "}
              {new Date(review.date).toLocaleDateString()}
            </div>

            {review.comment && (
              <p className="review-comment">{review.comment}</p>
            )}

            <div className="review-rating">
              {renderStars(review.rating)}{" "}
              {/* <span className="rating-number">{review.rating}</span> */}
            </div>
          </div>
        ))}
      </div>

      <div className="schedule">
        <h1>Lịch làm việc</h1>
        <div className="working-hours-text">
          <p>
            Bác sĩ hiện có lịch khám từ <strong>Thứ 2 đến Thứ 6</strong>, từ{" "}
            <strong>08:00 - 17:00</strong> mỗi ngày.
          </p>
        </div>
        <button className="appointment-button">Đặt Lịch Hẹn</button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "introduce":
        return renderIntroduce();
      case "certifications":
        return renderCertifications();
      case "experience":
        return renderExperience();
      case "feedback":
        return renderReviews();
      default:
        return renderIntroduce();
    }
  };

  if (!doctorData) return <div>Đang tải thông tin bác sĩ...</div>;

  return (
    <div className="doctor-detail">
      <div className="doctor">
        <div className="card">
          <DoctorCard doctor={doctorData} />
        </div>
        <div className="doctor-specialties">
          <SpecialtiesList specialties={doctorData.specialties} />
        </div>
      </div>
      <div className="detail">
        <div className="nav-bar">
          {navItems.map((item) => (
            <button
              key={item.key}
              className={`nav-item ${activeTab === item.key ? "active" : ""}`}
              onClick={() => setActiveTab(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="detail-content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default DoctorDetail;
