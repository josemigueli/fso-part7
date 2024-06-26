import { useLogin } from '../hooks'

const Header = () => {
  const [user, ...logging] = useLogin()

  const loggedInContent = () => (
    <>
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
      <h1>Blog List App</h1>
      {user ? loggedInContent() : null}
    </>
  )
}

export default Header
