import React from 'react'
import Sidebar from '../components/Sidebar'
import ProductForm from '../components/AddProductForm'

export const AddProduct = () => {
  return (
    <div className='flex'>
        <Sidebar/>
        <ProductForm/>
    </div>
  )
}
