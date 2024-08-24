import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserValue } from '../UserContext'
import { useQuery } from '@tanstack/react-query'
import { getAllBlogs } from '../services/blogs'
import { Link } from 'react-router-dom'
import Togglable from './Togglable'
import CreateNewBlog from './CreateNewBlog'
import Container from 'react-bootstrap/esm/Container'
import ListGroup from 'react-bootstrap/ListGroup'

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

  if (query.isLoading) {
    return <div>Loading data...</div>
  }
  if (query.status === 'error') {
    return <div>Blog service not available due problems in server</div>
  }
  const blogs = query.data

  const handlerHide = () => {
    setHideBlogForm(!hideBlogForm)
  }

  if (!user) {
    return null
  }

  return (
    <Container className='my-5'>
      <Togglable buttonLabel='Create blog' hide={hideBlogForm}>
        <CreateNewBlog updater={handlerHide} />
      </Togglable>

      <div className='blogs-main-container'>
        <h2>Blogs</h2>
        {blogs.length < 1 ? <p>No blogs yet...</p> : null}
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
