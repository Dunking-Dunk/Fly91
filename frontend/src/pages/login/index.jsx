import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './loginMail'
import LoginOtp from './loginOtp'

const index = () => {
    return (
        <Routes>
            <Route element={<LoginPage />} path='/' />
            <Route element={<LoginOtp />} path='/verification' />
        </Routes>
    )
}

export default index