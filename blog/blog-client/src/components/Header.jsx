import { Link } from 'react-router-dom'
import { useUserValue, useUserLogout } from '../UserContext'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'

const Header = () => {
  const user = useUserValue()
  const logout = useUserLogout()

  const loggedInContent = () => (
    <>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='w-100 justify-content-between'>
          <Nav>
            <Link className='nav-link' to='/'>
              Blogs
            </Link>
            <Link className='nav-link' to='/users'>
              Users
            </Link>
          </Nav>
          <div className='d-flex'>
            <p className='d-block py-2 p-lg-2 mb-0 me-2'>{user.name}</p>
            <Button onClick={handleLogout} variant='dark'>
              Logout
            </Button>
          </div>
        </Nav>
      </Navbar.Collapse>
    </>
  )

  const handleLogout = () => {
    logout()
  }

  return (
    <>
      <Navbar expand='lg' className='bg-body-tertiary'>
        <Container>
          <Link className='navbar-brand' to='/'>
            Blog List App
          </Link>
          {user ? loggedInContent() : null}
        </Container>
      </Navbar>
    </>
  )
}

export default Header
