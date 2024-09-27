import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './login'

const index = () => {
    return (
        <Routes>
            <Route element={<LoginPage />} path='/' />
        </Routes>
    )
}

export default index