/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { useUserRetrieve } from './UserContext'
import Notification from './components/Notification'
import Header from './components/Header'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import CreateNewBlog from './components/CreateNewBlog'
import BlogsList from './components/BlogsList'

const App = () => {
  const [updateList, setUpdateList] = useState(true)
  const [hideBlogForm, setHideBlogForm] = useState(false)
  const retrieve = useUserRetrieve()

  const updateAndHide = () => {
    setUpdateList(!updateList)
    setHideBlogForm(!hideBlogForm)
  }

  useEffect(() => {
    retrieve()
  }, [])

  return (
    <div>
      <Notification />
      <Header />
      <LoginForm />
      <Togglable buttonLabel='Create blog' hide={hideBlogForm}>
        <h2>Create new blog</h2>
        <CreateNewBlog updater={updateAndHide} />
      </Togglable>
      <BlogsList />
    </div>
  )
}

export default App
