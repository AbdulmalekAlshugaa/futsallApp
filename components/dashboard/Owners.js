import React, { useEffect, useState } from 'react'
import OwnerLayout from '../layout/Owner'
import axios from 'axios'
import moment from 'moment'
import time from '../../config/times'

const Dashboard = React.memo(() => {
  const [booking, setBooking] = useState([])
  const [users, setUsers] = useState([])
  useEffect(() => {
    (async () => {
      const res = await axios.get('/api/user/getAllCenterBooking')
      console.log('res', res)
      setUsers(res.data.user)
      setBooking(res.data.booking)
    })()
  }, [])

  console.log('users', users)
  console.log('booking', booking)
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
      <div className='h-screen' style={{ backgroundColor: '#e5e5e5' }}>
        <div className='mt-4'>
          <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
            <div className='-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>
              <div className='align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200'>
                <table className='min-w-full'>
                  <thead>
                    <tr>
                      <th className='px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>
                    Date
                      </th>
                      <th className='px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>
                      Center
                      </th>
                      <th className='px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>
                      Booked By
                      </th>
                      <th className='px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>
                    Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white'>
                    {booking.map(b => (
                      b.booking.map(c => (
                        <tr key={c.id}>
                          <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200'>
                            <span className='block'>{moment(c.date).format('ll').toString()}</span>
                            <span className='block'>
                              {time[c.from]} to {time[c.to]}
                            </span>
                          </td>
                          <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200'>
                            <span className='block'>Center: {b.name}</span>
                            <span className='block'>Court: {c.court.name}</span>
                          </td>
                          <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200'>
                            <span className='block'>Name: {users.find(u => u.email === c.userId).name}</span>
                            <span className='block'>Phone: {users.find(u => u.email === c.userId).phone}</span>
                          </td>
                          <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200'>
                            {moment(c.date).isBefore(moment(), 'day') ? (
                              <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'>
                          Expired
                              </span>

                            ) : (
                              <span class='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                          Active
                              </span>
                            )}
                          </td>
                        </tr>
                      ))
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default Dashboard
