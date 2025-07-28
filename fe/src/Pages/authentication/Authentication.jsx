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
  const minYear = new Date(now.setUTCFullYear(now.getUTCFullYear - 18))
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const otpRefs = useRef(Array(6).fill(null));
  const location = useLocation();
  const { loading, error, isAuthenticated, role  } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
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
                          min={minYear}
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
