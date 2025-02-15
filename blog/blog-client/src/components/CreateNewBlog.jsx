import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { createNewBlog } from '../reducers/blogReducer'
import PropTypes from 'prop-types'
import { CiCirclePlus } from 'react-icons/ci'

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
    <div className='flex justify-center'>
      <div className='border border-zinc-700 rounded-lg p-8 md:w-xl'>
        <h2 className='text-center text-2xl font-bold mb-5'>Create new blog</h2>
        <form onSubmit={handleCreateBlog}>
          <div className='flex flex-col text-left mb-5'>
            <label className='font-bold mb-2' htmlFor='title'>
              Title
            </label>
            <input
              className='bg-gray-900 border border-zinc-500 rounded-lg py-2 px-4 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              id='title'
              name='title'
              {...title}
            />
          </div>
          <div className='flex flex-col text-left mb-5'>
            <label className='font-bold mb-2' htmlFor='author'>
              Author
            </label>
            <input
              className='bg-gray-900 border border-zinc-500 rounded-lg py-2 px-4 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              id='author'
              name='author'
              {...author}
            />
          </div>
          <div className='flex flex-col text-left mb-5'>
            <label className='font-bold mb-2' htmlFor='url'>
              URL
            </label>
            <input
              className='bg-gray-900 border border-zinc-500 rounded-lg py-2 px-4 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              id='url'
              name='url'
              {...url}
            />
          </div>
          <button
            id='save-blog-button'
            className='w-full bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 flex justify-center items-center gap-2 font-bold'
            type='submit'>
            <CiCirclePlus className='h-5 w-5' />
            Create
          </button>
        </form>
      </div>
    </div>
  )
}

CreateNewBlog.propTypes = {
  updater: PropTypes.func.isRequired
}

export default CreateNewBlog
