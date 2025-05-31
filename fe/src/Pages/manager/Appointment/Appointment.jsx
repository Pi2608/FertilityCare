"use client"

import { useState } from "react"
import "./Appointment.css"

const Appointment = () => {
  const [activeTab, setActiveTab] = useState("new")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDate, setSelectedDate] = useState("")

  const newAppointments = [
    {
      time: "9:30 AM",
      date: "05/12/2022",
      patient: { name: "Elizabeth Polson", initials: "EP" },
      age: 32,
      doctor: "Dr. John",
      type: "Tái khám",
    },
    {
      time: "9:30 AM",
      date: "05/12/2022",
      patient: { name: "John David", initials: "JD" },
      age: 28,
      doctor: "Dr. Joel",
      type: "Tái khám",
    },
    {
      time: "10:30 AM",
      date: "05/12/2022",
      patient: { name: "Krishtav Rajan", initials: "KR" },
      age: 24,
      doctor: "Dr. Joel",
      type: "Tư vấn",
    },
    {
      time: "11:00 AM",
      date: "05/12/2022",
      patient: { name: "Sumanth Tinson", initials: "ST" },
      age: 26,
      doctor: "Dr. John",
      type: "Tư vấn",
    },
    {
      time: "11:30 AM",
      date: "05/12/2022",
      patient: { name: "EG Subramani", initials: "ES" },
      age: 77,
      doctor: "Dr. John",
      type: "Tái khám",
    },
    {
      time: "11:00 AM",
      date: "05/12/2022",
      patient: { name: "Ranjan Maari", initials: "RM" },
      age: 77,
      doctor: "Dr. John",
      type: "Tư vấn",
    },
    {
      time: "11:00 AM",
      date: "05/12/2022",
      patient: { name: "Philipile Gopal", initials: "PG" },
      age: 55,
      doctor: "Dr. John",
      type: "Tái khám",
    },
  ]

  const completedAppointments = [
    {
      time: "9:30 AM",
      date: "05/12/2022",
      patient: { name: "Elizabeth Polson", initials: "EP" },
      age: 32,
      doctor: "Dr. John",
      feeStatus: "Paid",
      type: "Tái khám",
    },
    {
      time: "9:30 AM",
      date: "05/12/2022",
      patient: { name: "John David", initials: "JD" },
      age: 28,
      doctor: "Dr. Joel",
      feeStatus: "UnPaid",
      type: "Tái khám",
    },
    {
      time: "10:30 AM",
      date: "05/12/2022",
      patient: { name: "Krishtav Rajan", initials: "KR" },
      age: 24,
      doctor: "Dr. Joel",
      feeStatus: "Paid",
      type: "Tư vấn",
    },
    {
      time: "11:00 AM",
      date: "05/12/2022",
      patient: { name: "Sumanth Tinson", initials: "ST" },
      age: 26,
      doctor: "Dr. John",
      feeStatus: "UnPaid",
      type: "Tư vấn",
    },
    {
      time: "11:30 AM",
      date: "05/12/2022",
      patient: { name: "EG Subramani", initials: "ES" },
      age: 77,
      doctor: "Dr. John",
      feeStatus: "UnPaid",
      type: "Tái khám",
    },
    {
      time: "11:00 AM",
      date: "05/12/2022",
      patient: { name: "Ranjan Maari", initials: "RM" },
      age: 77,
      doctor: "Dr. John",
      feeStatus: "UnPaid",
      type: "Tư vấn",
    },
    {
      time: "11:00 AM",
      date: "05/12/2022",
      patient: { name: "Philipile Gopal", initials: "PG" },
      age: 55,
      doctor: "Dr. John",
      feeStatus: "Paid",
      type: "Tái khám",
    },
  ]

  const currentAppointments = activeTab === "new" ? newAppointments : completedAppointments

  const filteredAppointments = currentAppointments.filter((appointment) => {
    const matchesSearch = appointment.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDate = selectedDate === "" || appointment.date === selectedDate

    return matchesSearch && matchesDate
  })

  return (
    <div className="appointment-page">
      {/* Header */}
      <header className="appointment-header">
        <h1 className="page-title">Appointments</h1>

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
      <main className="appointment-content">
        {/* Tabs and New Appointment Button */}
        <div className="content-header">
          <div className="tabs-container">
            <button className={`tab ${activeTab === "new" ? "active" : ""}`} onClick={() => setActiveTab("new")}>
              NEW APPOINTMENTS
            </button>
            <button
              className={`tab ${activeTab === "completed" ? "active" : ""}`}
              onClick={() => setActiveTab("completed")}
            >
              COMPLETED APPOINTMENTS
            </button>
          </div>

          {/* {activeTab === "completed" && (
            <button className="new-appointment-btn">
              <span>+</span>
              New Appointment
            </button>
          )} */}
        </div>

        <div className="tab-content">
          {/* Search and Filter */}
          <div className="search-filter-section">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search"
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
                <span>📅</span>
                Clear Filter
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
                      <th>Time ▼</th>
                      <th>Date ▼</th>
                      <th>Patient Name ▼</th>
                      <th>Patient Age ▼</th>
                      <th>Doctor ▼</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAppointments.map((appointment, index) => (
                      <tr key={index}>
                        <td className="time-cell">{appointment.time}</td>
                        <td>{appointment.date}</td>
                        <td className="patient-cell">
                          <div className="patient-info">
                            <div className="patient-avatar">{appointment.patient.initials}</div>
                            <span>{appointment.patient.name}</span>
                          </div>
                        </td>
                        <td>{appointment.age}</td>
                        <td>{appointment.doctor}</td>
                        <td className="type-cell">
                          <span className={`appointment-type ${appointment.type === "Tái khám" ? "recheck" : "consultation"}`}>
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
                <button className="pagination-btn prev">Previous</button>

                <div className="page-numbers">
                  <button className="page-btn active">1</button>
                  <button className="page-btn">2</button>
                  <button className="page-btn">3</button>
                  <button className="page-btn">4</button>
                </div>

                <button className="pagination-btn next">Next</button>
              </div>
            </>
          ) : (
            <div className="empty-state">
              <p>No {activeTab === "new" ? "new" : "completed"} appointments to display</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Appointment
