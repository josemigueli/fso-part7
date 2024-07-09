import { useState, useEffect } from 'react'
import { useUserValue } from '../UserContext'
import { useQuery } from '@tanstack/react-query'
import { getAllBlogs } from '../services/blogs'
import Blog from './Blog'

const BlogsList = () => {
  const [updateList, setUpdateList] = useState(true)
  const user = useUserValue()

  const query = useQuery({
    queryKey: ['blogs'],
    queryFn: getAllBlogs,
    retry: 1,
    refetchOnWindowFocus: false
  })
  if (query.isLoading) {
    return <div>Loading data...</div>
  }
  if (query.status === 'error') {
    return <div>Blog service not available due problems in server</div>
  }
  const blogs = query.data

  if (!user) {
    return null
  }

  return (
    <>
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          updater={() => setUpdateList(!updateList)}
        />
      ))}
    </>
  )
}

export default BlogsList
