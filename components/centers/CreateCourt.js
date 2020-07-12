import React, { memo, useState } from 'react'
import axios from 'axios'
import cogoToast from 'cogo-toast'
import { useRouter } from 'next/router'

const CreateCourt = memo(({ close }) => {
  const router = useRouter()
  const [court, setCourt] = useState({ name: '', price: '', capacity: '' })
  const [isAddingCenter, setIsAddingCenter] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setCourt({ ...court, [name]: value })
  }

  const addCenter = async (e) => {
    e.preventDefault()
    setIsAddingCenter(true)
    if (!court.name || !court.price || !court.capacity) {
      cogoToast.error('Please fill all the requirement')
      setIsAddingCenter(false)
      return
    }
    const loader = cogoToast.loading('Adding court', { hideAfter: 0 })
    try {
      await axios.post('/api/user/createCourt', {
        ...court
      })
      router.reload()
    } catch (error) {
      setIsAddingCenter(false)
      loader.hide()
      cogoToast.error('Error')
      console.log(error)
    }
  }
  return (
    <div className='fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center'>
      <div className='fixed inset-0 transition-opacity' onClick={() => close(false)}>
        <div className='absolute inset-0 bg-gray-500 opacity-75' />
      </div>
      <div className='bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full' role='dialog' aria-modal='true' aria-labelledby='modal-headline'>
        <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
          <div className='sm:flex sm:items-start'>
            <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full'>
              <h3 className='text-lg leading-6 font-medium text-gray-900' id='modal-headline'>
              Add new court
              </h3>
              <div className='mt-2'>
                <div>
                  <form>
                    <div>
                      <input onChange={handleChange} name='name' className='mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5' placeholder='Enter court name' />
                      <input onChange={handleChange} name='price' className='mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5' placeholder='Enter court price' />
                      <input onChange={handleChange} name='capacity' className='mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5' placeholder='Enter court capacity' />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
          <span className='flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto'>
            <button onClick={addCenter} disabled={isAddingCenter} type='submit' className='inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5'>
             Create
            </button>
          </span>
          <span className='mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto'>
            <button type='button' className='inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5' onClick={() => close(false)}>
             Cancel
            </button>
          </span>
        </div>
      </div>
    </div>

  )
})

export default CreateCourt
