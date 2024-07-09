import { useState } from 'react'
import { useNotify } from '../NotificationContext'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, updater }) => {
  const blogStyle = {
    marginBottom: 10,
    paddingLeft: 5,
    border: 'solid',
    borderWitdth: 1,
    borderColor: '#000'
  }
  const [showDetails, setShowDetails] = useState(false)
  const [liked, setLiked] = useState(undefined)
  const [blogData, setBlogData] = useState({
    id: blog.id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  })
  const { title, author, url, likes, id } = blogData
  const notify = useNotify()

  const handleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  const setLikedMessage = (message) => {
    setLiked(message)
    setTimeout(() => {
      setLiked(undefined)
    }, 3000)
  }

  const updateLikes = async () => {
    try {
      const newLikes = likes + 1
      const response = await blogService.update({
        title,
        author,
        url,
        likes: newLikes,
        id
      })
      if (response) {
        setBlogData({ ...blogData, likes: likes + 1 })
        setLikedMessage('Liked!')
      }
    } catch (exception) {
      setLikedMessage('Something went wrong')
    }
  }

  const showLikedMessage = (message) => <span>{message}</span>

  const deleteBlog = async () => {
    if (!window.confirm(`Delete blog ${title} by ${author}`)) {
      return
    }
    try {
      const response = await blogService.deleteOne(id)
      if (response.status === 204) {
        updater()
        notify(`Blog ${title} by ${author} deleted`)
      }
    } catch {
      notify('Something went wrong', 'ERROR')
    }
  }

  return (
    <div className='blog-container' style={blogStyle}>
      <p>
        <b>{title}</b> by {author}
        <button
          className='view-hide-blog-details'
          type='button'
          onClick={handleShowDetails}>
          {showDetails ? 'Hide' : 'View'}
        </button>
      </p>
      {showDetails ? (
        <p>
          <b>URL:</b> {url}
          <br />
          <b>Likes:</b> {likes}
          <span>
            <button
              className='blog-like-button'
              type='button'
              onClick={updateLikes}>
              Like
            </button>
          </span>
          {liked === undefined ? null : showLikedMessage(liked)}
          <br />
          <b>Added by:</b> {blog.user.name}
          <br />
          {user.username === blog.user.username ? (
            <span>
              <button className='blog-delete-button' onClick={deleteBlog}>
                Delete
              </button>
            </span>
          ) : null}
        </p>
      ) : null}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  updater: PropTypes.func.isRequired
}

export default Blog
