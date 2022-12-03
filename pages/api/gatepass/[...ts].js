import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import moment from 'moment'

const mutation = /* GraphQL */ `
  mutation setInTime($username: String!) {
    inTime(username: $username) {
      studentGoingInTime {
        id
      }
    }
  }
`
export default async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions)
  const { ts } = req.query
  if (session) {
    if (moment().diff(moment.unix(+ts)) < 600000) {
      const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          credentials: 'include',
          authorization: `JWT ${session.user.token}`,
        },
        body: JSON.stringify({
          query: mutation,
          variables: {
            username: session.user.username,
          },
        }),
      })
    } else {
      res.status(406).json({
        err: 'Timeout error, please scan more recent GatePass',
      })
    }
  } else {
    // Not Signed in
    res.redirect(401, '/api/auth/signin')
  }
  res.end()
}
