import React from 'react'
import { createBrowserRouter, Navigate } from "react-router-dom";
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


import DocDashboard from '@doctorpages/Dashboard/DocDashboard';
import Overview from './Pages/doctor/Dashboard/OverviewLayout/Overview';
import Appointments from './Pages/doctor/Dashboard/AppointmentsLayout/Appointments';
import Appointment from './Pages/manager/Appointment/Appointment';
import Patients from './Pages/doctor/Dashboard/PatientsLayout/Patients';
import Message from './Pages/doctor/Dashboard/MessageLayout/Message';
import ProfileLayout from './Pages/doctor/Dashboard/ProfileLayout/ProfileLayout';
import PatientRecord from './Pages/doctor/Dashboard/PatientRecord/PatientRecord';


import PatientProfileLayout from './Pages/doctor/Dashboard/PatientProfileLayout/PatientProfileLayout';
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




const USER_TYPES = {
  NORMAL_USER: "Customer",
  ADMIN_USER: "Admin",
  DOCTOR_USER: "Doctor",
};


// const CURRENT_USER_TYPE = USER_TYPES.NORMAL_USER;


const AdminElement = ({ children }) => {
  if (CURRENT_USER_TYPE === USER_TYPES.ADMIN_USER) {
    return <>{children}</>;
  } else {
    return <Navigate to={"/"} />;
  }
};


const DoctorElement = ({ children }) => {
  if (CURRENT_USER_TYPE === USER_TYPES.DOCTOR_USER) {
    return <>{children}</>;
  } else {
    return <Navigate to={"/"} />;
  }
}


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/homepage" replace />,
  },
  {
    path: "/authentication",
    element: <PageLayout />,
    children: [
      {
        index: true,
        element: <Authentication />
      },
    ]
  },
  {
    path: "/homepage",
    element: <PageLayout />,
    children: [
      {
        index: true, // tương đương path: "/"
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
        index: false, // không phải là trang chính
        path: "doctor-list",
        children: [
          {
            index: true, // tương đương path: "/doctor-list"
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
        element: <Booking />,
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
    element: <PageLayout />,
    children: [
      {
        index: true, // tương đương path: "/"
        element: <Profile />,
      },
    ]
  },
  {
    path: "doctor-dashboard/appointments/session",
    element: <PageLayout />,
    children: [
      {
        index: true, // tương đương path: "/"
        element: <PatientProfileLayout />,
      },
    ]
  },
  {
    path: "/doctor-dashboard/patients/patient-record",
    element: <PageLayout />,
    children: [
      {
        index: true, // tương đương path: "/"
        element: <PatientRecord />,
      },
    ]
  },
  {
    path: "/patient-dashboard/treatment-process",
    element: <PageLayout />,
    children: [
      {
        index: true, // tương đương path: "/"
        element: <TreatmentProcess />,
      },
    ]
  },
  {
    path: "/patient-appointment",
    element: <PageLayout />,
    children: [
      {
        index: true, // tương đương path: "/"
        element: <PatientAppointment />,
      },
    ]
  },
  {
    path: "/patient-dashboard",
    element: <CusLayout />,
    children: [
      {
        index: true, // tương đương path: "/customer-dashboard"
        element: <Overall />,
      },
      {
        index: false, // không phải là trang chính
        path: "appointments",
        element: <PatientApt />,
      },
      {
        index: false,
        path: "medical-records",
        element: <Overall />,
      },
      {
        index: false,
        path: "pills",
        element: <Overall />,
      },
      {
        index: false, // không phải là trang chính
        path: "messages",
        element: <MessageCus />,
      },
      {
        index: false, // không phải là trang chính
        path: "documents",
        element: <Overall />,
      },
      {
        index: false, // không phải là trang chính
        path: "notifications",
        element: <Overall />,
      },
     
      {
        index: false, // không phải là trang chính
        path: "profile",
        element: <CusProfile />,
      }
    ]
  },
  {
    path: "/doctor-dashboard",
    element: <DocLayout />,
    children: [
      {
        index: true, // tương đương path: "/doctor-dashboard"
        element: <Overview />,
      },
      {
        index: false, // không phải là trang chính
        path: "appointments",
        element: <Appointments />,
      },
      {
        index: false,
        path: "patients",
        element: <Patients />,
      },


      {
        index: false, // không phải là trang chính
        path: "messages",
        element: <Message />,
      },
      {
        index: false, // không phải là trang chính
        path: "reports",
        element: <DocDashboard />,
      },
      {
        index: false, // không phải là trang chính
        path: "notifications",
        element: <DocDashboard />,
      },
      {
        index: false, // không phải là trang chính
        path: "profile",
        element: <ProfileLayout />,
      }
    ]
  },
  {
    path: "/manager-dashboard",
    element: <ManagerLayout />,
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
    ],
  },
  {
    path: "/admin-dashboard",
    element: <AdminLayout />,
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