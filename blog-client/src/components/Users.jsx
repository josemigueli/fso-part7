/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLogin } from '../hooks'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'
import Container from 'react-bootstrap/esm/Container'
import Table from 'react-bootstrap/Table'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)
  const [user, ...logging] = useLogin()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  })

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
