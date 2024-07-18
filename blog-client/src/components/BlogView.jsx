import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { likeABlog, deleteABlog, commentABlog } from '../reducers/blogReducer'
import { useLogin } from '../hooks'
import { useField } from '../hooks'

const BlogView = () => {
  const dispatch = useDispatch()
  const [liked, setLiked] = useState(undefined)
  const navigate = useNavigate()
  const [user, ...logging] = useLogin()
  const [comment, resetComment] = useField()
  const blogs = useSelector((state) => state.blogs)
  const { id } = useParams()
  const blogData = blogs.filter((b) => {
    return b.id === id
  })

  const likeMessage = (message) => {
    setLiked(message)
    setTimeout(() => {
      setLiked(undefined)
    }, 3000)
  }

  const updateLikes = async () => {
    const res = await dispatch(
      likeABlog(
        blogData[0].title,
        blogData[0].author,
        blogData[0].url,
        blogData[0].likes,
        blogData[0].id
      )
    )
    if (res) {
      likeMessage('Liked!')
    } else {
      likeMessage('Something went wrong')
    }
  }

  const showLikedMessage = (message) => <span>{message}</span>

  const deleteBlog = async () => {
    if (
      !window.confirm(
        `Delete blog ${blogData[0].title} by ${blogData[0].author}`
      )
    ) {
      return
    }
    const res = await dispatch(
      deleteABlog(blogData[0].id, blogData[0].title, blogData[0].author)
    )
    if (res) {
      navigate('/')
    }
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

  const commentBlog = async () => {
    const res = await dispatch(commentABlog(comment.value, blogData[0].id))
    if (res) {
      resetComment()
    }
  }

  const showComments = () => (
    <>
      {blogData[0].comments.length > 0 ? (
        <ul>
          {blogData[0].comments.map((comment) => (
            <li key={comment.id}>{comment.content}</li>
          ))}
        </ul>
      ) : (
        <p>No comments yet</p>
      )}
    </>
  )

  useEffect(() => {
    if (!user || blogData.length < 1) {
      navigate('/')
    }
  })

  if (!user || blogData.length < 1) {
    return null
  }

  return (
    <>
      <h2>{blogData[0].title}</h2>
      <p>
        <a href={blogData[0].url}>{blogData[0].url}</a>
        <br />
        {blogData[0].likes} Likes
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
        Added by {blogData[0].author}
        <br />
        {user.username === blogData[0].user.username ? deleteButton() : null}
      </p>
      <h3>Comments</h3>
      <div>
        <input {...comment} placeholder='Comment...' />
        <button type='button' onClick={commentBlog}>
          Add a comment
        </button>
      </div>
      {showComments()}
    </>
  )
}

export default BlogView
