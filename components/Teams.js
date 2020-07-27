import React, { memo, useEffect, useState, useContext } from 'react'
import globalState from './context'
import axios from 'axios'
import PlayerLayout from './layout/Players'
import { Divider, Badge, Button, Stack } from '@chakra-ui/core'
import moment from 'moment'
import cogoToast from 'cogo-toast'
import { useRouter } from 'next/router'

const Teams = memo(() => {
  const router = useRouter()
  const ctx = useContext(globalState)
  const [requests, setRequest] = useState([])
  const [teams, setTeams] = useState([])
  useEffect(() => {
    (async () => {
      if (ctx.user) {
        const res = await axios.get('/api/user/getMyTeam')
        console.log('res', res)
        const requests = res.data.team.filter(a => {
          if (a.captainEmail !== ctx.user.email && moment().isBefore(a.date, 'day')) {
            const isPending = a.listOfPlayers.find(p => p.status === 'Pending' && p.Email === ctx.user.email)
            return !!isPending
          }
          return false
        })
        setRequest(requests)
        setTeams(res.data.team)
      }
    })()
  }, [ctx.user])

  const handleTeam = async (id, status) => {
    const loader = cogoToast.loading('Proccessing', { hideAfter: 0 })
    try {
      const res = await axios.post('/api/user/handleTeamRequest', {
        id, status
      })
      loader.hide()
      router.reload()
    } catch (error) {
      loader.hide()
      cogoToast.error('Error')
    }
  }
  console.log('requests', requests)
  console.log('teams', teams)
  return (
    <div>
      <PlayerLayout />
      <header className='bg-white shadow'>
        <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold leading-tight text-gray-900'>
          Teams
          </h1>
        </div>
      </header>
      <div className='mt-2'>
        <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
          <span className='font-bold text-xl'>Team requests</span>
          <div className='bg-white rounded-md shadow'>
            <div className='p-6 flex justify-between border-b border-gray-200'>
              <div className='font-bold text-lg'>{requests.length} request found</div>
            </div>
            {requests.map((center, index) => (
              <div key={center.id}>
                <div className={`p-6 flex justify-between ${index !== requests.length - 1 && 'border-b border-gray-200'}`}>
                  <div>
                    <span className='block'>
                    Requested by 
                    </span>
                    <span className='font-bold text-indigo-600 text-lg'>
                      {center.captainEmail}
                    </span>
                    <Badge variant='solid' variantColor={center.status === 'APPROVED' ? 'green' : center.status === 'REJECTED' ? 'red' : 'gray'} mb={1} ml={1}>{center.status}</Badge>

                    <span className='block'>
                      {center.address}
                    </span>
                  </div>
                  <div className='self-center'>
                  <span className='block'>Match Date: {moment(center.date).format('ll').toString()}</span>
                    <Stack isInline mr={4}>
                      <Button variantColor='teal' size='xs' onClick={() => handleTeam(center.id, 'approved')}>
                        Approve
                      </Button>
                      <Button variantColor='red' size='xs' onClick={() => handleTeam(center.id, 'rejected')}>
                        Reject
                      </Button>
                    </Stack>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Divider />
    </div>
  )
})

export default Teams
