import React, { memo, useState, useEffect, useContext } from 'react'
import globalState from '../context'
import OwnerLayout from '../layout/Owner'
import axios from 'axios'
import cogoToast from 'cogo-toast'
import { useRouter } from 'next/router'

const CenterDetails = memo(() => {
  const { query } = useContext(globalState)
  const router = useRouter()
  useEffect(() => {
    (async () => {
      console.log('query ___', query)
      if (query && query.id) {
      const res = await axios.get(`/api/user/getCenter?id=${query.id}`)
      console.log('res', res)
      }
    
    })()
  }, [query])
 
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
    </div>
  )
})

export default CenterDetails
