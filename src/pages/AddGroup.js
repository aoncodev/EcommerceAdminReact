import React from 'react'
import Sidebar from '../components/Sidebar'
import GroupCategoryForm from '../components/GroupCategoryForm'

export const AddGroupCategory = () => {
  return (
    <div className='flex'>
        <Sidebar/>
        <GroupCategoryForm/>
    </div>
  )
}
