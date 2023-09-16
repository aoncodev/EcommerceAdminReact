import React from 'react'
import Sidebar from '../components/Sidebar'
import { OrderDetailPage } from '../components/OrderDetailPage'

export const DetailOrder = () => {
  return (
    <div className='flex'>
        <Sidebar/>
        <OrderDetailPage/>
    </div>
  )
}
