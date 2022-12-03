import Head from 'next/head'
import Link from 'next/link'

import AdminDashboardLayout from '../../../components/layouts/adminDashboard'

export default function Warden() {
  return (
    <AdminDashboardLayout title="Welcome">
      <Head>
        <title>Warden Dashboard | HMS</title>
      </Head>
    </AdminDashboardLayout>
  )
}

Warden.auth = true
