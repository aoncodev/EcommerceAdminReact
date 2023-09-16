import React from 'react'
import Sidebar from '../components/Sidebar'

import { EditProducts } from '../components/EditProducts'

export const EditPage = () => {
  return (
    <div className='flex'>
        <Sidebar/>
        <EditProducts/>
    </div>
  )
}
