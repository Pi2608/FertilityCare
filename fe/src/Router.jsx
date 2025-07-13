import React from 'react'
import { HashLoader } from 'react-spinners';
import { createBrowserRouter, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Authentication from '@/Pages/Authentication/Authentication';
import PageLayout from '@components/Layout/PageLayout/PageLayout';
import CusLayout from '@components/Layout/CusLayout/CusLayout';
import DocLayout from '@components/Layout/DocLayout/DocLayout';
import ManagerLayout from '@components/Layout/ManagerLayout/ManagerLayout.jsx';




import AdminLayout from '@components/Layout/AdminLayout/AdminLayout.jsx';
import Homepage from "@customerpages/Homepage/Homepage";
import TreatmentMethod from '@customerpages/TreatmentMethod/TreatmentMethod';
import IvfDetail from '@customerpages/IvfDetail/IvfDetail';
import DoctorList from '@customerpages/DoctorList/DoctorList';
import Profile from '@customerpages/Profile/Profile';
import Booking from '@customerpages/Booking/Booking';
import Blog from '@customerpages/Blog/Blog';
import Overall from '@customerpages/Dashboard/Overall/Overall';
import PatientApt from '@customerpages/Dashboard/Appointment/PatientApt';
import CusProfile from '@customerpages/Dashboard/CusProfile/CusProfile';
import MessageCus from '@customerpages/Message/MessageCus';
import TreatmentProcess from '@customerpages/TreatmentProcess/TreatmentProcess';
import Notification from '@customerpages/Notification/Notification';
import TreatmentHistory from '@customerpages/TreatmentHistory/TreatmentHistory';
import Pill from '@customerpages/Dashboard/Pill/Pill';
import Payment from '@customerpages/Payment/Payment';
import PaymentList from '@customerpages/Dashboard/Payment/PaymentList';

// Manager components
import DocDashboard from '@doctorpages/Dashboard/DocDashboard';
import Overview from './Pages/doctor/Dashboard/OverviewLayout/Overview';
import Appointments from './Pages/doctor/Dashboard/AppointmentsLayout/Appointments';
import Appointment from './Pages/manager/Appointment/Appointment';
import Patients from './Pages/doctor/Dashboard/PatientsLayout/Patients';
import Message from './Pages/doctor/Dashboard/MessageLayout/Message';
import ProfileLayout from './Pages/doctor/Dashboard/ProfileLayout/ProfileLayout';
import PatientRecord from './Pages/doctor/Dashboard/PatientRecord/PatientRecord';




import PatientProfileLayout from './Pages/doctor/Dashboard/PatientProfileLayout/PatientProfileLayout';
import PatientProfileLayout1 from './Pages/doctor/Dashboard/PatientProfileLayout/PatientProfileLayout1';
import PatientAppointment from './Pages/doctor/Dashboard/PatientAppointment/PatientAppointment';




import Doctor from './Pages/manager/Doctor/Doctor';
import TreatmentService from './Pages/manager/TreatmentService/TreatmentService';
import SuccessRate from './Pages/manager/TreatmentService/SuccessRate';
import ProcessEdit from './Pages/manager/TreatmentService/ProcessEdit';




// Admin components
import AdminAppointment from './Pages/admin/Appointment/Appointment';
import AdminPatient from './Pages/admin/Patient/Patient';
import AdminDoctor from './Pages/admin/Doctor/Doctor';
import AdminTreatmentService from './Pages/admin/TreatmentService/TreatmentService';
import DoctorDetail from './Pages/customer/DoctorDetail/DoctorDetail';
import Dashboard from './Pages/admin/Dashboard/Dashboard';




const USER_ROLES = {
  CUSTOMER: "customer",
  ADMIN: "admin",
  DOCTOR: "doctor",
  MANAGER: "manager"
};




// Protected Route Components
const ProtectedRoute = ({ children, allowedRoles = [], requireAuth = true }) => {
  const { isAuthenticated, role, loading } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <div className="loader-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <HashLoader
          className="loader"
          loading={loading}
          size={150}
          color="#36d7b7"
          cssOverride={{ display: 'block', margin: '0 auto', borderColor: 'red' }}
        />
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/authentication" replace />;
  }
 
  if (allowedRoles.length === 0) {
    return <>{children}</>;
  }
 
  if (!allowedRoles.includes(role)) {
    switch (role) {
      case USER_ROLES.ADMIN:
        return <Navigate to="/admin-dashboard" replace />;
      case USER_ROLES.DOCTOR:
        return <Navigate to="/doctor-dashboard" replace />;
      case USER_ROLES.MANAGER:
        return <Navigate to="/manager-dashboard" replace />;
      case USER_ROLES.CUSTOMER:
        return <Navigate to="/patient-dashboard" replace />;
      default:
        return <Navigate to="/homepage" replace />;
    }
  }
 
  return <>{children}</>;
};

