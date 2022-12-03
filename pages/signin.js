import Head from 'next/head'
import { signIn } from 'next-auth/react'
import { useRegisterMutation } from '../graphql/generated'

export default function SignUp() {
  const [registerMutation] = useRegisterMutation()

  return (
    <>
      <Head>
        <title>Login | HMS</title>
      </Head>
      <main className="flex items-center justify-center h-screen bg-gradient-to-tr from-cyan-300 to-blue-300">
        <div>
          <h1 className="my-8 text-4xl font-bold text-center text-white">
            Login
          </h1>
          <button
            type="submit"
            className="w-32 px-3 py-2 text-center bg-gray-200 rounded hover:shadow"
            onClick={() => signIn()}
          >
            SignIn
          </button>
        </div>
      </main>
    </>
  )
}
