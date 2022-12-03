import Head from 'next/head'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

export default function List({ children, title }) {
  const { data: session } = useSession()
  return (
    <>
      <Head>
        <title>{title} | HMS</title>
      </Head>
      <main className="min-h-screen bg-emerald-100">
        <header className="flex flex-col justify-center h-48 px-4 text-white shadow item-center md:px-12 bg-emerald-500">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">{title}</h1>
            <div className="text-lg">
              <span>Hi, {session?.user?.username}</span>
              <button
                onClick={() => signOut()}
                className="px-3 py-2 m-2 ml-4 rounded bg-emerald-600 hover:shadow"
              >
                Logout
              </button>
            </div>
          </div>
          <div>
            <ul className="flex space-x-4">
              <li>
                <Link
                  href="/dashboard/warden/list"
                  className="p-2 text-lg rounded bg-emerald-600"
                >
                  Student List
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/warden/log"
                  className="p-2 text-lg rounded bg-emerald-600"
                >
                  Hostel Logs
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/warden/complaints"
                  className="p-2 text-lg rounded bg-emerald-600"
                >
                  Complaints Log
                </Link>
              </li>
            </ul>
          </div>
        </header>
        <article className="p-4 mx-4 -mt-4 bg-white rounded-lg shadow md:mx-12">
          {children}
        </article>
      </main>
    </>
  )
}
