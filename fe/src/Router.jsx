import React from 'react'
import { createBrowserRouter, Navigate } from "react-router-dom";
import CustomerLayout from '@components/CustomerLaout/CustomerLayout.jsx';
import Homepage from "@customerpages/Homepage/Homepage.jsx";

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
        element: <CustomerLayout />,
        children: [
            {
                index: true, // tương đương path: "/"
                element: <Homepage />,
            },
        ]
    }
]);
