import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser, clearError, checkAuthStatus } from "@features/auth/authSlice";
import { useLocation } from "react-router-dom";
import { USER_ROLES } from '../../Router';
import "./Authentication.css";
import { Eye, EyeOff } from "lucide-react"; // icon đóng hiện mật khẩu
import OtpInput from 'react-otp-input';

const Authentication = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error, isAuthenticated, role  } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false); // Thêm state này

  const [isLogin, setIsLogin] = useState(true);
  const [registerStep, setRegisterStep] = useState(1); // 1: Thông tin cá nhân, 2: OTP
  const [otp, setOtp] = useState('');
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    gender: '',
    dob: '',
  });

  const getRedirectPath = (userRole) => {
  switch (userRole) {
    case USER_ROLES.ADMIN:
      return '/admin-dashboard';
    case USER_ROLES.DOCTOR:
      return '/doctor-dashboard';
    case USER_ROLES.MANAGER:
      return '/manager-dashboard';
    case USER_ROLES.CUSTOMER:
      return '/patient-dashboard';
    default:
      return '/homepage';
    }
  };

  // Clear Redux error when component unmounts or mode changes
  useEffect(() => {
    return () => dispatch(clearError());
  }, [dispatch]);

  // Clear local errors when switching modes
  useEffect(() => {
    setErrors({});
    dispatch(clearError());

    if (isAuthenticated && role) {
      const from = location.state?.from?.pathname;

      if (from && from !== '/authentication') {
        navigate(from, { replace: true });
      } else {
        const redirectPath = getRedirectPath(role);
        navigate(redirectPath, { replace: true });
      }
    }
  }, [isAuthenticated, role, navigate, location.state, dispatch]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear field-specific error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (isLogin) {
      if (!formData.email && !formData.phone) {
        newErrors.email = "Vui lòng nhập email hoặc số điện thoại";
      }

      if (!formData.password) {
        newErrors.password = "Vui lòng nhập mật khẩu";
      }
    } else {
      if (!formData.email) {
        newErrors.email = "Vui lòng nhập email";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email không hợp lệ";
      }

      if (!formData.phone) {
        newErrors.phone = "Vui lòng nhập số điện thoại";
      } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ""))) {
        newErrors.phone = "Số điện thoại không hợp lệ";
      }

      if (!formData.name) {
        newErrors.name = 'Vui lòng nhập họ và tên';
      }

      if (!formData.gender) {
        newErrors.gender = "Vui lòng chọn giới tính";
      }

      if (!formData.dob) {
        newErrors.dob = 'Vui lòng chọn ngày sinh';
      }

      if (!formData.password) {
        newErrors.password = "Vui lòng nhập mật khẩu";
      } else if (formData.password.length < 6) {
        newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
      } else if (formData.confirmPassword !== formData.password) {
        newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (isLogin) {
        const resultAction = await dispatch(
          loginUser({
            email: formData.email,
            password: formData.password,
          })
        );

        if (loginUser.fulfilled.match(resultAction)) {
          console.log('Login successful');

          try {
            const authResult = await dispatch(checkAuthStatus()).unwrap(); 
            console.log('Checked role:', authResult);

            const from = location.state?.from?.pathname;
            const redirectPath = from && from !== '/authentication'
              ? from
              : getRedirectPath(authResult.role);

            navigate(redirectPath, { replace: true });

            resetForm();

          } catch (error) {
            console.error('Lỗi khi lấy thông tin xác thực:', error);
          }
        }
      } else {
        const userData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          gender: formData.gender,
          dob: formData.dob,
        };

        const resultAction = await dispatch(registerUser(userData));

        if (registerUser.fulfilled.match(resultAction)) {
          console.log("Registration successful");
          resetForm();
        }
      }
    } catch (err) {
      console.error("Authentication error:", err);
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      phone: '',
      name: '',
      gender: '',
      dob: '',
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
              className={`toggle-btn ${isLogin ? "active" : ""}`}
              onClick={() => handleToggle(true)}
              disabled={loading}
            >
              Đăng nhập
            </button>
            <button
              className={`toggle-btn ${!isLogin ? "active" : ""}`}
              onClick={() => handleToggle(false)}
              disabled={loading}
            >
              Đăng ký
            </button>
          </div>
        </div>

        <form
          className={`auth-form ${isLogin ? "login-form" : "register-form"}`}
          onSubmit={handleSubmit}
        >
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
                  disabled={loading}
                />
                {errors.email && <p className="error-text">{errors.email}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="password">Mật khẩu</label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Nhập mật khẩu"
                    disabled={loading}
                  />
                  <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    style={{
                      position: "absolute",
                      right: "1rem",
                      top: "50%",
                      transform: "translateY(-40%)",
                      cursor: "pointer",
                      color: "#888",
                    }}
                    tabIndex={0}
                    aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </span>
                </div>
                {errors.password && (
                  <p className="error-text">{errors.password}</p>
                )}
              </div>

              {/* Display Redux error */}
              {error && (
                <div className="error-message">
                  <p className="error-text">{error}</p>
                </div>
              )}

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
              </button>
            </div>
          ) : (
            <>
            {registerStep === 1 ? (
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
                      disabled={loading}
                    />
                    {errors.email && <p className="error-text">{errors.email}</p>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Số điện thoại</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Số điện thoại"
                      maxLength={10}
                      disabled={loading}
                    />
                    {errors.phone && <p className="error-text">{errors.phone}</p>}
                  </div>
                </div>

                  <div className="form-group">
                      <label htmlFor="name">Họ và tên</label>
                      <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Họ và tên"
                          disabled={loading}
                      />
                      {errors.name && <p className="error-text">{errors.name}</p>}
                  </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="gender">Giới tính</label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      disabled={loading}
                    >
                      <option value="">Chọn giới tính</option>
                      <option value="male">Nam</option>
                      <option value="female">Nữ</option>
                    </select>
                    {errors.gender && (
                      <p className="error-text">{errors.gender}</p>
                    )}
                  </div>

                      <div className="form-group">
                      <label htmlFor="dob">Ngày sinh</label>
                      <input
                          type="date"
                          id="dob"
                          name="dob"
                          value={formData.dob}
                          onChange={handleInputChange}
                          disabled={loading}
                      />
                      {errors.dob && <p className="error-text">{errors.dob}</p>}
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
                    disabled={loading}
                  />
                  {errors.password && (
                    <p className="error-text">{errors.password}</p>
                  )}
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
                    disabled={loading}
                  />
                  {errors.confirmPassword && (
                    <p className="error-text">{errors.confirmPassword}</p>
                  )}
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? "Đang đăng ký..." : "Đăng ký"}
                </button>
              </div>
            )
            :
            (
              <div className="otp-section">
                <h3>Nhập mã OTP đã gửi đến số email của bạn</h3>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  separator={<span>-</span>}
                  inputStyle="otp-input"
                  isInputNum={true}
                  shouldAutoFocus={true}
                />
                {errors.otp && <p className="error-text">{errors.otp}</p>}
                <button
                  type="button"
                  className="submit-btn"
                  onClick={() => {
                    if (otp.length === 6) {
                      // Xử lý xác thực OTP ở đây
                      console.log("OTP submitted:", otp);
                    } else {
                      setErrors((prev) => ({ ...prev, otp: "Vui lòng nhập mã OTP hợp lệ" }));
                    }
                  }}
                >
                  Xác nhận OTP
                </button>
              </div>
            )}
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Authentication;
