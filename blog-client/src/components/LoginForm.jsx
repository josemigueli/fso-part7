import { useField } from '../hooks'
import { useNotify } from '../NotificationContext'
import { useUserLogin, useUserValue } from '../UserContext'
import { useMutation } from '@tanstack/react-query'
import { login } from '../services/login'

const LoginForm = () => {
  const [username, resetUsername] = useField()
  const [password, resetPassword] = useField('password')

  const notify = useNotify()
  const user = useUserValue()
  const loginUser = useUserLogin()

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      resetUsername()
      resetPassword()
      loginUser(data)
    },
    onError: (err) => {
      const erroMessage = err.response.data.error
      notify(erroMessage, 'ERROR')
    }
  })

  const handleLogin = async (event) => {
    event.preventDefault()
    mutation.mutate({ username: username.value, password: password.value })
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
        <button type='submit' id='login-button'>
          Login
        </button>
      </form>
    </>
  )
}

export default LoginForm
