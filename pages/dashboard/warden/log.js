import { useSession, signOut } from 'next-auth/react'
import AdminDashboardLayout from '../../../components/layouts/adminDashboard'

export default function Log() {
  const { data: session } = useSession()
  return (
    <AdminDashboardLayout title="Hostel Logs">
      // TODO: add intime-outtime logs
    </AdminDashboardLayout>
  )
}

Log.auth = true
