import React from 'react'
import PlayerLayout from '../layout/Players'

const Dashboard = React.memo(() => {
  return (
    <div>
      <PlayerLayout />
      <div>
        Dashboard player
      </div>
    </div>
  )
})

export default Dashboard
