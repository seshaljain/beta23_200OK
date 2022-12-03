import Link from 'next/link'
import Head from 'next/head'
import { useSession, signOut } from 'next-auth/react'

export default function Layout({ children, title }) {
  const titleText = `${title} | HMS`
  return (
    <main className="min-h-screen bg-emerald-50">
      <Head>
        <title>{titleText}</title>
      </Head>
      <header className="flex items-center justify-between h-40 p-4 px-4 pb-10 text-xl font-medium text-white shadow-md bg-gradient-to-t from-emerald-500 to-emerald-700 md:px-12">
        <h2 className="text-2xl">
          <Link href="/dashboard">Hostel Management System</Link>
        </h2>
        <div>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="px-3 py-2 m-2 ml-4 rounded bg-emerald-500 hover:shadow"
          >
            Logout
          </button>
        </div>
      </header>
      <article className="min-h-screen mx-4 -mt-10 bg-white rounded-md md:mx-12">
        <div>
          <ul className="flex flex-wrap justify-center space-x-8 font-medium">
            <li className="px-3 py-2 mt-4 text-lg rounded md:px-6 md:py-2 bg-slate-100 text-slate-600">
              <Link href="/dashboard/student/profile">Profile</Link>
            </li>
            <li className="px-3 py-2 mt-4 text-lg rounded md:px-6 md:py-2 bg-slate-100 text-slate-600">
              <Link href="/dashboard/student/complaints">Complaints</Link>
            </li>
            <li className="px-3 py-2 mt-4 text-lg rounded md:px-6 md:py-2 bg-slate-100 text-slate-600">
              <Link href="/dashboard/student/posts">Posts</Link>
            </li>
            <li className="px-3 py-2 mt-4 text-lg rounded md:px-6 md:py-2 bg-slate-100 text-slate-600">
              <Link href="/dashboard/student/ridesharing">Rides</Link>
            </li>
            <li className="px-3 py-2 mt-4 text-lg rounded md:px-6 md:py-2 bg-slate-100 text-slate-600">
              <Link href="/dashboard/student/mess">Mess</Link>
            </li>
          </ul>
        </div>
        <div className="p-8">
          <h1 className="text-2xl font-bold uppercase">{title}</h1>
          <article>{children}</article>
        </div>
      </article>
    </main>
  )
}
