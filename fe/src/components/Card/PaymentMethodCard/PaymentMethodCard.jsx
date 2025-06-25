import React from "react";
import "./PaymentMethodCard.css";

const PaymentMethodCard = ({ icon, name, selected, onSelect }) => {
  return (
    <div className={`payment-method-card ${selected ? "selected" : ""}`} onClick={onSelect}>
      <span className="payment-icon">{icon}</span>
      <p>{name}</p>
    </div>
  );
};

export default PaymentMethodCard;
