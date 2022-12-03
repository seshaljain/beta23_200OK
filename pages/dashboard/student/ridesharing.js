import DashboardLayout from '../../../components/layouts/dashboard'
import { useMutation, gql } from '@apollo/client'
import { Formik, Field, Form } from 'formik'
import dayjs from 'dayjs'
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

export default function Posts() {
  const { data } = useAllRidesQuery()

  const [createRide] = useMutation(CREATE_RIDE, {
    refetchQueries: [{ query: GET_RIDES }, 'GetRides'],
  })

  return (
    <DashboardLayout title="RideSharing">
      <p>Going out? Grab a ride with a peer!</p>
      <h3 className="text-xl font-bold">Outgoing Rides</h3>
      <div className="flex flex-wrap -mx-4">
        {data?.allRides.map((ride) => (
          <div key={ride.id} className="p-4 m-4 bg-white rounded shadow">
            <p>{ride?.student?.studentName}</p>
            <p>{ride?.student?.enrollmentNo}</p>
            <p>{ride.hasVehicle ? 'Driver' : 'Rider'}</p>
            <p>{ride.vehicleType}</p>
            <p>Start: {dayjs(ride.starttime).format('YYYY-MM-DD HH:mm')}</p>
            <p>End: {dayjs(ride.endtime).format('YYYY-MM-DD HH:mm')}</p>
          </div>
        ))}
      </div>
      <h3 className="text-xl font-bold">Submit Ride</h3>
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
    </DashboardLayout>
  )
}
