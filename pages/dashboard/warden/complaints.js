import AdminDashboardLayout from '../../../components/layouts/adminDashboard'
import { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import { Formik, Field, Form } from 'formik'
import { useAllComplaintsQuery } from '../../../graphql/generated'

const UPDATE_COMPLAINT = gql`
  mutation updateComplaint($id: Int!, $status: String!) {
    updateComplaint(id: $id, status: $status) {
      complaint {
        id
      }
    }
  }
`

const GET_COMPLAINTS = gql`
  query allComplaints {
    complaintsAll {
      id
      student {
        id
        studentName
        enrollmentNo
      }
      complaint
      date
      status
    }
  }
`

const Modal = ({ modal, setModal }) => {
  const [updateComplaint] = useMutation(UPDATE_COMPLAINT, {
    refetchQueries: [{ query: GET_COMPLAINTS }],
  })
  return (
    <>
      {modal.show ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative w-64 max-w-6xl mx-auto my-6">
              <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200">
                  <h3 className="text-xl font-semibold">
                    Update Complaint Status
                  </h3>
                </div>
                <div className="p-4">
                  <Formik
                    initialValues={{ title: '' }}
                    onSubmit={async (values) => {
                      updateComplaint({
                        variables: {
                          id: modal.complaint.id,
                          status: true,
                        },
                      })
                      setModal({ show: false, complaint: null })
                    }}
                  >
                    <Form>
                      <p className="label" htmlFor="title">
                        Complaint
                      </p>
                      <p>{modal.complaint.complaint}</p>
                      <p className="label" htmlFor="title">
                        Made by
                      </p>
                      <p>{modal.complaint.student.studentName}</p>
                      <p className="label" htmlFor="title">
                        Date
                      </p>
                      <p>{modal.complaint.date}</p>
                      <p className="label" htmlFor="title">
                        Status
                      </p>
                      <p>{modal.complaint.status ? 'Resolved' : 'Pending'}</p>
                      <div className="mt-8">
                        <button
                          type="submit"
                          className="px-3 py-2 text-center bg-gray-200 rounded hover:shadow"
                        >
                          Set to{' '}
                          {modal.complaint.status ? 'Pending' : 'Resolved'}?
                        </button>
                      </div>
                    </Form>
                  </Formik>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-slate-200">
                  <button
                    className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                    type="button"
                    onClick={() => setModal({ show: false, complaint: null })}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </>
  )
}

const ComplaintTable = ({ complaints, setModal }) => {
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
                      Complaint
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase "
                    >
                      Mady by
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase "
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase "
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
                          <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                            {complaint.complaint}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                            {complaint.student.studentName}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                            {complaint.date}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                            <button
                              className="px-2 py-1 mx-4 text-xs uppercase bg-gray-100 rounded"
                              onClick={() =>
                                setModal({ show: true, complaint })
                              }
                            >
                              {complaint.status ? 'Resolved' : 'Pending'}
                            </button>
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
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase "
                    >
                      Complaint
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase "
                    >
                      Mady by
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase "
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase "
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
                          <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                            {complaint.complaint}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                            {complaint.student.studentName}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                            {complaint.date}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
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
  const [modal, setModal] = useState({ show: false, complaint: null })
  const { data } = useAllComplaintsQuery()
  return (
    <AdminDashboardLayout title="Student List">
      <h2 className="mx-8 text-lg font-bold">Pending Complaints</h2>
      <ComplaintTable
        complaints={data?.complaintsAll.filter((c) => !c.status)}
        setModal={setModal}
      />
      <h2 className="mx-8 text-lg font-bold">Past complaints</h2>
      <PendingComplaintTable
        complaints={data?.complaintsAll.filter((c) => c.status)}
      />
      <Modal modal={modal} setModal={setModal} />
    </AdminDashboardLayout>
  )
}

Complaints.auth = true
