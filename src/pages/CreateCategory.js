import React from 'react'
import Sidebar from '../components/Sidebar'
import CategoryForm from '../components/AddCategory'

export const AddCategory = () => {
  return (
    <div className='flex'>
        <Sidebar/>
        <CategoryForm/>
    </div>
  )
}
