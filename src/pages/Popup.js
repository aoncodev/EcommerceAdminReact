import React from 'react'
import Sidebar from '../components/Sidebar'
import PopupTable from '../components/PopupTable'


export const Popup = () => {
  return (
    <div className='flex'>
        <Sidebar/>
        <PopupTable/>
    </div>
  )
}
