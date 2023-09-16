import React from 'react'
import Sidebar from '../components/Sidebar'
import UserPage from '../components/UserTable'
import Dashboard from '../components/Dashboard'
export const User = () => {
  return (
    <div className='flex'>
        <Sidebar/>
        <UserPage/>
    </div>
  )
}
