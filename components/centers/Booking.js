import React, { useEffect, useContext, useState } from 'react'
import PlayerLayout from '../layout/Players'
import globalState from '../context'
import axios from 'axios'
import moment from 'moment'
import { Button, Tab, TabList, Tabs, TabPanel, TabPanels, Stack } from '@chakra-ui/core'
import cogoToast from 'cogo-toast'
import time from '../../config/times'
import { useRouter } from 'next/router'

const Booking = React.memo(() => {
  const router = useRouter()
  const { query } = useContext(globalState)
  const [courts, setCourts] = useState([])
  const [booking, setBooking] = useState([])
  const [form, setForm] = useState({
    court: '',
    from: '',
    to: '',
    date: moment().format('YYYY-MM-DD').toString()
  })
  useEffect(() => {
    (async () => {
      if (query && query.id) {
        const res = await axios.get(`/api/user/getCourts?centerId=${query.id}`)
        const ress = await axios.get(`/api/user/getCenterBooking?centerId=${query.id}`)
        setBooking(ress.data.booking)
        setCourts(res.data.coutrs)
      }
    })()
  }, [query])

  const selectDate = (e) => {
    const { value } = e.target
    setForm({ ...form, date: value })
  }

  const findBooking = async () => {
    const loader = cogoToast.loading('Finding booking', { hideAfter: 0 })
    try {
      const res = await axios.get(`/api/user/getCenterBooking?centerId=${query.id}`)
      console.log('booking', res)
      setBooking(res.data.booking)
      loader.hide()
    } catch (error) {
      console.log(error)
      loader.hide()
      cogoToast.error('Error')
    }
  }

  const handleStartTime = (e) => {
    const { value } = e.target
    setForm({ ...form, from: value })
  }
  const handleEndTime = (e) => {
    const { value } = e.target
    setForm({ ...form, to: value })
  }

  const book = async (courtId) => {
    const loader = cogoToast.loading('Booking...', { hideAfter: 0 })
    try {
      if (!form.from || !form.to) {
        loader.hide()
        cogoToast.error('Please enter time')
        return
      } else if (parseInt(form.from) > parseInt(form.to) || form.from === form.to) {
        cogoToast.error('End time should be after start')
        return
      }
      const res = await axios.post('/api/user/bookCourt', {
        centerId: query.id, courtId, from: form.from, to: form.to, date: form.date
      })
      loader.hide()
      cogoToast.success('Success')
      setTimeout(() => {
        router.reload()
      }, 1000)
    } catch (error) {
      console.log(error)
      loader.hide()
      if (error.response) {
        cogoToast.error(error.response.data.error)
      } else {
        cogoToast.error('Error')
      }
    }
  }

  console.log('booking', booking)
  return (
    <div>
      <PlayerLayout />
      <header className='bg-white shadow'>
        <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold leading-tight text-gray-900'>
            Book Center
          </h1>
        </div>
      </header>
      <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
        <div>
          <label className='font-bold text-xl block mb-2'>Enter Date</label>
          <input value={form.date} type='date' className='border p-1 mr-2' min={moment().format('YYYY-MM-DD').toString()} onChange={selectDate} />
        </div>
        <div className='mb-12'>
          <Tabs>
            {courts.map(c => (
              <TabList key={c.id}>
                <Tab>Court {c.name}</Tab>
              </TabList>
            ))}
            {courts.map(c => (
              <TabPanels key={c.id}>
                <TabPanel>
                  <Stack isInline>
                    <div className='w-1/5 mt-4 mr-2'>
                      <select name='start' onChange={handleStartTime} value={form.from} class='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'>
                        <option value=''>Start Time</option>
                        <option value='0'>12AM</option>
                        <option value='1'>1AM</option>
                        <option value='2'>2AM</option>
                        <option value='3'>3AM</option>
                        <option value='4'>4AM</option>
                        <option value='5'>5AM</option>
                        <option value='6'>6AM</option>
                        <option value='7'>7AM</option>
                        <option value='8'>8AM</option>
                        <option value='9'>9AM</option>
                        <option value='10'>10AM</option>
                        <option value='11'>11AM</option>
                        <option value='12'>12PM</option>
                        <option value='13'>1PM</option>
                        <option value='14'>2PM</option>
                        <option value='15'>3PM</option>
                        <option value='16'>4PM</option>
                        <option value='17'>5PM</option>
                        <option value='18'>6PM</option>
                        <option value='19'>7PM</option>
                        <option value='20'>8PM</option>
                        <option value='21'>9PM</option>
                        <option value='22'>10PM</option>
                        <option value='23'>11PM</option>
                      </select>
                    </div>
                    <div className='w-1/5 mt-4 mr-2'>
                      <select name='start' onChange={handleEndTime} value={form.to} class='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'>
                        <option value=''>End Time</option>
                        <option value='0'>12AM</option>
                        <option value='1'>1AM</option>
                        <option value='2'>2AM</option>
                        <option value='3'>3AM</option>
                        <option value='4'>4AM</option>
                        <option value='5'>5AM</option>
                        <option value='6'>6AM</option>
                        <option value='7'>7AM</option>
                        <option value='8'>8AM</option>
                        <option value='9'>9AM</option>
                        <option value='10'>10AM</option>
                        <option value='11'>11AM</option>
                        <option value='12'>12PM</option>
                        <option value='13'>1PM</option>
                        <option value='14'>2PM</option>
                        <option value='15'>3PM</option>
                        <option value='16'>4PM</option>
                        <option value='17'>5PM</option>
                        <option value='18'>6PM</option>
                        <option value='19'>7PM</option>
                        <option value='20'>8PM</option>
                        <option value='21'>9PM</option>
                        <option value='22'>10PM</option>
                        <option value='23'>11PM</option>
                      </select>
                    </div>
                    <div className='mt-4'>
                      <Button onClick={() => book(c.id)}>Book</Button>
                    </div>
                  </Stack>
                  <div className='flex flex-col mt-4'>
                    <div className='mb-2 text-xl font-bold'>Times when court is not available</div>
                    <div className='-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>
                      <div className='align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200'>
                        <table className='min-w-full'>
                          <thead>
                            <tr>
                              <th className='px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>
                              Time
                              </th>
                              <th className='px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>
                              Status
                              </th>
                            </tr>
                          </thead>
                          <tbody className='bg-white'>
                            {booking.map(b => b.courtId === c.id && moment(b.date).isSame(moment(form.date), 'day') && (
                              <tr key={b.id}>
                                <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200'>
                                  {time[b.from]} to {time[b.to]}
                                </td>
                                <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200'>
                                  <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'>
                                    Reversed
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                </TabPanel>
              </TabPanels>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  )
})

export default Booking
