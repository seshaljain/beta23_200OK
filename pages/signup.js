import { Formik, Field, Form } from 'formik'
import Head from 'next/head'
import { signIn } from 'next-auth/react'
import { useRegisterMutation } from '../graphql/generated'

export default function SignUp() {
  const [registerMutation] = useRegisterMutation()

  return (
    <>
      <Head>
        <title>Registration | HMS</title>
      </Head>
      <main className="flex items-center justify-center h-screen bg-gradient-to-tr from-cyan-300 to-blue-300">
        <div>
          <h1 className="my-8 text-4xl font-bold text-center text-white">
            SignUp
          </h1>
          <Formik
            initialValues={{ email: '', username: '', password: '' }}
            onSubmit={async (values) => {
              registerMutation({
                variables: {
                  email: values.email,
                  username: values.username,
                  password: values.password,
                },
              }).then((data) => {
                signIn('Credentials', { callbackUrl: '/dashboard' })
              })
            }}
          >
            <Form className="px-12 py-8 mx-auto rounded bg-gray-100/50">
              <label className="label" htmlFor="email">
                Email
              </label>
              <Field
                className="field"
                id="email"
                name="email"
                placeholder="Email"
                type="email"
                required
              />
              <label className="label" htmlFor="username">
                Username
              </label>
              <Field
                className="field"
                id="username"
                name="username"
                placeholder="Username"
                type="text"
                required
              />
              <label className="label" htmlFor="DoB">
                Password
              </label>
              <Field
                className="field"
                id="password"
                name="password"
                placeholder="Password"
                type="password"
                required
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
        </div>
      </main>
    </>
  )
}
