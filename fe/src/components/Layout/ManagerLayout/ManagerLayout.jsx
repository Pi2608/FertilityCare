"use client"

import { useEffect } from "react"
import { Outlet, Link, useLocation } from "react-router-dom"
import Header from "@components/Header/Header"

import Sidebar from "@components/Sidebar/Sidebar"
import "./ManagerLayout.css"

const ManagerLayout = () => {
  const userType = localStorage.getItem("userType") || "Manager"

  const location = useLocation()

  const menuItems = [
    {
      name: "Lịch hẹn",
      path: "/manager-dashboard/appointment",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
          <path
            fill="currentColor"
            d="M14.25 2.5h-.77v-1h-1.25v1H3.68v-1H2.43v1h-.68A1.25 1.25 0 0 0 .5 3.75v9.5a1.25 1.25 0 0 0 1.25 1.25h12.5a1.25 1.25 0 0 0 1.25-1.25v-9.5a1.25 1.25 0 0 0-1.25-1.25M1.75 3.75h12.5V5H1.75zm0 9.5v-7h12.5v7z"
          />
        </svg>
      ),
    },
    {
      name: "Bác sĩ",
      path: "/manager-dashboard/doctor",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12 2a5 5 0 1 1-5 5a5 5 0 0 1 5-5m0 2a3 3 0 1 0 3 3a3 3 0 0 0-3-3m9 11a1 1 0 0 1-1 1h-3v3a1 1 0 0 1-2 0v-3h-3a1 1 0 0 1 0-2h3v-3a1 1 0 0 1 2 0v3h3a1 1 0 0 1 1 1M1 18v-1a7 7 0 0 1 7-7h.75a1 1 0 0 1 0 2H8a5 5 0 0 0-5 5v1a1 1 0 0 1-2 0"
          />
        </svg>
      ),
    },
    {
      name: "Bệnh nhân",
      path: "/manager-dashboard/patient",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </g>
        </svg>
      ),
    },
    {
      name: "Tin nhắn",
      path: "/manager-dashboard/message",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            d="M3 20.29V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7.961a2 2 0 0 0-1.561.75l-2.331 2.914A.6.6 0 0 1 3 20.29Z"
          />
        </svg>
      ),
    },
    {
      name: "Nội dung giáo dục",
      path: "/manager-dashboard/education-content",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9zm6.82 6L12 12.72L5.18 9L12 5.28zM17 15.99l-5 2.73l-5-2.73v-3.72L12 15l5-2.73z"
          />
        </svg>
      ),
    },
    {
      name: "Kho thuốc",
      path: "/manager-dashboard/medicine-inventory",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2-2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m6 2a6 6 0 0 0-6 6c0 3.31 2.69 6 6 6s6-2.69 6-6a6 6 0 0 0-6-6m0 2c2.21 0 4 1.79 4 4s-1.79 4-4 4s-4-1.79-4-4s1.79-4 4-4m-1 1v2h-2v2h2v2h2v-2h2V9h-2V7z"
          />
        </svg>
      ),
    },
    {
      name: "Báo cáo",
      path: "/manager-dashboard/report",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
          <path fill="currentColor" d="M3 3v17a1 1 0 0 0 1 1h17v-2H5V3z" />
          <path
            fill="currentColor"
            d="M15.293 14.707a1 1 0 0 0 1.414 0l5-5l-1.414-1.414L16 12.586l-2.293-2.293a1 1 0 0 0-1.414 0l-5 5l1.414 1.414L13 12.414z"
          />
        </svg>
      ),
    },
    {
      name: "Cài đặt",
      path: "/manager-dashboard/settings",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
          <g fill="none" stroke="currentColor" strokeWidth="1">
            <path d="m13.258 8.354l.904.805a.91.91 0 0 1 .196 1.169l-1.09 1.862a.94.94 0 0 1-.35.341a1 1 0 0 1-.478.125a1 1 0 0 1-.306-.046l-1.157-.382q-.304.195-.632.349l-.243 1.173a.93.93 0 0 1-.339.544a.97.97 0 0 1-.618.206H6.888a.97.97 0 0 1-.618-.206a.93.93 0 0 1-.338-.544l-.244-1.173a6 6 0 0 1-.627-.35L3.9 12.61a1 1 0 0 1-.306.046a1 1 0 0 1-.477-.125a.94.94 0 0 1-.35-.34l-1.129-1.863a.91.91 0 0 1 .196-1.187L2.737 8v-.354l-.904-.805a.91.91 0 0 1-.196-1.169L2.766 3.81a.94.94 0 0 1 .35-.341a1 1 0 0 1 .477-.125a1 1 0 0 1 .306.028l1.138.4q.305-.195.632-.349l.244-1.173a.93.93 0 0 1 .338-.544a.97.97 0 0 1 .618-.206h2.238a.97.97 0 0 1 .618.206c.175.137.295.33.338.544l.244 1.173q.325.155.627.35l1.162-.382a.98.98 0 0 1 .784.078c.145.082.265.2.35.34l1.128 1.863a.91.91 0 0 1-.182 1.187l-.918.782z" />
            <path d="M10.5 8a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0Z" />
          </g>
        </svg>
      ),
    },
  ]

  const isActive = (path) => {
    if (path === "/manager-dashboard") {
      return location.pathname === "/manager-dashboard"
    }
    return location.pathname.startsWith(path)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="manager_layout">
      <Header />
      <main className="content">
        <aside className="sidebar">
          {/* Sidebar Header */}
          <div className="sidebar-header">
            <h2 className="sidebar-title">Trung tâm IVF</h2>
            <p className="sidebar-subtitle">Cổng thông tin Manager</p>
          </div>

          {/* Sidebar Navigation */}
          <nav className="sidebar-nav">
            {menuItems.map((item, index) => (
              <Link key={index} to={item.path} className={`sidebar-nav-item ${isActive(item.path) ? "active" : ""}`}>
                <div className="sidebar-nav-icon">{item.icon}</div>
                <span className="sidebar-nav-text">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="sidebar-footer">
            <Link to="/logout" className="sidebar-logout">
              <div className="sidebar-logout-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h7v2H5v14h7v2H5zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5l-5 5z"
                  />
                </svg>
              </div>
              <span>Đăng xuất</span>
            </Link>
          </div>
        </aside>
        <Outlet />
      </main>
    </div>
  )
}

export default ManagerLayout
