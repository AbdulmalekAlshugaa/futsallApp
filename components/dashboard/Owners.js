import React from 'react'
import OwnerLayout from '../layout/Owner'

const Dashboard = React.memo(() => {
  return (
    <div>
      <OwnerLayout />
      <div>
        Dashboard owner
      </div>
    </div>
  )
})

export default Dashboard
