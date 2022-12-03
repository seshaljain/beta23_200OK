import DashboardLayout from '../../../components/layouts/dashboard'
import { Formik, Field, Form } from 'formik'
import { useUserComplaintsQuery } from '../../../graphql/generated'
import { useMutation, gql } from '@apollo/client'

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
  const [createComplaint] = useMutation(CREATE_COMPLAINT, {
    refetchQueries: [{ query: GET_COMPLAINTS }, 'Get user complaints'],
  })
  const { data } = useUserComplaintsQuery()

  return (
    <DashboardLayout title="Complaints">
      <h2 className="mt-8 text-2xl font-bold">Submit new complaint</h2>
      <Formik
        initialValues={{ title: '' }}
        onSubmit={async (values) => {
          createComplaint({
            variables: {
              complaint: values.title,
            },
          })
        }}
      >
        <Form>
          <label className="label" htmlFor="title">
            Title
          </label>
          <Field className="field" id="title" name="title" type="text" />
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

      <h2>Past complaints</h2>
      <div className="bg-gray-200 rounded-t"></div>
      <hr />
      <table className="w-full">
        <thead>
          <tr className="py-4">
            <th>Title</th>
            <th>Submission Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data?.userComplaintsAll.map((c) => {
            return (
              <tr className="py-4" key={c.id}>
                <td>{c.complaint}</td>
                <td>{c.subDate}</td>
                <td>{c.status}</td>
              </tr>
            )
          })}
        </tbody>
      </table>

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
