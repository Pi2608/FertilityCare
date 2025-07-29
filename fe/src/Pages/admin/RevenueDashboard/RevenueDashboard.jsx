import React, { useEffect, useState } from "react";
import "./RevenueDashboard.css";
import ApiGateway from "@features/service/ApiGateway";
import { format } from "date-fns";
import { CalendarSearch, X } from "lucide-react";

export default function RevenueDashboard() {
  const [transactions, setTransactions] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchRevenueData();
  }, []);

  const fetchRevenueData = async () => {
    try {
      const res = await ApiGateway.getAllPayments();
      const sorted = (res || []).sort((a, b) => b.paymentId - a.paymentId);
      setTransactions(sorted);
      setFilteredData(sorted);
    } catch (err) {
      console.error("Failed to fetch revenue data:", err);
    }
  };

  const handleFilter = () => {
    if (!fromDate || !toDate) return;
    const from = new Date(fromDate);
    const to = new Date(toDate);
    to.setHours(23, 59, 59, 999);
    const filtered = transactions.filter((tx) => {
      const txDate = tx.paid ? new Date(tx.paid) : null;
      return txDate && txDate >= from && txDate <= to;
    });
    setFilteredData(filtered);
  };

  const handleClearFilter = () => {
    setFromDate("");
    setToDate("");
    setFilteredData(transactions); // reset lại dữ liệu ban đầu
  };

  const totalRevenue = filteredData
    .filter((tx) => tx.status !== "failed" && tx.status !== "pending")
    .reduce((sum, tx) => sum + (tx.total || 0), 0);

  return (
    <div className="revenue-dashboard-page">
      {/* Header */}
      <header className="revenue-dashboard-header">
        <h1 className="page-title">Quản lý Doanh thu</h1>
        <div className="header-actions"></div>
      </header>

      <div className="revenue-content">
        {/* Filters */}
        <div className="filter-container">
          {" "}
          {/* moi them vao */}
          <div className="filter-section">
            <div className="filter-input">
              <label htmlFor="fromDate">Từ ngày</label>
              <input
                type="date"
                id="fromDate"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
            <div className="filter-input">
              <label htmlFor="toDate">Đến ngày</label>
              <input
                type="date"
                id="toDate"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
            <button className="filter-btn" onClick={handleFilter}>
              <CalendarSearch size={16} />
              Lọc
            </button>
            {/* Nút huỷ lọc mới thêm */}
            <button
              className="filter-btn cancel"
              onClick={handleClearFilter}
            >
              <X size={16} className="btn-icon" />
              Huỷ lọc
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="revenue-summary">
          <strong>Tổng doanh thu:</strong>{" "}
          {totalRevenue.toLocaleString("vi-VN")} VND
        </div>

        {/* Table */}
        <div className="table-wrapper">
          <table className="revenue-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Bệnh nhân</th>
                <th>Dịch vụ</th>
                <th>Giá tiền</th>
                <th>Thời gian thanh toán</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((tx, index) => (
                  <tr key={tx.paymentId || index}>
                    <td>{index + 1}</td>
                    <td>{tx.customerName}</td>
                    <td>{tx.serviceName}</td>
                    <td>{(tx.total || 0).toLocaleString("vi-VN")} VND</td>
                    <td>
                      {tx.paid
                        ? format(new Date(tx.paid), "dd/MM/yyyy HH:mm")
                        : "Chưa thanh toán"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
