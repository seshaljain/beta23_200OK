import DashboardLayout from '../../../components/layouts/dashboard'
import { useUserQuery } from '../../../graphql/generated'

function Student() {
  const { data } = useUserQuery()
  console.log(data)
  return (
    <DashboardLayout>
      <div>{data?.me?.id}</div>
      <div>{data?.me?.username}</div>
    </DashboardLayout>
  )
}

Student.auth = true
export default Student
