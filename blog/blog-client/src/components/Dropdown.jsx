import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CiMenuBurger, CiLogout } from 'react-icons/ci'
import { useUserValue, useUserLogout } from '../UserContext'

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const user = useUserValue()
  const logout = useUserLogout()

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  }

  const handleLogout = () => {
    logout()
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='relative inline-block text-left' ref={dropdownRef}>
      <div>
        <button
          type='button'
          className='inline-flex justify-center w-full rounded-md shadow-sm p-3 bg-background text-sm font-medium text-main-text hover:bg-zinc-700 focus:outline-1 outline-zinc-700'
          onClick={toggleDropdown}
          id='menu-button'
          aria-expanded={isOpen}
          aria-haspopup='true'>
          <CiMenuBurger className='h-5 w-5' />
        </button>
      </div>

      {isOpen && (
        <div
          id='dropdown-menu'
          className='origin-top-right absolute right-0 mt-2 w-56 rounded-lg bg-zinc-700 ring-1 ring-zinc-500'
          role='menu'
          aria-orientation='vertical'
          aria-labelledby='menu-button'
          tabIndex='-1'>
          <div className='py-1' role='none'>
            <Link
              to='/'
              className='block px-4 py-2 hover:bg-zinc-800'
              role='menuitem'
              tabIndex='-1'
              id='menu-item-0'>
              Blogs
            </Link>
            <Link
              to='/users'
              className='block px-4 py-2 hover:bg-zinc-800'
              role='menuitem'
              tabIndex='-1'
              id='menu-item-1'>
              Users
            </Link>
            <div className='block px-4 py-2 border-y border-zinc-500'>
              <p>{user.name}</p>
            </div>
            <button
              className='logout-button block px-4 py-2 hover:bg-zinc-800 w-full text-left cursor-pointer flex items-center gap-2'
              role='menuitem'
              tabIndex='-1'
              id='menu-item-2'
              onClick={handleLogout}>
              <CiLogout className='h-5 w-5' />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dropdown
