import Link from 'next/link'

export default function Navbar() {
  return (
    <aside className="flex-none w-full h-screen p-4 bg-gray-100 md:w-1/4">
      <ul className="my-2 space-y-4">
        <li>
          <Link href="/dashboard/student/profile" className="text-lg">
            Profile
          </Link>
        </li>
      </ul>
      <ul className="my-2 space-y-4">
        <li>
          <Link href="/dashboard/student/gatepass" className="text-lg">
            Generate Gate Pass
          </Link>
        </li>
        <li>
          <Link href="/dashboard/student/complaints" className="text-lg">
            Complaints
          </Link>
        </li>
      </ul>
      <ul className="my-2 space-y-4">
        <li>
          <Link href="/dashboard/student/posts" className="text-lg">
            Posts
          </Link>
        </li>
        <li>
          <Link href="/dashboard/student/ridesharing" className="text-lg">
            Ride Sharing
          </Link>
        </li>
      </ul>
    </aside>
  )
}
