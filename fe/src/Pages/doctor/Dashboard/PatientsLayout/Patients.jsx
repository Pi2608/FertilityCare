import React, { useEffect, useState } from "react";
import apiAppointment from "@features/service/apiAppointment"; // đảm bảo path đúng
import "./Patients.css";


export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [allAppointmentPatients, setAllAppointmentPatients] = useState([]);
  const [allCyclePatients, setAllCyclePatients] = useState([]);
  const [filterType, setFilterType] = useState("all"); // 'all' | 'tu_van' | 'cycle'


  useEffect(() => {


    const fetchData = async () => {
      try {
        const appointments = await apiAppointment.getAllAppointments();
        const cyclesRes = await apiAppointment.getAllCyclesOfDoctor();
        const cycles = cyclesRes.data || [];


        const appointmentPatients = Object.values(
          appointments
            .filter(
              (item) => item.status === "confirmed" && item.type === "tu_van"
            )
            .reduce((acc, item) => {
              const key = item.customerId;
              const current = acc[key];


              // Nếu chưa có customerId hoặc lịch mới hơn thì gán
              if (!current || new Date(item.date) > new Date(current.date)) {
                acc[key] = item;
              }
              return acc;
            }, {})
        ).map((item) => ({
          id: `APT-${item.appointmentId}`,
          name: item.customerName,
          age: item.customerAge,
          treatmentType: "Tư vấn",
          treatmentStage: "Tư vấn",
          status: "Đang điều trị",
          statusType: "active",
        }));


        const cyclePatients = cycles
          .filter((cycle) => cycle.status === "ongoing")
          .map((cycle) => ({
            id: `CYC-${cycle.cycleId}`,
            name: cycle.customerName,
            age: cycle.customerAge,
            treatmentType: cycle.serviceName,
            treatmentStage: shortenText(
              cycle.cycleStep?.[0]?.description || "Không có"
            ),
            status: "Đang điều trị",
            statusType: "active",
          }));


        setPatients([...appointmentPatients, ...cyclePatients]);


        setAllAppointmentPatients(appointmentPatients);
        setAllCyclePatients(cyclePatients);
      } catch (err) {
        console.error("Lỗi khi fetch dữ liệu:", err);
      }
    };


    fetchData();
  }, []);


  const shortenText = (text, max = 40) => {
    return text.length > max ? text.substring(0, max) + "..." : text;
  };


  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterType(value);


    if (value === "tu_van") {
      setPatients(allAppointmentPatients);
    } else if (value === "cycle") {
      setPatients(allCyclePatients);
    } else {
      setPatients([...allAppointmentPatients, ...allCyclePatients]);
    }
  };


  return (
    <div className="patients-container">
      <div className="patients-header">
        <div>
          <h2>Danh sách bệnh nhân</h2>
          <p>Quản lý tất cả bệnh nhân của bạn</p>
        </div>
        <div className="patients-actions">
          <input type="text" placeholder="🔍 Tìm kiếm bệnh nhân..." />
          <select onChange={handleFilterChange} value={filterType}>
            <option value="all">Tất cả</option>
            <option value="tu_van">Tư vấn</option>
            <option value="cycle">Điều trị</option>
          </select>
        </div>
      </div>


      <table className="patients-table">
        <thead>
          <tr>
            <th>Bệnh nhân</th>
            <th>Tuổi</th>
            <th>Loại điều trị</th>
            <th>Giai đoạn điều trị</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p, i) => (
            <tr key={i}>
              <td>
                <div className="patient-info">
                  <div>
                    <div className="patient-name">{p.name}</div>
                   
                  </div>
                </div>
              </td>
              <td>{p.age}</td>
              <td>
                <span
                  className={`treatment-badge ${
                    p.treatmentType === "Tư vấn" ? "consultation" : ""
                  }`}
                >
                  {p.treatmentType}
                </span>
              </td>
              <td>
                <span className="treatment-stage">{p.treatmentStage}</span>
              </td>
              <td>
                <span className={`badge ${p.statusType}`}>{p.status}</span>
              </td>
              <td>
                <div className="actions">
                  <a
                    href="/doctor-dashboard/patients/patient-record"
                    className="btn btn-start no-underline"
                  >
                    Hồ sơ
                  </a>
                  <button className="btn btn-message">Nhắn tin</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      <div className="pagination">
        <button>Trước</button>
        <span>Trang 1 / 5</span>
        <button>Tiếp</button>
      </div>
    </div>
  );
}
