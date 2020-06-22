import React, { memo } from 'react'
import Head from 'next/head'

const App = memo(({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <link rel='stylesheet' href='./style.css' />
      </Head>
      <Component {...pageProps} />
    </>
  )
})

export default App
