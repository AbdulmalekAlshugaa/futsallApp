import React, { memo, useEffect, useState, useContext } from 'react'
import globalState from './context'
import axios from 'axios'
import PlayerLayout from './layout/Players'
import { Divider, Badge, Button, Stack, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/core'
import moment from 'moment'
import cogoToast from 'cogo-toast'
import { useRouter } from 'next/router'

const Teams = memo(() => {
  const [createMatch, setCreateMatch] = useState({
    date: moment().format('YYYY-MM-DD').toString(),
    from: '',
    to: ''
  })
  const [players, setPlayers] = useState([])
  const [booking, setBooking] = useState([])
  const router = useRouter()
  const ctx = useContext(globalState)
  const [requests, setRequest] = useState([])
  const [teams, setTeams] = useState([])
  useEffect(() => {
    (async () => {
      if (ctx.user) {
        const res = await axios.get('/api/user/getMyTeam')
        const ress = await axios.get('/api/user/players?role=PLAYER')
        const resss = await axios.get('/api/user/getMyBook')
        console.log('resss', resss)
        // console.log(ress)
        setPlayers(ress.data.Users)
        const myBooking = resss.data.booking.filter(b => {
          if (!moment().isAfter(moment(b.data), 'day')) {
            return true
          }
          return false
        })
        console.log('myBooking', myBooking)
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
            <Tab>Create Team</Tab>
            <Tab>Team Requests</Tab>

          </TabList>
          <TabPanels>
            <TabPanel>
              <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 h-screen' style={{ backgroundColor: '#f5f5f5' }}>
              Hello world
              </div>
            </TabPanel>
            <TabPanel>
              <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 h-screen' style={{ backgroundColor: '#f5f5f5' }}>
                <div>
                  <span className='font-bold text-xl mb-2'>Create team</span>
                  <div className='bg-white rounded-md shadow'>
                    <div className='p-6  border-b border-gray-200'>
                      <div className='flex'>
                        <div className='mr-4 self-center'>Match Date:</div>
                        <div><input min={moment().format('YYYY-MM-DD').toString()} type='date' value={createMatch.date} onChange={(e) => setCreateMatch({ ...createMatch, date: e.target.value })} className='border border-gray-600 rounded-md p-2' /></div>
                      </div>
                      <div className='flex mt-2'>
                        <div className='mr-4 self-center'>Game Start:</div>
                        <div>
                          <select name='start' onChange={(e) => setCreateMatch({ ...createMatch, from: e.target.value })} value={createMatch.from} class='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'>
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
                      </div>
                      <div className='flex mt-2'>
                        <div className='mr-4 self-center'>Game End:</div>
                        <div>
                          <select name='start' onChange={(e) => setCreateMatch({ ...createMatch, to: e.target.value })} value={createMatch.from} class='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'>
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
                      </div>
                      <div className='flex mt-2'>
                        <button onClick={createTeam} type='submit' className='inline-flex justify-center w-1/6 rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5'>
                        Create Team
                        </button>
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
                <Divider />
                <div>
                  <span className='font-bold text-xl mb-2'>My Teams</span>
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
