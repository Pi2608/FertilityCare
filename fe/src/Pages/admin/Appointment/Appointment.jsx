"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import apiAppointment1 from "../../../features/service/apiAppointment1";
import "./Appointment.css";

const Appointment = () => {
  const [activeTab, setActiveTab] = useState("new");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await apiAppointment1.getAllOverviewAppointments();
        console.log("Lịch hẹn từ API:", data);

        const mapped = data.map((item) => {
          const dateObj = new Date(item.date);
          const formattedDate = dateObj.toLocaleDateString("vi-VN");
          const formattedTime = dateObj.toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
          });

          return {
            time: formattedTime,
            date: formattedDate,
            patient: {
              name: item.customerName,
              initials: item.customerName
                .split(" ")
                .map((part) => part[0])
                .join("")
                .toUpperCase(),
            },
            age: "--", // vì API không trả tuổi
            doctor: item.doctorName,
            type: item.type === "tu_van" ? "Tư vấn" : "Tái khám",
          };
        });

        setAppointments(mapped);
      } catch (err) {
        console.error("Lỗi khi lấy lịch hẹn:", err);
      }
    };

    fetchAppointments();
  }, []);

  const currentAppointments = appointments;

  const filteredAppointments = currentAppointments.filter((appointment) => {
    const matchesSearch =
      appointment.patient.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate =
      selectedDate === "" || appointment.date === selectedDate;

    return matchesSearch && matchesDate;
  });

  return (
    <div className="appointment-page">
      {/* Header */}
      <header className="appointment-header">
        <h1 className="page-title">Thông tin cuộc hẹn</h1>
        <div className="header-actions">
        </div>
      </header>

      {/* Content */}
      <main className="appointment-content">
        {/* Tabs and New Appointment Button */}
        <div className="ad-content-header">
          <div className="tabs-container">
            <button
              className={`tab ${activeTab === "new" ? "active" : ""}`}
              onClick={() => setActiveTab("new")}
            >
              CUỘC HẸN MỚI
            </button>
            <button
              className={`tab ${activeTab === "completed" ? "active" : ""}`}
              onClick={() => setActiveTab("completed")}
            >
              CUỘC HẸN ĐÃ HOÀN THÀNH
            </button>
          </div>
        </div>

        <div className="tab-content">
          {/* Search and Filter */}
          <div className="search-filter-section">
            <div className="search-box">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Tìm kiếm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="filter-date-container">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="date-filter-input"
              />
              <button
                className="filter-button"
                onClick={() => setSelectedDate("")}
              >
                Xoá bộ lọc
              </button>
            </div>
          </div>

          {/* Appointments Table */}
          {filteredAppointments.length > 0 ? (
            <>
              <div className="table-wrapper">
                <table className="appointments-table">
                  <thead>
                    <tr>
                      <th>Thời gian</th>
                      <th>Ngày</th>
                      <th>Họ và tên</th>
                      <th>Tuổi</th>
                      <th>Bác sĩ</th>
                      <th>Phân loại</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAppointments.map((appointment, index) => (
                      <tr key={index}>
                        <td className="time-cell">{appointment.time}</td>
                        <td>{appointment.date}</td>
                        <td className="patient-cell">
                          <div className="patient-info">
                            <div className="patient-avatar">
                              {appointment.patient.initials}
                            </div>
                            <span>{appointment.patient.name}</span>
                          </div>
                        </td>
                        <td>{appointment.age}</td>
                        <td>{appointment.doctor}</td>
                        <td className="type-cell">
                          <span
                            className={`appointment-type ${
                              appointment.type === "Tái khám"
                                ? "recheck"
                                : "consultation"
                            }`}
                          >
                            {appointment.type}
                          </span>
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
                </div>

                <button className="pagination-btn next">Tiếp theo</button>
              </div>
            </>
          ) : (
            <div className="empty-state">
              <p>
                No {activeTab === "new" ? "new" : "completed"} appointments to
                display
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Appointment;
