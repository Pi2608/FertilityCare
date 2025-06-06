import React from 'react'
import { createBrowserRouter, Navigate } from "react-router-dom";
import PageLayout from '@components/Layout/PageLayout/PageLayout';
import CusLayout from '@components/Layout/CusLayout/CusLayout';
import DocLayout from '@components/Layout/DocLayout/DocLayout';
import ManagerLayout from '@components/Layout/ManagerLayout/ManagerLayout.jsx';

import Homepage from "@customerpages/Homepage/Homepage";
import TreatmentMethod from '@customerpages/TreatmentMethod/TreatmentMethod';
import IvfDetail from '@customerpages/IvfDetail/IvfDetail';
import DoctorList from '@customerpages/DoctorList/DoctorList';
import CusDashboard from '@customerpages/Dashboard/CusDashboard';

import DocDashboard from '@doctorpages/Dashboard/DocDashboard';
import Overview from './Pages/doctor/Dashboard/OverviewLayout/Overview';
import Appointments from './Pages/doctor/Dashboard/AppointmentsLayout/Appointments';
import Appointment from './Pages/manager/Appointment/Appointment';
import Patients from './Pages/doctor/Dashboard/PatientsLayout/Patients';
import Message from './Pages/doctor/Dashboard/MessageLayout/Message';
import ProfileLayout from './Pages/doctor/Dashboard/ProfileLayout/ProfileLayout';

import PatientProfileLayout from './Pages/doctor/Dashboard/PatientProfileLayout/PatientProfileLayout';
import PatientAppointment from './Pages/doctor/Dashboard/PatientAppointment/PatientAppointment';

import Doctor from './Pages/manager/Doctor/Doctor';
import TreatmentService from './Pages/manager/TreatmentService/TreatmentService';
import SuccessRate from './Pages/manager/TreatmentService/SuccessRate';
import ProcessEdit from './Pages/manager/TreatmentService/ProcessEdit';
import Medicine from './Pages/manager/Medicine/Medicine';
import DoctorDetail from './Pages/customer/DoctorDetail/DoctorDetail';


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
    ]
  },
  {
    path: "/patient-profile",
    element: <PageLayout />,
    children: [
      {
        index: true, // tương đương path: "/"
        element: <PatientProfileLayout />,
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
        element: <CusDashboard />,
      },
      {
        index: false, // không phải là trang chính
        path: "appointments",
        element: <CusDashboard />,
      },
      {
        index: false,
        path: "medical-records",
        element: <CusDashboard />,
      },
      {
        index: false,
        path: "pills",
        element: <CusDashboard />,
      },
      {
        index: false, // không phải là trang chính
        path: "messages",
        element: <CusDashboard />,
      },
      {
        index: false, // không phải là trang chính
        path: "documents",
        element: <CusDashboard />,
      },
      {
        index: false, // không phải là trang chính
        path: "notifications",
        element: <CusDashboard />,
      },
      {
        index: false, // không phải là trang chính
        path: "settings",
        element: <CusDashboard />,
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
      {
        path: "medicine-inventory",
        element: <Medicine/>,
      },
    ],
  },
]);
