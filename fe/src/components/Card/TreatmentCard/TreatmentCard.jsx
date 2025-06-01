import React from 'react';
import './TreatmentCard.css';

function TreatmentCard({ title, miniTitle, content, image, info }) {
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
        <p>{content}</p>
        {info && 
          <ul className="additional-info">
            {info.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        }
      </div>
      <button className="card-button">Tìm Hiểu Thêm →</button>
    </div>
  );
}

export default TreatmentCard;
