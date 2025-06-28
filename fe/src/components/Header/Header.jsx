import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CircleUserRound, ChevronDown } from 'lucide-react'
import { logout } from '@features/auth/authSlice';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();  
  const dispatch = useDispatch();
  const { isAuthenticated, userId } = useSelector((state) => state.auth);
  
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  const pages =[
    {name: 'Phương Pháp Điều Trị', path: '/homepage/treatment-method'},
    {name: 'Đội Ngũ Bác Sĩ', path: '/homepage/doctor-list'},
    // {name: 'Về Chúng Tôi', path: '#'},
    {name: 'Blog', path: '/homepage/blog'},
    {name: 'Liên Hệ', path: '#'}
  ]

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setShowUserMenu(false);
    navigate('/homepage');
  };

  const handleProfile = () => {
    setShowUserMenu(false);
    navigate('/profile');
  };

  const handleMyAppointments = () => {
    setShowUserMenu(false);
    navigate('/my-appointments');
  };

  const handleBookAppointment = () => {
    if (isAuthenticated) {
      navigate('/homepage/book-appointment');
    } else {
      // Redirect to login with return URL
      navigate('/authentication?redirect=/homepage/book-appointment');
    }
  };
  

  return (
    <header id="header">
      <div className="logo" onClick={() => navigate('/homepage')}>
        Trung Tâm Hiếm Muộn
      </div>
      
      <nav className="nav-links">
        {pages.map((item, index) => (
          <a key={index} className={location.pathname === item.path ? 'active' : ''} href={item.path}>{item.name}</a>
        ))}
      </nav>
      
      <div className="actions">
        {isAuthenticated ? (
          <>
            {/* User Menu Dropdown */}
            <div className="user-menu" ref={userMenuRef}>
              <button className="appointment-btn" onClick={handleBookAppointment}>
                Đặt Lịch Hẹn
              </button>

              <button 
                className="user-btn"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <span className="user-icon"><CircleUserRound size={20}/></span>
                <span className="user-text">Tài khoản</span>
                <span className={`dropdown-arrow ${showUserMenu ? 'open' : ''}`}><ChevronDown size={20}/></span>
              </button>
              
              {showUserMenu && (
                <div className="user-dropdown">
                  <div className="dropdown-item" onClick={handleProfile}>
                    Thông tin cá nhân
                  </div>
                  <div className="dropdown-item" onClick={handleMyAppointments}>
                    Lịch hẹn của tôi
                  </div>
                  <div className="dropdown-divider"></div>
                  <div className="dropdown-item logout" onClick={handleLogout}>
                    Đăng xuất
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <button className="appointment-btn" onClick={handleBookAppointment}>
              Đặt Lịch Hẹn
            </button>
            <button 
              className="login-btn" 
              onClick={() => navigate('/authentication')}
            >
              Đăng Nhập/Đăng ký
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;