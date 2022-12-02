import DashboardLayout from '../../../components/layouts/dashboard'
import { Formik, Field, Form } from 'formik'

const styles = {
  label: 'block uppercase text-sm font-bold mt-4',
  field: 'p-2 mt-1 rounded border border-gray-200 border-2',
}

const dummyData = [
  {
    id: 1,
    title: 'In hac habitasse platea dictumst.',
    subDate: '2022-08-05T19:46:51Z',
    status: 'scheduled',
  },
  {
    id: 2,
    title: 'Aenean lectus.',
    subDate: '2022-03-10T13:30:40Z',
    status: 'done',
  },
  {
    id: 3,
    title: 'Donec ut dolor.',
    subDate: '2022-11-06T05:07:12Z',
    status: 'review',
  },
  {
    id: 4,
    title: 'Suspendisse accumsan tortor quis turpis.',
    subDate: '2022-05-02T05:17:53Z',
    status: 'scheduled',
  },
  {
    id: 5,
    title: 'In eleifend quam a odio.',
    subDate: '2022-01-19T05:08:37Z',
    status: 'done',
  },
]

export default function Complaints() {
  return (
    <DashboardLayout title="Complaints">
    <p>//TODO: Emergency Contact Cards</p>
      <h2>Submit new complaint</h2>
      <Formik
        initialValues={{ name: '', email: '' }}
        onSubmit={async (values) => {
          await new Promise((resolve) => setTimeout(resolve, 500))
          alert(JSON.stringify(values, null, 2))
        }}
      >
        <Form>
          <label className={styles.label} htmlFor="title">
            Title
          </label>
          <Field className={styles.field} id="title" name="title" type="text" />
          <label className={styles.label} htmlFor="subDate">
            Submission Date
          </label>
          <Field
            className={styles.field}
            id="subDate"
            name="subDate"
            type="date"
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
          {dummyData.map((c) => {
            return (
              <tr className="py-4" key={c.id}>
                <td>{c.title}</td>
                <td>{c.status}</td>
                <td>{c.subDate}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </DashboardLayout>
  )
}
