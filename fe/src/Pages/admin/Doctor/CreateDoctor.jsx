"use client"

import { useState } from "react"
import "./CreateDoctor.css"

const CreateDoctor = ({ isOpen, onClose, onSuccess }) => {
  const [createForm, setCreateForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [formErrors, setFormErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleCreateDoctor = async () => {
    // Validate form
    const errors = {}

    if (!createForm.email) {
      errors.email = "Email là bắt buộc"
    } else if (!/\S+@\S+\.\S+/.test(createForm.email)) {
      errors.email = "Email không hợp lệ"
    }

    if (!createForm.password) {
      errors.password = "Mật khẩu là bắt buộc"
    } else if (createForm.password.length < 6) {
      errors.password = "Mật khẩu phải có ít nhất 6 ký tự"
    }

    if (!createForm.confirmPassword) {
      errors.confirmPassword = "Xác nhận mật khẩu là bắt buộc"
    } else if (createForm.password !== createForm.confirmPassword) {
      errors.confirmPassword = "Mật khẩu xác nhận không khớp"
    }

    setFormErrors(errors)

    if (Object.keys(errors).length === 0) {
      setIsLoading(true)

      try {
        // Call API to create doctor account here
        console.log("Creating doctor account:", createForm)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Reset form
        setCreateForm({
          email: "",
          password: "",
          confirmPassword: "",
        })
        setFormErrors({})
        onClose()
        onSuccess()
      } catch (error) {
        console.error("Error creating doctor:", error)
        // Handle error here
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleInputChange = (field, value) => {
    setCreateForm((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const handleClose = () => {
    setCreateForm({
      email: "",
      password: "",
      confirmPassword: "",
    })
    setFormErrors({})
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="create-doctor-modal-overlay">
      <div className="create-doctor-modal-content">
        <div className="create-doctor-modal-header">
          <h2>Tạo tài khoản bác sĩ</h2>
          <button className="create-doctor-close-btn" onClick={handleClose}>
            ×
          </button>
        </div>

        <div className="create-doctor-modal-body">
          <div className="create-doctor-form-group">
            <label>Email</label>
            <input
              type="email"
              value={createForm.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Nhập email"
              className={formErrors.email ? "error" : ""}
              disabled={isLoading}
            />
            {formErrors.email && <span className="create-doctor-error-message">{formErrors.email}</span>}
          </div>

          <div className="create-doctor-form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              value={createForm.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              placeholder="Nhập mật khẩu"
              className={formErrors.password ? "error" : ""}
              disabled={isLoading}
            />
            {formErrors.password && <span className="create-doctor-error-message">{formErrors.password}</span>}
          </div>

          <div className="create-doctor-form-group">
            <label>Xác nhận mật khẩu</label>
            <input
              type="password"
              value={createForm.confirmPassword}
              onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
              placeholder="Nhập lại mật khẩu"
              className={formErrors.confirmPassword ? "error" : ""}
              disabled={isLoading}
            />
            {formErrors.confirmPassword && (
              <span className="create-doctor-error-message">{formErrors.confirmPassword}</span>
            )}
          </div>
        </div>

        <div className="create-doctor-modal-footer">
          <button className="create-doctor-cancel-btn" onClick={handleClose} disabled={isLoading}>
            Hủy
          </button>
          <button className="create-doctor-save-btn" onClick={handleCreateDoctor} disabled={isLoading}>
            {isLoading ? "Đang tạo..." : "Tạo tài khoản"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateDoctor
