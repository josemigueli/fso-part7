import { Link } from 'react-router-dom'
import { useLogin } from '../hooks'

const Header = () => {
  const [user, ...logging] = useLogin()

  const loggedInContent = () => (
    <>
      <Link to='/'>Blogs</Link>
      <Link to='/users'>Users</Link>
      <p>
        {user.name} logged in <button onClick={handleLogout}>Logout</button>
      </p>
    </>
  )

  const handleLogout = () => {
    logging[0].logout()
  }

  return (
    <>
      {user ? loggedInContent() : null}
      <h1>Blog List App</h1>
    </>
  )
}

export default Header
