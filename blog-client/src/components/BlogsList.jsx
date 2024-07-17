/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'
import { useLogin } from '../hooks'
import Togglable from './Togglable'
import CreateNewBlog from './CreateNewBlog'

const BlogsList = () => {
  const blogStyle = {
    marginBottom: 10,
    paddingLeft: 5,
    border: 'solid',
    borderWitdth: 1,
    borderColor: '#000'
  }
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
    <>
      <Togglable buttonLabel='Create blog' hide={hideBlogForm}>
        <CreateNewBlog updater={updateAndHide} />
      </Togglable>

      <h2>Blogs</h2>

      {blogs.map((blog) => (
        <div className='blog-container' style={blogStyle} key={blog.id}>
          <p>
            <Link to={`/blogs/${blog.id}`}>
              <b>{blog.title}</b>
            </Link>
          </p>
        </div>
      ))}
    </>
  )
}

export default BlogsList
