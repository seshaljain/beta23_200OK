import DashboardLayout from '../../../components/layouts/dashboard'
import { useUserQuery } from '../../../graphql/generated'

function Student() {
  const { data } = useUserQuery()
  return <DashboardLayout>User Stats</DashboardLayout>
}

Student.auth = true
export default Student
