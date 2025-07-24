import React, { useEffect, useState } from 'react';
import './PaymentList.css';
import { CreditCard, CheckCircle, XCircle } from 'lucide-react';
import ApiGateway from '@features/service/apiGateway';

const PaymentList = ({ userName = "Nguyễn Thị Hoa" }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDatetimeWithWeekday = (isoString) => {
    const date = new Date(isoString);

    const weekday = date.toLocaleDateString("vi-VN", { weekday: "long" });
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${weekday}, ${hours}:${minutes} ${day}/${month}/${year}`;
  };

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const data = await ApiGateway.getPaymentsByCustomerId();
      setPayments(data || []);
      console.log("Payments fetched:", data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // Lọc thanh toán thành công và thất bại
  const paidPayments = payments.filter(payment => 
    payment.status === 'paid' || payment.status === 'completed'
  );
  
  const failedPayments = payments.filter(payment => 
    payment.status === 'failed' || payment.status === 'cancelled'
  );

  const getStatusIcon = (status) => {
    if (status === 'paid' || status === 'completed') {
      return <CheckCircle size={32} className="status-icon success" />;
    } else if (status === 'failed' || status === 'cancelled') {
      return <XCircle size={32} className="status-icon failed" />;
    }
    return <CreditCard size={32} className="status-icon default" />;
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'paid':
      case 'completed':
        return 'Thành công';
      case 'failed':
        return 'Thất bại';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return 'Không xác định';
    }
  };

  const getStatusClass = (status) => {
    if (status === 'paid' || status === 'completed') {
      return 'paid';
    } else if (status === 'failed' || status === 'cancelled') {
      return 'failed';
    }
    return 'unknown';
  };

  if (loading) {
    return (
      <div className="payment-page">
        <div className="loading-container">
          <p>Đang tải lịch sử thanh toán...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <div className="welcome-section">
        <div className="welcome-text">
          <h2>Lịch sử thanh toán</h2>
          <p>Xem tất cả các giao dịch thanh toán của bạn</p>
        </div>
        <div className="actions">
          <div className="payment-stats">
            <span className="stat-payment-item success">
              Thành công: {paidPayments.length}
            </span>
            <span className="stat-payment-item failed">
              Thất bại: {failedPayments.length}
            </span>
          </div>
          <button className="secondary-btn" onClick={fetchPayments}>
            Làm mới
          </button>
        </div>
      </div>

      <div className="payment-list-container">

        {/* Thanh toán thành công */}
        <section className="payment-section">
          <h4>Thanh toán thành công</h4>
          <div className="payments-list">
            {paidPayments.length > 0 ? (
              paidPayments.map((payment) => (
                <div
                  key={payment.paymentId}
                  className={`payment-card ${getStatusClass(payment.status)}`}
                >
                  <div className="payment-icon">
                    {getStatusIcon(payment.status)}
                  </div>

                  <div className="payment-info">
                    <h5>{payment.serviceName || 'Thanh toán dịch vụ'}</h5>    
                    <p className="doctor-name">Bác sĩ {payment.doctorName}</p>
                    <p>Ngày hẹn: {formatDatetimeWithWeekday(payment.appointmentDate)}</p>   
                    <p className="payment-amount">
                      Số tiền: {formatCurrency(payment.total)}
                    </p>
                  </div>

                  <div className="payment-status">
                    <span className="paid-date">
                      <p>
                        {formatDatetimeWithWeekday(payment.paid)}
                      </p>
                    </span>
                    <span className={`status-badge ${getStatusClass(payment.status)}`}>
                      {getStatusText(payment.status)}
                    </span>
                  </div>

                  <div className="payment-actions">
                    {/* <button className="btn-outline">Chi tiết</button> */}
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <p>Chưa có thanh toán thành công nào</p>
              </div>
            )}
          </div>
        </section>

        {/* Thanh toán thất bại */}
        <section className="payment-section">
          <h4>Thanh toán thất bại</h4>
          <div className="payments-list">
            {failedPayments.length > 0 ? (
              failedPayments.map((payment) => (
                <div
                  key={payment.paymentId}
                  className={`payment-card ${getStatusClass(payment.status)}`}
                >
                  <div className="payment-icon">
                    {getStatusIcon(payment.status)}
                  </div>

                  <div className="payment-info">
                    <h5>{payment.serviceName || 'Thanh toán dịch vụ'}</h5>
                    <p className="doctor-name">Bác sĩ {payment.doctorName}</p>
                    <p>Ngày hẹn: {formatDatetimeWithWeekday(payment.appointmentDate)}</p>   
                    <p className="payment-amount">
                      Số tiền: {formatCurrency(payment.total)}
                    </p>
                  </div>

                  <div className="payment-status">
                    {/* <span className="paid-date">
                      <p>
                        {formatDatetimeWithWeekday(payment.paid)}
                      </p>
                    </span> */}
                    <span className={`status-badge ${getStatusClass(payment.status)}`}>
                      {getStatusText(payment.status)}
                    </span>
                  </div>

                  <div className="payment-actions">
                    {/* <button className="btn-outline">Chi tiết</button> */}
                    {/* <button className="primary-btn">Thử lại</button> */}
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <p>Không có thanh toán thất bại nào</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PaymentList;