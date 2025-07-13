"use client"

import { useState } from "react"
import "./Dashboard.css"

const Dashboard = () => {
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [userSummary, revenueData, accountStats] = await Promise.all([
          apiDashboard.getUserSummary(),
          apiDashboard.getRevenue(),
          apiDashboard.getAccountStats(),
        ]);


        console.log("👤 userSummary:", userSummary);
        console.log("💰 revenueData:", revenueData);
        console.log("📊 accountStats:", accountStats);


        setDashboardData({
          totalPatients: userSummary.data.patients || 0,
          totalDoctors: userSummary.data.doctors || 0,
          totalAppointments: 0,
          totalRevenue: revenueData.data.revenue || 0,
          newPatientsThisMonth: 0,
          completedAppointments: 0,
          pendingAppointments: 0,
          activeServices: 0,
          totalAccounts: accountStats.data.total || 0,
          activeAccounts: accountStats.data.active || 0,
          inactiveAccounts: accountStats.data.inactive || 0,
          newAccountsThisMonth: accountStats.data.increaseThisMonth || 0,
        });
       
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu dashboard:", error);
      }
    };


    fetchDashboardData();
  }, []);


  const [timeRange, setTimeRange] = useState("thisMonth"); // thisMonth, lastMonth, thisYear
  const [dashboardData, setDashboardData] = useState({
    totalPatients: 0,
    totalDoctors: 0,
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


  const [monthlyStats, setMonthlyStats] = useState([
    { month: "T1", appointments: 65, revenue: 180 },
    { month: "T2", appointments: 78, revenue: 220 },
    { month: "T3", appointments: 82, revenue: 245 },
    { month: "T4", appointments: 91, revenue: 280 },
    { month: "T5", appointments: 87, revenue: 265 },
    { month: "T6", appointments: 95, revenue: 310 },
  ])

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  const formatNumber = (number) => {
    return new Intl.NumberFormat("vi-VN").format(number)
  }

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="page-title">Báo cáo thống kê</h1>
          <div className="header-actions">
            <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} className="time-range-select">
              <option value="thisMonth">Tháng này</option>
              <option value="lastMonth">Tháng trước</option>
              <option value="thisYear">Năm này</option>
            </select>

            <div className="user-profile">
              <div className="avatar">
                <span>JC</span>
              </div>
              <div className="user-info">
                <div className="user-name">Jonitha Cathrine</div>
                <div className="user-role">Admin</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-content">
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card primary">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3>Tổng tài khoản</h3>
              <div className="stat-number">
                {formatNumber(dashboardData.totalAccounts)}
              </div>
             
            </div>
          </div>

          <div className="stat-card success">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <h3>Tài khoản hoạt động</h3>
              <div className="stat-number">
                {formatNumber(dashboardData.activeAccounts)}
              </div>
             
            </div>
          </div>

          <div className="stat-card warning">
            <div className="stat-icon">⏸️</div>
            <div className="stat-content">
              <h3>Tài khoản không hoạt động</h3>
              <div className="stat-number">
                {formatNumber(dashboardData.inactiveAccounts)}
              </div>
             
            </div>
          </div>

          <div className="stat-card info">
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <h3>Doanh thu</h3>
              <div className="stat-number">
                {formatCurrency(dashboardData.totalRevenue)}
              </div>
             
            </div>
          </div>
        </div>

        {/* Charts and Tables Section */}
        <div className="dashboard-grid">
          {/* Monthly Statistics Chart */}
          <div className="dashboard-card chart-card">
            <div className="card-header">
              <h3>Thống kê theo tháng</h3>
              <div className="chart-legend">
                <div className="legend-item">
                  <span className="legend-color appointments"></span>
                  <span>Lịch hẹn</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color revenue"></span>
                  <span>Doanh thu (triệu VNĐ)</span>
                </div>
              </div>
            </div>
            <div className="chart-container">
              <div className="chart">
                {monthlyStats.map((stat, index) => (
                  <div key={index} className="chart-bar-group">
                    <div className="chart-bars">
                      <div
                        className="chart-bar appointments"
                        style={{ height: `${(stat.appointments / 100) * 100}%` }}
                      ></div>
                      <div className="chart-bar revenue" style={{ height: `${(stat.revenue / 350) * 100}%` }}></div>
                    </div>
                    <div className="chart-label">{stat.month}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
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
                  {formatNumber(
                    dashboardData.totalAccounts -
                      dashboardData.totalPatients -
                      dashboardData.totalDoctors
                  )}
                </div>
               
              </div>
              <div className="quick-stat-item">
                <div className="quick-stat-label">Tỷ lệ hoạt động</div>
                <div className="quick-stat-value">
                  {((dashboardData.activeAccounts / dashboardData.totalAccounts) * 100).toFixed(1)}%
                </div>
                <div className="quick-stat-percentage">Tỷ lệ tài khoản active</div>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="dashboard-card activities-card">
            <div className="card-header">
              <h3>Hoạt động gần đây</h3>
              <button className="view-all-btn">Xem tất cả</button>
            </div>
            <div className="activities-list">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon">{activity.icon}</div>
                  <div className="activity-content">
                    <div className="activity-message">{activity.message}</div>
                    <div className="activity-time">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Status */}
          <div className="dashboard-card system-status">
            <div className="card-header">
              <h3>Trạng thái hệ thống</h3>
            </div>
            <div className="status-list">
              <div className="status-item">
                <div className="status-indicator online"></div>
                <div className="status-content">
                  <div className="status-label">Server chính</div>
                  <div className="status-value">Hoạt động bình thường</div>
                </div>
              </div>
              <div className="status-item">
                <div className="status-indicator online"></div>
                <div className="status-content">
                  <div className="status-label">Cơ sở dữ liệu</div>
                  <div className="status-value">Kết nối ổn định</div>
                </div>
              </div>
              <div className="status-item">
                <div className="status-indicator warning"></div>
                <div className="status-content">
                  <div className="status-label">Backup tự động</div>
                  <div className="status-value">Cần kiểm tra</div>
                </div>
               
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard