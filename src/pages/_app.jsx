import '@/styles/globals.css'
import Layout from '@/layouts/Layout';
import CssBaseline from '@mui/material/CssBaseline';
import { SessionProvider } from "next-auth/react"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <CssBaseline/>
        <Component {...pageProps} />

      </Layout>
    </SessionProvider>
  )
}
