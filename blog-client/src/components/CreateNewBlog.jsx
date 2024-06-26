import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { createNewBlog } from '../reducers/blogReducer'
import PropTypes from 'prop-types'

const CreateNewBlog = ({ updater }) => {
  const [title, resetTitle] = useField()
  const [author, resetAuthor] = useField()
  const [url, resetUrl] = useField()
  const dispatch = useDispatch()

  const handleCreateBlog = async (e) => {
    e.preventDefault()

    const res = await dispatch(
      createNewBlog(title.value, author.value, url.value)
    )

    if (res) {
      updater()
      resetTitle()
      resetAuthor()
      resetUrl()
    }
  }

  return (
    <div>
      <h2>Create new blog</h2>
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
