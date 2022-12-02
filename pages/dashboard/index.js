import Link from 'next/link'

export default function Dashboard() {
  return (
    <>
      <h1>Dashboard Page</h1>
      <Link href="/dashboard/student">Student Dashboard</Link>
      <Link href="/dashboard/warden">Warden Dashboard</Link>
    </>
  )
}
