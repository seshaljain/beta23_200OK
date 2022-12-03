import DashboardLayout from '../../../components/layouts/dashboard'
import { useMutation, gql } from '@apollo/client'
import { Formik, Field, Form } from 'formik'
import { useAllPostsQuery } from '../../../graphql/generated'

const CREATE_POST = gql`
  mutation createPost($title: String, $tags: String, $content: String) {
    createPost(title: $title, tags: $tags, content: $content) {
      post {
        id
      }
    }
  }
`

const GET_POSTS = gql`
  query allPosts {
    allPosts {
      id
      title
      tags
      content
    }
  }
`

export default function Posts() {
  const [updateStud] = useMutation(CREATE_POST, {
    refetchQueries: [{ query: GET_POSTS }, 'GetPosts'],
  })
  const { data } = useAllPostsQuery()
  console.log(data)

  return (
    <DashboardLayout title="Community Posts">
      <div className="flex flex-wrap">
        <div className="m-4">
          <h3 className="mt-4 font-bold uppercase">Add post</h3>
          <Formik
            initialValues={{
              title: '',
              tags: '',
              content: '',
            }}
            onSubmit={async (values) => {
              updateStud({
                variables: {
                  title: values.title,
                  tags: values.tags,
                  content: values.content,
                },
              })
            }}
          >
            <Form>
              <label className="label" htmlFor="title">
                Title
              </label>
              <Field
                className="field"
                id="title"
                name="title"
                type="text"
                placeholder="Awesome title"
              />
              <label className="label" htmlFor="tags">
                Tags
              </label>
              <Field
                className="field"
                id="tags"
                name="tags"
                type="text"
                placeholder="What this post is about"
              />
              <label className="label" htmlFor="content">
                Post
              </label>
              <Field
                className="field"
                as="textarea"
                id="content"
                name="content"
                placeholder="chillin' w/ my homies @9PM"
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
        <div>
          <div className="flex flex-wrap -mx-4">
            {data?.allPosts.map((post) => (
              <div key={post.id} className="p-4 m-4 bg-white rounded shadow">
                <h4 className="text-sm font-bold">{post?.title}</h4>
                <p>{post?.content}</p>
                <p className="-mx-1">
                  {post?.tags.split(',').map((tag) => (
                    <span
                      key={tag}
                      className="inline-block p-1 m-1 text-xs uppercase bg-gray-100 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