// Specific role-based route components for cleaner code
const AdminRoute = ({ children }) => (
  <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
    {children}
  </ProtectedRoute>
);




const DoctorRoute = ({ children }) => (
  <ProtectedRoute allowedRoles={[USER_ROLES.DOCTOR]}>
    {children}
  </ProtectedRoute>
);




const ManagerRoute = ({ children }) => (
  <ProtectedRoute allowedRoles={[USER_ROLES.MANAGER]}>
    {children}
  </ProtectedRoute>
);




const CustomerRoute = ({ children }) => (
  <ProtectedRoute allowedRoles={[USER_ROLES.CUSTOMER]}>
    {children}
  </ProtectedRoute>
);




// Public routes (no authentication required)
const PublicRoute = ({ children }) => (
  <ProtectedRoute requireAuth={false}>
    {children}
  </ProtectedRoute>
);




// Guest routes (only for non-authenticated users)
const GuestRoute = ({ children }) => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);
 
  if (isAuthenticated) {
    switch (role) {
      case USER_ROLES.ADMIN:
        return <Navigate to="/admin-dashboard" replace />;
      case USER_ROLES.DOCTOR:
        return <Navigate to="/doctor-dashboard" replace />;
      case USER_ROLES.MANAGER:
        return <Navigate to="/manager-dashboard" replace />;
      case USER_ROLES.CUSTOMER:
        return <Navigate to="/patient-dashboard" replace />;
      default:
        return <Navigate to="/homepage" replace />;
    }
  }
 
  return <>{children}</>;
};




