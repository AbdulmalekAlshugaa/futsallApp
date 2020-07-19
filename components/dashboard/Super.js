import React, { useEffect, useState } from 'react'
import SuperLayout from '../layout/Super'
import axios from 'axios'
import Link from 'next/link'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { Badge, Button, Stack } from '@chakra-ui/core'
import { useRouter } from 'next/router'

const Dashboard = React.memo(() => {
  const router = useRouter()
  const [centers, setCenters] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    (async () => {
      const res = await axios.get('/api/user/allCenters')
      console.log('res', res)
      setCenters(res.data.centers)
      setIsLoading(false)
    })()
  }, [])

  const approveCenter = async (centerId) => {
    try {
      const res = await axios.post('/api/user/handleCenter', {
        type: 'APPROVED',
        centerId
      })
      console.log('res', res)
      router.reload()
    } catch (error) {
      console.log(error)
    }
  }

  const rejectCenter = async (centerId) => {
    try {
      const res = await axios.post('/api/user/handleCenter', {
        type: 'REJECTED',
        centerId
      })
      router.reload()
      console.log('res', res)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <SuperLayout />
      <header className='bg-white shadow'>
        <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold leading-tight text-gray-900'>
            Dashboard
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
                      <div className='self-center flex'>
                        <Stack isInline mr={4}>
                          <Button variantColor='teal' size='xs' onClick={() => approveCenter(center.id)}>
                           Approve
                          </Button>
                          <Button variantColor='red' size='xs' onClick={() => rejectCenter(center.id)}>
                           Reject
                          </Button>
                        </Stack>
                        <Link href={`/centers/${center.id}`}>
                          <a style={{ alignSelf: 'center' }}>
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
    </div>
  )
})

export default Dashboard
