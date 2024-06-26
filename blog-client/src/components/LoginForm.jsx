import { useField, useLogin } from '../hooks'

const LoginForm = () => {
  const [username, resetUsername] = useField()
  const [password, resetPassword] = useField('password')
  const [user, ...logging] = useLogin()

  const handleLogin = async (event) => {
    event.preventDefault()
    const res = await logging[0].login(username.value, password.value)
    if (res) {
      resetUsername()
      resetPassword()
    }
  }

  if (user) {
    return null
  }

  return (
    <>
      <h2>Login to the application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor='username'>Username</label>
          <input id='username' {...username} />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input id='password' {...password} />
        </div>
        <button type='submit'>Login</button>
      </form>
    </>
  )
}

export default LoginForm
