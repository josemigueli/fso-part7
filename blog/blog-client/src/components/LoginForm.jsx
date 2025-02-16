import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'
import { useNotify } from '../NotificationContext'
import { useUserLogin, useUserValue } from '../UserContext'
import { useMutation } from '@tanstack/react-query'
import { login } from '../services/login'
import Container from 'react-bootstrap/esm/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button'

const LoginForm = () => {
  const [username, resetUsername] = useField()
  const [password, resetPassword] = useField('password')

  const notify = useNotify()
  const user = useUserValue()
  const loginUser = useUserLogin()
  const navigate = useNavigate()

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
