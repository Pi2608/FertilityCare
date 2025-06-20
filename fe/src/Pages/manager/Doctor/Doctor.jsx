"use client";

import { useEffect, useState } from "react";
import "./Doctor.css";
import DoctorAPI from "../../../features/service/apiDoctor1";

const Doctor = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [doctorsData, setDoctorsData] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await DoctorAPI.getAllDoctors();
        const mappedDoctors = data.map((doc, index) => ({
          id: doc.userId || index,
          name: doc.name,
          avatar: "/placeholder.svg?height=40&width=40",
          initials: getInitials(doc.name),
          gender: doc.gender === "male" ? "Nam" : "Nữ",
          birthDate: formatDate(doc.dob),
          specialty: doc.specification,
          experience: doc.experience,
          rating: doc.ratingAvg ?? "Chưa có",
          isActive: doc.isActive,
        }));

        setDoctorsData(mappedDoctors);
      } catch (error) {
        console.error("Lỗi gọi API bác sĩ:", error);
      }
    };

    fetchDoctors();
  }, []);

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleToggleStatus = (doctorId) => {
    setDoctorsData((prev) =>
      prev.map((doctor) =>
        doctor.id === doctorId
          ? { ...doctor, isActive: !doctor.isActive }
          : doctor
      )
    );
  };

  const filteredDoctors = doctorsData.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && doctor.isActive) ||
      (statusFilter === "inactive" && !doctor.isActive);

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="doctor-page">
      {/* Header */}
      <header className="doctor-header">
        <h1 className="page-title">Thông tin bác sĩ</h1>

        <div className="header-actions">
          <div className="notification-bell">
            <span>🔔</span>
            <div className="notification-dot"></div>
          </div>

          <div className="user-profile">
            <div className="avatar">
              <span>JC</span>
            </div>
            <div className="user-info">
              <div className="user-name">Jonitha Cathrine</div>
              <div className="user-role">Manager</div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="doctor-content">
        {/* Search and Filter */}
        <div className="search-section">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Tìm kiếm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-section">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="status-filter"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Đang hoạt động</option>
              <option value="inactive">Không hoạt động</option>
            </select>
          </div>
        </div>

        {/* Doctors Table */}
        <div className="table-wrapper">
          <table className="doctors-table">
  <thead>
    <tr>
      <th>Họ và tên</th>
      <th>Giới tính</th>
      <th>Ngày sinh</th>
      <th>Chuyên môn</th>
      <th>Kinh nghiệm</th>
      <th>Đánh giá</th>
      <th>Trạng thái</th>
    </tr>
  </thead>
  <tbody>
    {filteredDoctors.map((doctor) => (
      <tr key={doctor.id}>
        <td className="doctor-name-cell">
          <div className="doctor-info">
            
            <span className="doctor-name">{doctor.name}</span>
          </div>
        </td>
        <td>{doctor.gender}</td>
        <td>{doctor.birthDate}</td>
        <td>{doctor.specialty}</td>
        <td>{doctor.experience}</td>
        <td>
          <div className="rating">
            <span className="rating-value">{doctor.rating}</span>
          </div>
        </td>
        <td>
          <button
            onClick={() => handleToggleStatus(doctor.id)}
            className={`status-toggle-btn ${
              doctor.isActive ? "active" : "inactive"
            }`}
          >
            {doctor.isActive ? "Hoạt động" : "Không hoạt động"}
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

        </div>

        {/* Pagination */}
        <div className="pagination-section">
          <button className="pagination-btn prev">Trước đó</button>
          <div className="page-numbers">
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <button className="page-btn">4</button>
            <button className="page-btn next-page">Tiếp theo</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Doctor;
