import Navigation from './Navigation'
import Head from 'next/head'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Inventory Software</title>
        <meta property='og:title' content='Inventory Software' key='title' />
      </Head>
      <Navigation />
      <div className='container'>{children}</div>
    </>
  )
}
