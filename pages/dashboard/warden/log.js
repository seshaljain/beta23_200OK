import AdminDashboardLayout from '../../../components/layouts/adminDashboard'
import moment from 'moment'
import { useListLogsQuery } from '../../../graphql/generated'

const OutTimeTable = ({ inOutTimes }) => {
  return (
    <div class="max-w-full mx-8 my-4">
      <div class="flex flex-col">
        <div class="overflow-x-auto shadow-md sm:rounded-lg">
          <div class="inline-block min-w-full align-middle">
            <div class="overflow-hidden ">
              <table class="min-w-full divide-y divide-gray-200 table-fixed">
                <thead class="bg-gray-100">
                  <tr>
                    <th
                      scope="col"
                      class="py-3 px-6 text-xs font-medium tracking-wider text-left uppercase "
                    >
                      Student
                    </th>
                    <th
                      scope="col"
                      class="py-3 px-6 text-xs font-medium tracking-wider text-left uppercase "
                    >
                      Enrollment Number
                    </th>
                    <th
                      scope="col"
                      class="py-3 px-6 text-xs font-medium tracking-wider text-left uppercase "
                    >
                      OutTime
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200 ">
                  {inOutTimes &&
                    inOutTimes.map((t) => {
                      return (
                        <tr key={t.id}>
                          <td class="py-4 px-6 text-sm font-medium whitespace-nowrap">
                            {t.student.studentName}
                          </td>
                          <td class="py-4 px-6 text-sm font-medium whitespace-nowrap">
                            {t.student.enrollmentNo}
                          </td>
                          <td class="py-4 px-6 text-sm font-medium whitespace-nowrap">
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
    <div class="max-w-full mx-8 my-4">
      <div class="flex flex-col">
        <div class="overflow-x-auto shadow-md sm:rounded-lg">
          <div class="inline-block min-w-full align-middle">
            <div class="overflow-hidden ">
              <table class="min-w-full divide-y divide-gray-200 table-fixed">
                <thead class="bg-gray-100">
                  <tr>
                    <th
                      scope="col"
                      class="py-3 px-6 text-xs font-medium tracking-wider text-left uppercase "
                    >
                      Student
                    </th>
                    <th
                      scope="col"
                      class="py-3 px-6 text-xs font-medium tracking-wider text-left uppercase "
                    >
                      Enrollment Number
                    </th>
                    <th
                      scope="col"
                      class="py-3 px-6 text-xs font-medium tracking-wider text-left uppercase "
                    >
                      OutTime
                    </th>
                    <th
                      scope="col"
                      class="py-3 px-6 text-xs font-medium tracking-wider text-left uppercase "
                    >
                      InTime
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200 ">
                  {inOutTimes &&
                    inOutTimes.map((t) => {
                      return (
                        <tr key={t.id}>
                          <td class="py-4 px-6 text-sm font-medium whitespace-nowrap">
                            {t.student.studentName}
                          </td>
                          <td class="py-4 px-6 text-sm font-medium whitespace-nowrap">
                            {t.student.enrollmentNo}
                          </td>
                          <td class="py-4 px-6 text-sm font-medium whitespace-nowrap">
                            {moment(t.outTime).format('HH:mm A')}
                          </td>
                          <td class="py-4 px-6 text-sm font-medium whitespace-nowrap">
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
