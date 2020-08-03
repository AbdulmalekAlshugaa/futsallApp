import React, { memo, useEffect, useState } from 'react'
import PlayerLayout from './layout/Players'
import axios from 'axios'
import Router from 'next/router'
import { Grid, Box, Text, Badge } from '@chakra-ui/core'
import cogoToast from 'cogo-toast'
import moment from 'moment'
import time from '../config/times'

const CreateTeam = memo(() => {
  const [players, setPlayers] = useState([])
  const [booking, SetBooking] = useState(null)
  useEffect(() => {
    (async () => {
      if (!Router.router.query.teamId) {
        Router.router.replace('/dashboard')
      } else {
        const ress = await axios.get('/api/user/getTeamById?id=' + Router.router.query.teamId)
        console.log('ress', ress)
        setPlayers(ress.data.players)
        SetBooking(ress.data.booking[0])
      }
    })()
  }, [])

  return (
    <div>
      <PlayerLayout />
      <header className='bg-white shadow'>
        <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold leading-tight text-gray-900'>
          My Team
          </h1>
        </div>
      </header>

      <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8  h-screen pt-4' style={{ backgroundColor: '#e5e5e5' }}>
        {booking && (
          <Box rounded='md' p={4} w='100%' bg='#fff' mb={4}>
            <div>Date: {moment(booking.date).format('ll').toString()}</div>
            <div>Time: {time[booking.from]} - {[booking.to]}</div>
            <div>Center Name: {booking.center.name}</div>
            <div>Address: {booking.center.address}</div>
          </Box>
        )}
        <Grid templateColumns='repeat(4, 1fr)' gap={6}>
          {players.map(p => (
            <Box key={p.email} rounded='md' p={4} w='100%' bg='#fff'>
              <Box>
                <Text as='span' fontWeight='bold'>Name: </Text>
                <Text as='span'>{p.name}</Text>
              </Box>
              <Box>
                <Text as='span' fontWeight='bold'>Phone: </Text>
                <Text as='span'>{p.phone}</Text>
              </Box>
              <Box>
                <Text as='span' fontWeight='bold'>Position: </Text>
                <Text as='span'>{p.position ? p.position : 'ANY'}</Text>
              </Box>
              <Box>
                <Badge variantColor={p.status === 'approved' ? 'green' : p.status === 'rejected' ? 'red' : 'gray'}>{p.status}</Badge>
              </Box>
            </Box>
          ))}
        </Grid>
      </div>
    </div>
  )
})

export default CreateTeam