export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/homepage" replace />,
  },
  {
    path: "/authentication",
    element: (
      <GuestRoute>
        <PageLayout />
      </GuestRoute>
    ),
    children: [
      {
        index: true,
        element: <Authentication />
      },
    ]
  },
  {
    path: "/homepage",
    element: (
      <PublicRoute>
        <PageLayout />
      </PublicRoute>
    ),
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        index: false,
        path: "treatment-method",
        children: [
          {
            index: true,
            element: <TreatmentMethod />,
          },
          {
            index: false,
            path: "ivf",
            element: <IvfDetail />,
          }
        ]
      },
      {
        index: false,
        path: "doctor-list",
        children: [
          {
            index: true,
            element: <DoctorList />,
          },
          {
            index: false,
            path: "doctor-detail/:doctorId",
            element: <DoctorDetail />,
          },
        ]
      },
      {
        index: false,
        path: "book-appointment",
        element: (
          <ProtectedRoute>
            <Booking />
          </ProtectedRoute>
        ),
      },
      {
        index: false,
        path: "blog",
        element: <Blog />,
      },
    ]
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <PageLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Profile />,
      },
    ]
  },
  {
    path: "/payment",
    element: (
      <CustomerRoute>
        <CusLayout />
      </CustomerRoute>
    ),
    children: [
      {
        index: true,
        element: <Payment />,
      },
    ]
  },
  {
    path: "doctor-dashboard/appointments/tu_van/:appointmentId",
    element: (
      // <DoctorRoute>
        <PageLayout />
      // </DoctorRoute>
    ),
    children: [
      {
        index: true,
        element: <PatientProfileLayout1 />,
      },
    ]
  },


  {
    path: "doctor-dashboard/appointments/dieu_tri/:appointmentId",
    element: (
      // <DoctorRoute>
        <PageLayout />
      // </DoctorRoute>
    ),
    children: [
      {
        index: true,
        element: <PatientProfileLayout />,
      },
    ]
  },
  {
    path: "/doctor-dashboard/patients/patient-record",
    element: (
      // <DoctorRoute>
        <PageLayout />
      // </DoctorRoute>
    ),
    children: [
      {
        index: true,
        element: <PatientRecord />,
      },
    ]
  },
  { 
    path: "/patient-dashboard/treatment-process",
    element: (
      <CustomerRoute>
        <PageLayout />
      </CustomerRoute>
    ),
    children: [
      {
        index: true,
        element: <TreatmentProcess />,
      },
    ]
  },
  {
    path: "/patient-appointment",
    element: (
      <CustomerRoute>
        <PageLayout />
      </CustomerRoute>
    ),
    children: [
      {
        index: true,
        element: <PatientAppointment />,
      },
    ]
  },
  {
    path: "/patient-dashboard",
    element: (
      <CustomerRoute>
        <CusLayout />
      </CustomerRoute>
    ),
    children: [
      {
        index: true,
        element: <Overall />,
      },
      {
        index: false,
        path: "appointments",
        element: <PatientApt />,
      },
      {
        index: false,
        path: "medical-records",
        element: <TreatmentHistory />,
      },
      {
        index: false,
        path: "pills",
        element: <Pill />,
      },
      {
        index: false,
        path: "messages",
        element: <MessageCus />,
      },
      {
        index: false,
        path: "documents",
        element: <Overall />,
      },
      {
        index: false,
        path: "notifications",
        element: <Notification />,
      },
      {
        index: false,
        path: "payment",
        element: <PaymentList />,
      },
      {
        index: false,
        path: "profile",
        element: <CusProfile />,
      }
    ]
  },
  {
    path: "/doctor-dashboard",
    element: (
      <DoctorRoute>
        <DocLayout />
      </DoctorRoute>
    ),
    children: [
      {
        index: true,
        element: <Overview />,
      },
      {
        index: false,
        path: "appointments",
        element: <Appointments />,
      },
      {
        index: false,
        path: "patients",
        element: <Patients />,
      },
      {
        index: false,
        path: "messages",
        element: <Message />,
      },
      {
        index: false,
        path: "reports",
        element: <DocDashboard />,
      },
      {
        index: false,
        path: "notifications",
        element: <DocDashboard />,
      },
      {
        index: false,
        path: "profile",
        element: <ProfileLayout />,
      }
    ]
  },
  {
    path: "/manager-dashboard",
    element: (
      <ManagerRoute>
        <ManagerLayout />
      </ManagerRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/manager-dashboard/appointment" replace />,
      },
      {
        path: "appointment",
        element: <Appointment />,
      },
      {
        path: "doctor",
        element: <Doctor/>,
      },
      {
        path: "treatment-service",
        element: <TreatmentService/>,
      },
      {
        path: "treatment-service/success-rate/:serviceId",
        element: <SuccessRate/>,
      },
      {
        path: "treatment-service/process/:serviceId",
        element: <ProcessEdit/>,
      },
      {
        path: "message",
        element: <TreatmentService/>,
      },
      {
        path: "setting",
        element: <TreatmentService/>,
      },
    ],
  },
  {
    path: "/admin-dashboard",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/admin-dashboard/appointment" replace />,
      },
      {
        path: "appointment",
        element: <AdminAppointment/>,
      },
      {
        path: "user",
        element: <AdminPatient/>,
      },
      {
        path: "doctor",
        element: <AdminDoctor/>,
      },
      {
        path: "service",
        element: <AdminTreatmentService/>,
      },
      {
        path: "report",
        element: <Dashboard/>,
      },
      {
        path: "message",
        element: <div>Admin Messages - Coming Soon</div>,
      },
      {
        path: "setting",
        element: <div>System Settings - Coming Soon</div>,
      },
    ],
  },
]);

export { USER_ROLES };