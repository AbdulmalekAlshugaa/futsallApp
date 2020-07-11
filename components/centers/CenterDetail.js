import React, { memo, useState, useEffect } from 'react'
import OwnerLayout from '../layout/Owner'
import axios from 'axios'
import cogoToast from 'cogo-toast'
import { useRouter } from 'next/router'

const CenterDetails = memo(() => {
  useEffect(() => {
    (async => {

    })()
  }, [])
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
