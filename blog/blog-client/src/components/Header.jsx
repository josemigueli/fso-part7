import { Link } from 'react-router-dom'
import { useLogin } from '../hooks'
import Dropdown from './Dropdown'

const Header = () => {
  const [user, ...logging] = useLogin()

  return (
    <>
      <div className='border-b border-zinc-700 mb-5'>
        <div className='flex justify-between items-center max-w-7xl p-5'>
          <Link to='/' className='text-xl font-bold'>
            Blog List
          </Link>
          {user ? <Dropdown /> : null}
        </div>
      </div>
    </>
  )
}

export default Header
