"use client"

import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./ProcessEdit.css"

const ProcessEdit = () => {
  const navigate = useNavigate()
  const { serviceId } = useParams()

  const [processSteps, setProcessSteps] = useState([
    {
      id: 1,
      stepNumber: 1,
      title: "Kích Thích Buồng Trứng",
      description:
        "Giai đoạn đầu tiên của IVF liên quan đến việc sử dụng thuốc để kích thích buồng trứng sản xuất nhiều trứng.",
      details: [
        {
          id: 1,
          subtitle: "Thuốc Kích Thích Buồng Trứng",
          content:
            "Bạn sẽ được kê đơn thuốc kích thích buồng trứng, thường được tiêm hàng ngày trong khoảng 8-14 ngày. Những thuốc này chứa hormone kích thích nang trứng (FSH) và/hoặc hormone hoàng thể hóa (LH) để kích thích buồng trứng sản xuất nhiều trứng.",
        },
        {
          id: 2,
          subtitle: "Theo Dõi Và Điều Chỉnh",
          content:
            "Trong giai đoạn này, bạn sẽ có các cuộc hẹn theo dõi thường xuyên (thường là 2-3 ngày một lần) để kiểm tra sự phát triển của nang trứng thông qua siêu âm và xét nghiệm máu. Liều thuốc có thể được điều chỉnh dựa trên phản ứng của bạn.",
        },
        {
          id: 3,
          subtitle: "Ngăn Chặn Rụng Trứng Sớm",
          content:
            "Bạn cũng sẽ được dùng thuốc để ngăn cơ thể rụng trứng sớm, đảm bảo trứng có thể được lấy ra vào thời điểm tối ưu.",
        },
        {
          id: 4,
          subtitle: "Kích Hoạt Sự Trưởng Thành Cuối Cùng",
          content:
            'Khi nang trứng đạt kích thước thích hợp (thường là khoảng 18-20mm), bạn sẽ được tiêm "mũi tiêm kích hoạt" để hoàn thiện sự trưởng thành của trứng và chuẩn bị cho việc lấy trứng.',
        },
      ],
      duration: "8-14 ngày",
      isEditing: false,
    },
    {
      id: 2,
      stepNumber: 2,
      title: "Lấy Trứng",
      description:
        "Khoảng 34-36 giờ sau mũi tiêm kích hoạt, trứng sẽ được lấy ra khỏi buồng trứng trong một thủ thuật nhỏ.",
      details: [
        {
          id: 1,
          subtitle: "Thủ Thuật Lấy Trứng",
          content:
            "Đây là một thủ thuật ngoại trú được thực hiện dưới gây mê nhẹ. Bác sĩ sẽ sử dụng siêu âm để hướng dẫn một kim nhỏ qua thành âm đạo vào buồng trứng để hút trứng từ các nang trứng.",
        },
        {
          id: 2,
          subtitle: "Sau Thủ Thuật",
          content:
            "Sau khi lấy trứng, bạn sẽ được theo dõi trong phòng hồi phục trong vài giờ. Một số phụ nữ có thể cảm thấy đau nhẹ hoặc chướng rút, nhưng hầu hết có thể trở lại các hoạt động bình thường vào ngày hôm sau.",
        },
        {
          id: 3,
          subtitle: "Thu Thập Tinh Trùng",
          content:
            "Vào ngày lấy trứng, người bạn đời nam sẽ cung cấp mẫu tinh trùng, hoặc tinh trùng đã đông lạnh hoặc hiến tặng sẽ được chuẩn bị.",
        },
      ],
      duration: "20-30 phút cho thủ thuật",
      isEditing: false,
    },
    {
      id: 3,
      stepNumber: 3,
      title: "Thụ Tinh",
      description: "Sau khi lấy trứng, chúng sẽ được thụ tinh với tinh trùng trong phòng thí nghiệm.",
      details: [
        {
          id: 1,
          subtitle: "Thụ Tinh Thông Thường",
          content:
            "Trong IVF thông thường, trứng và tinh trùng được đặt cùng nhau trong một đĩa nuôi cấy và tinh trùng thụ tinh trứng một cách tự nhiên.",
        },
        {
          id: 2,
          subtitle: "Tiêm Tinh Trùng Vào Bào Tương Trứng (ICSI)",
          content:
            "Trong một số trường hợp, đặc biệt là khi có vấn đề về tinh trùng, một kỹ thuật gọi là ICSI có thể được sử dụng. Trong ICSI, một tinh trùng được tiêm trực tiếp vào trứng để thụ tinh.",
        },
        {
          id: 3,
          subtitle: "Kiểm Tra Thụ Tinh",
          content:
            "Khoảng 16-18 giờ sau khi trứng và tinh trùng được đặt cùng nhau, phòng thí nghiệm sẽ kiểm tra xem trứng đã được thụ tinh chưa. Trứng đã thụ tinh (giờ được gọi là hợp tử) sẽ được nuôi cấy trong vài ngày.",
        },
      ],
      duration: "16-18 giờ để xác nhận thụ tinh",
      isEditing: false,
    },
    {
      id: 4,
      stepNumber: 4,
      title: "Nuôi Cấy Phôi",
      description: "Sau khi thụ tinh, phôi được nuôi cấy trong phòng thí nghiệm trong 3-5 ngày.",
      details: [
        {
          id: 1,
          subtitle: "Theo Dõi Sự Phát Triển",
          content:
            "Phôi học viên sẽ theo dõi sự phát triển của phôi, đánh giá chất lượng dựa trên các yếu tố như số lượng tế bào, tốc độ phân chia và cấu trúc.",
        },
        {
          id: 2,
          subtitle: "Phôi Ngày 3 vs. Phôi Nang Ngày 5",
          content:
            "Phôi có thể được chuyển vào ngày thứ 3 (giai đoạn phân chia) hoặc được nuôi cấy đến ngày thứ 5 (giai đoạn phôi nang). Phôi nang ngày 5 thường có tỷ lệ làm tổ cao hơn.",
        },
        {
          id: 3,
          subtitle: "Sàng Lọc Di Truyền (Tùy Chọn)",
          content:
            "Trong một số trường hợp, phôi có thể được xét nghiệm để phát hiện bất thường di truyền trước khi chuyển. Điều này được gọi là Sàng lọc Di truyền Tiền làm tổ (PGT).",
        },
      ],
      duration: "3-5 ngày",
      isEditing: false,
    },
  ])

  const handleEdit = (stepId) => {
    setProcessSteps((steps) =>
      steps.map((step) => (step.id === stepId ? { ...step, isEditing: true } : { ...step, isEditing: false })),
    )
  }

  const handleSave = (stepId) => {
    setProcessSteps((steps) => steps.map((step) => (step.id === stepId ? { ...step, isEditing: false } : step)))
  }

  const handleCancel = (stepId) => {
    setProcessSteps((steps) => steps.map((step) => (step.id === stepId ? { ...step, isEditing: false } : step)))
  }

  const handleInputChange = (stepId, field, value) => {
    setProcessSteps((steps) => steps.map((step) => (step.id === stepId ? { ...step, [field]: value } : step)))
  }

  const handleDetailChange = (stepId, detailId, field, value) => {
    setProcessSteps((steps) =>
      steps.map((step) =>
        step.id === stepId
          ? {
              ...step,
              details: step.details.map((detail) => (detail.id === detailId ? { ...detail, [field]: value } : detail)),
            }
          : step,
      ),
    )
  }

  const handleAddStep = () => {
    const newStep = {
      id: Date.now(),
      stepNumber: processSteps.length + 1,
      title: "Bước mới",
      description: "Mô tả bước mới",
      details: [
        {
          id: Date.now(),
          subtitle: "Chi tiết mới",
          content: "Nội dung chi tiết",
        },
      ],
      duration: "Thời gian",
      isEditing: true,
    }
    setProcessSteps([...processSteps, newStep])
  }

  const handleDeleteStep = (stepId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bước này?")) {
      setProcessSteps((steps) => steps.filter((step) => step.id !== stepId))
    }
  }

  const handleAddDetail = (stepId) => {
    const newDetail = {
      id: Date.now(),
      subtitle: "Chi tiết mới",
      content: "Nội dung chi tiết mới",
    }
    setProcessSteps((steps) =>
      steps.map((step) => (step.id === stepId ? { ...step, details: [...step.details, newDetail] } : step)),
    )
  }

  const handleDeleteDetail = (stepId, detailId) => {
    setProcessSteps((steps) =>
      steps.map((step) =>
        step.id === stepId ? { ...step, details: step.details.filter((detail) => detail.id !== detailId) } : step,
      ),
    )
  }

  return (
    <div className="process-edit-page">
      {/* Header */}
      <header className="process-edit-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Quay lại
          </button>
          <h1 className="page-title">Chỉnh sửa quy trình điều trị</h1>
        </div>

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
      <main className="process-edit-content">
        <div className="content-header">
          <h2 className="section-title">Quy trình điều trị</h2>
          <button className="add-step-btn" onClick={handleAddStep}>
            <span>+</span>
            Thêm bước
          </button>
        </div>

        {/* Process Steps */}
        <div className="process-steps">
          {processSteps.map((step) => (
            <div key={step.id} className="process-step">
              <div className="step-header">
                <div className="step-number">{step.stepNumber}</div>
                <div className="step-title-section">
                  {step.isEditing ? (
                    <input
                      type="text"
                      value={step.title}
                      onChange={(e) => handleInputChange(step.id, "title", e.target.value)}
                      className="edit-title-input"
                    />
                  ) : (
                    <h3 className="step-title">{step.title}</h3>
                  )}

                  {step.isEditing ? (
                    <textarea
                      value={step.description}
                      onChange={(e) => handleInputChange(step.id, "description", e.target.value)}
                      className="edit-description-textarea"
                      rows="2"
                    />
                  ) : (
                    <p className="step-description">{step.description}</p>
                  )}
                </div>

                <div className="step-actions">
                  {step.isEditing ? (
                    <>
                      <button className="save-btn" onClick={() => handleSave(step.id)}>
                        Lưu
                      </button>
                      <button className="cancel-btn" onClick={() => handleCancel(step.id)}>
                        Hủy
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="edit-btn" onClick={() => handleEdit(step.id)}>
                        Sửa
                      </button>
                      <button className="delete-btn" onClick={() => handleDeleteStep(step.id)}>
                        Xóa
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="step-details">
                {step.details.map((detail) => (
                  <div key={detail.id} className="detail-item">
                    {step.isEditing ? (
                      <>
                        <input
                          type="text"
                          value={detail.subtitle}
                          onChange={(e) => handleDetailChange(step.id, detail.id, "subtitle", e.target.value)}
                          className="edit-subtitle-input"
                        />
                        <textarea
                          value={detail.content}
                          onChange={(e) => handleDetailChange(step.id, detail.id, "content", e.target.value)}
                          className="edit-content-textarea"
                          rows="3"
                        />
                        <button className="delete-detail-btn" onClick={() => handleDeleteDetail(step.id, detail.id)}>
                          Xóa chi tiết
                        </button>
                      </>
                    ) : (
                      <>
                        <h4 className="detail-subtitle">{detail.subtitle}</h4>
                        <p className="detail-content">{detail.content}</p>
                      </>
                    )}
                  </div>
                ))}

                {step.isEditing && (
                  <button className="add-detail-btn" onClick={() => handleAddDetail(step.id)}>
                    + Thêm chi tiết
                  </button>
                )}
              </div>

              <div className="step-duration">
                <span className="duration-icon">⏱</span>
                {step.isEditing ? (
                  <input
                    type="text"
                    value={step.duration}
                    onChange={(e) => handleInputChange(step.id, "duration", e.target.value)}
                    className="edit-duration-input"
                  />
                ) : (
                  <span className="duration-text">Thời gian: {step.duration}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="save-section">
          <button className="save-all-btn" onClick={() => navigate(-1)}>
            Lưu tất cả thay đổi
          </button>
        </div>
      </main>
    </div>
  )
}

export default ProcessEdit
