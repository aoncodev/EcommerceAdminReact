import React from 'react'
import Sidebar from '../components/Sidebar'
import CategoryTable from '../components/CategoryTable'
import AdsTable from '../components/AdsTable'

export const Ads = () => {
  return (
    <div className='flex'>
        <Sidebar/>
        <AdsTable/>
    </div>
  )
}
