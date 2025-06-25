"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TreatmentService.css";
import { Bell } from "lucide-react";
import TreatmentServiceAPI from "../../../features/service/apiTreatmentService";

const TreatmentService = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await TreatmentServiceAPI.getAll();
        const mapped = (Array.isArray(res) ? res : res.data).map(
          (item, index) => ({
            id: item.serviceId,
            order: index + 1,
            name: item.name || "Không rõ",
            overview: item.description || "Không có mô tả",
            successRate: "Xem chi tiết",
            process: "Xem quy trình",
            price: item.price?.toString() || "0",
            isActive: item.active,
            isEditing: false,
          })
        );
        setServices(mapped);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu treatment services:", err);
      }
    };
    fetchServices();
  }, []);

  const [editingService, setEditingService] = useState(null);

  const handleEdit = (serviceId) => {
    setServices(
      services.map((service) =>
        service.id === serviceId
          ? { ...service, isEditing: true }
          : { ...service, isEditing: false }
      )
    );
    setEditingService(serviceId);
  };

  const handleSave = (serviceId) => {
    setServices(
      services.map((service) =>
        service.id === serviceId ? { ...service, isEditing: false } : service
      )
    );
    setEditingService(null);
  };

  const handleCancel = (serviceId) => {
    setServices(
      services.map((service) =>
        service.id === serviceId ? { ...service, isEditing: false } : service
      )
    );
    setEditingService(null);
  };

  const handleInputChange = (serviceId, field, value) => {
    setServices(
      services.map((service) =>
        service.id === serviceId ? { ...service, [field]: value } : service
      )
    );
  };

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
    };
    setServices([...services, newService]);
    setEditingService(newService.id);
  };

  const handleDelete = (serviceId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa dịch vụ này?")) {
      setServices(services.filter((service) => service.id !== serviceId));
    }
  };

  const handleSuccessRateEdit = (serviceId) => {
    navigate(`/manager-dashboard/treatment-service/success-rate/${serviceId}`);
  };

  const handleProcessEdit = (serviceId) => {
    navigate(`/manager-dashboard/treatment-service/process/${serviceId}`);
  };

  const handleToggleStatus = async (serviceId) => {
    const service = services.find((s) => s.id === serviceId);
    if (!service) return;

    const newStatus = !service.isActive;

    try {
      await TreatmentServiceAPI.updateStatus(serviceId, newStatus);
      setServices((prev) =>
        prev.map((s) =>
          s.id === serviceId ? { ...s, isActive: newStatus } : s
        )
      );
    } catch (error) {
      console.error("Lỗi khi gọi API updateStatus:", error);
      alert("Không thể cập nhật trạng thái. Vui lòng thử lại.");
    }
  };

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.overview.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="treatment-service-page">
      {/* Header */}
      <header className="treatment-service-header">
        <h1 className="page-title">Dịch vụ điều trị</h1>

        <div className="header-actions">
          <div className="notification-bell">
            <Bell size={20} />
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
                <th>Trạng thái</th>
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
                        onChange={(e) =>
                          handleInputChange(service.id, "name", e.target.value)
                        }
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
                        onChange={(e) =>
                          handleInputChange(
                            service.id,
                            "overview",
                            e.target.value
                          )
                        }
                        className="edit-textarea"
                        rows="2"
                      />
                    ) : (
                      service.overview
                    )}
                  </td>
                  <td>
                    <button
                      className="link-btn"
                      onClick={() => handleSuccessRateEdit(service.id)}
                    >
                      {service.successRate}
                    </button>
                  </td>
                  <td>
                    <button
                      className="link-btn"
                      onClick={() => handleProcessEdit(service.id)}
                    >
                      {service.process}
                    </button>
                  </td>
                  <td>
                    {service.isEditing ? (
                      <input
                        type="text"
                        value={service.price}
                        onChange={(e) =>
                          handleInputChange(service.id, "price", e.target.value)
                        }
                        className="edit-input"
                      />
                    ) : (
                      Number(service.price).toLocaleString()
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleToggleStatus(service.id)}
                      
                      className={`status-toggle-btn ${
                        service.isActive ? "active" : "inactive"
                      }`}
                    >
                      {service.isActive ? "Hoạt động" : "Không hoạt động"}
                    </button>
                  </td>
                  <td className="action-cell">
                    {service.isEditing ? (
                      <div className="edit-actions">
                        <button
                          className="save-btn"
                          onClick={() => handleSave(service.id)}
                        >
                          Lưu
                        </button>
                        <button
                          className="cancel-btn"
                          onClick={() => handleCancel(service.id)}
                        >
                          Hủy
                        </button>
                      </div>
                    ) : (
                      <div className="view-actions">
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(service.id)}
                        >
                          Chỉnh sửa
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
  );
};

export default TreatmentService;
