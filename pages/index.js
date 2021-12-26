import Head from 'next/head'
import dynamic from 'next/dynamic'
import withAuth from '../HOC/withAuth'

function Home() {
  return (
    <div>
      <Head>
        <title>Inventory Software</title>
        <meta property='og:title' content='Inventory Software' key='title' />
      </Head>
      <div className='display-1 text-center text-primary'>Dashboard</div>
    </div>
  )
}

export default dynamic(() => Promise.resolve(withAuth(Home)), { ssr: false })
