import { useEffect } from 'react'
import { useField, useLogin } from '../hooks'
import { useNavigate } from 'react-router-dom'
import { CiLogin } from 'react-icons/ci'

const LoginForm = () => {
  const [username, resetUsername] = useField()
  const [password, resetPassword] = useField('password')
  const [user, ...logging] = useLogin()
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()
    const res = await logging[0].login(username.value, password.value)
    if (res) {
      resetUsername()
      resetPassword()
    }
  }

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  })

  useEffect(() => {
    document.title = 'Blog List - Login'
  }, [])

  if (user) {
    return null
  }

  return (
    <div className='flex justify-center max-w-7xl px-5'>
      <div className='border border-zinc-700 rounded-lg p-8 mb-12 md:w-md'>
        <h2 className='text-center text-2xl font-bold mb-5'>Login</h2>
        <form onSubmit={handleLogin}>
          <div className='flex flex-col mb-5'>
            <label className='font-bold mb-2' htmlFor='username'>
              Username
            </label>
            <input
              className='bg-gray-900 border border-zinc-500 rounded-lg py-2 px-4 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              id='username'
              {...username}
            />
          </div>
          <div className='flex flex-col mb-5'>
            <label className='font-bold mb-2' htmlFor='password'>
              Password
            </label>
            <input
              className='bg-gray-900 border border-zinc-500 rounded-lg py-2 px-4 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              id='password'
              {...password}
            />
          </div>
          <button
            type='submit'
            id='login-button'
            className='w-full bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 flex justify-center items-center gap-2 font-bold'>
            <CiLogin className='w-5 h-5' />
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
