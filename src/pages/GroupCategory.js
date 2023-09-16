import React from 'react'
import Sidebar from '../components/Sidebar'
import GroupCategoryTable from '../components/GroupTable'

export const GroupCategory = () => {
  return (
    <div className='flex'>
        <Sidebar/>
        <GroupCategoryTable/>
    </div>
  )
}
