import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Header from '@/components/global/header'
import Sidebar from '@/components/global/sidebar'

import Employee from './employee'
import Admin from './admin'

const Main = () => {
    return (
        <div className='min-h-screen bg-[#ECF3F9]'>
            <Header />
            <Sidebar />
            <Routes>
                <Route path='/*' element={<Employee />} />
                <Route path='/admin/*' element={<Admin />} />
            </Routes>
        </div>
    )
}

export default Main