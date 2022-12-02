import Link from 'next/link'
import { useSession, signOut, signIn } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession()
  return (
    <>
      <h1 className="my-8 text-3xl font-bold text-center">Landing Page</h1>
      <Link href="/dashboard">Dashboard Page</Link>
      {session && console.log(session)}
      <button onClick={signIn}>SignIn</button>
      <button onClick={signOut}>SignOut</button>
    </>
  )
}
