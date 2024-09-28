import Header from '@/components/global/header'
import Sidebar from '@/components/global/sidebar'
import TableComponent from '@/components/global/table'
import React from 'react'

const Dasboard = () => {
  return (
    <div className='h-[200vh]'>
      
      <Header/>
      <Sidebar/>
        {/* dashboard employee */}
        <TableComponent/>
    </div>
  )
}

export default Dasboard
