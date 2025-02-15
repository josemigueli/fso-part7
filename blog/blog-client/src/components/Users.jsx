/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLogin } from '../hooks'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'

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

  useEffect(() => {
    document.title = 'Blog List - Users'
  }, [])

  if (!user) {
    return null
  }

  return (
    <div className='max-w-7xl px-5'>
      <h2 className='text-2xl font-bold mb-5'>Users</h2>
      <table className='w-full'>
        <thead>
          <tr>
            <th className='text-left pb-5 text-xl'>User</th>
            <th className='text-left pb-5 text-xl'>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>
                <Link to={`/users/${u.id}`}>
                  <div className='mb-3 border-b border-dashed border-zinc-500 hover:text-blue-500 ps-3'>
                    <p>{u.name}</p>
                  </div>
                </Link>
              </td>
              <td>
                <div className='mb-3 border-b border-dashed border-zinc-500 ps-3'>
                  <p>{u.blogs.length}</p>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
