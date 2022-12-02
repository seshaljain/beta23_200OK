import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const mutation = /* GraphQL */ `
          mutation login($username: String, $password: String!) {
            tokenAuth(username: $username, password: $password) {
              token
              success
              user {
                id
                username
              }
            }
          }
        `
        const res = await fetch(process.env.GRAPHQL_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            credentials: 'include',
          },
          body: JSON.stringify({
            query: mutation,
            variables: {
              username: credentials.username,
              password: credentials.password,
            },
          }),
        })

        const { data } = await res.json()

        if (data?.tokenAuth?.success) {
          return {...data.tokenAuth.user, token: data.tokenAuth.token}
        } else return null
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user)
      return token
    },
    session: async ({ session, token }) => {
      session.user = token.user
      return session
    },
  },
}

export default NextAuth(authOptions)
