import React from 'react'
import Sidebar from '../components/Sidebar'
import ProductPage from '../components/ProductTable'
export const Product = () => {
  return (
    <div className='flex'>
        <Sidebar/>
        <ProductPage/>
    </div>
  )
}
