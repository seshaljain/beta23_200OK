import { authOptions } from './api/auth/[...nextauth]'
import moment from 'moment'
import { unstable_getServerSession } from 'next-auth/next'

export default function QRScan({ ts, logType }) {
  console.log(ts)

  return <>{logType === 'in' ? 'InTime set' : 'OutTime set'}</>
}

const mutation = /* GraphQL */ `
  mutation studenQRScanner($username: String!) {
    qrScan(username: $username) {
      studentQRScan {
        id
        inTime
        outTime
      }
    }
  }
`

export async function getServerSideProps(context) {
  let logType = null
  const { ts } = context.query

  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  )

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    }
  }

  if (moment().diff(moment.unix(+ts)) < 600000) {
    const data = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT, {
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

    const res = await data.json()
    if (!res.data.qrScan.studentQRScan.inTime) {
      logType = 'out'
    } else {
      logType = 'in'
    }
  }

  return {
    props: { ts, logType },
  }
}
