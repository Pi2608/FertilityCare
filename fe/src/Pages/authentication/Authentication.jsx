import React, { useState } from 'react';
import './Authentication.css';

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    fullName: '',
    gender: '',
    dayOfBirth: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (isLogin) {
      if (!formData.email && !formData.phone) {
        newErrors.email = 'Vui lòng nhập email hoặc số điện thoại';
      }

      if (!formData.password) {
        newErrors.password = 'Vui lòng nhập mật khẩu';
      }
    } else {
      if (!formData.email) {
        newErrors.email = 'Vui lòng nhập email';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email không hợp lệ';
      }

      if (!formData.phone) {
        newErrors.phone = 'Vui lòng nhập số điện thoại';
      }

      if (!formData.fullName) {
        newErrors.fullName = 'Vui lòng nhập họ và tên';
      }

      if (!formData.gender) {
        newErrors.gender = 'Vui lòng chọn giới tính';
      }

      if (!formData.dayOfBirth) {
        newErrors.dayOfBirth = 'Vui lòng chọn ngày sinh';
      }

      if (!formData.password) {
        newErrors.password = 'Vui lòng nhập mật khẩu';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
      } else if (formData.confirmPassword !== formData.password) {
        newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (isLogin) {
      console.log('Login attempt:', {
        emailOrPhone: formData.email || formData.phone,
        password: formData.password
      });
    } else {
      console.log('Register attempt:', formData);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      email: '',
      phone: '',
      fullName: '',
      gender: '',
      dayOfBirth: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
  };

  const handleToggle = (loginMode) => {
    setIsLogin(loginMode);
    resetForm();
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="toggle-buttons">
            <button
              className={`toggle-btn ${isLogin ? 'active' : ''}`}
              onClick={() => handleToggle(true)}
            >
              Đăng nhập
            </button>
            <button
              className={`toggle-btn ${!isLogin ? 'active' : ''}`}
              onClick={() => handleToggle(false)}
            >
              Đăng ký
            </button>
          </div>
        </div>

        <form className={`auth-form ${isLogin ? 'login-form' : 'register-form'}`} onSubmit={handleSubmit}>
          {isLogin ? (
            <div>
                <div className="form-group">
                    <label htmlFor="emailOrPhone">Email hoặc Số điện thoại</label>
                    <input
                        type="text"
                        id="emailOrPhone"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email hoặc số điện thoại"
                    />
                    {errors.email && <p className="error-text">{errors.email}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Mật khẩu</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Nhập mật khẩu"
                    />
                    {errors.password && <p className="error-text">{errors.password}</p>}
                </div>

                <button type="submit" className="submit-btn">
                    Đăng nhập
                </button>
            </div>
          ) : (
            <div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                        />
                        {errors.email && <p className="error-text">{errors.email}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Số điện thoại</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Số điện thoại"
                            maxLength={10}
                        />
                        {errors.phone && <p className="error-text">{errors.phone}</p>}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="fullName">Họ và tên</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Họ và tên"
                    />
                    {errors.fullName && <p className="error-text">{errors.fullName}</p>}
                </div>

                <div className="form-row">
                    <div className="form-group">
                    <label htmlFor="gender">Giới tính</label>
                    <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                    >
                        <option value="">Chọn giới tính</option>
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                    </select>
                    {errors.gender && <p className="error-text">{errors.gender}</p>}
                    </div>

                    <div className="form-group">
                    <label htmlFor="dayOfBirth">Ngày sinh</label>
                    <input
                        type="date"
                        id="dayOfBirth"
                        name="dayOfBirth"
                        value={formData.dayOfBirth}
                        onChange={handleInputChange}
                    />
                    {errors.dayOfBirth && <p className="error-text">{errors.dayOfBirth}</p>}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="registerPassword">Mật khẩu</label>
                    <input
                        type="password"
                        id="registerPassword"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Nhập mật khẩu"
                    />
                    {errors.password && <p className="error-text">{errors.password}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Nhập lại mật khẩu"
                    />
                    {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
                </div>

                <button type="submit" className="submit-btn">
                    Đăng ký
                </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Authentication;
