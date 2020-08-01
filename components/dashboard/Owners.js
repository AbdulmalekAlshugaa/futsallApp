import React, { useEffect } from 'react'
import OwnerLayout from '../layout/Owner'
import axios from 'axios'

const Dashboard = React.memo(() => {

  useEffect(() => {
    (async () => {
      const res = await axios.get('/api/user/getAllCenterBooking')
      console.log('res', res)
    })()
  }, [])
  return (
    <div>
      <OwnerLayout />
      <header className='bg-white shadow'>
        <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold leading-tight text-gray-900'>
            Dashboard
          </h1>
        </div>
      </header>
      <div>
        Dashboard owner
      </div>
    </div>
  )
})

export default Dashboard
