import React, { memo, useState, useContext } from 'react'
import globalContext from './context'
import Link from 'next/link'
import axios from 'axios'

const Login = memo(() => {
  const { user, setUser } = useContext(globalContext)
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  console.log('user, setUser ', user, setUser )
  const login = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/user/login', {
        email: form.email,
        password: form.password
      })

      setUser(res.data.user)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full'>
        <div>
          {/* <img className='mx-auto h-12 w-auto' src='/img/logos/workflow-mark-on-white.svg' alt='Workflow' /> */}
          <h2 className='mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900'>
        Sign in to your account
          </h2>
          <p className='mt-2 text-center text-sm leading-5 text-gray-600'>
        Or
            <Link href='register'>
              <a className='font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150'>
          Create an account
              </a>
           </Link>
          </p>
        </div>
        <form className='mt-8' action='#' method='POST'>
          <input type='hidden' name='remember' defaultValue='true' />
          <div className='rounded-md shadow-sm'>
            <div>
              <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} aria-label='Email address' name='email' type='email' required className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5' placeholder='Email address' />
            </div>
            <div className='-mt-px'>
              <input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} aria-label='Password' name='password' type='password' required className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5' placeholder='Password' />
            </div>
          </div>
          <div className='mt-6 flex items-center justify-between'>
            {/* <div className='flex items-center'>
              <input id='remember_me' type='checkbox' className='form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out' />
              <label htmlFor='remember_me' className='ml-2 block text-sm leading-5 text-gray-900'>
            Remember me
              </label>
            </div> */}
            {/* <div className='text-sm leading-5'>
              <a href='#' className='font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150'>
            Forgot your password?
              </a>
            </div> */}
          </div>
          <div className='mt-6'>
            <button type='submit' className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out' onClick={login}>
              <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                <svg className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z' clipRule='evenodd' />
                </svg>
              </span>
          Sign in
            </button>
          </div>
        </form>
      </div>
    </div>

  )
})

export default Login
