import DashboardLayout from '../../../components/layouts/dashboard'
import { useMutation, gql } from '@apollo/client'
import { Formik, Field, Form } from 'formik'
import dayjs from 'dayjs'
import { useState } from 'react'
import {
  useCreateRideMutation,
  useAllRidesQuery,
} from '../../../graphql/generated'

const CREATE_RIDE = gql`
  mutation createRide(
    $hasVehicle: Boolean
    $startTime: DateTime
    $endTime: DateTime
    $vehicleType: String
  ) {
    createRide(
      hasVehicle: $hasVehicle
      startTime: $startTime
      endTime: $endTime
      vehicleType: $vehicleType
    ) {
      ride {
        id
      }
    }
  }
`

const GET_RIDES = gql`
  query allRides {
    allRides {
      id
      student {
        studentName
        enrollmentNo
      }
      hasVehicle
      vehicleType
      endTime
      startTime
    }
  }
`

export default function RideSharing() {
  const [showModal, setShowModal] = useState(false)
  const { data } = useAllRidesQuery()

  const [createRide] = useMutation(CREATE_RIDE, {
    refetchQueries: [{ query: GET_RIDES }, 'GetRides'],
  })

  return (
    <DashboardLayout title="RideSharing">
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative w-auto max-w-6xl mx-auto my-6">
              <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200">
                  <h3 className="text-3xl font-semibold">Add Ride</h3>
                </div>
                <div className="p-6">
                  <Formik
                    initialValues={{
                      hasVehicle: false,
                      startTime: '',
                      endTime: '',
                      vehicleType: '',
                    }}
                    onSubmit={async (values) => {
                      createRide({
                        variables: {
                          hasVehicle: values.hasVehicle,
                          startTime: values.startTime,
                          vehicleType: values.vehicleType,
                          endTime: values.endTime,
                        },
                      })
                      setShowModal(false)
                    }}
                  >
                    <Form>
                      <label className="label" htmlFor="startTime">
                        Start time
                      </label>
                      <Field
                        className="field"
                        id="startTime"
                        name="startTime"
                        type="datetime-local"
                      />
                      <label className="label" htmlFor="endTime">
                        End time
                      </label>
                      <Field
                        className="field"
                        id="endTime"
                        name="endTime"
                        type="datetime-local"
                      />
                      <label className="label" htmlFor="hasVehicle">
                        Vehicle Type
                      </label>
                      <Field
                        className="field"
                        id="vehicleType"
                        name="vehicleType"
                        type="text"
                      />
                      <label className="label" htmlFor="hasVehicle">
                        Have your own vehicle?
                      </label>
                      <Field
                        className="field"
                        id="hasVehicle"
                        name="hasVehicle"
                        type="checkbox"
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
      <p>Going out? Grab a ride with a peer!</p>
      <button
        className="px-6 py-3 my-4 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-teal-500 rounded shadow outline-none active:bg-teal-600 hover:shadow-lg focus:outline-none"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Add ride?
      </button>
      <div className="flex flex-wrap -mx-4">
        {data?.allRides.map((ride) => (
          <div key={ride.id} className="p-4 m-4 bg-white rounded shadow">
            <p className="font-bold">{ride?.student?.studentName}</p>
            <p>{ride?.student?.enrollmentNo}</p>
            <p>
              {ride.vehicleType}, {ride.hasVehicle ? 'Driver' : 'Rider'}
            </p>
            <p>Start: {dayjs(ride.starttime).format('YYYY-MM-DD HH:mm')}</p>
            <p>End: {dayjs(ride.endtime).format('YYYY-MM-DD HH:mm')}</p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  )
}

RideSharing.auth = true
