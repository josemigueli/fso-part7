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

  const noBlogsMessage = () => <p>No blogs yet</p>

  const showBlogs = () => (
    <ul>
      {userData[0].blogs.map((b) => (
        <li key={b.id}>{b.title}</li>
      ))}
    </ul>
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
    <>
      <h2>{userData[0].name}</h2>
      <h3>Added blogs</h3>
      {userData[0].blogs.length > 0 ? showBlogs() : noBlogsMessage()}
    </>
  )
}

export default UserView
