import DashboardLayout from '../../../components/layouts/dashboard'
import { useQuery, gql } from '@apollo/client'
import { QRCodeCanvas } from 'qrcode.react'

const GET_USERNAME = gql`
  query profile {
    me {
      username
    }
  }
`

export default function GatePass() {
  const { data } = useQuery(GET_USERNAME)
  const generateQR = () => {
    alert(data?.me?.username)
  }

  return (
    <DashboardLayout title="GatePass">
      <QRCodeCanvas value={data?.me?.username} size={256} className="my-8" />
    </DashboardLayout>
  )
}

GatePass.auth = true
