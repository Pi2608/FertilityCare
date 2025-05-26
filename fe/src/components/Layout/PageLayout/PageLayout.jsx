import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '@/Components/Header/Header'
import Footer from '@/Components/Footer/Footer'

const PageLayout = () => {

  useEffect(() => {
      window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page_layout">
        <Header />
        <main className="content">
            <Outlet />
        </main>
        <Footer />
    </div>
  )
}

export default PageLayout