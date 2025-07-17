import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './TreatmentCard.css';

function TreatmentCard({ treatmentId, title, miniTitle, content, image }) {

  const navigate = useNavigate();

  const NoiDung = ({ content }) => {
    return (
      <div dangerouslySetInnerHTML={{ __html: content }} />
    );
  };

  return (
    <div className="treatment-card">
      <div className="img-container">
        <img src={image} alt={title} />
      </div>
      <header>
        <h3>{title}</h3>
        <p>{miniTitle}</p>
      </header>
      <div className="info">
        <p>
          <NoiDung content={content} />
        </p>
      </div>
      <button className="card-button" onClick={() => navigate(`detail/${treatmentId}`)}>Tìm Hiểu Thêm →</button>
    </div>
  );
}

export default TreatmentCard;
