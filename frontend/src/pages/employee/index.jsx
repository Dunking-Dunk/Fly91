import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dasboard from './Dasboard'
import Status from './status'
import SuccessPage from './forms/success'
import Profile from './profile'
import Data from "../../components/global/data"


const index = () => {
  return (
    <Routes>

      <Route path='/' element={<Dasboard />} />
      <Route path='/success' element={<SuccessPage />} />
      <Route path='/pro' element={<Profile />} />
      <Route path='/data' element={<Data />} />
    </Routes>
  )
}

export default index
