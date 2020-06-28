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
      if (!user) {
        // send axios request
        try {
          const res = await axios.get('/api/user/CurrentUser')
          console.log('res', res)
          if (res.data.user) {
            console.log('hi')
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
        console.log('redirect')
        if (router.route === '/login' || router.router === '/register') {
          router.push('/dashboard')
        }
      }
    })()
  }, [user])
  return (
    <>
      <Head>
        <link rel='stylesheet' href='./style.css' />
      </Head>
      <GlobalContext.Provider value={{ setUser, user }}>
        <Component {...pageProps} />
      </GlobalContext.Provider>
    </>
  )
})

export default App
