import { useState } from 'react'
import { useBlogQuery } from '../hooks'
import PropTypes from 'prop-types'

const Blog = ({ blog, user }) => {
  const blogStyle = {
    marginBottom: 10,
    paddingLeft: 5,
    border: 'solid',
    borderWitdth: 1,
    borderColor: '#000'
  }
  const [showDetails, setShowDetails] = useState(false)
  const [createABlog, updateABlog, deleteABlog] = useBlogQuery()

  const handleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  const updateLikes = () => {
    const newLikes = blog.likes + 1
    updateABlog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: newLikes,
      id: blog.id
    })
  }

  const deleteBlog = async () => {
    if (!window.confirm(`Delete blog ${blog.title} by ${blog.author}`)) {
      return
    }
    deleteABlog(blog.id, blog.title, blog.author)
  }

  const deleteButton = () => (
    <>
      <span>
        <button className='blog-delete-button' onClick={deleteBlog}>
          Delete
        </button>
      </span>
    </>
  )

  return (
    <div className='blog-container' style={blogStyle}>
      <p>
        <b>{blog.title}</b> by {blog.author}
        <button
          className='view-hide-blog-details'
          type='button'
          onClick={handleShowDetails}>
          {showDetails ? 'Hide' : 'View'}
        </button>
      </p>
      {showDetails ? (
        <p>
          <b>URL:</b> {blog.url}
          <br />
          <b>Likes:</b> {blog.likes}
          <span>
            <button
              className='blog-like-button'
              type='button'
              onClick={updateLikes}>
              Like
            </button>
          </span>
          <br />
          <b>Added by:</b> {blog.user.name}
          <br />
          {user.username === blog.user.username ? deleteButton() : null}
        </p>
      ) : null}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog
