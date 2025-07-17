import { useState, useEffect } from "react";
import { Users, UserRoundCheck, UserRoundX, HandCoins } from "lucide-react";
import "./Dashboard.css";
import apiDashboard from "@features/service/apiDashboard";
import ApiGateway from "../../../features/service/apiGateway"; 
import moment from "moment";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    totalManagers: 0,
    totalAppointments: 0,
    totalRevenue: 0,
    newPatientsThisMonth: 0,
    completedAppointments: 0,
    pendingAppointments: 0,
    activeServices: 0,
    totalAccounts: 0,
    activeAccounts: 0,
    inactiveAccounts: 0,
    newAccountsThisMonth: 0,
  });

  const [timeUnit, setTimeUnit] = useState("month"); // 'month' hoặc 'day'
  const [stats, setStats] = useState([]); // Dữ liệu chart động
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [userSummary, accountStats, payments] = await Promise.all([
          apiDashboard.getUserSummary(),
          apiDashboard.getAccountStats(),
          ApiGateway.getAllPayments(), // Sử dụng ApiGateway để gọi API
        ]);

        const totalRevenue = payments.reduce((sum, p) => sum + p.total, 0); // Tổng doanh thu

        setDashboardData({
          totalPatients: userSummary.patients || 0,
          totalDoctors: userSummary.doctors || 0,
          totalManagers: userSummary.managers || 0,
          totalAppointments: 0,
          totalRevenue,
          newPatientsThisMonth: 0,
          completedAppointments: 0,
          pendingAppointments: 0,
          activeServices: 0,
          totalAccounts: userSummary.total || 0,
          activeAccounts: userSummary.total || 0,
          inactiveAccounts: accountStats.inactive || 0,
          newAccountsThisMonth: accountStats.increaseThisMonth || 0,
        });

        processStats(payments); // Xử lý chart data
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Re-fetch và process stats khi thay đổi timeUnit
    if (dashboardData.totalRevenue > 0) {
      const refetchPayments = async () => {
        try {
          const payments = await ApiGateway.getAllPayments();
          processStats(payments);
        } catch (error) {
          console.error("Lỗi khi refetch payments:", error);
        }
      };
      refetchPayments();
    }
  }, [timeUnit]);

  const processStats = (payments) => {
    const grouped = payments.reduce((acc, payment) => {
      const date = moment(payment.paid); // Parse date từ "paid"
      let key;
      if (timeUnit === "month") {
        key = date.format("MM/YYYY"); // Nhóm theo tháng/năm
      } else {
        key = date.format("DD/MM"); // Nhóm theo ngày/tháng
      }
      acc[key] = (acc[key] || 0) + payment.total;
      return acc;
    }, {});

    // Lấy 6 tháng gần nhất hoặc 7 ngày gần nhất (dựa trên current date 18/07/2025)
    let periods = [];
    const currentDate = moment("2025-07-18");
    if (timeUnit === "month") {
      for (let i = 5; i >= 0; i--) {
        const month = currentDate
          .clone()
          .subtract(i, "months")
          .format("MM/YYYY");
        periods.push({
          period: `T${month.split("/")[0]}/${month.split("/")[1]}`,
          revenue: grouped[month] || 0,
        });
      }
    } else {
      for (let i = 6; i >= 0; i--) {
        const day = currentDate.clone().subtract(i, "days").format("DD/MM");
        periods.push({ period: day, revenue: grouped[day] || 0 });
      }
    }

    setStats(periods);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat("vi-VN").format(number);
  };

  const getMaxRevenue = () => {
    return Math.max(...stats.map((s) => s.revenue), 1); // Tránh chia 0
  };

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1 className="page-title">Báo cáo thống kê</h1>
        <div className="header-content">
          <select
            className="time-range-select"
            value={timeUnit}
            onChange={(e) => setTimeUnit(e.target.value)}
          >
            <option value="month">Theo tháng</option>
            <option value="day">Theo ngày</option>
          </select>
        </div>
      </header>

      <main className="dashboard-content">
        <div className="stats-grid">
          {/* Giữ nguyên stats cards */}
          <div className="stat-card primary">
            <div className="stat-icon">
              <Users size={24} color="#4b5563" />
            </div>
            <div className="stat-content">
              <h3>Tổng tài khoản</h3>
              <div className="stat-number">
                {formatNumber(dashboardData.totalAccounts)}
              </div>
            </div>
          </div>
          <div className="stat-card success">
            <div className="stat-icon">
              <UserRoundCheck size={24} color="#4b5563" />
            </div>
            <div className="stat-content">
              <h3>Tài khoản hoạt động</h3>
              <div className="stat-number">
                {formatNumber(dashboardData.activeAccounts)}
              </div>
            </div>
          </div>
          <div className="stat-card warning">
            <div className="stat-icon">
              <UserRoundX size={24} color="#4b5563" />
            </div>
            <div className="stat-content">
              <h3>Tài khoản không hoạt động</h3>
              <div className="stat-number">
                {formatNumber(dashboardData.inactiveAccounts)}
              </div>
            </div>
          </div>
          <div className="stat-card info">
            <div className="stat-icon">
              <HandCoins size={24} color="#4b5563" />
            </div>
            <div className="stat-content">
              <h3>Doanh thu</h3>
              <div className="stat-number">
                {formatCurrency(dashboardData.totalRevenue)}
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card chart-card">
            <div className="card-header">
              <h3>
                Thống kê {timeUnit === "month" ? "theo tháng" : "theo ngày"}
              </h3>
              <div className="chart-legend">
                <div className="legend-item">
                  <span className="legend-color revenue"></span>
                  <span>Doanh thu (triệu VNĐ)</span>
                </div>
              </div>
            </div>
            <div className="chart-container">
              {loading ? (
                <p>Đang tải dữ liệu...</p>
              ) : (
                <div className="chart">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="chart-bar-group"
                      style={{ position: "relative" }}
                    >
                      <div className="chart-bars">
                        <div
                          className="chart-bar revenue"
                          style={{
                            height: `${
                              (stat.revenue / getMaxRevenue()) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <div className="chart-value">
                        {Math.floor(stat.revenue / 1e6)}
                      </div>
                      <div className="chart-label">{stat.period}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="dashboard-card quick-stats">
            <div className="card-header">
              <h3>Thống kê nhanh</h3>
            </div>
            <div className="quick-stats-grid">
              <div className="quick-stat-item">
                <div className="quick-stat-label">Bệnh nhân</div>
                <div className="quick-stat-value">
                  {formatNumber(dashboardData.totalPatients)}
                </div>
              </div>
              <div className="quick-stat-item">
                <div className="quick-stat-label">Bác sĩ</div>
                <div className="quick-stat-value">
                  {dashboardData.totalDoctors}
                </div>
              </div>
              <div className="quick-stat-item">
                <div className="quick-stat-label">Quản lý</div>
                <div className="quick-stat-value">
                  {formatNumber(dashboardData.totalManagers)}
                </div>
              </div>

              <div className="quick-stat-item">
                <div className="quick-stat-label">Tỷ lệ hoạt động</div>
                <div className="quick-stat-value">
                  {(
                    (dashboardData.activeAccounts /
                      dashboardData.totalAccounts) *
                    100
                  ).toFixed(1)}
                  %
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
