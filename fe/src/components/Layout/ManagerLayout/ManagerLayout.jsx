"use client";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet, Link, useLocation } from "react-router-dom";
import Header from "@components/Header/Header";

import Sidebar from "@components/Sidebar/Sidebar";
import "./ManagerLayout.css";

const ManagerLayout = () => {
  const userType = localStorage.getItem("userType") || "Manager";

  const location = useLocation();

  const menuItems = [
    {
      name: "Lịch hẹn",
      path: "/manager-dashboard/appointment",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 16 16"
        >
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12 2a5 5 0 1 1-5 5a5 5 0 0 1 5-5m0 2a3 3 0 1 0 3 3a3 3 0 0 0-3-3m9 11a1 1 0 0 1-1 1h-3v3a1 1 0 0 1-2 0v-3h-3a1 1 0 0 1 0-2h3v-3a1 1 0 0 1 2 0v3h3a1 1 0 0 1 1 1M1 18v-1a7 7 0 0 1 7-7h.75a1 1 0 0 1 0 2H8a5 5 0 0 0-5 5v1a1 1 0 0 1-2 0"
          />
        </svg>
      ),
    },
    {
      name: "Dịch vụ điều trị",
      path: "/manager-dashboard/treatment-service",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"
          />
        </svg>
      ),
    },
  ];

  const isActive = (path) => {
    if (path === "/manager-dashboard") {
      return location.pathname === "/manager-dashboard";
    }
    return location.pathname.startsWith(path);
  };

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const lastPath = localStorage.getItem("managerLastVisited");

    // Chỉ redirect nếu đang ở trang gốc
    if (location.pathname === "/manager-dashboard" && lastPath) {
      navigate(lastPath, { replace: true });
    }
  }, []);

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
              <Link
                key={index}
                to={item.path}
                onClick={() =>
                  localStorage.setItem("managerLastVisited", item.path)
                }
                className={`sidebar-nav-item ${
                  isActive(item.path) ? "active" : ""
                }`}
              >
                <div className="sidebar-nav-icon">{item.icon}</div>
                <span className="sidebar-nav-text">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="sidebar-footer">
            <Link to="/logout" className="sidebar-logout">
              <div className="sidebar-logout-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
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
  );
};

export default ManagerLayout;
