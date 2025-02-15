/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useLogin } from './hooks'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Notification from './components/Notification'
import Header from './components/Header'
import LoginForm from './components/LoginForm'
import BlogsList from './components/BlogsList'
import Users from './components/Users'
import UserView from './components/UserView'
import BlogView from './components/BlogView'

const App = () => {
  const [user, ...logging] = useLogin()

  useEffect(() => {
    logging[0].retrieve()
  }, [])

  return (
    <div>
      <Notification />
      <Header />
      <Routes>
        <Route path='/' element={<BlogsList />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/blogs/:id' element={<BlogView />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<UserView />} />
      </Routes>
    </div>
  )
}

export default App
