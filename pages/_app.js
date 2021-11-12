import '../styles/globals.css'
import Layout from '../components/layout'

function MyApp({ Component, pageProps }) {
  return (
  <div>
    <Layout body={<Component {...pageProps} />}/>
    
  </div>
  )
}

export default MyApp
