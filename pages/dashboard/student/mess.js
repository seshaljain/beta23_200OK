import DashboardLayout from '../../../components/layouts/dashboard'
import { Formik, Field, Form } from 'formik'
import { useState } from 'react'
import { useCreateMessNotEatingMutation } from '../../../graphql/generated'

function Mess() {
  const [createMessNotEating] = useCreateMessNotEatingMutation()
  const [prefUpdated, setPrefUpdated] = useState(false)
  return (
    <DashboardLayout title="Mess">
      <Formik
        initialValues={{ title: '' }}
        onSubmit={async (values) => {
          const { data } = await createMessNotEating()
          if (!!data) {
            setPrefUpdated(true)
          }
        }}
      >
        <Form>
          <label className="inline-block label" htmlFor="title">
            Will you be skipping the mess today?
          </label>
          <button
            type="submit"
            className="inline-block w-32 px-3 py-2 ml-4 text-center bg-red-200 rounded hover:shadow"
          >
            Yes
          </button>
        </Form>
      </Formik>
      <p className="text-sm uppercase">{prefUpdated && 'Updated!'}</p>
    </DashboardLayout>
  )
}

Mess.auth = true
export default Mess
