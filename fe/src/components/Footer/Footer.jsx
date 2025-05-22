import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer id="footer">
        <div className="footer-top">
            <h2>Bắt Đầu Hành Trình Điều Trị Hiếm Muộn Ngay Hôm Nay</h2>
            <p>
                Hãy thực hiện bước đầu tiên hướng tới việc xây dựng gia đình với đội ngũ
                chuyên gia của chúng tôi bên cạnh
            </p>
            <div className="footer-buttons">
                <button className="footer-btn white">Đặt Lịch Tư Vấn</button>
                <button className="footer-btn outline">Liên Hệ Với Chúng Tôi</button>
            </div>
        </div>
        <div className="footer-bottom">
            <div className="footer-column">
                <h4>Trung Tâm Hiếm Muộn</h4>
                <p>
                Cung cấp dịch vụ chăm sóc hiếm muộn toàn diện với công nghệ tiên tiến và đội ngũ
                chuyên gia tận tâm.
                </p>
            </div>
            <div className="footer-column">
                <h4>Liên Kết Nhanh</h4>
                <ul>
                    <li>Phương Pháp Điều Trị</li>
                    <li>Đội Ngũ Bác Sĩ</li>
                    <li>Về Chúng Tôi</li>
                    <li>Blog</li>
                    <li>Liên Hệ</li>
                </ul>
            </div>
            <div className="footer-column">
                <h4>Dịch Vụ</h4>
                <ul>
                    <li>Thụ Tinh Trong Ống Nghiệm (IVF)</li>
                    <li>Bơm Tinh Trùng Vào Buồng Tử Cung</li>
                    <li>Trữ Đông Trứng</li>
                    <li>Xét Nghiệm Di Truyền</li>
                    <li>Điều Trị Vô Sinh Nam</li>
                </ul>
            </div>
            <div className="footer-column">
                <h4>Liên Hệ</h4>
                <p>123 Đường Hiếm Muộn, Phòng 200<br/>Hà Nội, Việt Nam</p>
                <p>(024) 123-4567</p>
                <p>info@trungtamhieummuon.vn</p>
                <div className="social-icons">
                    <i className="fab fa-facebook-f"></i>
                    <i className="fab fa-instagram"></i>
                    <i className="fab fa-twitter"></i>
                </div>
            </div>
        </div>
        <div className="footer-copyright">
            © 2023 Trung Tâm Điều Trị Hiếm Muộn. Đã đăng ký bản quyền.
        </div>
    </footer>
  )
}

export default Footer