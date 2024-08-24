import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { useUserValue } from '../UserContext'
import Container from 'react-bootstrap/esm/Container'
import ListGroup from 'react-bootstrap/ListGroup'

const UsersView = () => {
  const { id } = useParams()
  const user = useUserValue()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const users = queryClient.getQueryData(['users'])
  const userData = users?.filter((u) => {
    return u.id === id
  })

  const noBlogsMessage = () => <p>No blogs yet...</p>

  const showBlogs = () => (
    <ListGroup variant='flush'>
      {userData[0].blogs.map((b) => (
        <ListGroup.Item key={b.id}>{b.title}</ListGroup.Item>
      ))}
    </ListGroup>
  )

  useEffect(() => {
    if (!user || userData.length < 1) {
      navigate('/users')
    }
  })

  if (!user || userData.length < 1) {
    return null
  }

  return (
    <Container className='my-5'>
      <h2>{userData[0].name}</h2>
      <div className='border border-light-subtle rounded p-4'>
        <h3>Added blogs</h3>
        {userData[0].blogs.length > 0 ? showBlogs() : noBlogsMessage()}
      </div>
    </Container>
  )
}

export default UsersView
