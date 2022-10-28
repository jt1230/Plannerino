import '../styles/globals.css'
import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';


function MyApp({ Component, pageProps }) {
  return (
  <>
    <CssBaseline />
    <Head>
        <title>Plannerino</title>
        <meta name="description" content="Plan your time easier." />
        <link rel="icon" href="/favicon.jpg" />
      </Head>
    <Component {...pageProps} />
  </>
      
  ); 
}

export default MyApp
