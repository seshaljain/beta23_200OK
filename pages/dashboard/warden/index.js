import Head from 'next/head'
import { useMessNotEatingTodayQuery } from '../../../graphql/generated'
import { useAllComplaintsQuery } from '../../../graphql/generated'

import AdminDashboardLayout from '../../../components/layouts/adminDashboard'

export default function Warden() {
  const { data: mess } = useMessNotEatingTodayQuery()
  const { data: complaints } = useAllComplaintsQuery()
  return (
    <AdminDashboardLayout title="Welcome">
      <Head>
        <title>Warden Dashboard | HMS</title>
      </Head>
      <div className="flex flex-wrap -mx-6">
        <div className="flex-1 p-8 m-6 text-center text-blue-400 border-2 border-blue-300 rounded-lg bg-blue-50">
          <span className="text-4xl font-bold">
            {complaints?.complaintsAll.filter((c) => !c.status).length}
          </span>
          <h4 className="text-2xl font-bold">Pending complaints</h4>
        </div>
        <div className="flex-1 p-8 m-6 text-center text-yellow-400 border-2 border-yellow-300 rounded-lg bg-yellow-50">
          <span className="text-4xl font-bold">
            {mess?.messNotEatingToday.length}
          </span>
          <h4 className="text-2xl font-bold">
            Students not eating in mess today
          </h4>
        </div>
      </div>
    </AdminDashboardLayout>
  )
}

Warden.auth = true
