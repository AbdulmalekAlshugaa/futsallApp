import React, { memo, useEffect, useState, useContext } from 'react'
import globalState from './context'
import axios from 'axios'
import PlayerLayout from './layout/Players'
import { Divider, Badge, Button, Stack, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/core'
import moment from 'moment'
import cogoToast from 'cogo-toast'
import { useRouter } from 'next/router'
import time from '../config/times'
import Link from 'next/link'

const Teams = memo(() => {
  const [createMatch, setCreateMatch] = useState({
    date: moment().format('YYYY-MM-DD').toString(),
    from: '',
    to: ''
  })
  const [players, setPlayers] = useState([])
  const [matches, setMatches] = useState([])
  const router = useRouter()
  const ctx = useContext(globalState)
  const [requests, setRequest] = useState([])
  const [teams, setTeams] = useState([])
  useEffect(() => {
    (async () => {
      if (ctx.user) {
        const res1 = await axios.get('/api/user/myMatches')
        console.log('res1', res1)
        const activeBookingMatches = res1.data.booking.filter(b => {
          if (!moment().isAfter(moment(b.date), 'day')) {
            return true
          }
          return false
        })
        const res = await axios.get('/api/user/getMyTeam')
        const resss = await axios.get('/api/user/getMyBook')
        console.log('resss', resss)
        // console.log(ress)
        const myBooking = resss.data.booking.filter(b => {
          if (!moment().isAfter(moment(b.date), 'day')) {
            return true
          }
          return false
        })
        console.log('myBooking', myBooking)
        const requests = res.data.team.filter(a => {
          if (a.captainEmail !== ctx.user.email && (moment().isBefore(a.date, 'day') || moment().isSame(a.date, 'day'))) {
            const isPending = a.listOfPlayers.find(p => p.status === 'Pending' && p.Email === ctx.user.email)
            return !!isPending
          }
          return false
        })
        setRequest(requests)
        const activeRequestedMatch = res.data.team.filter(t => {
          if (t.captainEmail !== ctx.user.email && (moment().isBefore(t.date, 'day') || moment().isSame(t.date, 'day'))) {
            const isActive = t.listOfPlayers.find(p => p.status === 'approved' && p.Email === ctx.user.email)
            return !!isActive
          }
          return false
        })

        console.log('activeRequestedMatch', activeRequestedMatch)
        const aa = res1.data.matches.filter(m => activeRequestedMatch.some(a => a.bookingId === m.id))
        console.log('aa', aa)
        setMatches([...aa, ...activeBookingMatches])
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

  const createTeam = async () => {
    try {
      if (!createMatch.from || !createMatch.to) {
        cogoToast.error('Please select time')
        return
      }
      if (parseInt(createMatch.from) > parseInt(createMatch.to) || parseInt(createMatch.from) === parseInt(createMatch.to)) {
        cogoToast.error('from time should be before end time')
        return
      }
      const res = await axios.post('/api/user/createTeam', {
        ...createMatch
      })

      cogoToast.success('Success')
    } catch (error) {
      console.log(error)
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
          Matches
          </h1>
        </div>
      </header>
      <div className='mt-6'>
        <Tabs>
          <TabList>
            <Tab>Matches</Tab>
            <Tab>Team Requests</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 h-screen' style={{ backgroundColor: '#f5f5f5' }}>
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
                              Location
                              </th>
                              <th className='px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>
                              Team
                              </th>
                            </tr>
                          </thead>
                          <tbody className='bg-white'>
                            {matches.map(b => (
                              <tr key={b.id}>
                                <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200'>
                                  <span className='block'>
                                    {moment(b.date).format('ll').toString()}
                                  </span>
                                  <span className='block'>
                                    {time[b.from]} to {time[b.to]}
                                  </span>
                                </td>
                                <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200'>
                                  <span className='block'>
                                    {b.center.name}
                                  </span>
                                  <span className='block'>
                                    {b.center.address}
                                  </span>
                                </td>
                                <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200'>
                                  {teams.find(t => t.bookingId === b.id) ? (
                                    <div class='underline cursor-pointer'>
                                      <Link href={`/viewTeam?teamId=${teams.find(t => t.bookingId === b.id).id}`}>
                                      View my team
                                      </Link>
                                    </div>
                                  ) : (
                                    <div class='underline cursor-pointer'>
                                      <Link href={`/createTeam?bookingId=${b.id}`}>
                                      Create team
                                      </Link>
                                    </div>
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
            </TabPanel>
            <TabPanel>
              <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 h-screen' style={{ backgroundColor: '#f5f5f5' }}>
                <div>
                  <span className='font-bold text-xl mb-2'>Received requests</span>
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
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  )
})

export default Teams
