import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { router } from './Router';
import { checkAuthStatus } from '@features/auth/authSlice'; // Thay đổi path phù hợp
import './App.css';

export default function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.auth);

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập khi app khởi động
    dispatch(checkAuthStatus());
  }, [dispatch]);

  // Hiển thị loading khi đang kiểm tra trạng thái
  if (loading) {
    return (
      <div className="loading-container">
        <div>Đang tải...</div>
        {/* Hoặc component loading spinner của bạn */}
      </div>
    );
  }

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}