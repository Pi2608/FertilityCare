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
        </aside>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
