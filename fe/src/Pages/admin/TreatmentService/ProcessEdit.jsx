import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiGateway from "../../../features/service/apiGateway";
import "./ProcessEdit.css";

const ProcessEdit2 = () => {
  const navigate = useNavigate();
  const { serviceId } = useParams();

  const [processSteps, setProcessSteps] = useState([]);

  useEffect(() => {
    const fetchProcessSteps = async () => {
      try {
        const response = await ApiGateway.getTreatmentSteps(serviceId);
        const stepsData = response.data;
        const mappedSteps = stepsData.map((step) => ({
          id: step.stepOrder,
          stepNumber: step.stepOrder,
          title: step.title,
          description: step.description,
          details: [],
          duration: "",
          isEditing: false,
        }));
        setProcessSteps(mappedSteps);
      } catch (error) {
        console.error("Error fetching treatment steps:", error);
      }
    };

    if (serviceId) {
      fetchProcessSteps();
    }
  }, [serviceId]);

  const handleEdit = (stepId) => {
    setProcessSteps((steps) =>
      steps.map((step) =>
        step.id === stepId
          ? { ...step, isEditing: true }
          : { ...step, isEditing: false }
      )
    );
  };

  const handleSave = (stepId) => {
    setProcessSteps((steps) =>
      steps.map((step) =>
        step.id === stepId ? { ...step, isEditing: false } : step
      )
    );
  };

  const handleCancel = (stepId) => {
    setProcessSteps((steps) =>
      steps.map((step) =>
        step.id === stepId ? { ...step, isEditing: false } : step
      )
    );
  };

  const handleInputChange = (stepId, field, value) => {
    setProcessSteps((steps) =>
      steps.map((step) =>
        step.id === stepId ? { ...step, [field]: value } : step
      )
    );
  };

  const handleDetailChange = (stepId, detailId, field, value) => {
    setProcessSteps((steps) =>
      steps.map((step) =>
        step.id === stepId
          ? {
              ...step,
              details: step.details.map((detail) =>
                detail.id === detailId ? { ...detail, [field]: value } : detail
              ),
            }
          : step
      )
    );
  };

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

      isEditing: true,
    };
    setProcessSteps([...processSteps, newStep]);
  };

  const handleDeleteStep = (stepId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bước này?")) {
      setProcessSteps((steps) => steps.filter((step) => step.id !== stepId));
    }
  };

  const handleAddDetail = (stepId) => {
    const newDetail = {
      id: Date.now(),
      subtitle: "Chi tiết mới",
      content: "Nội dung chi tiết mới",
    };
    setProcessSteps((steps) =>
      steps.map((step) =>
        step.id === stepId
          ? { ...step, details: [...step.details, newDetail] }
          : step
      )
    );
  };

  const handleDeleteDetail = (stepId, detailId) => {
    setProcessSteps((steps) =>
      steps.map((step) =>
        step.id === stepId
          ? {
              ...step,
              details: step.details.filter((detail) => detail.id !== detailId),
            }
          : step
      )
    );
  };

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
                      onChange={(e) =>
                        handleInputChange(step.id, "title", e.target.value)
                      }
                      className="edit-title-input"
                    />
                  ) : (
                    <h3 className="step-title">{step.title}</h3>
                  )}

                  {step.isEditing ? (
                    <textarea
                      value={step.description}
                      onChange={(e) =>
                        handleInputChange(
                          step.id,
                          "description",
                          e.target.value
                        )
                      }
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
                      <button
                        className="save-btn"
                        onClick={() => handleSave(step.id)}
                      >
                        Lưu
                      </button>
                      <button
                        className="cancel-btn"
                        onClick={() => handleCancel(step.id)}
                      >
                        Hủy
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(step.id)}
                      >
                        Sửa
                      </button>
                      <button
                        className="delete-btne"
                        onClick={() => handleDeleteStep(step.id)}
                      >
                        Xóa
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProcessEdit;
