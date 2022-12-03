import AdminDashboardLayout from '../../../components/layouts/adminDashboard'
import { useListStudentsQuery } from '../../../graphql/generated'

export default function List() {
  const { data } = useListStudentsQuery()
  return (
    <AdminDashboardLayout title="Student List">
      <div class="max-w-full m-8">
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
                        Name
                      </th>
                      <th
                        scope="col"
                        class="py-3 px-6 text-xs font-medium tracking-wider text-left uppercase "
                      >
                        Father's Name
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
                        Course
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200 ">
                    {data?.getAllStudents.map((student) => {
                      return (
                        <tr key={student.id}>
                          <td class="py-4 px-6 text-sm font-medium whitespace-nowrap">
                            {student.studentName}
                          </td>
                          <td class="py-4 px-6 text-sm font-medium whitespace-nowrap">
                            {student.fatherName}
                          </td>
                          <td class="py-4 px-6 text-sm font-medium whitespace-nowrap">
                            {student.enrollmentNo}
                          </td>
                          <td class="py-4 px-6 text-sm font-medium whitespace-nowrap">
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
