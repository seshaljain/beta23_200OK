import { useEffect, useState } from 'react'
import moment from 'moment'
import { QRCodeCanvas } from 'qrcode.react'

const getTimestamp = () => {
  return `/gatepass?ts=${moment().unix()}`
}

export default function QRScanner() {
  const [datum, setDatum] = useState('')

  useEffect(() => {
    setDatum(getTimestamp())
    const timer = setInterval(() => {
      setDatum(getTimestamp())
    }, 10 * 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])
  return (
    <>
      {datum && (
        <main className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-3xl font-bold text-center">
            Scan the following QR Code
          </h1>
          <QRCodeCanvas value={datum} size={256} className="m-8" />
          <a href={datum}>{datum}</a>
        </main>
      )}
    </>
  )
}
