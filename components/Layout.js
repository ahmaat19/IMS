import Navigation from './Navigation'
import Head from 'next/head'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Inventory Software</title>
        <meta property='og:title' content='Inventory Software' key='title' />
        <link rel='shortcut icon' href='logo.svg' />
      </Head>
      <Navigation />
      <main className='container'>{children}</main>
      <Footer />
    </>
  )
}
