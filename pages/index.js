import Link from 'next/link'

export default function Home() {
  return (
    <>
      <h1 className="text-3xl text-center my-8 font-bold">Landing Page</h1>
      <Link href="/dashboard">Dashboard Page</Link>
    </>
  )
}
