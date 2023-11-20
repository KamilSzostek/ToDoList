import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import StoreProvider from '@/store/StoreProvider'
import 'bootstrap/dist/css/bootstrap.css'
import '@/styles/globals.css'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </SessionProvider>
  )
}
