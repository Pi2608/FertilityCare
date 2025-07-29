import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser, clearError, checkAuthStatus, confirmRegister  } from "@features/auth/authSlice";
import { useLocation } from "react-router-dom";
import { USER_ROLES } from '../../Router';
import "./Authentication.css";
import { Eye, EyeOff } from "lucide-react"; // icon đóng hiện mật khẩu
import ApiGateway from "../../features/service/apiGateway";

const Authentication = () => {
  const now = new Date();
  // const minYear = new Date(now.setUTCFullYear(now.getUTCFullYear() - 100)); // 100 years ago
  const maxYear = new Date(now.setUTCFullYear(now.getUTCFullYear() - 18)); // 1 year ago (must be in past)
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const otpRefs = useRef(Array(6).fill(null));
  const location = useLocation();
  const { loading, error, isAuthenticated, role  } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false); // Thêm state cho mật khẩu đăng ký
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Thêm state cho xác nhận mật khẩu
  const [step, setStep] = useState("form");
  const [otpCode, setOtpCode] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    gender: '',
    dob: ''
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
      // Validate name - @NotBlank, @Size(max = 100)
      if (!formData.name || formData.name.trim() === '') {
        newErrors.name = 'Tên không được để trống';
      } else if (formData.name.length > 100) {
        newErrors.name = 'Tên không được vượt quá 100 ký tự';
      }

      // Validate email - @NotBlank, @Email
      if (!formData.email || formData.email.trim() === '') {
        newErrors.email = "Email không được để trống";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Email không hợp lệ";
      }

      // Validate phone - @NotBlank, @Pattern for Vietnamese phone
      if (!formData.phone || formData.phone.trim() === '') {
        newErrors.phone = "Số điện thoại không được để trống";
      } else if (!/^(\+84|0)(\d{9,10})$/.test(formData.phone.replace(/\s/g, ''))) {
        newErrors.phone = "Số điện thoại không hợp lệ (định dạng: 0xxxxxxxxx hoặc +84xxxxxxxxx)";
      }

      // Validate password - @NotBlank, @Size(min = 6, max = 50)
      if (!formData.password || formData.password.trim() === '') {
        newErrors.password = "Mật khẩu không được để trống";
      } else if (formData.password.length < 6) {
        newErrors.password = "Mật khẩu phải từ 6 đến 50 ký tự";
      } else if (formData.password.length > 50) {
        newErrors.password = "Mật khẩu phải từ 6 đến 50 ký tự";
      }

      // Validate confirmPassword
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
      } else if (formData.confirmPassword !== formData.password) {
        newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
      }

      // Validate gender - @NotNull
      if (!formData.gender) {
        newErrors.gender = "Giới tính không được để trống";
      }

      // Validate dob - @NotNull, @Past
      if (!formData.dob) {
        newErrors.dob = 'Ngày sinh không được để trống';
      } else {
        const dobDate = new Date(formData.dob);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set to start of day for accurate comparison
        
        if (dobDate >= today) {
          newErrors.dob = 'Ngày sinh phải là một ngày trong quá khứ';
        }
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
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
          phone: formData.phone.replace(/\s/g, ''), // Remove spaces
          gender: formData.gender,
          dob: formData.dob
        };

        const resultAction = await dispatch(registerUser(userData));

        if (registerUser.fulfilled.match(resultAction)) {
          console.log("OTP sent to email");
          setStep("otp");
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
    // Reset tất cả state hiện mật khẩu
    setShowPassword(false);
    setShowRegisterPassword(false);
    setShowConfirmPassword(false);
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
        {step === "form" && (
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
              <div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                      disabled={loading}
                      maxLength={100}
                    />
                    {errors.email && <p className="error-text">{errors.email}</p>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Số điện thoại *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Nhập số điện thoại"
                      maxLength={15}
                      disabled={loading}
                    />
                    {errors.phone && <p className="error-text">{errors.phone}</p>}
                  </div>
                </div>

                <div className="form-group">
                    <label htmlFor="name">Họ và tên *</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Họ và tên"
                        disabled={loading}
                        maxLength={100}
                    />
                    {errors.name && <p className="error-text">{errors.name}</p>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="gender">Giới tính *</label>
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
                    <label htmlFor="dob">Ngày sinh *</label>
                    <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={formData.dob}
                        max={maxYear.toISOString().split('T')[0]}
                        onChange={handleInputChange}
                        disabled={loading}
                    />
                    {errors.dob && <p className="error-text">{errors.dob}</p>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="registerPassword">Mật khẩu *</label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showRegisterPassword ? "text" : "password"}
                      id="registerPassword"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Nhập mật khẩu (từ 6 ký tự)"
                      disabled={loading}
                      maxLength={50}
                    />
                    <span
                      onClick={() => setShowRegisterPassword((prev) => !prev)}
                      style={{
                        position: "absolute",
                        right: "1rem",
                        top: "50%",
                        transform: "translateY(-40%)",
                        cursor: "pointer",
                        color: "#888",
                      }}
                      tabIndex={0}
                      aria-label={showRegisterPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                    >
                      {showRegisterPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                    </span>
                  </div>
                  {errors.password && (
                    <p className="error-text">{errors.password}</p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Xác nhận mật khẩu *</label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Nhập lại mật khẩu"
                      disabled={loading}
                      maxLength={50}
                    />
                    <span
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      style={{
                        position: "absolute",
                        right: "1rem",
                        top: "50%",
                        transform: "translateY(-40%)",
                        cursor: "pointer",
                        color: "#888",
                      }}
                      tabIndex={0}
                      aria-label={showConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                    >
                      {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                    </span>
                  </div>
                  {errors.confirmPassword && (
                    <p className="error-text">{errors.confirmPassword}</p>
                  )}
                </div>

                {/* Display Redux error */}
                {error && (
                  <div className="error-message">
                    <p className="error-text">{error}</p>
                  </div>
                )}

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? "Đang đăng ký..." : "Đăng ký"}
                </button>
              </div>
            )}
          </form>
        )}
        
        {step === "otp" && (
          <div className="auth-form otp-form">
            <h3 style={{ textAlign: "center", marginBottom: "16px" }}>
              Nhập mã OTP đã gửi đến email: {formData.email}
            </h3>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '16px' }}>
              {[...Array(6)].map((_, i) => (
                <input
                  key={i}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  ref={(el) => (otpRefs.current[i] = el)}
                  value={otpCode[i] || ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (!/^[0-9]?$/.test(val)) return;

                    const newOtp = otpCode.split("");
                    newOtp[i] = val;
                    setOtpCode(newOtp.join(""));

                    if (val && i < 5) otpRefs.current[i + 1]?.focus();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !otpCode[i] && i > 0) {
                      otpRefs.current[i - 1]?.focus();
                    }
                  }}
                  style={{
                    width: "48px",
                    height: "56px",
                    fontSize: "20px",
                    textAlign: "center",
                    borderRadius: "8px",
                    border: "2px solid #e5e7eb",
                    outline: "none",
                  }}
                />
              ))}
            </div>

            <button
              className="submit-btn"
              disabled={otpCode.length < 6 || loading}
              onClick={async () => {
                try {
                  const result = await dispatch(confirmRegister({
                    email: formData.email,
                    otp: otpCode,
                    password: formData.password,
                  }));

                  if (confirmRegister.fulfilled.match(result)) {
                    try {
                      const authResult = await dispatch(checkAuthStatus()).unwrap();
                      console.log('Checked role after OTP:', authResult);

                      const from = location.state?.from?.pathname;
                      const redirectPath = from && from !== '/authentication'
                        ? from
                        : getRedirectPath(authResult.role);

                      navigate(redirectPath, { replace: true });

                      resetForm();
                      setStep("form");
                      setIsLogin(true);
                    } catch (error) {
                      console.error('Lỗi khi lấy thông tin xác thực sau OTP:', error);
                      alert("Đăng nhập thành công, nhưng không thể lấy thông tin người dùng.");
                    }
                  }
                  else {
                    alert(result.payload || "Xác thực OTP thất bại!");
                  }
                } catch (err) {
                  alert("Mã OTP không đúng hoặc đã hết hạn.");
                }
              }}
            >
              Xác nhận
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Authentication;