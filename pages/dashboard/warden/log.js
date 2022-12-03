import Head from 'next/head'
import { useSession, signOut } from 'next-auth/react'

export default function Log() {
  const { data: session } = useSession()
  return (
    <>
      <Head>
        <title>Student Log | HMS</title>
      </Head>
      <main className="min-h-screen bg-green-100">
        <header className="flex items-center justify-between px-4 text-white shadow md:px-12 bg-emerald-500 h-36">
          <h1 className="text-3xl font-bold">Hostel Logs</h1>
          <div className="text-lg">
            <span>Hi, {session?.user?.username}</span>
            <button
              onClick={() => signOut()}
              className="px-3 py-2 m-2 ml-4 rounded bg-emerald-600 hover:shadow"
            >
              Logout
            </button>
          </div>
        </header>
        <article className="p-4 mx-4 -mt-4 bg-white rounded-lg shadow md:mx-12">
          // TODO: add intime-outtime logs
        </article>
      </main>
    </>
  )
}
