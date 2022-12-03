import DashboardLayout from '../../../components/layouts/dashboard'
import { useUserinfoQuery } from '../../../graphql/generated'

function Student() {
  const { data } = useUserinfoQuery()
  return (
    <DashboardLayout title="Welcome">
      <div className="flex flex-wrap -mx-6">
        <div className="flex-1 p-8 m-6 text-center text-blue-400 bg-blue-200 border-2 border-blue-300 rounded-lg">
          <span className="text-4xl font-bold">
            {data?.userInfo?.daysGoneOutCnt}
          </span>
          <h4 className="text-2xl font-bold">Days gone out</h4>
        </div>
        <div className="flex-1 p-8 m-6 text-center border-2 rounded-lg bg-amber-200 border-amber-300 text-amber-800">
          <span className="text-4xl font-bold">
            {data?.userInfo?.messNotEatingCnt}
          </span>
          <h4 className="text-2xl font-bold">Days mess not visited</h4>
        </div>
        <div className="flex-1 p-8 m-6 text-center text-purple-400 bg-purple-200 border-2 border-purple-300 rounded-lg">
          <span className="text-4xl font-bold">
            {data?.userInfo?.complaintsPendingCnt}
          </span>
          <h4 className="text-2xl font-bold">Pending complaints</h4>
        </div>
      </div>
    </DashboardLayout>
  )
}

Student.auth = true
export default Student
