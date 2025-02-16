/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { useUserRetrieve } from './UserContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Notification from './components/Notification'
import Header from './components/Header'
import LoginForm from './components/LoginForm'
import BlogsList from './components/BlogsList'
import Users from './components/Users'
import UsersView from './components/UsersView'
import BlogView from './components/BlogView'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'

const App = () => {
  const retrieve = useUserRetrieve()

  useEffect(() => {
    retrieve()
  }, [])

  return (
    <Container>
      <Notification />
      <Header />
      <Routes>
        <Route path='/' element={<BlogsList />} />
        <Route path='/blogs/:id' element={<BlogView />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<UsersView />} />
        <Route path='/login' element={<LoginForm />} />
      </Routes>
    </Container>
  )
}

export default App
