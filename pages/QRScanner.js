import { useEffect, useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'

export default function QRScanner() {
  const [datum, setDatum] = useState('')
  useEffect(() => {
    const timer = setInterval(() => {
      setDatum(new Date())
    }, 10*1000)
    return () => {
      clearInterval(timer)
    }
  }, [])
  return (
    <>
      <QRCodeCanvas value={datum} size={256} />
    </>
  )
}
