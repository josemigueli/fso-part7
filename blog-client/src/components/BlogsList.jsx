/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'
import { useLogin } from '../hooks'
import Togglable from './Togglable'
import CreateNewBlog from './CreateNewBlog'
import Container from 'react-bootstrap/esm/Container'
import ListGroup from 'react-bootstrap/ListGroup'

const BlogsList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const [user, ...logging] = useLogin()
  const [hideBlogForm, setHideBlogForm] = useState(false)
  const navigate = useNavigate()

  const updateAndHide = () => {
    setHideBlogForm(!hideBlogForm)
  }

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  })

  if (!user) {
    return null
  }

  return (
    <Container className='my-5'>
      <Togglable buttonLabel='Create New Blog' hide={hideBlogForm}>
        <CreateNewBlog updater={updateAndHide} />
      </Togglable>

      <div className='blogs-main-container'>
        <h2>Blogs</h2>

        <ListGroup as='ul'>
          {blogs.map((blog) => (
            <ListGroup.Item as='li' key={blog.id} className='blog-container'>
              <Link to={`/blogs/${blog.id}`} className='text-decoration-none'>
                <b>{blog.title}</b>
              </Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </Container>
  )
}

export default BlogsList
