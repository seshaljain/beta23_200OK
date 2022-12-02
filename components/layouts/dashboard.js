import Sidebar from './sidebar.js'
import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <>
      <nav className="flex items-center justify-between p-4 bg-gray-100 border-b border-gray-300">
        <h2 className="text-xl font-medium">
          <Link href="/dashboard/student">Hostel Management System</Link>
        </h2>
        <div>
          <span>Hi, Seshal</span>
          <button className="px-3 py-2 m-2 ml-4 bg-gray-200 rounded hover:shadow">
            Logout
          </button>
        </div>
      </nav>
      <main className="flex flex-wrap bg-gray-50">
        <Sidebar />
        <article className="p-4">{children}</article>
      </main>
    </>
  )
}
