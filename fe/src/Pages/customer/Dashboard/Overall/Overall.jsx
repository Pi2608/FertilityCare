import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiGateway from "../../../../features/service/apiGateway";
import MessageAPI from "@features/service/apiMessage";
import apiMedicine from "@features/service/apiMedicine";
import "./Overall.css";

const Overall = ({ userName = "Nguyễn Thị Hoa" }) => {
  const navigate = useNavigate();

  // Mock data for Tổng quan
  const [myTreatment, setMyTreatment] = useState();
  const [treatmentSteps, setTreatmentSteps] = useState([]);

  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  const [todaysMedications, setTodaysMedications] = useState([]);

  const [recentMessages, setRecentMessages] = useState([]);

  function formatDate(date) {
    if (typeof date === "string") {
      date = new Date(date);
    }

    return date?.toLocaleDateString("en-GB"); // 'en-GB' format: dd/mm/yyyy
  }

  function formatDateTime(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleString("vi-VN", {
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
    });
  }

  useEffect(() => {
    fetchMyTreatments();
    getUpcomingAppointments();
    fetchRecentMessages();
    fetchTodaysMedications();
  }, []);

  const fetchTodaysMedications = async () => {
    try {
      const customer = await apiMedicine.getCurrentCustomer();
      console.log(">>> CUSTOMER từ getCurrentCustomer():", customer);

      if (!customer || !customer.id) {
        console.error("❌ Không lấy được customerId hợp lệ.");
        return;
      }

      const medicines = await apiMedicine.getMedicineSchedulesByCustomer(
        customer.id
      );
      console.log(">>> MEDICINES TRẢ VỀ:", medicines);

      const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

      const todayMeds = medicines
        .filter((med) => {
          console.log("🧪 Kiểm tra ngày thuốc:", med.eventDate);
          return med.eventDate.slice(0, 10) === today;
        })
        .map((med) => ({
          id: med.scheduleId,
          name: med.medicineName,
          dosage: med.dose,
          instruction: med.discription,
          time: new Date(med.eventDate).toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));

      setTodaysMedications(todayMeds);
    } catch (error) {
      console.error("❌ Lỗi khi lấy lịch thuốc hôm nay:", error);
    }
  };

  const fetchRecentMessages = async () => {
    try {
      const messages = await MessageAPI.getLatestMessages();
      const formattedMessages = messages.map((msg) => ({
        id: msg.userId,
        sender: msg.userName,
        content: msg.content,
        time: formatDateTime(msg.timestamp),
      }));
      setRecentMessages(formattedMessages);
    } catch (error) {
      console.error("Lỗi khi fetch tin nhắn gần đây:", error);
    }
  };

  const fetchMyTreatments = async () => {
    try {
      const response = await ApiGateway.getMyCycle();
      console.log("🧪 FETCHED myTreatment:", response.data);
      setMyTreatment(response.data[0]);
      if (response.data) {
        await getCycleSteps(response.data[0].cycleId);
      }
    } catch (error) {
      console.error("Error fetching treatments:", error);
    }
  };

  const getCycleSteps = async (cycleId) => {
    try {
      const response = await ApiGateway.getCycleStepsByCycleId(cycleId);
      console.log("🧪 Cycle steps:", response.data);
      setTreatmentSteps(response.data);
    } catch (error) {
      console.error("Error fetching cycle steps:", error);
    }
  };

  const getUpcomingAppointments = async () => {
    try {
      const response = await ApiGateway.getAllAppointments();
      let today = new Date();

      const upcomingAppointments = response.filter((appointment) => {
        const appointmentDateTime = new Date(
          `${appointment.date}T${appointment.startTime}`
        );

        return appointmentDateTime > today;
      });

      upcomingAppointments.sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.startTime}`);
        const dateB = new Date(`${b.date}T${b.startTime}`);
        return dateA - dateB;
      });

      setUpcomingAppointments(upcomingAppointments);
    } catch (error) {
      console.error("Error fetching upcoming appointments:", error);
    }
  };

  const renderProgressBar = () => {
    const total = treatmentSteps?.length || 1;
    const completed = treatmentSteps.filter(step => step.statusCycleStep === 'finished').length;
    const percent = (completed / total) * 100;
  
    return (
      <div className="my-progress">
        <h3>
          Tiến trình điều trị {myTreatment?.serviceName} #{myTreatment?.cycleId}
        </h3>
        <div className="progress-header">
          <span></span>
          <span>
            {formatDate(myTreatment?.startDate)} -{" "}
            {formatDate(myTreatment?.endDate)}
          </span>
          <span>{Math.round(percent)}%</span>
        </div>
  
        <div className="progress-bar-wrapper">
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{ width: `${percent}%` }}
            />
          </div>
  
          <div className="progress-steps">
            {treatmentSteps.map((step, idx) => {
              let className = "";
              if (step.statusCycleStep === "finished") className = "completed";
              else if (step.statusCycleStep === "ongoing")
                className = "in-progress";
              else className = "pending";
  
              return (
                <div key={idx} className={`step-item ${className}`}>
                  <div className="step-no">
                    <p>Bước {step.stepOrder}</p>
                    <span style={{ color: "#666" }}>
                      {formatDate(step.eventdate)}
                    </span>
                  </div>
                  <div className="step-status">
                    {className === "completed" && "Hoàn thành"}
                    {className === "in-progress" && "Đang tiến hành"}
                    {className === "pending" && "Chưa bắt đầu"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };
  

  return (
    <div className="patient-dashboard-main">
      <div className="welcome-section">
        

        
      </div>

      <div className="tab-content">
        <div className="overview-container">
          <section className="overview-item progress-card">
            {renderProgressBar()}
          </section>
          <section className="overview-item appointments-card">
            <h3>Lịch hẹn sắp tới</h3>
            {upcomingAppointments
              .filter((appt) => appt.status.toLowerCase() === "confirmed")
              .map((appt) => (
                <div key={appt.appointmentId} className="appointment-item">
                  <div className="appointment-info">
                    <h4>
                      {appt.type === "tu_van" ? "Tư vấn" : "Tái khám"}{" "}
                      {appt.serviceId === 1
                        ? "IUI"
                        : appt.serviceId === 2
                        ? "IVF"
                        : ""}
                      <span
                        className={`status-label status-${appt.status
                          .replace(/\s+/g, "")
                          .toLowerCase()}`}
                      >
                        {}
                      </span>
                    </h4>
                    <p>
                      {formatDate(appt.date)} - {appt.startTime}
                    </p>
                    {appt.doctorName && <p>Bác sĩ {appt.doctorName}</p>}
                  </div>
                </div>
              ))}

            <button
              className="btn-link"
              onClick={() => navigate("/patient-dashboard/appointments")}
            >
              Xem tất cả lịch hẹn
            </button>
          </section>
          <section className="overview-item meds-card">
            <h3>Lịch uống thuốc hôm nay</h3>
            {todaysMedications.length === 0 && (
              <p>Không có thuốc cần uống hôm nay.</p>
            )}
            {todaysMedications.map((med) => (
              <div key={med.id} className="med-item">
                <div>
                  <h4>{med.name}</h4>
                  <p>{med.dosage}</p>
                  <p>{med.instruction}</p>
                </div>
                <span className="med-time">{med.time}</span>
              </div>
            ))}
            <button
              className="btn-link"
              onClick={() => navigate("/patient-dashboard/pills")}
            >
              Xem lịch uống thuốc đầy đủ
            </button>
          </section>

          <section className="overview-item messages-card">
            <h3>Tin nhắn gần đây</h3>
            {recentMessages.map((msg) => (
              <div key={msg.id} className="message-item">
                <div className="message-avatar">
                  <div className="avatar-placeholder"></div>
                </div>
                <div className="message-content">
                  <p className="sender-name">{msg.sender}</p>
                  <p className="message-text">{msg.content}</p>
                  <p className="message-time">{msg.time}</p>
                </div>
              </div>
            ))}

            <button
              className="btn-link"
              onClick={() => navigate("/patient-dashboard/messages")}
            >
              Xem tất cả tin nhắn
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Overall;
