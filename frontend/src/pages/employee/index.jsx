import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dasboard from './Dasboard'
import Service from './forms/service'

const index = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Dasboard/>}/>
        <Route path='/create/service' element={<Service/>}/>
      </Routes>
    </div>
  )
}

export default index
