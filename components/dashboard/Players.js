import React, { useState } from 'react'
import PlayerLayout from '../layout/Players'
import { Badge, Box, Input, Slider, SliderTrack, SliderThumb, SliderFilledTrack, Text, Stack, Button } from '@chakra-ui/core'
import cogoToast from 'cogo-toast'
import axios from 'axios'
import { MdKeyboardArrowRight } from 'react-icons/md'
import Link from 'next/link'

const Dashboard = React.memo(() => {
  const [KM, setKM] = useState(5)
  const [address, setAddress] = useState('')
  const [centers, setCenters] = useState([])

  const findNearCenter = async () => {
    const loader = cogoToast.loading('Searching...', { hideAfter: 0 })
    try {
      const res = await axios.post('/api/user/nearCenters', {
        address: address,
        max: KM * 1000
      })
      console.log('res', res)
      setCenters(res.data.centerWithdis)
      if (res.data.centerWithdis.length === 0) {
        cogoToast.info('No centers found')
      }
      await loader.hide()
    } catch (error) {
      console.log(error)
      await loader.hide()
      if (error.response) {
        cogoToast.error(error.response.data.error)
      } else {
        cogoToast.error('Error')
      }
    }
  }
  return (
    <div>
      <PlayerLayout />
      <div className='m-auto max-w-6xl'>
        <div className='mt-6'>
          <h1 className='font-bold text-2xl mb-2'>Find near centers</h1>
          <div>
            <Input w='90%' placeholder='Enter you address' onChange={(e) => setAddress(e.target.value)} />
            <Stack isInline mt={2}>
              <Slider w='90%' defaultValue={KM} onChange={(value) => setKM(value)}>
                <SliderTrack />
                <SliderFilledTrack />
                <SliderThumb />
              </Slider>
              <Text as='span' fontWeight='bold' fontSize='20px'>
                {KM} KM
              </Text>
            </Stack>
            <Box>
              <Button bg='#5a67d8' w='10%' color='#fff' onClick={findNearCenter}>
                Find
              </Button>
            </Box>
          </div>
        </div>
        <div className='mt-8'>
          <div className='bg-white rounded-md shadow'>
            <div className='p-6 flex justify-between border-b border-gray-200'>
              <div className='font-bold text-lg'>{centers.length} Centers found</div>
            </div>
            {centers.map((center, index) => console.log('center.distanceKM', center.distanceKM) || (
              <div key={center.id}>
                <div className={`p-6 flex justify-between ${index !== centers.length - 1 && 'border-b border-gray-200'}`}>
                  <div>
                    <span className='font-bold text-indigo-600 text-lg'>
                      {center.name}
                    </span>
                    <Badge variant='solid' variantColor='gray' mb={1} ml={1}>{center.distanceKM.toFixed(2)} KM</Badge>
                    <span className='block'>
                      {center.address}
                    </span>
                  </div>
                  <div className='self-center'>
                    <Link href={`/centers/booking?id=${center.id}`}>
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
      </div>
    </div>
  )
})

export default Dashboard
