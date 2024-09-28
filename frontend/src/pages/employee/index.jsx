import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dasboard from './Dasboard'
import Status from './status'

const index = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Dasboard/>}/>
        <Route path='/status' element={<Status/>}/>
        
      </Routes>
    </div>
  )
}

export default index
