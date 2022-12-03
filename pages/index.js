import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex items-center justify-center h-screen bg-gradient-to-br from-cyan-500 to-blue-500">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-center text-white">
          Hostel Management System
        </h1>
        <Link
          href="/dashboard"
          className="inline-block px-8 py-4 mx-auto mt-6 text-xl text-center text-white rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 hover:shadow-lg"
        >
          Dashboard
        </Link>
        <br />
        <Link href="/signup" className="text-xl text-white">
          ...or sign up
        </Link>
      </div>
    </main>
  )
}
