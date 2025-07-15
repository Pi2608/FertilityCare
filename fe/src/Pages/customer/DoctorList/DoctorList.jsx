import React, { useState, useEffect } from "react";
import { Star, MapPin, Calendar, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MaleDoc from "@asset/male-fertility-specialist.png";
import FemaleDoc from "@asset/asian-female-doctor.png";
import DoctorAPI from "../../../features/service/apiDoctor";
import "./DoctorList.css";
import apiFeedback from "../../../features/service/apiFeedback";

const DoctorList = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("Tất cả");
  const [doctors, setDoctors] = useState([]);

  const [specialties, setSpecialties] = useState(["Tất cả"]);

  const fetchAllDoctors = async () => {
    try {
      const [doctorRes, feedbackRes] = await Promise.all([
        DoctorAPI.getActiveDoctors(),
        apiFeedback.getAllFeedbacks(),
      ]);

      console.log(feedbackRes);
      const doctorList = doctorRes.data;
      const feedbackList = feedbackRes;

      if (Array.isArray(doctorList)) {
        const fetchedDoctors = doctorList.map((doctor) => {
          const doctorFeedbacks = feedbackList.filter(
            (fb) => fb.doctorId === doctor.userId
          );
          const avgRating =
            doctorFeedbacks.reduce((sum, fb) => sum + fb.rating, 0) /
              doctorFeedbacks.length || 0;

          return {
            id: doctor.userId,
            name: doctor.name || "Chưa có tên",
            specialty: doctor.specification || "Chưa cập nhật",
            rating: avgRating.toFixed(1),
            reviews: doctorFeedbacks.length,
            description: "",
            location: "",
            lastUpdate: "",
            image: doctor.gender === "male" ? MaleDoc : FemaleDoc,
          };
        });

        setDoctors(fetchedDoctors);

        const uniqueSpecs = [
          "Tất cả",
          ...new Set(
            fetchedDoctors.map((doc) => doc.specialty).filter(Boolean)
          ),
        ];
        setSpecialties(uniqueSpecs);
      }
    } catch (error) {
      console.error("Lỗi khi fetch danh sách bác sĩ hoặc đánh giá:", error);
    }
  };

  useEffect(() => {
    fetchAllDoctors();
  }, []);

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSpecialty =
      selectedSpecialty === "Tất cả" || doctor.specialty === selectedSpecialty;

    return matchesSearch && matchesSpecialty;
  });

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

  return (
    <div className="doctor-list">
      <div className="container">
        <div className="page-header">
          <h1>Đội Ngũ Bác Sĩ Của Chúng Tôi</h1>
          <p>
            Gặp gỡ các chuyên gia nổi tiếng sinh sản và bác sĩ hiếm muộn đã giúp
            hàng nghìn cặp vợ chồng thực hiện ước mơ làm cha mẹ.
          </p>
        </div>

        <div className="search-filter-doctor-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Tìm kiếm bác sĩ theo tên hoặc chuyên khoa..."
              value={searchTerm}
              className="search-input"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-btn" onClick={() => setSearchTerm("")}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
          </div>

          <div className="specialty-filter">
            <div className="filter-title">Chuyên khoa:</div>
            <div className="specialty-tabs">
              {specialties.map((specialty) => (
                <button
                  key={specialty}
                  className={`specialty-tab ${
                    selectedSpecialty === specialty ? "active" : ""
                  }`}
                  onClick={() => setSelectedSpecialty(specialty)}
                >
                  {specialty}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="results-info">
          <p>
            Hiển thị {filteredDoctors.length} bác sĩ
            {searchTerm && ` cho "${searchTerm}"`}
          </p>
        </div>

        <div className="doctors-grid">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <div key={doctor.id} className="doctor-card">
                <div className="doctor-info">
                  <h3 className="doctor-name">{doctor.name}</h3>
                  <p className="doctor-specialty">{doctor.specialty}</p>

                  <div className="doctor-rating">
                    <div className="stars">{renderStars(doctor.rating)}</div>
                    <span className="rating-text">
                      {doctor.rating} ({doctor.reviews} đánh giá)
                    </span>
                  </div>

                  <div className="doctor-actions">
                    <button
                      className="view-profile-btn"
                      onClick={() => navigate(`doctor-detail/${doctor.id}`)}
                    >
                      Xem Hồ Sơ
                    </button>
                    <button className="book-appointment-btn">
                      Đặt Lịch Hẹn
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <div className="no-results-content">
                <User size={60} color="#ccc" />
                <h3>Không tìm thấy bác sĩ nào</h3>
                <p>
                  Không có bác sĩ nào phù hợp với tiêu chí tìm kiếm của bạn.
                </p>
                <button
                  className="clear-filters-btn"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedSpecialty("Tất cả");
                  }}
                >
                  Xóa bộ lọc
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="page-footer-text">
          <p>
            Đội ngũ bác sĩ của chúng tôi luôn sẵn sàng hỗ trợ bạn trong hành
            trình điều trị hiếm muộn. Đặt lịch hẹn ngay hôm nay để biết điều.
          </p>
          <button className="consultation-btn">Đặt Lịch Tư Vấn</button>
        </div>
      </div>
    </div>
  );
};

export default DoctorList;
