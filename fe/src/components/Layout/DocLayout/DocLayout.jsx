import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '@components/Header/Header'
import Footer from '@components/Footer/Footer'
import Sidebar from '@components/Sidebar/Sidebar'
import './DocLayout.css'

const DocLayout = () => {

    const userType = localStorage.getItem('userType') || 'Doctor';

    const list = [
        {name: 'Tổng quan', path: '/doctor-dashboard', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 12 12"><g fill="none" stroke="currentColor" stroke-width="1"><circle cx="6" cy="6" r="5.5"/><path stroke-linecap="round" stroke-linejoin="round" d="M5.5 3v3.5H8"/></g></svg>},
        {name: 'Lịch hẹn', path: '/doctor-dashboard/appointments', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16"><path fill="currentColor" d="M14.25 2.5h-.77v-1h-1.25v1H3.68v-1H2.43v1h-.68A1.25 1.25 0 0 0 .5 3.75v9.5a1.25 1.25 0 0 0 1.25 1.25h12.5a1.25 1.25 0 0 0 1.25-1.25v-9.5a1.25 1.25 0 0 0-1.25-1.25M1.75 3.75h12.5V5H1.75zm0 9.5v-7h12.5v7z"/></svg>},
        {name: 'Bệnh nhân', path: '/doctor-dashboard/patients', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></g></svg>},
        {name: 'Theo dõi', path: '/doctor-dashboard/medical-records', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><rect width="15" height="18.5" x="4.5" y="2.75" rx="3.5"/><path d="M8.5 6.755h7m-7 4h7m-7 4H12"/></g></svg>},
        {name: 'Tin nhắn', path: '/doctor-dashboard/messages', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.5" d="M3 20.29V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7.961a2 2 0 0 0-1.561.75l-2.331 2.914A.6.6 0 0 1 3 20.29Z"/></svg>},
        // {name: 'Báo cáo', path: '/doctor-dashboard/reports', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M3 3v17a1 1 0 0 0 1 1h17v-2H5V3z"/><path fill="currentColor" d="M15.293 14.707a1 1 0 0 0 1.414 0l5-5l-1.414-1.414L16 12.586l-2.293-2.293a1 1 0 0 0-1.414 0l-5 5l1.414 1.414L13 12.414z"/></svg>},
        // {name: 'Thông báo', path: '/doctor-dashboard/notifications', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M5 9a7 7 0 0 1 14 0v3.764l1.822 3.644A1.1 1.1 0 0 1 19.838 18h-3.964a4.002 4.002 0 0 1-7.748 0H4.162a1.1 1.1 0 0 1-.984-1.592L5 12.764zm5.268 9a2 2 0 0 0 3.464 0zM12 4a5 5 0 0 0-5 5v3.764a2 2 0 0 1-.211.894L5.619 16h12.763l-1.17-2.342a2 2 0 0 1-.212-.894V9a5 5 0 0 0-5-5"/></g></svg>},
        // {name: 'Cài đặt', path: '/doctor-dashboard/settings', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16"><g fill="none" stroke="currentColor" stroke-width="1"><path d="m13.258 8.354l.904.805a.91.91 0 0 1 .196 1.169l-1.09 1.862a.94.94 0 0 1-.35.341a1 1 0 0 1-.478.125a1 1 0 0 1-.306-.046l-1.157-.382q-.304.195-.632.349l-.243 1.173a.93.93 0 0 1-.339.544a.97.97 0 0 1-.618.206H6.888a.97.97 0 0 1-.618-.206a.93.93 0 0 1-.338-.544l-.244-1.173a6 6 0 0 1-.627-.35L3.9 12.61a1 1 0 0 1-.306.046a1 1 0 0 1-.477-.125a.94.94 0 0 1-.35-.34l-1.129-1.863a.91.91 0 0 1 .196-1.187L2.737 8v-.354l-.904-.805a.91.91 0 0 1-.196-1.169L2.766 3.81a.94.94 0 0 1 .35-.341a1 1 0 0 1 .477-.125a1 1 0 0 1 .306.028l1.138.4q.305-.195.632-.349l.244-1.173a.93.93 0 0 1 .338-.544a.97.97 0 0 1 .618-.206h2.238a.97.97 0 0 1 .618.206c.175.137.295.33.338.544l.244 1.173q.325.155.627.35l1.162-.382a.98.98 0 0 1 .784.078c.145.082.265.2.35.34l1.128 1.863a.91.91 0 0 1-.182 1.187l-.918.782z"/><path d="M10.5 8a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0Z"/></g></svg>},
    ]

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="cus_layout">
            <Header />
            <main className="content">
                <Sidebar role={userType} list={list}/>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default DocLayout