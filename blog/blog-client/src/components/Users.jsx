import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../services/users'
import { useUserValue } from '../UserContext'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/esm/Container'
import Table from 'react-bootstrap/Table'

const Users = () => {
  const user = useUserValue()
  const navigate = useNavigate()

  const query = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
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
    return <div>Users service not available due problems in server</div>
  }
  const users = query.data

  if (!user) {
    return null
  }

  return (
    <Container className='mt-5'>
      <h2>Users</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>
                <Link to={`/users/${u.id}`}>{u.name}</Link>
              </td>
              <td>{u.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

export default Users
