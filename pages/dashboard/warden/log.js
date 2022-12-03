import AdminDashboardLayout from '../../../components/layouts/adminDashboard'
import moment from 'moment'
import { useListLogsQuery } from '../../../graphql/generated'

const OutTimeTable = ({ inOutTimes }) => {
  return (
    <div className="max-w-full mx-8 my-4">
      <div className="flex flex-col">
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table className="min-w-full divide-y divide-gray-200 table-fixed">
                <thead className="bg-gray-100">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase "
                    >
                      Student
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase "
                    >
                      Enrollment Number
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase "
                    >
                      OutTime
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                  {inOutTimes &&
                    inOutTimes.map((t) => {
                      return (
                        <tr key={t.id}>
                          <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                            {t.student.studentName}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                            {t.student.enrollmentNo}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                            {moment(t.outTime).format('HH:mm A')}
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const InTimeTable = ({ inOutTimes }) => {
  return (
    <div className="max-w-full mx-8 my-4">
      <div className="flex flex-col">
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table className="min-w-full divide-y divide-gray-200 table-fixed">
                <thead className="bg-gray-100">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase "
                    >
                      Student
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase "
                    >
                      Enrollment Number
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase "
                    >
                      OutTime
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase "
                    >
                      InTime
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                  {inOutTimes &&
                    inOutTimes.map((t) => {
                      return (
                        <tr key={t.id}>
                          <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                            {t.student.studentName}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                            {t.student.enrollmentNo}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                            {moment(t.outTime).format('HH:mm A')}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                            {moment(t.inTime).format('HH:mm A')}
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Logs() {
  const { data } = useListLogsQuery()
  return (
    <AdminDashboardLayout title="Student List">
      <h2 className="mx-8 text-lg font-bold">Students in Hostel</h2>
      <InTimeTable
        inOutTimes={data?.allStudentInOutTimesToday.filter((t) => !!t.inTime)}
      />
      <h2 className="mx-8 text-lg font-bold">Students out of Hostel</h2>
      <OutTimeTable
        inOutTimes={data?.allStudentInOutTimesToday.filter((t) => !t.inTime)}
      />
    </AdminDashboardLayout>
  )
}

Logs.auth = true
