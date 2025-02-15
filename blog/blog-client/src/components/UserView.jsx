import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useLogin } from '../hooks'

const UserView = () => {
  const users = useSelector((state) => state.users)
  const { id } = useParams()
  const [user, ...logging] = useLogin()
  const navigate = useNavigate()
  const userData = users.filter((u) => {
    return u.id === id
  })

  const noBlogsMessage = () => (
    <>
      <h3 className='text-xl font-bold mb-3'>No blogs yet...</h3>
    </>
  )

  const showBlogs = () => (
    <>
      <h3 className='text-xl font-bold mb-3'>Added blogs</h3>
      <ul>
        {userData[0].blogs.map((b) => (
          <li key={b.id} className='border border-zinc-700 rounded-lg my-5'>
            <div className='py-4 px-6'>
              <p className='text-xl font-bold'>{b.title}</p>
              <p className='text-zinc-400 text-sm'>by {b.author}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  )

  useEffect(() => {
    if (!user || userData.length < 1) {
      navigate('/users')
    }
  })

  useEffect(() => {
    document.title = `Blog List - ${userData[0]?.name}`
  }, [userData])

  if (!user || userData.length < 1) {
    return null
  }

  return (
    <div className='max-w-7xl px-5'>
      <h2 className='text-2xl font-bold mb-5'>{userData[0].name}</h2>
      <div>{userData[0].blogs.length > 0 ? showBlogs() : noBlogsMessage()}</div>
    </div>
  )
}

export default UserView
