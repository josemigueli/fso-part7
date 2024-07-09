import { useUserValue, useUserLogout } from '../UserContext'

const Header = () => {
  const user = useUserValue()
  const logout = useUserLogout()

  const loggedInContent = () => (
    <>
      <p>
        {user.name} logged in <button onClick={handleLogout}>Logout</button>
      </p>
    </>
  )

  const handleLogout = () => {
    logout()
  }

  return (
    <>
      <h1>Blog List App</h1>
      {user ? loggedInContent() : null}
    </>
  )
}

export default Header
