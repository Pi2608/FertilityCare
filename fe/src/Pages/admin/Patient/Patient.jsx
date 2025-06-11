"use client"

import { useState } from "react"
import "./Patient.css"

const Patient = () => {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="patient-page">
      {/* Header */}
      <header className="patient-header">
        <h1 className="page-title">Thông tin bệnh nhân</h1>

        <div className="header-actions">
          <div className="notification-bell">
            <span>🔔</span>
            <div className="notification-dot"></div>
          </div>

          <div className="user-profile">
            <div className="avatar">
              <img src="/placeholder.svg?height=40&width=40" alt="Admin" />
            </div>
            <div className="user-info">
              <div className="user-name">Jonitha Cathrine</div>
              <div className="user-role">Admin</div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="patient-content">
        {/* Search */}
        <div className="search-section">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Tìm kiếm'"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Patients Table */}
        <div className="table-wrapper">
          <table className="patients-table">
            <thead>
              <tr>
                <th>Họ và tên</th>
                <th>Giới tính</th>
                <th>Ngày sinh</th>
                <th>Email</th>
                <th>Số điện thoại</th>
              </tr>
            </thead>
            <tbody>
              {/* Empty table body - data will be populated via API */}
              <tr>
                <td colSpan="5" className="empty-message">
                  Dữ liệu sẽ được tải từ API
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination-section">
          <button className="pagination-btn prev">Previous</button>

          <div className="page-numbers">
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <button className="page-btn">4</button>
          </div>

          <button className="pagination-btn next">Next</button>
        </div>
      </main>
    </div>
  )
}

export default Patient
