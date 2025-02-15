/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'
import { useLogin } from '../hooks'
import Togglable from './Togglable'
import CreateNewBlog from './CreateNewBlog'

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

  useEffect(() => {
    document.title = 'Blog List - Home'
  }, [])

  if (!user) {
    return null
  }

  return (
    <div className='max-w-7xl px-5'>
      <Togglable buttonLabel='New Blog' hide={hideBlogForm}>
        <CreateNewBlog updater={updateAndHide} />
      </Togglable>

      <div className='mb-12'>
        <h2 className='text-2xl font-bold mb-5'>Blogs</h2>
        {blogs.length < 1 ? <p>No blogs yet...</p> : null}
        <ul className='blogs-list'>
          {blogs.map((blog) => (
            <li
              key={blog.id}
              className='blog-container border border-zinc-700 rounded-lg my-5'>
              <Link
                to={`/blogs/${blog.id}`}
                className='text-decoration-none hover:text-blue-500'>
                <div className='py-4 px-6'>
                  <p className='text-xl font-bold'>{blog.title}</p>
                  <p className='text-zinc-400 text-sm'>by {blog.author}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default BlogsList
