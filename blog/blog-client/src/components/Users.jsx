import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../services/users'
import { useUserValue } from '../UserContext'
import { Link } from 'react-router-dom'

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

  useEffect(() => {
    document.title = 'Blog List - Users'
  }, [])

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
