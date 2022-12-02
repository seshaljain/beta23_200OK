import DashboardLayout from '../../../components/layouts/dashboard'
import { Formik, Field, Form } from 'formik'

const styles = {
  label: 'block uppercase text-sm font-bold mt-4',
  field: 'p-2 mt-1 rounded border border-gray-200 border-2',
}

export default function Profile() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-medium uppercase">Update Profile Details</h1>
      <Formik
        initialValues={{ name: '', email: '' }}
        onSubmit={async (values) => {
          await new Promise((resolve) => setTimeout(resolve, 500))
          alert(JSON.stringify(values, null, 2))
        }}
      >
        <Form>
          <label className={styles.label} htmlFor="schNum">
            Scholar Number
          </label>
          <Field
            className={styles.field}
            id="schNum"
            name="schNum"
            type="number"
          />
          <label className={styles.label} htmlFor="DoB">
            Date of Birth
          </label>
          <Field className={styles.field} id="DoB" name="DoB" type="date" />
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
    </DashboardLayout>
  )
}
