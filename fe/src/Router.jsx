import React from 'react'
import { createBrowserRouter, Navigate } from "react-router-dom";
import PageLayout from '@components/Layout/PageLayout/PageLayout.jsx';
import CusLayout from '@components/Layout/CusLayout/CusLayout.jsx';
import DocLayout from '@components/Layout/DocLayout/DocLayout';
import Homepage from "@customerpages/Homepage/Homepage.jsx";
import CusDashboard from './Pages/customer/Dashboard/CusDashboard';
import DocDashboard from './Pages/doctor/Dashboard/DocDashboard';
import Overview from './Pages/doctor/Dashboard/Overview';
import Appointments from './Pages/doctor/Dashboard/Appointments';

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
        path: "/homepage",
        element: <PageLayout />,
        children: [
            {
                index: true, // tương đương path: "/"
                element: <Homepage />,
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
          element: <DocDashboard />,
        },
        {
          index: false, 
          path: "medical-records",  
          element: <DocDashboard />,
        },
        {
          index: false, // không phải là trang chính
          path: "messages",
          element: <DocDashboard />,
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
          path: "settings",
          element: <DocDashboard />,
        }
      ]
    }
]);
