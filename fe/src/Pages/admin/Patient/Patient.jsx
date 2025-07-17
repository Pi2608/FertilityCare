"use client";

import { useState, useEffect } from "react";
import "./Patient.css";
import { Search } from "lucide-react";
import CustomerAPI from "../../../features/service/apiCustomer1";

const Patient = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await CustomerAPI.getAllCustomers();
        console.log("DATA TRẢ VỀ:", data);

        const rawCustomers = Array.isArray(data) ? data : data.data;

        const mappedCustomers = rawCustomers.map((c, index) => ({
          id: c.id || index,
          name: c.name || "Không rõ",
          gender:
            c.gender === "male" ? "Nam" : c.gender === "female" ? "Nữ" : "Khác",
          birthDate: formatDate(c.dob),
          email: c.email,
          phoneNumber: c.phone,
          active: c.active,
        }));

        setCustomers(mappedCustomers);
      } catch (error) {
        console.error("Không thể load danh sách bệnh nhân:", error);
      }
    };

    fetchCustomers();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="patient-page">
      {/* Header */}
      <header className="patient-header">
        <h1 className="page-title">Thông tin bệnh nhân</h1>
        <div className="header-actions">
        </div>
      </header>

      {/* Content */}
      <main className="patient-content">
        {/* Search */}
        <div className="search-section">
          <div className="search-box">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Tìm kiếm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Patients Table */}
        <div className="table-wrapper">
          <table className="patients-table">
            <thead>
              <tr>
                <th>Họ và tên</th>
                <th>Giới tính</th>
                <th>Ngày sinh</th>
                <th>Email</th>
                <th>Số điện thoại</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(customers) && customers.length > 0 ? (
                customers
                  .filter((c) =>
                    c.name?.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((customer) => (
                    <tr key={customer.id}>
                      <td>{customer.name}</td>
                      <td>{customer.gender}</td>
                      <td>{customer.birthDate}</td>
                      <td>{customer.email}</td>
                      <td>{customer.phoneNumber}</td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="5" className="empty-message">
                    Không có dữ liệu bệnh nhân
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination-section">
          <button className="pagination-btn prev">Previous</button>

          <div className="page-numbers">
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <button className="page-btn">4</button>
          </div>

          <button className="pagination-btn next">Next</button>
        </div>
      </main>
    </div>
  );
};

export default Patient;
