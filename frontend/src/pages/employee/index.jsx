import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dasboard from './Dasboard'
import Status from './status'
import PassengerDetails from './forms/passenger'


const index = () => {
  return (
    <Routes>
      <Route path='/' element={<Dasboard />} />
      <Route path='/status' element={<Status />} />
      <Route path='/details' element={<PassengerDetails />} />
    </Routes>
  )
}

export default index
