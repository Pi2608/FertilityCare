import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser, clearError } from "@features/auth/authSlice";
import { useLocation } from "react-router-dom";
import "./Authentication.css";
import { Eye, EyeOff } from "lucide-react"; // icon đóng hiện mật khẩu

const Authentication = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const [showPassword, setShowPassword] = useState(false); // Thêm state này

  const [isLogin, setIsLogin] = useState(true);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    fullName: "",
    gender: "",
    dayOfBirth: "",
    password: "",
    confirmPassword: "",
  });

  // Clear Redux error when component unmounts or mode changes
  useEffect(() => {
    return () => dispatch(clearError());
  }, [dispatch]);

  // Clear local errors when switching modes
  useEffect(() => {
    setErrors({});
    dispatch(clearError());
  }, [isLogin, dispatch]);

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

      if (!formData.fullName) {
        newErrors.fullName = "Vui lòng nhập họ và tên";
      }

      if (!formData.gender) {
        newErrors.gender = "Vui lòng chọn giới tính";
      }

      if (!formData.dayOfBirth) {
        newErrors.dayOfBirth = "Vui lòng chọn ngày sinh";
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
          console.log("Login successful");
          resetForm();

          const redirectPath =
            new URLSearchParams(location.search).get("redirect") || "/homepage";
          navigate(redirectPath);
        }
      } else {
        const userData = {
          email: formData.email,
          phone: formData.phone,
          fullName: formData.fullName,
          gender: formData.gender,
          dayOfBirth: formData.dayOfBirth,
          password: formData.password,
        };

        const resultAction = await dispatch(registerUser(userData));

        if (registerUser.fulfilled.match(resultAction)) {
          console.log("Registration successful");
          resetForm();
          // Redirect or handle successful registration
        }
      }
    } catch (err) {
      console.error("Authentication error:", err);
    }
  };

  const resetForm = () => {
    setFormData({
      email: "",
      phone: "",
      fullName: "",
      gender: "",
      dayOfBirth: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({});
  };

  const handleToggle = (loginMode) => {
    setIsLogin(loginMode);
    resetForm();
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/homepage");
    }
  }, [isAuthenticated, navigate]);

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

        {/* Display Redux error */}
        {error && (
          <div className="error-message">
            <p className="error-text">{error}</p>
          </div>
        )}

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
                    style={{ paddingRight: "36px" }}
                  />
                  <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
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

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
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
                <label htmlFor="fullName">Họ và tên</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Họ và tên"
                  disabled={loading}
                />
                {errors.fullName && (
                  <p className="error-text">{errors.fullName}</p>
                )}
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
                  <label htmlFor="dayOfBirth">Ngày sinh</label>
                  <input
                    type="date"
                    id="dayOfBirth"
                    name="dayOfBirth"
                    value={formData.dayOfBirth}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                  {errors.dayOfBirth && (
                    <p className="error-text">{errors.dayOfBirth}</p>
                  )}
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
          )}
        </form>
      </div>
    </div>
  );
};

export default Authentication;
