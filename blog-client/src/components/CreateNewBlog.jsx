import { useField } from '../hooks'
import { useBlogQuery } from '../hooks'
import PropTypes from 'prop-types'

const CreateNewBlog = ({ updater }) => {
  const [title, resetTitle] = useField()
  const [author, resetAuthor] = useField()
  const [url, resetUrl] = useField()

  const [createABlog, updateABlog, deleteABlog] = useBlogQuery()

  const handleCreateBlog = async (e) => {
    e.preventDefault()

    const res = await createABlog({
      title: title.value,
      author: author.value,
      url: url.value
    })

    if (res) {
      updater()
      resetTitle()
      resetAuthor()
      resetUrl()
    }
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
