import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { router } from './Router';
import { checkAuthStatus } from '@features/auth/authSlice';
import './App.css';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}