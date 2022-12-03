import { SessionProvider } from 'next-auth/react'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apollo/apolloClient'
import { useSession } from 'next-auth/react'

import '../styles/globals.css'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const apolloClient = useApollo(pageProps)

  return (
    <ApolloProvider client={apolloClient}>
      <SessionProvider session={session}>
        {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </SessionProvider>
    </ApolloProvider>
  )
}

function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true })

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  return children
}
