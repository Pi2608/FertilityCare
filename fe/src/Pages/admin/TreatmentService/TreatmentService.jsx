"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./TreatmentService.css"

const TreatmentService = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [services, setServices] = useState([
    {
      id: 1,
      order: 1,
      name: "IUI",
      overview: "Bơm tinh trùng vào buồng tử cung (IUI)",
      successRate: "Xem chi tiết",
      process: "Xem quy trình",
      price: "90.000.000",
      isEditing: false,
    },
    {
      id: 2,
      order: 2,
      name: "IVF",
      overview: "Thụ tinh trong ống nghiệm (IVF) là một trong những phương",
      successRate: "Xem chi tiết",
      process: "Xem quy trình",
      price: "90.000.000",
      isEditing: false,
    },
  ])

  const [editingService, setEditingService] = useState(null)

  const handleEdit = (serviceId) => {
    setServices(
      services.map((service) =>
        service.id === serviceId ? { ...service, isEditing: true } : { ...service, isEditing: false },
      ),
    )
    setEditingService(serviceId)
  }

  const handleSave = (serviceId) => {
    setServices(services.map((service) => (service.id === serviceId ? { ...service, isEditing: false } : service)))
    setEditingService(null)
  }

  const handleCancel = (serviceId) => {
    setServices(services.map((service) => (service.id === serviceId ? { ...service, isEditing: false } : service)))
    setEditingService(null)
  }

  const handleInputChange = (serviceId, field, value) => {
    setServices(services.map((service) => (service.id === serviceId ? { ...service, [field]: value } : service)))
  }

  const handleAddService = () => {
    const newService = {
      id: Date.now(),
      order: services.length + 1,
      name: "Dịch vụ mới",
      overview: "Mô tả dịch vụ",
      successRate: "Xem chi tiết",
      process: "Xem quy trình",
      price: "0",
      isEditing: true,
    }
    setServices([...services, newService])
    setEditingService(newService.id)
  }

  const handleDelete = (serviceId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa dịch vụ này?")) {
      setServices(services.filter((service) => service.id !== serviceId))
    }
  }

  const handleSuccessRateEdit = (serviceId) => {
    navigate(`/manager-dashboard/treatment-service/success-rate/${serviceId}`)
  }

  const handleProcessEdit = (serviceId) => {
    navigate(`/manager-dashboard/treatment-service/process/${serviceId}`)
  }

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.overview.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="treatment-service-page">
      {/* Header */}
      <header className="treatment-service-header">
        <h1 className="page-title">Dịch vụ điều trị</h1>

        <div className="header-actions">
          <div className="notification-bell">
            <span>🔔</span>
            <div className="notification-dot"></div>
          </div>

          <div className="user-profile">
            <div className="avatar">
              <span>JC</span>
            </div>
            <div className="user-info">
              <div className="user-name">Jonitha Cathrine</div>
              <div className="user-role">Manager</div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="treatment-service-content">
        {/* Search and Add Button */}
        <div className="content-header">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Tìm kiếm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button className="add-service-btn" onClick={handleAddService}>
            <span>+</span>
            Thêm dịch vụ
          </button>
        </div>

        {/* Services Table */}
        <div className="table-wrapper">
          <table className="services-table">
            <thead>
              <tr>
                <th>Số lượng</th>
                <th>Dịch vụ</th>
                <th>Tổng quan</th>
                <th>Tỷ lệ thành công</th>
                <th>Quy trình</th>
                <th>Chi phí (VND)</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.map((service) => (
                <tr key={service.id}>
                  <td>{service.order}</td>
                  <td>
                    {service.isEditing ? (
                      <input
                        type="text"
                        value={service.name}
                        onChange={(e) => handleInputChange(service.id, "name", e.target.value)}
                        className="edit-input"
                      />
                    ) : (
                      service.name
                    )}
                  </td>
                  <td>
                    {service.isEditing ? (
                      <textarea
                        value={service.overview}
                        onChange={(e) => handleInputChange(service.id, "overview", e.target.value)}
                        className="edit-textarea"
                        rows="2"
                      />
                    ) : (
                      service.overview
                    )}
                  </td>
                  <td>
                    <button className="link-btn" onClick={() => handleSuccessRateEdit(service.id)}>
                      {service.successRate}
                    </button>
                  </td>
                  <td>
                    <button className="link-btn" onClick={() => handleProcessEdit(service.id)}>
                      {service.process}
                    </button>
                  </td>
                  <td>
                    {service.isEditing ? (
                      <input
                        type="text"
                        value={service.price}
                        onChange={(e) => handleInputChange(service.id, "price", e.target.value)}
                        className="edit-input"
                      />
                    ) : (
                      parseInt(service.price).toLocaleString()
                    )}
                  </td>
                  <td className="action-cell">
                    {service.isEditing ? (
                      <div className="edit-actions">
                        <button className="save-btn" onClick={() => handleSave(service.id)}>
                          Lưu
                        </button>
                        <button className="cancel-btn" onClick={() => handleCancel(service.id)}>
                          Hủy
                        </button>
                      </div>
                    ) : (
                      <div className="view-actions">
                        <button className="edit-btn" onClick={() => handleEdit(service.id)}>
                          Chỉnh sửa
                        </button>
                        <button className="delete-btn" onClick={() => handleDelete(service.id)}>
                          Xóa
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination-section">
          <button className="pagination-btn prev">Trước đó</button>

          <div className="page-numbers">
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <button className="page-btn">4</button>
            <button className="page-btn next-page">Tiếp theo</button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default TreatmentService
