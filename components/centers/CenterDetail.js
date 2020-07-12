import React, { memo, useState, useEffect, useContext } from 'react'
import globalState from '../context'
import OwnerLayout from '../layout/Owner'
import axios from 'axios'
import cogoToast from 'cogo-toast'
import CreateCourt from './CreateCourt'

const CenterDetails = memo(() => {
  const { query } = useContext(globalState)
  const [center, setCenter] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [openCreateModal, setOpenCreateModal] = useState(false)
  useEffect(() => {
    (async () => {
      if (query && query.id) {
        const res = await axios.get(`/api/user/getCenter?id=${query.id}`)
        console.log('res', res)
        setCenter({ ...res.data.centers, courts: res.data.courts })
        setIsLoading(false)
      }
    })()
  }, [query])

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
                  <div className='bg-white rounded-md shadow'>
                    <div className='p-6 flex justify-between border-b border-gray-200'>
                      <div className='font-bold text-lg'>{center ? center.courts.length : 0} Courts found</div>
                      <div>
                        <button className='rounded bg-indigo-600 text-white px-4 py-2' onClick={() => setOpenCreateModal(true)}>
                      Add new court
                        </button>
                      </div>
                    </div>
                    {/* {center && center.courts.map((center, index) => (
                      <div key={center.id}>
                        <div className={`p-6 flex justify-between ${index !== center.courts.length - 1 && 'border-b border-gray-200'}`}>
                          <div>
                            <span className='block font-bold text-indigo-600 text-lg'>
                              center.name
                            </span>
                            <span className='block'>
                              center.address
                            </span>
                          </div>
                        </div>
                      </div>
                    ))} */}
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
