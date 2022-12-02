import Link from 'next/link'

export default function Navbar() {
  return (
    <aside className="flex-none w-full h-screen p-4 bg-gray-100 md:w-1/4">
      <h3 className="mt-4 font-bold uppercase">Details</h3>
      <ul className="my-2 space-y-4">
        <li>
          <Link href="/dashboard/student/profile" className="text-lg">
            Profile
          </Link>
        </li>
      </ul>
      <h3 className="mt-4 font-bold uppercase">Actions</h3>
      <ul className="my-2 space-y-4">
        <li>
          <Link href="#" className="text-lg" aria-disabled>
            Generate Gate Pass
          </Link>
        </li>
        <li>
          <Link href="/dashboard/student/complaints" className="text-lg">
            Complaints
          </Link>
        </li>
      </ul>
    </aside>
  )
}
