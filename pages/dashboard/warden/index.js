import Head from 'next/head'
import Link from 'next/link'

import AdminDashboardLayout from '../../../components/layouts/adminDashboard'

export default function Warden() {
  return (
    <AdminDashboardLayout title="Welcome">
      <Head>
        <title>Warden Dashboard | HMS</title>
      </Head>
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
    </AdminDashboardLayout>
  )
}

Warden.auth = true
