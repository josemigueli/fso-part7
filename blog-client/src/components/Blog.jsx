import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeABlog, deleteABlog } from '../reducers/blogReducer'
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
  const [liked, setLiked] = useState(undefined)
  const dispatch = useDispatch()

  const handleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  const likeMessage = (message) => {
    setLiked(message)
    setTimeout(() => {
      setLiked(undefined)
    }, 3000)
  }

  const updateLikes = async () => {
    const res = await dispatch(
      likeABlog(blog.title, blog.author, blog.url, blog.likes, blog.id)
    )
    if (res) {
      likeMessage('Liked!')
    } else {
      likeMessage('Something went wrong')
    }
  }

  const deleteBlog = async () => {
    if (!window.confirm(`Delete blog ${blog.title} by ${blog.author}`)) {
      return
    }
    dispatch(deleteABlog(blog.id, blog.title, blog.author))
  }

  const showLikedMessage = (message) => <span>{message}</span>

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
          {liked ? showLikedMessage(liked) : null}
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
