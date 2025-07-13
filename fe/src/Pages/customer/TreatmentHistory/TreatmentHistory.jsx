import React, { useEffect, useState } from "react";
import { CalendarIcon } from "lucide-react"
import ApiGateway from "../../../features/service/apiGateway";
import "./TreatmentHistory.css"

const TreatmentHistory = () => {
  const [ ongoingTreatments, setOngoingTreatments] = useState([])
  const [ completedTreatments, setCompletedTreatments ] = useState([])

  function formatDate(date) {
    if (typeof date === 'string') {
      date = new Date(date);
    }
    
    return date?.toLocaleDateString('en-GB'); // 'en-GB' format: dd/mm/yyyy
  }

  useEffect(() => {
    fetchMyTreatments();
  },[])

  const fetchMyTreatments = async () => {
    try {
      const response = await ApiGateway.getMyCycle();

      const treatments = response.data || [];
      const today = new Date();
      
      const upComingTreatments = treatments.filter(treatment => {
          if (treatment.status === 'ongoing') {
            return true;
          }
          
          if (treatment.startDate && treatment.endDate) {
            const startDate = new Date(treatment.startDate);
            const endDate = new Date(treatment.endDate);
            return today >= startDate && today <= endDate;
          }
          
          return false;
      });
      
      const completedTreatments = treatments.filter(treatment => {
          if (treatment.status === 'finished' || treatment.status === 'stopped') {
            return true;
          }
          
          if (treatment.endDate) {
            const endDate = new Date(treatment.endDate);
            return today > endDate;
          }
          
          return false;
      });
      
      upComingTreatments.sort((a, b) => {
        const dateA = new Date(a.startDate);
        const dateB = new Date(b.startDate);
        return dateA - dateB;
      });
      
      completedTreatments.sort((a, b) => {
        const dateA = new Date(a.endDate || a.startDate);
        const dateB = new Date(b.endDate || b.startDate);
        return dateB - dateA;
      });
      
      setOngoingTreatments(upComingTreatments);
      setCompletedTreatments(completedTreatments);
        
    } catch (error) {
      console.error("Error fetching treatments:", error);
      setOngoingTreatments([]);
      setCompletedTreatments([]);
    }
  };

  return (
    <div className="treatment-history-page">
      <h2>Lịch sử điều trị</h2>
      <br></br>
      <div className="treatment-container">
        {ongoingTreatments.length > 0 && (
          <section className="treatment-section">
            <h4>Đang diễn ra</h4>
            <div className="treatments-list">
              {ongoingTreatments.map((treatment) => (
                <div key={treatment.id} className="treatment-card ongoing">
                  <div className="treatment-icon">
                    <CalendarIcon size={24} />
                  </div>

                  <div className="treatment-info">
                    <h5>Điều trị {treatment.serviceName}</h5>
                    <p>
                      {formatDate(treatment.startDate)} - {formatDate(treatment.endDate)}
                    </p>
                    <p className="doctor-name">Bác sĩ {treatment.doctorName}</p>
                  </div>

                  <div className="treatment-actions">
                    <button className="primary-btn">Xem chi tiết</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {completedTreatments.length > 0 && (
          <section className="treatment-section">
            <h4>Đã hoàn thành</h4>
            <div className="treatments-list">
              {completedTreatments.map((treatment) => (
                <div key={treatment.id} className="treatment-card completed">
                  <div className="treatment-icon completed-icon">
                    <CalendarIcon size={24} />
                  </div>

                  <div className="treatment-info">
                    <h5>{treatment.title}</h5>
                    <p>
                      {formatDate(treatment.date)} - {formatDate(treatment.time)}
                    </p>
                    <p className="doctor-name">Bác sĩ {treatment.doctorName}</p>
                  </div>

                  <div className="treatment-actions">
                    <button className="secondary-btn">Xem chi tiết</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {ongoingTreatments.length == 0 && completedTreatments.length == 0 && (
          <div className="empty-state">
            <p>Bạn chưa có điều trị nào</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TreatmentHistory
