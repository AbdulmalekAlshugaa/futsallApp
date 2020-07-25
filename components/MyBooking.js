import React, { memo, useEffect, useState } from 'react'
import axios from 'axios'
import PlayerLayout from './layout/Players'
import moment from 'moment'
import time from '../config/times'

const MyBooking = memo(() => {
  const [booking, setBooking] = useState([])
  useEffect(() => {
    (async () => {
      const res = await axios.get('/api/user/getMyBook')
      console.log('res', res)
      const sort = res.data.booking.sort((a, b) => {
        return moment(b.date).unix() - moment(a.date).unix()
      })
      setBooking(sort)
    })()
  }, [])
  return (
    <div>
      <PlayerLayout />
      <header className='bg-white shadow'>
        <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold leading-tight text-gray-900'>
          My Booking
          </h1>
        </div>
      </header>
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
                    Time
                    </th>
                    <th className='px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>
                              Status
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white'>
                  {booking.map(b => (
                    <tr key={b.id}>
                      <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200'>
                        {moment(b.date).format('ll').toString()}
                      </td>
                      <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200'>
                        {time[b.from]} to {time[b.to]}
                      </td>
                      <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200'>
                        {moment(b.date).isBefore(moment(), 'day') ? (
                          <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'>
                          Expired
                        </span>

                        ) : (
                          <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default MyBooking
