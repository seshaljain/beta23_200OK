import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  theme: { colorScheme: 'light' },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'Username' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
        },
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
                isStudent
              }
            }
          }
        `
        const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT, {
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
          return { ...data.tokenAuth.user, token: data.tokenAuth.token }
        } else return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (!!user) {
        token.user = user
      }

      return token
    },
    async session({ session, token }) {
      session.user = token.user
      session.token = token
      session.error = token.error

      return session
    },
  },
}

export default NextAuth(authOptions)
