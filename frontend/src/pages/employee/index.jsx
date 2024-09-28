import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dasboard from './Dasboard'
import Bookformy from './forms/passenger'

const index = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Dasboard/>}/>
        <Route path='/details' element={<Bookformy/>}/>
      </Routes>
    </div>
  )
}

export default index
