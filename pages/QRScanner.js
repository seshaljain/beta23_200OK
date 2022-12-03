import { useEffect, useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'

const getTimestamp = () => {
  const dd = Date.now()
  return `http://10.64.158.113:3000/gatepass/${dd}`
}

export default function QRScanner() {
  const [datum, setDatum] = useState(getTimestamp())
  useEffect(() => {
    const timer = setInterval(() => {
      setDatum(getTimestamp())
    }, 10 * 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])
  return (
    <>
      <QRCodeCanvas value={datum} size={256} className="m-8" />
      <a href={datum}>{datum}</a>
    </>
  )
}
