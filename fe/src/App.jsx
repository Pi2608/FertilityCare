import React from "react"
import { RouterProvider } from "react-router-dom";
import { router } from './Router'
import './App.css';

export default function App() {

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

