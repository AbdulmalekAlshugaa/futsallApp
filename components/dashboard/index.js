import React, { useContext } from 'react'
import globalContext from '../context'
import DashboardPlayer from './Players'
import DashboardOwner from './Owners'
import DashboardSuper from './Super'

const Dashboard = React.memo(() => {
  const { user } = useContext(globalContext)
  if (!user) return null
  return (
    <div>
      {
        user.role === 'SUPER' ? (
          <DashboardSuper />
        ) : user.role === 'PLAYER' ? (
          <DashboardPlayer />
        ) : (
          <DashboardOwner />
        )
      }
    </div>
  )
})

export default Dashboard
