import Link from 'next/link'

export default function Home() {
  return (
    <>
      <h1 className="my-8 text-3xl font-bold text-center">Landing Page</h1>
      <Link href="/dashboard">Dashboard Page</Link>
    </>
  )
}
