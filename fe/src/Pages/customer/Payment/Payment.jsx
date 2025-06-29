import React, { useState } from "react";
import PaymentMethodCard from "@components/Card/PaymentMethodCard/PaymentMethodCard";
import "./Payment.css";

const Payment = () => {
  const [selectedMethod, setSelectedMethod] = useState("VNPay");

  const paymentMethods = [
    { name: "VNPay", icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path fill="none" stroke="currentColor" stroke-linejoin="round" d="m28.622 37.722l14.445-14.444c.577-.578.577-1.733 0-2.311L34.4 12.3c-.578-.578-1.733-.578-2.311 0l-6.356 6.356L16.49 9.41c-.578-.578-1.734-.578-2.311 0l-9.245 9.245c-.578.577-.578 1.733 0 2.31L21.69 37.723c1.733 1.734 5.2 1.734 6.933 0Z" stroke-width="1"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m25.733 18.656l-8.089 8.089q-3.466 3.465-6.933 0" stroke-width="1"/><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"><path d="M18.222 30.789q-1.732 1.734-3.467 0m22.534-15.6c-1.262-1.156-2.89-.578-4.045.578L18.222 30.789m0-15.022c-4.622-4.622-10.4 1.155-5.778 5.778l5.2 5.2l-5.2-5.2m10.978-.578l-4.044-4.045"/><path d="m21.689 22.7l-4.622-4.622c-.578-.578-1.445-1.445-2.311-1.156m0 3.467c-.578-.578-1.445-1.444-1.156-2.311m5.778 6.933l-4.622-4.622"/></g></svg> },
    // { name: "Momo", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M18.5 16.8c-.7 0-1.2-.6-1.2-1.2c0-.7.6-1.2 1.2-1.2s1.2.6 1.2 1.2c.1.6-.5 1.2-1.2 1.2m0-4.8c-1.9 0-3.5 1.6-3.5 3.5c0 2.6 3.5 6.5 3.5 6.5s3.5-3.9 3.5-6.5c0-1.9-1.6-3.5-3.5-3.5m-3.6-.7C14.6 10 13.4 9 12 9c-1.7 0-3 1.3-3 3s1.3 3 3 3c.4 0 .7-.1 1-.2c.2-1.4.9-2.6 1.9-3.5M13 16H7a2 2 0 0 0-2-2v-4a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2s1 0 2 .6V6H3v12h10.5c-.2-.7-.4-1.3-.5-2"/></svg> },
    // { name: "Tiền mặt", icon: "https://cdn-icons-png.flaticon.com/512/126/126083.png" },
  ];

  const handleConfirmPayment = () => {
    alert(`Đã chọn thanh toán bằng ${selectedMethod}`);
  };

  return (
    <div className="payment-container">
      <h2>Thanh toán dịch vụ khám</h2>

      <div className="service-info">
        <h3>Dịch vụ: Tư vấn hiếm muộn</h3>
        <p>Bác sĩ: Nguyễn Văn A</p>
        <p>Thời gian: 10:00 - 10:30, 25/06/2025</p>
        <p>Giá: <strong>500.000 VNĐ</strong></p>
      </div>

      <h3>Chọn phương thức thanh toán</h3>
      <div className="payment-methods">
        {paymentMethods.map((method) => (
          <PaymentMethodCard
            key={method.name}
            icon={method.icon}
            name={method.name}
            selected={selectedMethod === method.name}
            onSelect={() => setSelectedMethod(method.name)}
          />
        ))}
      </div>

      <div className="total-section">
        <h3>Tổng thanh toán: 500.000 VNĐ</h3>
        <button onClick={handleConfirmPayment}>Xác nhận thanh toán</button>
      </div>
    </div>
  );
};

export default Payment;
