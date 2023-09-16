import React from 'react'
import Sidebar from '../components/Sidebar'
import OrderPage from '../components/OrderTable'

export const Orders = () => {
  return (
    <div className='flex'>
        <Sidebar/>
        <OrderPage/>
    </div>
  )
}
