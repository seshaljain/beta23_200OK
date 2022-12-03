import Sidebar from './sidebar.js'
import Link from 'next/link'
import Head from 'next/head'
import { useSession, signOut } from 'next-auth/react'

export default function Layout({ children, title }) {
  const {data: session} = useSession()
  const titleText = `${title} | HMS`
  return (
    <>
      <Head>
        <title>{titleText}</title>
      </Head>
      <nav className="flex items-center justify-between p-4 bg-gray-100 border-b border-gray-300">
        <h2 className="text-xl font-medium">
          <Link href="/dashboard/student">Hostel Management System</Link>
        </h2>
        <div>
          <span>Hi, {session?.user?.username}</span>
          <button
            onClick={() => signOut()}
            className="px-3 py-2 m-2 ml-4 bg-gray-200 rounded hover:shadow"
          >
            Logout
          </button>
        </div>
      </nav>
      <main className="flex flex-wrap bg-gray-50">
        <Sidebar />
        <div className="p-4">
          <h1 className="text-2xl font-medium uppercase">{title}</h1>
          <article>{children}</article>
        </div>
      </main>
    </>
  )
}