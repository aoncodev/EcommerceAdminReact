import React from 'react'
import Sidebar from '../components/Sidebar'
import CategoryTable from '../components/CategoryTable'

export const Category = () => {
  return (
    <div className='flex'>
        <Sidebar/>
        <CategoryTable/>
    </div>
  )
}
