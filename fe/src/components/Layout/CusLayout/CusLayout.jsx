import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";
import Header from "@components/Header/Header";
import Footer from "@components/Footer/Footer";
import "./CusLayout.css";

const CusLayout = () => {
  const list = [
        {name: 'Tổng quan', path: '/patient-dashboard', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 12 12"><g fill="none" stroke="currentColor" strokeWidth="1"><circle cx="6" cy="6" r="5.5"/><path strokeLinecap="round" strokeLinejoin="round" d="M5.5 3v3.5H8"/></g></svg>},
        {name: 'Lịch hẹn', path: '/patient-dashboard/appointments', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16"><path fill="currentColor" d="M14.25 2.5h-.77v-1h-1.25v1H3.68v-1H2.43v1h-.68A1.25 1.25 0 0 0 .5 3.75v9.5a1.25 1.25 0 0 0 1.25 1.25h12.5a1.25 1.25 0 0 0 1.25-1.25v-9.5a1.25 1.25 0 0 0-1.25-1.25M1.75 3.75h12.5V5H1.75zm0 9.5v-7h12.5v7z"/></svg>},
        {name: 'Lịch sử điều trị', path: '/patient-dashboard/medical-records', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><rect width="15" height="18.5" x="4.5" y="2.75" rx="3.5"/><path d="M8.5 6.755h7m-7 4h7m-7 4H12"/></g></svg>},
        {name: 'Thuốc & Điều trị', path: '/patient-dashboard/pills', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m4.5 12.5l8-8a4.94 4.94 0 0 1 7 7l-8 8a4.94 4.94 0 0 1-7-7m4-4l7 7"/></svg>},
        {name: 'Tin nhắn', path: '/patient-dashboard/messages', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="1.5" d="M3 20.29V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7.961a2 2 0 0 0-1.561.75l-2.331 2.914A.6.6 0 0 1 3 20.29Z"/></svg>},
        {name: 'Lịch sử thanh toán', path: '/patient-dashboard/payment', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M3 6h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"/><path d="M3.5 10h17"/><path d="M7.5 14h9"/></g></svg>},
        {name: 'Hồ sơ', path: '/patient-dashboard/profile', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10,9 9,9 8,9"/></g></svg>},
    ]
  const location = useLocation();
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType") || "Patient";
  const [isLoading, setIsLoading] = useState(true);
  const isActive = (path) => {
    if (path === "/patient-dashboard") {
      return location.pathname === "/patient-dashboard";
    }
    return location.pathname.startsWith(path);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const lastPath = localStorage.getItem("patientLastVisited");
    if (
      location.pathname === "/patient-dashboard" &&
      lastPath &&
      lastPath !== "/patient-dashboard"
    ) {
      navigate(lastPath, { replace: true });
    }
    setIsLoading(false);
  }, [navigate, location.pathname]);

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="cus_layout">
      <Header />
      <main className="content">
        <aside className="sidebar">
          <div className="sidebar-header">
            <h2 className="sidebar-title">Trung tâm IVF</h2>
            <p className="sidebar-subtitle">Cổng thông tin Bệnh nhân</p>
          </div>
          <nav className="sidebar-nav">
            {list.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                onClick={() =>
                  localStorage.setItem("patientLastVisited", item.path)
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
      <Footer />
    </div>
  );
};

export default CusLayout