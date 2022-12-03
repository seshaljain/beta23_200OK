import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

function Dashboard() {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    session?.user?.isStudent
      ? router.replace('/dashboard/student')
      : router.replace('/dashboard/warden')
  }, [session])

  return 'Loading...'
}

Dashboard.auth = true
export default Dashboard