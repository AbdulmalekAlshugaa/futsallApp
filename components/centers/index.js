import React, { memo, useEffect, useState } from 'react'
import OwnerLayout from '../layout/Owner'
import CreateCenter from './CreateCenter'
import axios from 'axios'
import Link from 'next/link'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { Badge } from '@chakra-ui/core'

const Centers = memo(() => {
  const [isLoading, setIsloading] = useState(true)
  const [centers, setCenters] = useState([])
  const [openCreateModal, setOpenCreateModal] = useState(false)
  useEffect(() => {
    (async () => {
      const res = await axios.get('/api/user/getMyCenters')
      setCenters(res.data.centers)
      setIsloading(false)
    })()
  })
  return (
    <div>
      <OwnerLayout />
      <header className='bg-white shadow'>
        <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold leading-tight text-gray-900'>
            Centers
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
                  <div className='font-bold text-lg'>{centers.length} Centers found</div>
                  <div>
                    <button className='rounded bg-indigo-600 text-white px-4 py-2' onClick={() => setOpenCreateModal(true)}>
                      Add new center
                    </button>
                  </div>
                </div>
                {centers.map((center, index) => (
                  <div key={center.id}>
                    <div className={`p-6 flex justify-between ${index !== centers.length - 1 && 'border-b border-gray-200'}`}>
                      <div>
                        <span className='font-bold text-indigo-600 text-lg'>
                          {center.name}
                        </span>
                        <Badge variant='solid' variantColor={center.status === 'APPROVED' ? 'green' : center.status === 'REJECTED' ? 'red' : 'gray'} mb={1} ml={1}>{center.status}</Badge>
                        <span className='block'>
                          {center.address}
                        </span>
                      </div>
                      <div className='self-center'>
                        <Link href={`/centers/${center.id}`}>
                          <a>
                            <MdKeyboardArrowRight />
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {openCreateModal && (
        <CreateCenter close={setOpenCreateModal} />
      )}
    </div>
  )
})

export default Centers
