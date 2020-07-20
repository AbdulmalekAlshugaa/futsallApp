import React, { memo, useState, useEffect, useContext } from 'react'
import globalState from '../context'
import OwnerLayout from '../layout/Owner'
import axios from 'axios'
import cogoToast from 'cogo-toast'
import CreateCourt from './CreateCourt'
import { GiMoneyStack } from 'react-icons/gi'

const CenterDetails = memo(() => {
  const { query } = useContext(globalState)
  const [center, setCenter] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [address, setAddress] = useState('')
  const [start, setStart] = useState('0')
  const [end, setEnd] = useState('0')
  useEffect(() => {
    (async () => {
      if (query && query.id) {
        const res = await axios.get(`/api/user/getCenter?id=${query.id}`)
        setCenter({ ...res.data.centers, courts: res.data.courts })
        setAddress(res.data.centers.address)
        setStart(res.data.centers.workingHours ? res.data.centers.workingHours.from : '0')
        setEnd(res.data.centers.workingHours ? res.data.centers.workingHours.to : '0')
        setIsLoading(false)
      }
    })()
  }, [query])

  const editCenter = async () => {
    try {
      const res = await axios.post('/api/user/editCenter', {
        id: query.id,
        address,
        start,
        end
      })
      console.log('res', res)
      cogoToast.success('Success')
    } catch (error) {
      if (error.response) {
        cogoToast.error(error.response.data.error)
      } else {
        cogoToast.error('Error updating...')
      }
    }
  }

  return (
    <div>
      <OwnerLayout />
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <>
          <header className='bg-white shadow'>
            <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
              <h1 className='text-3xl font-bold leading-tight text-gray-900'>
                {center.name}
              </h1>
            </div>
          </header>
          <div className='bg-gray-200 max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 h-screen'>
            <div className='px-4 py-6 sm:px-0'>
              {isLoading ? (
                <div>
              Loading
                </div>
              ) : (
                <div>
                  <div className='bg-white rounded-md shadow mb-2'>
                    <div className='p-6'>
                      <div className='flex border-b border-grey-200 py-3'>
                        <div className='w-1/4 self-center'>
                          Address
                        </div>
                        <div className='w-2/4'>
                          <input onChange={(e) => setAddress(e.target.value)} className='w-full bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal' value={address} />
                        </div>
                      </div>
                      <div className='flex border-b border-grey-200 py-3'>
                        <div className='w-1/4 self-center'>
                          Operation Starts
                        </div>
                        <div className='w-2/4'>
                          <select onChange={(e) => setStart(e.target.value)} name='start' value={start} class='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'>
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
                      </div>
                      <div className='flex border-b border-grey-200 py-3'>
                        <div className='w-1/4 self-center'>
                          Operation End
                        </div>
                        <div className='w-2/4'>
                          <select onChange={(e) => setStart(e.target.value)} name='end' value={end} class='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'>
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
                      </div>
                      <div>
                        <div className='text-right'>
                          <button onClick={editCenter} className='mt-6 rounded bg-indigo-600 text-white px-4 py-2'>
                           Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='bg-white rounded-md shadow'>
                    <div className='p-6 flex justify-between border-b border-gray-200'>
                      <div className='font-bold text-lg'>{center ? center.courts.length : 0} Courts found</div>
                      <div>
                        <button className='rounded bg-indigo-600 text-white px-4 py-2' onClick={() => setOpenCreateModal(true)}>
                      Add new court
                        </button>
                      </div>
                    </div>
                    {center && center.courts.map((court, index) => (
                      <div key={index} className='my-4 bg-white shadow overflow-hidden sm:rounded-lg'>
                        <div className='px-4 py-5 border-b border-gray-200 sm:px-6'>
                          <h3 className='text-lg leading-6 font-medium text-gray-900'>
                             Court Information
                          </h3>
                        </div>
                        <div>
                          <dl>
                            <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                              <dt className='text-sm leading-5 font-medium text-gray-500'>
                                  Name
                              </dt>
                              <dd className='mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2'>
                                {court.name}
                              </dd>
                            </div>
                            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                              <dt className='text-sm leading-5 font-medium text-gray-500'>
                                  Price
                              </dt>
                              <dd className='mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2'>
                                    RM{court.price} Per hour
                              </dd>
                            </div>
                            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                              <dt className='text-sm leading-5 font-medium text-gray-500'>
                                  Attachments
                              </dt>
                              <dd className='mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2'>
                                <ul className='border border-gray-200 rounded-md'>
                                  <li className='pl-3 pr-4 py-3 flex items-center justify-between text-sm leading-5'>
                                    <div className='w-0 flex-1 flex items-center'>
                                      <svg className='flex-shrink-0 h-5 w-5 text-gray-400' viewBox='0 0 20 20' fill='currentColor'>
                                        <path fillRule='evenodd' d='M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z' clipRule='evenodd' />
                                      </svg>
                                      <span className='ml-2 flex-1 w-0 truncate'>
                  resume_back_end_developer.pdf
                                      </span>
                                    </div>
                                    <div className='ml-4 flex-shrink-0'>
                                      <a href='#' className='font-medium text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out'>
                  Download
                                      </a>
                                    </div>
                                  </li>
                                  <li className='border-t border-gray-200 pl-3 pr-4 py-3 flex items-center justify-between text-sm leading-5'>
                                    <div className='w-0 flex-1 flex items-center'>
                                      <svg className='flex-shrink-0 h-5 w-5 text-gray-400' viewBox='0 0 20 20' fill='currentColor'>
                                        <path fillRule='evenodd' d='M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z' clipRule='evenodd' />
                                      </svg>
                                      <span className='ml-2 flex-1 w-0 truncate'>
                  coverletter_back_end_developer.pdf
                                      </span>
                                    </div>
                                    <div className='ml-4 flex-shrink-0'>
                                      <a href='#' className='font-medium text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out'>
                  Download
                                      </a>
                                    </div>
                                  </li>
                                </ul>
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>

                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          {openCreateModal && (
            <CreateCourt close={setOpenCreateModal} centerId={query.id} />
          )}
        </>
      )}
    </div>
  )
})

export default CenterDetails
