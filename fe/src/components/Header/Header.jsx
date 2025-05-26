import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Header.css'

const Header = () => {

  const navigate = useNavigate()

  return (
    <header id="header">
        <div className="logo" onClick={() => navigate('/homepage')}>Trung Tâm Hiếm Muộn</div>
        <nav className="nav-links">
          <a href="#">Phương Pháp Điều Trị</a>
          <a href="#">Đội Ngũ Bác Sĩ</a>
          <a href="#">Về Chúng Tôi</a>
          <a href="#">Blog</a>
          <a href="#">Liên Hệ</a>
        </nav>
        <div className="actions">
          <button className="login-btn">Đăng Nhập</button>
          <button className="appointment-btn">Đặt Lịch Hẹn</button>
        </div>
    </header>
  )
}

export default Header