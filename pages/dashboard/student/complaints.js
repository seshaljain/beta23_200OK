import DashboardLayout from '../../../components/layouts/dashboard'
import { Formik, Field, Form } from 'formik'
import { useUserComplaintsQuery } from '../../../graphql/generated'
import { useMutation, gql } from '@apollo/client'
import { useState } from 'react'

const GET_COMPLAINTS = gql`
  query userComplaints {
    userComplaintsAll {
      complaint
      status
      date
    }
  }
`

const CREATE_COMPLAINT = gql`
  mutation createComplaint($complaint: String!) {
    createComplaint(complaint: $complaint) {
      complaint {
        id
        status
        complaint
      }
    }
  }
`
const ComplaintTable = ({ complaints }) => {
  return (
    <div className="max-w-full my-4">
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

const committeeData = [
  {
    id: 1,
    name: 'Lucais Wrennall',
    committee: 'Hygiene',
    phoneNum: '+917338122121',
  },
  {
    id: 2,
    name: "Saba O'Connel",
    committee: 'Mess',
    phoneNum: '+917364421090',
  },
  {
    id: 3,
    name: 'Dasie Cranney',
    committee: 'Disciplinary',
    phoneNum: '+917315501302',
  },
  {
    id: 4,
    name: 'Dunstan McCraine',
    committee: 'Hygiene',
    phoneNum: '+917385203808',
  },
  {
    id: 5,
    name: 'Evaleen Cool',
    committee: 'Mess',
    phoneNum: '+917329852817',
  },
  {
    id: 6,
    name: 'Ambrosius Volante',
    committee: 'Disciplinary',
    phoneNum: '+917316758627',
  },
  {
    id: 7,
    name: 'Parsifal Matschke',
    committee: 'Hygiene',
    phoneNum: '+917372675260',
  },
  {
    id: 8,
    name: 'Maximilien Comizzoli',
    committee: 'Mess',
    phoneNum: '+917352079280',
  },
  {
    id: 9,
    name: 'Brietta Aldie',
    committee: 'Disciplinary',
    phoneNum: '+917398947962',
  },
  {
    id: 10,
    name: 'Stoddard Franken',
    committee: 'Hygiene',
    phoneNum: '+917365127676',
  },
  {
    id: 11,
    name: 'Tan Sepey',
    committee: 'Mess',
    phoneNum: '+917393513163',
  },
  {
    id: 12,
    name: 'Ralph Garrat',
    committee: 'Disciplinary',
    phoneNum: '+917331410192',
  },
]

export default function Complaints() {
  const [showModal, setShowModal] = useState(false)
  const [createComplaint] = useMutation(CREATE_COMPLAINT, {
    refetchQueries: [{ query: GET_COMPLAINTS }, 'Get user complaints'],
  })
  const { data } = useUserComplaintsQuery()

  return (
    <DashboardLayout title="My Complaints">
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative w-auto max-w-6xl mx-auto my-6">
              <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200">
                  <h3 className="text-3xl font-semibold">New Complaint</h3>
                </div>
                <div className="p-6">
                  <Formik
                    initialValues={{ title: '' }}
                    onSubmit={async (values) => {
                      createComplaint({
                        variables: {
                          complaint: values.title,
                        },
                      })
                      setShowModal(false)
                    }}
                  >
                    <Form>
                      <label className="label" htmlFor="title">
                        Title
                      </label>
                      <Field
                        className="field"
                        id="title"
                        name="title"
                        type="text"
                      />
                      <div className="mt-8">
                        <button
                          type="submit"
                          className="w-32 px-3 py-2 text-center bg-gray-200 rounded hover:shadow"
                        >
                          Submit
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
                    onClick={() => setShowModal(false)}
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

      <ComplaintTable complaints={data?.userComplaintsAll} />

      <button
        className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-teal-500 rounded shadow outline-none active:bg-teal-600 hover:shadow-lg focus:outline-none"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Submit new complaint
      </button>

      <h2 className="mt-8 text-2xl font-bold">
        Emergency Committee Member Details
      </h2>
      <div className="flex flex-wrap -mx-4">
        {committeeData.map((c) => (
          <div key={c.id} className="p-4 m-4 bg-white rounded shadow">
            <p className="font-bold">{c.name}</p>
            <p>{c.committee} Committee</p>
            <p>{c.phoneNum}</p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  )
}

Complaints.auth = true
