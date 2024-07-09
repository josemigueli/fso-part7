import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotify } from '../NotificationContext'
import { useField } from '../hooks'
import { createBlog } from '../services/blogs'
import PropTypes from 'prop-types'

const CreateNewBlog = ({ updater }) => {
  const [title, resetTitle] = useField()
  const [author, resetAuthor] = useField()
  const [url, resetUrl] = useField()
  const notify = useNotify()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createBlog,
    onSuccess: (blog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(blog))
      updater()
      resetTitle()
      resetAuthor()
      resetUrl()
      notify(`Blog ${title.value} by ${author.value} added`)
    },
    onError: (err) => {
      const erroMessage = err.response.data.error
      notify(erroMessage, 'ERROR')
    }
  })

  const handleCreateBlog = async (e) => {
    e.preventDefault()
    mutation.mutate({
      title: title.value,
      author: author.value,
      url: url.value
    })
  }

  return (
    <div>
      <form onSubmit={handleCreateBlog}>
        <div>
          <label htmlFor='title'>Title</label>
          <input id='title' placeholder='Title' name='title' {...title} />
        </div>

        <div>
          <label htmlFor='author'>Author</label>
          <input id='author' placeholder='Author' name='author' {...author} />
        </div>

        <div>
          <label htmlFor='url'>Url</label>
          <input id='url' placeholder='URL' name='url' {...url} />
        </div>
        <button id='save-blog-button' type='submit'>
          Create
        </button>
      </form>
    </div>
  )
}

CreateNewBlog.propTypes = {
  updater: PropTypes.func.isRequired
}

export default CreateNewBlog
