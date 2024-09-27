import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dasboard from './Dasboard'
// import All from './All'

const index = () => {
  return (
    <div >
      <Routes>
        <Route path='/' element={<Dasboard/>}/>
        {/* <Route path='/all' element={<All/>}/> */}
      </Routes>
    </div>
  )
}

export default index
