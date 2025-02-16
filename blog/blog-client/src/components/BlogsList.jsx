import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserValue } from '../UserContext'
import { useQuery } from '@tanstack/react-query'
import { getAllBlogs } from '../services/blogs'
import { Link } from 'react-router-dom'
import Togglable from './Togglable'
import CreateNewBlog from './CreateNewBlog'

const BlogsList = () => {
  const [hideBlogForm, setHideBlogForm] = useState(false)
  const user = useUserValue()
  const navigate = useNavigate()

  const query = useQuery({
    queryKey: ['blogs'],
    queryFn: getAllBlogs,
    enabled: !!user,
    retry: 1,
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  })

  useEffect(() => {
    document.title = 'Blog List - Home'
  }, [])

  if (query.isLoading) {
    return <div>Loading data...</div>
  }
  if (query.status === 'error') {
    return <div>Blog service not available due problems in server</div>
  }
  const blogs = query.data?.sort((a, b) => b.likes - a.likes)

  const handlerHide = () => {
    setHideBlogForm(!hideBlogForm)
  }

  if (!user) {
    return null
  }

  return (
    <div className='max-w-7xl px-5'>
      <Togglable buttonLabel='Create blog' hide={hideBlogForm}>
        <CreateNewBlog updater={handlerHide} />
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
