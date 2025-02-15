import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { likeABlog, deleteABlog, commentABlog } from '../reducers/blogReducer'
import { useLogin } from '../hooks'
import { useField } from '../hooks'
import { CiTrash, CiHeart, CiCirclePlus } from 'react-icons/ci'

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

  const showLikedMessage = (message) => (
    <span className='ms-2 text-blue-400'>{message}</span>
  )

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
        <button
          className='blog-delete-button py-2 px-4 border border-zinc-700 rounded-lg hover:bg-red-950 flex items-center gap-2 font-bold'
          onClick={deleteBlog}>
          <CiTrash className='h-5 w-5' />
          Delete
        </button>
      </span>
    </>
  )

  const commentBlog = async (event) => {
    event.preventDefault()
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
            <li
              key={comment.id}
              className='my-5 px-4 py-6 border border-zinc-700 rounded-lg md:w-xl'>
              {comment.content}
            </li>
          ))}
        </ul>
      ) : (
        <div className='text-center md:w-xl'>
          <p>No comments yet...</p>
        </div>
      )}
    </>
  )

  useEffect(() => {
    if (!user || blogData.length < 1) {
      navigate('/')
    }
  })

  useEffect(() => {
    document.title = `Blog List - ${blogData[0]?.title}`
  }, [blogData])

  if (!user || blogData.length < 1) {
    return null
  }

  return (
    <div className='max-w-7xl px-5 pb-12'>
      <div className='blog-info-container mb-12'>
        <div className='mb-5'>
          <h2 className='text-4xl font-bold'>{blogData[0].title}</h2>
          <h3 className='text-zinc-400'>by {blogData[0].author}</h3>
        </div>
        <div className='mb-5'>
          <p className='mb-5'>
            To read more about this blog visit:{' '}
            <a className='text-blue-400' href={blogData[0].url}>
              {blogData[0].url}
            </a>
          </p>
          <p className='text-zinc-400 mb-5'>
            <span className='text-blue-400'>{blogData[0].likes} </span>people
            like this blog. {liked ? showLikedMessage(liked) : null}
          </p>
          <div className='flex gap-3'>
            <button
              className='blog-like-button py-2 px-4 border border-zinc-700 rounded-lg hover:bg-gray-900 flex items-center gap-2 font-bold'
              type='button'
              onClick={updateLikes}>
              <CiHeart className='w-5 h-5' />
              Like
            </button>
            {user.username === blogData[0].user.username
              ? deleteButton()
              : null}
          </div>
        </div>
      </div>

      <div className='mb-5'>
        <h3 className='text-2xl font-bold mb-5'>Comments</h3>
        <div className='mb-12'>
          <form className='md:w-xl' onSubmit={commentBlog}>
            <div className='mb-3'>
              <textarea
                className='bg-gray-900 border border-zinc-700 rounded-lg py-2 px-4 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full'
                {...comment}
                placeholder='Write a comment...'
                rows={6}
              />
            </div>
            <button
              className='bg-blue-600 py-2 px-4 rounded-lg hover:bg-blue-700 w-full flex justify-center items-center gap-2 font-bold'
              type='submit'>
              <CiCirclePlus className='h-5 w-5' />
              Add a comment
            </button>
          </form>
        </div>

        {showComments()}
      </div>
    </div>
  )
}

export default BlogView
