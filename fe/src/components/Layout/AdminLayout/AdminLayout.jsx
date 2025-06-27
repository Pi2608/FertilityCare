"use client";

import { useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import Header from "@components/Header/Header";
import "./AdminLayout.css";
import { useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const userType = localStorage.getItem("userType") || "Admin";

  const location = useLocation();

  const menuItems = [
    {
      name: "Lịch hẹn",
      path: "/admin-dashboard/appointment",
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
      name: "Bệnh nhân",
      path: "/admin-dashboard/user",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M16 4c0-1.11.89-2 2-2s2 .89 2 2s-.89 2-2 2s-2-.89-2-2m4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 7H17.5c-.8 0-1.54.37-2 1l-3.72 5.01L9.29 10.5A1.5 1.5 0 0 0 8 10H6.5c-.8 0-1.5.7-1.5 1.5S5.7 13 6.5 13H7l2.5 3.5L12.5 12L15 16v6h5Z"
          />
        </svg>
      ),
    },
    {
      name: "Bác sĩ",
      path: "/admin-dashboard/doctor",
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
      path: "/admin-dashboard/service",
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
    {
      name: "Báo cáo thống kê",
      path: "/admin-dashboard/report",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"
          />
        </svg>
      ),
    },
    {
      name: "Tin nhắn",
      path: "/admin-dashboard/message",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
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
      name: "Cài đặt hệ thống",
      path: "/admin-dashboard/setting",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 16 16"
        >
          <g fill="none" stroke="currentColor" strokeWidth="1">
            <path d="m13.258 8.354l.904.805a.91.91 0 0 1 .196 1.169l-1.09 1.862a.94.94 0 0 1-.35.341a1 1 0 0 1-.478.125a1 1 0 0 1-.306-.046l-1.157-.382q-.304.195-.632.349l-.243 1.173a.93.93 0 0 1-.339.544a.97.97 0 0 1-.618.206H6.888a.97.97 0 0 1-.618-.206a.93.93 0 0 1-.338-.544l-.244-1.173a6 6 0 0 1-.627-.35L3.9 12.61a1 1 0 0 1-.306.046a1 1 0 0 1-.477-.125a.94.94 0 0 1-.35-.34l-1.129-1.863a.91.91 0 0 1 .196-1.187L2.737 8v-.354l-.904-.805a.91.91 0 0 1-.196-1.169L2.766 3.81a.94.94 0 0 1 .35-.341a1 1 0 0 1 .477-.125a1 1 0 0 1 .306.028l1.138.4q.305-.195.632-.349l.244-1.173a.93.93 0 0 1 .338-.544a.97.97 0 0 1 .618-.206h2.238a.97.97 0 0 1 .618.206c.175.137.295.33.338.544l.244 1.173q.325.155.627.35l1.162-.382a.98.98 0 0 1 .784.078c.145.082.265.2.35.34l1.128 1.863a.91.91 0 0 1-.182 1.187l-.918.782z" />
            <path d="M10.5 8a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0Z" />
          </g>
        </svg>
      ),
    },
  ];

  const isActive = (path) => {
    if (path === "/admin-dashboard") {
      return location.pathname === "/admin-dashboard";
    }
    return location.pathname.startsWith(path);
  };

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const lastPath = localStorage.getItem("lastVisitedRoute");

    // Nếu đang ở /admin-dashboard thì redirect sang route cuối cùng
    if (location.pathname === "/admin-dashboard" && lastPath) {
      navigate(lastPath, { replace: true });
    }
  }, []);

  return (
    <div className="admin_layout">
      <Header />
      <main className="content">
        <aside className="sidebar">
          {/* Sidebar Header */}
          <div className="sidebar-header">
            <h2 className="sidebar-title">Trung tâm IVF</h2>
            <p className="sidebar-subtitle">Cổng thông tin Admin</p>
          </div>

          {/* Sidebar Navigation */}
          <nav className="sidebar-nav">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                onClick={() =>
                  localStorage.setItem("lastVisitedRoute", item.path)
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

export default AdminLayout;
