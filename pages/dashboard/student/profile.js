import { useState } from 'react'
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
  const [showModal, setShowModal] = useState(false)
  const [updateStud] = useMutation(UPDATE_STUD, {
    refetchQueries: [{ query: GET_PROFILE }, 'GetProfile'],
  })
  const { data } = useProfileQuery()

  return (
    <DashboardLayout title="Profile Details">
      <div className="my-6 font-xl">
        <p>Name: {data?.me?.student?.studentName}</p>
        <p>Father's Name: {data?.me?.student?.fatherName}</p>
        <p>Course: {data?.me?.student?.course}</p>
        <p>Enrollment Number: {data?.me?.student?.enrollmentNo}</p>
      </div>
      <button
        className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-teal-500 rounded shadow outline-none active:bg-teal-600 hover:shadow-lg focus:outline-none"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Update profile?
      </button>

      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative w-auto max-w-6xl mx-auto my-6">
              <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200">
                  <h3 className="text-3xl font-semibold">Update Profile</h3>
                </div>
                <div className="p-6">
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
                      setShowModal(false)
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
    </DashboardLayout>
  )
}

Profile.auth = true
