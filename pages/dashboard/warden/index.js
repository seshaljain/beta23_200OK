import Head from 'next/head'
import Link from 'next/link'
export default function Warden() {
  return (
    <>
      <Head>
        <title>Warden Dashboard | HMS</title>
      </Head>
      <nav className="flex items-center justify-between p-4 bg-blue-100 border-b border-blue-300">
        <h2 className="text-xl font-medium">
          <Link href="/dashboard/student">Hostel Management System</Link>
        </h2>
        <div>
          <button
            onClick={() => signOut()}
            className="px-3 py-2 m-2 ml-4 bg-blue-200 rounded hover:shadow"
          >
            Logout
          </button>
        </div>
      </nav>
      <main className="p-4">
        <h1 className="text-2xl font-medium uppercase">Warden Dashboard</h1>
        <ul className="flex flex-wrap">
          <li className="w-64 max-w-full px-4 py-12 m-8 bg-green-100 rounded">
            <Link
              href="/dashboard/warden/list"
              className="text-3xl font-bold text-center text-green-800"
            >
              Student Info
            </Link>
          </li>
          <li className="w-64 max-w-full px-4 py-12 m-8 bg-yellow-100 rounded">
            <Link
              href="/dashboard/warden/list"
              className="text-3xl font-bold text-center text-yellow-800"
            >
              Hostel Log
            </Link>
          </li>
        </ul>
      </main>
    </>
  )
}
