import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'

export default function GatePass() {
  const router = useRouter()
  const { data: session, status } = useSession()

  const { timestamp } = router.query
  useEffect(() => {
    console.log(session)
    const { timestamp } = router.query
    if (status !== 'loading' && session) {
      console.log('Not signed in')
      // signIn()
    } else {
      console.log(timestamp)
    }
  }, [session])

  return <p>{timestamp}</p>
}
