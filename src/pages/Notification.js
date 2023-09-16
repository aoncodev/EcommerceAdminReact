import React from 'react'
import Sidebar from '../components/Sidebar'

import NotificationTable from '../components/NotificationTable'

export const Notification = () => {
  return (
    <div className='flex'>
        <Sidebar/>
        <NotificationTable/>
    </div>
  )
}
