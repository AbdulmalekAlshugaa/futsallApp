import React, { memo, useEffect, useState, useContext } from 'react'
import axios from 'axios'
import PlayerLayout from './layout/Players'
import GlobalState from './context'
import cogoToast from 'cogo-toast'

const UpdateAccount = memo(() => {
  const { user, setUser } = useContext(GlobalState)
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    position: 'GK',
    natoinality: '',
    passpoerNumber: '',
    birthday: '',
    age: 0
  })

  useEffect(() => {
    (async () => {
      if (user) {
        setForm({
          email: user.email || '',
          password: '',
          name: user.name || '',
          phone: user.phone || '',
          position: user.position || '',
          natoinality: user.natoinality || '',
          passpoerNumber: user.passpoerNumber,
          birthday: user.birthday || '',
          age: user.age || ''
        })
      }
    })()
  }, [user])

  const update = async () => {
    const loader = cogoToast.loading('Updating user', { hideAfter: 0 })
    try {
      await axios.post('/api/user/update_user', form)
      setUser(form)
      loader.hide()
      cogoToast.success('Success')
    } catch (error) {
      console.log(error)
      loader.hide()
      cogoToast.error('Error')
    }
  }

  return (
    <div>
      <PlayerLayout />
      <header className='bg-white shadow'>
        <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold leading-tight text-gray-900'>
            Update account
          </h1>
        </div>
      </header>
      <div className='max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
        <div>
          <form className='mt-8' action='#' method='POST'>
            <input type='hidden' name='remember' defaultValue='true' />
            <div className='rounded-md shadow-sm'>
              <div>
                <input
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  aria-label='Email address'
                  name='name'
                  type='text'
                  className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5'
                  placeholder='Name'
                />
              </div>
              <div className='-mt-px'>
                <input
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  aria-label='Email address'
                  name='email'
                  type='email'
                  className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5'
                  placeholder='Email address'
                />
              </div>
              <div className='-mt-px'>
                <input
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  aria-label='Password'
                  name='password'
                  type='password'
                  className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5'
                  placeholder='Password'
                />
                <div className='-mt-px'>
                  <input
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    aria-label='Phone'
                    name='phone'
                    type='text'
                    className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5'
                    placeholder='Phone Number'
                  />
                </div>
              </div>
              {form.role === 'PLAYER' && (
                <div className='-mt-px'>
                  <select
                    onChange={e => setForm({ ...form, position: e.target.value })}
                    className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5'
                  >
                    <option value='GK'>Goalkeeper</option>
                    <option value='FB'>Full-backs</option>
                    <option value='MD'>Midfield</option>
                    <option value='ATT'>Attacker</option>
                  </select>
                </div>
              )}

              <div className='-mt-px'>
                <input
                  value={form.natoinality}
                  onChange={e =>
                    setForm({ ...form, natoinality: e.target.value })}
                  aria-label='Natoinality'
                  name='Natoinality'
                  type='text'
                  className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5'
                  placeholder='Nationlity'
                />
              </div>
            </div>
            <div className='-mt-px'>
              <input
                value={form.passpoerNumber}
                onChange={e =>
                  setForm({ ...form, passpoerNumber: e.target.value })}
                aria-label='PasspoerNumber'
                name='PasspoerNumber'
                type='text'
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5'
                placeholder='PasspoerNumber'
              />
            </div>
            <div className='-mt-px'>
              <input
                value={form.birthday}
                onChange={e => setForm({ ...form, birthday: e.target.value })}
                aria-label='Birthday'
                name='Birthday'
                type='text'
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5'
                placeholder='Birthday'
              />
            </div>

            <div className='-mt-px'>
              <input
                value={form.age}
                onChange={e => setForm({ ...form, age: e.target.value })}
                aria-label='Age'
                name='Age'
                type='text'
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5'
                placeholder='Age'
              />
            </div>

            <div className='mt-6'>
              <button
                className='group relative w-full flex justify-center py-2 px-4 border
              border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out'
                onClick={update}
              >
                <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                  <svg
                    className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                </span>
              Update User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
})

export default UpdateAccount
