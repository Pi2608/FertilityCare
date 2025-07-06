import "./TreatmentHistory.css";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import apiAppointment from "@features/service/apiAppointment";

const TreatmentHistory = ({ userName = "Nguyễn Thị Hoa" }) => {
  const [ongoingTreatments, setOngoingTreatments] = useState([]);
  const [completedTreatments, setCompletedTreatments] = useState([]);

  useEffect(() => {
    const fetchCycles = async () => {
      try {
        const res = await apiAppointment.getAllCyclesOfCustomer();
        const cycles = res.data || [];
        const ongoing = cycles.filter((c) => c.status === "ongoing");
        const completed = cycles.filter((c) => c.status === "completed");
        setOngoingTreatments(ongoing);
        setCompletedTreatments(completed);
      } catch (error) {
        console.error("Lỗi khi lấy quá trình điều trị:", error);
      }
    };

    fetchCycles();
  }, []);

  return (
    <div className="treatment-history-page">
      <h2>Quá trình điều trị</h2>
      <br />
      <div className="treatment-container">
        {/* Đang diễn ra */}
        <section className="treatment-section">
          <h4>Đang diễn ra</h4>
          <div className="treatments-list">
            {ongoingTreatments.map((treatment) => (
              <div key={treatment.cycleId} className="treatment-card ongoing">
                <div className="treatment-icon">
                  <CalendarIcon size={24} />
                </div>
                <div className="treatment-info">
                  <h5>
                    {treatment.serviceName} - Chu kỳ #{treatment.cycleId}
                  </h5>
                  {treatment.cycleStep?.[0]?.description && (
                    <p>{treatment.cycleStep[0].description}</p>
                  )}
                  <p>
                    {new Date(treatment.startDate).toLocaleDateString("vi-VN")}{" "}
                    - {new Date(treatment.endDate).toLocaleDateString("vi-VN")}
                  </p>
                </div>
                <div className="treatment-actions">
                  <button className="primary-btn">Xem chi tiết</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Đã hoàn thành */}
        <section className="treatment-section">
          <h4>Đã hoàn thành</h4>
          {completedTreatments.length === 0 ? (
            <p style={{ padding: "1rem", fontStyle: "italic" }}>
              Chưa có dữ liệu
            </p>
          ) : (
            <div className="treatments-list">
              {completedTreatments.map((treatment) => (
                <div
                  key={treatment.cycleId}
                  className="treatment-card completed"
                >
                  <div className="treatment-icon completed-icon">
                    <CalendarIcon size={24} />
                  </div>
                  <div className="treatment-info">
                    <h5>
                      {treatment.serviceName} - Chu kỳ #{treatment.cycleId}
                    </h5>
                    {treatment.cycleStep?.[0]?.description && (
                      <p>{treatment.cycleStep[0].description}</p>
                    )}
                    <p>
                      {new Date(treatment.startDate).toLocaleDateString(
                        "vi-VN"
                      )}{" "}
                      →{" "}
                      {new Date(treatment.endDate).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                  <div className="treatment-actions">
                    <button className="btn-outline">Xem chi tiết</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default TreatmentHistory;
