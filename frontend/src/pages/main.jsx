import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Header from '@/components/global/header'

import Error from "@/pages/error";
import Employee from './employee'
import Admin from './admin'

const Main = () => {
    return (
        <div className='max-h-screen bg-[#ECF3F9]'>
            <Header />
            <Routes>
                <Route path='/*' element={<Employee />} />
                <Route path='/admin/*' element={<Admin />} />
                <Route path="/error" element={<Error />} /> 
            </Routes>
        </div>
    )
}

export default Main