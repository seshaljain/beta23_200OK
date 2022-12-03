import AdminDashboardLayout from '../../../components/layouts/adminDashboard'
import { Formik, Field, Form } from 'formik'

export default function Notif() {
  return (
    <AdminDashboardLayout title="Send Notification">
      <Formik
        initialValues={{ notif: '' }}
        onSubmit={async (values) => {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_TELEGRAM_ENDPOINT}?data=${values.notif}`
          )
        }}
      >
        <Form>
          <label className="label" htmlFor="title">
            Notificatiton
          </label>
          <Field
            className="field"
            id="notif"
            name="notif"
            type="text"
            required
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
    </AdminDashboardLayout>
  )
}

Notif.auth = true
