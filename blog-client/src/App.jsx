/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { useLogin } from './hooks'
import Notification from './components/Notification'
import Header from './components/Header'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import CreateNewBlog from './components/CreateNewBlog'
import BlogsList from './components/BlogsList'

const App = () => {
  const [hideBlogForm, setHideBlogForm] = useState(false)
  const [user, ...logging] = useLogin()

  const updateAndHide = () => {
    setHideBlogForm(!hideBlogForm)
  }

  useEffect(() => {
    logging[0].retrieve()
  }, [])

  return (
    <div>
      <Notification />
      <Header />
      <LoginForm />
      <Togglable buttonLabel='Create blog' hide={hideBlogForm}>
        <CreateNewBlog updater={updateAndHide} />
      </Togglable>
      <BlogsList />
    </div>
  )
}

export default App
