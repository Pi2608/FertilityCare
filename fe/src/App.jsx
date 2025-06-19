import React, { useEffect } from "react";
import { HashLoader } from 'react-spinners';
import { RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { router } from './Router';
import { checkAuthStatus } from '@features/auth/authSlice'; // Thay đổi path phù hợp
import './App.css';

export default function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  if (loading) {
    return 
      <HashLoader 
        className="loader"
        loading={loading}
        size={150}
        color={"#36d7b7"}
        cssOverride={{ display: 'block', margin: '0 auto', borderColor: 'red' }}
      />; 
  }

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}