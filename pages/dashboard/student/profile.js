import DashboardLayout from '../../../components/layouts/dashboard'
import { Formik, Field, Form } from 'formik'
import { useUpdateStudMutation } from '../../../graphql/generated'

const styles = {
  label: 'block uppercase text-sm font-bold mt-4',
  field: 'p-2 mt-1 rounded border border-gray-200 border-2',
}

export default function Profile() {
  const [updateStudMutation] = useUpdateStudMutation()

  return (
    <DashboardLayout title="Update Profile Details">
      <Formik
        initialValues={{ schNum: '191112001', DoB: '2001-06-01' }}
        onSubmit={async (values) => {
          updateStudMutation({
            course: values.course,
            dob: values.DoB,
            enrollmentNo: values.enrollmentNo,
            fatherName: values.fatherName,
            gender: values.gender,
          })
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
