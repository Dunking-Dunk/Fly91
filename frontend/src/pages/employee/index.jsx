import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dasboard from './Dasboard'
import Status from './status'


const index = () => {
  return (
    <Routes>
      <Route path='/' element={<Dasboard />} />
      <Route path='/status' element={<Status />} />
    </Routes>
  )
}

export default index
