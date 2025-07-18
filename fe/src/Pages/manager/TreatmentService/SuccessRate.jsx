"use client";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./SuccessRate.css";

const SuccessRate = () => {
  const navigate = useNavigate();
  const { serviceId } = useParams();

  const [successRateData, setSuccessRateData] = useState([
    {
      id: 1,
      ageGroup: "Dưới 35 tuổi",
      livebirthRate: "52%",
      pregnancyRate: "65%",
      nationalComparison: "+8% cao hơn",
      isEditing: false,
    },
    {
      id: 2,
      ageGroup: "35-37 tuổi",
      livebirthRate: "42%",
      pregnancyRate: "55%",
      nationalComparison: "+7% cao hơn",
      isEditing: false,
    },
    {
      id: 3,
      ageGroup: "38-40 tuổi",
      livebirthRate: "33%",
      pregnancyRate: "45%",
      nationalComparison: "+6% cao hơn",
      isEditing: false,
    },
    {
      id: 4,
      ageGroup: "41-42 tuổi",
      livebirthRate: "18%",
      pregnancyRate: "28%",
      nationalComparison: "+5% cao hơn",
      isEditing: false,
    },
    {
      id: 5,
      ageGroup: "Trên 42 tuổi",
      livebirthRate: "7%",
      pregnancyRate: "12%",
      nationalComparison: "+3% cao hơn",
      isEditing: false,
    },
  ]);

  const handleEdit = (id) => {
    setSuccessRateData((data) =>
      data.map((item) =>
        item.id === id
          ? { ...item, isEditing: true }
          : { ...item, isEditing: false }
      )
    );
  };

  const handleSave = (id) => {
    setSuccessRateData((data) =>
      data.map((item) =>
        item.id === id ? { ...item, isEditing: false } : item
      )
    );
  };

  const handleCancel = (id) => {
    setSuccessRateData((data) =>
      data.map((item) =>
        item.id === id ? { ...item, isEditing: false } : item
      )
    );
  };

  const handleInputChange = (id, field, value) => {
    setSuccessRateData((data) =>
      data.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleAddRow = () => {
    const newRow = {
      id: Date.now(),
      ageGroup: "Nhóm tuổi mới",
      livebirthRate: "0%",
      pregnancyRate: "0%",
      nationalComparison: "0% cao hơn",
      isEditing: true,
    };
    setSuccessRateData([...successRateData, newRow]);
  };

  const handleDeleteRow = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa dòng này?")) {
      setSuccessRateData((data) => data.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="success-rate-page">
      {/* Header */}
      <header className="success-rate-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Quay lại
          </button>
          <h1 className="page-title">Tỷ lệ thành công</h1>
        </div>
      </header>

      {/* Content */}
      <main className="success-rate-content">
        <div className="content-header">
          <h2 className="section-title">Tỷ lệ thành công</h2>
          <button className="add-row-btn" onClick={handleAddRow}>
            <span>+</span>
            Thêm dòng
          </button>
        </div>

        {/* Success Rate Table */}
        <div className="table-wrapper">
          <table className="success-rate-table">
            <thead>
              <tr>
                <th>NHÓM TUỔI</th>
                <th>TỶ LỆ SINH SỐNG MỖI CHU KỲ</th>
                <th>TỶ LỆ MANG THAI LÂM SÀNG</th>
                <th>SO VỚI MỨC TRUNG BÌNH QUỐC GIA</th>
                <th>HÀNH ĐỘNG</th>
              </tr>
            </thead>
            <tbody>
              {successRateData.map((item) => (
                <tr key={item.id}>
                  <td>
                    {item.isEditing ? (
                      <input
                        type="text"
                        value={item.ageGroup}
                        onChange={(e) =>
                          handleInputChange(item.id, "ageGroup", e.target.value)
                        }
                        className="edit-input"
                      />
                    ) : (
                      item.ageGroup
                    )}
                  </td>
                  <td>
                    {item.isEditing ? (
                      <input
                        type="text"
                        value={item.livebirthRate}
                        onChange={(e) =>
                          handleInputChange(
                            item.id,
                            "livebirthRate",
                            e.target.value
                          )
                        }
                        className="edit-input"
                      />
                    ) : (
                      item.livebirthRate
                    )}
                  </td>
                  <td>
                    {item.isEditing ? (
                      <input
                        type="text"
                        value={item.pregnancyRate}
                        onChange={(e) =>
                          handleInputChange(
                            item.id,
                            "pregnancyRate",
                            e.target.value
                          )
                        }
                        className="edit-input"
                      />
                    ) : (
                      item.pregnancyRate
                    )}
                  </td>
                  <td>
                    {item.isEditing ? (
                      <input
                        type="text"
                        value={item.nationalComparison}
                        onChange={(e) =>
                          handleInputChange(
                            item.id,
                            "nationalComparison",
                            e.target.value
                          )
                        }
                        className="edit-input"
                      />
                    ) : (
                      <span className="comparison-text">
                        {item.nationalComparison}
                      </span>
                    )}
                  </td>
                  <td className="action-cell">
                    {item.isEditing ? (
                      <div className="edit-actions">
                        <button
                          className="save-btn"
                          onClick={() => handleSave(item.id)}
                        >
                          Lưu
                        </button>
                        <button
                          className="cancel-btn"
                          onClick={() => handleCancel(item.id)}
                        >
                          Hủy
                        </button>
                      </div>
                    ) : (
                      <div className="view-actions">
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(item.id)}
                        >
                          Sửa
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteRow(item.id)}
                        >
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

        <div className="save-section">
          <button className="save-all-btn" onClick={() => navigate(-1)}>
            Lưu tất cả thay đổi
          </button>
        </div>
      </main>
    </div>
  );
};

export default SuccessRate;
