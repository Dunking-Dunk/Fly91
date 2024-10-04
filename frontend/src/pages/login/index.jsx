import React from 'react'
import { Route, Routes } from 'react-router-dom'

import EmployeeLogin from './EmployeeLogin'
import AdminLogin from './adminLogin'

const Index = () => {
    return (
        <Routes>
            <Route path='/' element={<EmployeeLogin />} />
            <Route path='/admin' element={<AdminLogin />} />
        </Routes>
    )
}

export default Index