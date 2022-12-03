import DashboardLayout from '../../../components/layouts/dashboard'
import { useMutation, gql } from '@apollo/client'
import { Formik, Field, Form } from 'formik'
import {
  useUpdateStudMutation,
  useProfileQuery,
} from '../../../graphql/generated'

const UPDATE_STUD = gql`
  mutation updateStud(
    $course: String
    $enrollmentNo: String
    $fatherName: String
    $studentName: String
  ) {
    updateStudent(
      course: $course
      enrollmentNo: $enrollmentNo
      fatherName: $fatherName
      studentName: $studentName
    ) {
      student {
        id
        enrollmentNo
        studentName
        fatherName
        course
      }
    }
  }
`

const GET_PROFILE = gql`
  query profile {
    me {
      student {
        id
        enrollmentNo
        studentName
        fatherName
        course
      }
    }
  }
`

export default function Profile() {
  const [updateStud] = useMutation(UPDATE_STUD, {
    refetchQueries: [{ query: GET_PROFILE }, 'GetProfile'],
  })
  const { data } = useProfileQuery()

  return (
    <DashboardLayout title="Update Profile Details">
      <div>
        <p>course: {data?.me?.student?.course}</p>
        <p>enrollmentNo: {data?.me?.student?.enrollmentNo}</p>
        <p>fatherName: {data?.me?.student?.fatherName}</p>
        <p>studentName: {data?.me?.student?.studentName}</p>
      </div>
      <Formik
        initialValues={{
          name: '',
          fatherName: '',
          enrNum: '',
          course: '',
          studentName: '',
        }}
        onSubmit={async (values) => {
          updateStud({
            variables: {
              course: values.course,
              enrollmentNo: values.enrollmentNo,
              fatherName: values.fatherName,
              studentName: values.studentName,
            },
          })
        }}
      >
        <Form>
          <label className="label" htmlFor="name">
            Student Name
          </label>
          <Field
            className="field"
            id="studentName"
            name="studentName"
            type="text"
            placeholder="Your name"
          />
          <label className="label" htmlFor="fatherName">
            Father's Name
          </label>
          <Field
            className="field"
            id="fatherName"
            name="fatherName"
            type="text"
            placeholder="Your father's name"
          />
          <label className="label" htmlFor="enrNum">
            Enrollment Number
          </label>
          <Field
            className="field"
            id="enrNum"
            name="enrNum"
            type="text"
            placeholder="191112000"
          />
          <label className="label" htmlFor="course">
            Course
          </label>
          <Field
            className="field"
            id="course"
            name="course"
            type="text"
            placeholder="Course"
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
    </DashboardLayout>
  )
}
