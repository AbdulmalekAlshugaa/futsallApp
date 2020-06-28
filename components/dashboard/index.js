import React, { useContext } from 'react'
import globalContext from '../context'
import DashboardPlayer from './Players'
import DashboardOwner from './Owners'

const Dashboard = React.memo(() => {
  const { user } = useContext(globalContext)
  if (!user) return null
  return (
    <div>
      {
        user.role === 'PLAYER' ? (
          <DashboardPlayer />
        ) : (
          <DashboardOwner />
        )
      }
    </div>
  )
})

export default Dashboard
