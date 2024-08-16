import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { likeABlog, deleteABlog, commentABlog } from '../reducers/blogReducer'
import { useLogin } from '../hooks'
import { useField } from '../hooks'
import Container from 'react-bootstrap/esm/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button'
import Card from 'react-bootstrap/Card'

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

  const showLikedMessage = (message) => <span className='ms-2'>{message}</span>

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
        <Button
          className='blog-delete-button ms-3'
          onClick={deleteBlog}
          variant='danger'>
          Delete
        </Button>
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
        <ListGroup as='ul' variant='flush'>
          {blogData[0].comments.map((comment) => (
            <ListGroup.Item as='li' key={comment.id}>
              {comment.content}
            </ListGroup.Item>
          ))}
        </ListGroup>
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
    <Container className='my-5'>
      <Card className='mb-5'>
        <Card.Header>Added by {blogData[0].author}</Card.Header>
        <Card.Body>
          <Card.Title>{blogData[0].title}</Card.Title>
          <Card.Text>
            <a href={blogData[0].url}>{blogData[0].url}</a>
          </Card.Text>
          <Card.Text>
            {blogData[0].likes} Likes {liked ? showLikedMessage(liked) : null}
          </Card.Text>
          <Button
            className='blog-like-button'
            type='button'
            onClick={updateLikes}
            variant='primary'>
            Like
          </Button>

          {user.username === blogData[0].user.username ? deleteButton() : null}
        </Card.Body>
      </Card>
      <div className='mb-3'>
        <h3>Comments</h3>
        <Form onSubmit={commentBlog}>
          <Form.Group className='mb-3'>
            <Form.Control {...comment} placeholder='Comment...' />
          </Form.Group>
          <Button type='submit' variant='primary'>
            Add a comment
          </Button>
        </Form>
      </div>
      {showComments()}
    </Container>
  )
}

export default BlogView
