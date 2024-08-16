import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { createNewBlog } from '../reducers/blogReducer'
import PropTypes from 'prop-types'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button'

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
      <div className='justify-content-center row'>
        <div className='p-4 p-lg-5 border border-light-subtle rounded col-lg-5'>
          <h2 className='text-center'>Create new blog</h2>
          <Form onSubmit={handleCreateBlog} className='text-start'>
            <Form.Group className='mb-3'>
              <Form.Label htmlFor='title'>Title</Form.Label>
              <Form.Control id='title' name='title' {...title} />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label htmlFor='author'>Author</Form.Label>
              <Form.Control id='author' name='author' {...author} />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label htmlFor='url'>Url</Form.Label>
              <Form.Control id='url' name='url' {...url} />
            </Form.Group>
            <Button
              id='save-blog-button'
              type='submit'
              variant='primary'
              className='w-100'>
              Create
            </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}

CreateNewBlog.propTypes = {
  updater: PropTypes.func.isRequired
}

export default CreateNewBlog
