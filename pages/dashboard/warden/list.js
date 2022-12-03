import AdminDashboardLayout from '../../../components/layouts/adminDashboard'
import { useListStudentsQuery } from '../../../graphql/generated'

export default function List() {
  const { data } = useListStudentsQuery()
  return (
    <AdminDashboardLayout title="Student List">
      <div className="max-w-full m-8">
        <div className="flex flex-col">
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden ">
                <table className="min-w-full divide-y divide-gray-200 table-fixed">
                  <thead className="bg-gray-100">
                    <tr>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left uppercase "
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left uppercase "
                      >
                        Father's Name
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left uppercase "
                      >
                        Enrollment Number
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left uppercase "
                      >
                        Course
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 ">
                    {data?.getAllStudents.map((student) => {
                      return (
                        <tr
                          key={student.id}
                          onClick={() => <Model id={student.id} show={true} />}
                        >
                          <td className="py-4 px-6 text-sm font-medium whitespace-nowrap">
                            {student.studentName}
                          </td>
                          <td className="py-4 px-6 text-sm font-medium whitespace-nowrap">
                            {student.fatherName}
                          </td>
                          <td className="py-4 px-6 text-sm font-medium whitespace-nowrap">
                            {student.enrollmentNo}
                          </td>
                          <td className="py-4 px-6 text-sm font-medium whitespace-nowrap">
                            {student.course}
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
    </AdminDashboardLayout>
  )
}

List.auth = true
