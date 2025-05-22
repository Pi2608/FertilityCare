import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '@/Components/Header/Header'
import Footer from '@/Components/Footer/Footer'

const CustomerLayout = () => {
  return (
    <div className="customer-layout">
        <Header />
        <main className="content">
            <Outlet />
        </main>
        <Footer />
    </div>
  )
}

export default CustomerLayout