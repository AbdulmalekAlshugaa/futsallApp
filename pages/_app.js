import React, { memo, useState, useEffect } from 'react'
import GlobalContext from '../components/context'
import Head from 'next/head'
import axios from 'axios'
import { useRouter } from 'next/router'

const App = memo(({ Component, pageProps }) => {
  const router = useRouter()
  const [user, setUser] = useState(null)

  useEffect(() => {
    (async () => {
      console.log('hello world')
      if (!user) {
        // send axios request
        try {
          const res = await axios.get('/api/user/CurrentUser')
          console.log('res', res)
          if (res.data.user) {
            setUser(res.data.user)
          } else {
            if (router.route !== '/login' || router.router !== '/register' || router.router !== '/feature' || router.router !== '/') {
              router.push('/')
            }
          }
        } catch (error) {
          if (router.route !== '/login' || router.router !== '/register' || router.router !== '/feature' || router.router !== '/') {
            router.push('/')
          }
        }
      } else {
        console.log('redirect', router.route)
        if (router.route === '/login' || router.route === '/register') {
          console.log('WTF')
          router.push('/dashboard')
        }
      }
    })()
  }, [user])
  return (
    <>
      <Head>
        <link rel='stylesheet' href='/style.css' />
      </Head>
      <GlobalContext.Provider value={{ setUser, user }}>
        <Component {...pageProps} />
      </GlobalContext.Provider>
    </>
  )
})

export default App
