import AdminDashboardLayout from '../../../components/layouts/adminDashboard'
import { useAllComplaintsQuery } from '../../../graphql/generated'

const ComplaintTable = ({ complaints }) => {
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
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left uppercase "
                    >
                      Complaint
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left uppercase "
                    >
                      Mady by
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left uppercase "
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left uppercase "
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                  {complaints &&
                    complaints.map((complaint) => {
                      return (
                        <tr key={complaint.id}>
                          <td className="py-4 px-6 text-sm font-medium whitespace-nowrap">
                            {complaint.complaint}
                          </td>
                          <td className="py-4 px-6 text-sm font-medium whitespace-nowrap">
                            {complaint.student.studentName}
                          </td>
                          <td className="py-4 px-6 text-sm font-medium whitespace-nowrap">
                            {complaint.date}
                          </td>
                          <td className="py-4 px-6 text-sm font-medium whitespace-nowrap">
                            {complaint.status ? 'Resolved' : 'Pending'}
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

const PendingComplaintTable = ({ complaints }) => {
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
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left uppercase "
                    >
                      Complaint
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left uppercase "
                    >
                      Mady by
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left uppercase "
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left uppercase "
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                  {complaints &&
                    complaints.map((complaint) => {
                      return (
                        <tr key={complaint.id}>
                          <td className="py-4 px-6 text-sm font-medium whitespace-nowrap">
                            {complaint.complaint}
                          </td>
                          <td className="py-4 px-6 text-sm font-medium whitespace-nowrap">
                            {complaint.student.studentName}
                          </td>
                          <td className="py-4 px-6 text-sm font-medium whitespace-nowrap">
                            {complaint.date}
                          </td>
                          <td className="py-4 px-6 text-sm font-medium whitespace-nowrap">
                            {complaint.status ? 'Resolved' : 'Pending'}
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

export default function Complaints() {
  const { data } = useAllComplaintsQuery()
  return (
    <AdminDashboardLayout title="Student List">
      <h2 className="mx-8 text-lg font-bold">Pending Complaints</h2>
      <ComplaintTable
        complaints={data?.complaintsAll.filter((c) => !c.status)}
      />
      <h2 className="mx-8 text-lg font-bold">Past complaints</h2>
      <PendingComplaintTable
        complaints={data?.complaintsAll.filter((c) => c.status)}
      />
    </AdminDashboardLayout>
  )
}

Complaints.auth = true
