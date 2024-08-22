import { useEffect } from 'react'
import { useField, useLogin } from '../hooks'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/esm/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button'

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

  if (user) {
    return null
  }

  return (
    <Container className='mt-5'>
      <div className='justify-content-center row'>
        <div className='p-4 p-lg-5 border border-light-subtle rounded col-lg-5'>
          <h2 className='text-center'>Login</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group className='mb-3'>
              <Form.Label>Username</Form.Label>
              <Form.Control id='username' {...username} />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control id='password' {...password} />
            </Form.Group>
            <Button
              variant='primary'
              type='submit'
              className='w-100'
              id='login-button'>
              Login
            </Button>
          </Form>
        </div>
      </div>
    </Container>
  )
}

export default LoginForm
