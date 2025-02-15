/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { useLogin } from '../hooks'
import PropTypes from 'prop-types'
import { CiCirclePlus, CiCircleRemove } from 'react-icons/ci'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)
  const hideVisible = { display: visible ? 'none' : '' }
  const showVisible = { display: visible ? '' : 'none' }
  const [user, ...logging] = useLogin()

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useEffect(() => {
    if (visible) {
      toggleVisibility()
    }
  }, [props.hide])

  if (!user) {
    return null
  }

  return (
    <div>
      <div className='flex justify-end mb-5' style={hideVisible}>
        <button
          className='bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 mb-5 font-bold flex items-center gap-2'
          id='create-blog-button'
          onClick={toggleVisibility}>
          <CiCirclePlus className='w-5 h-5' />
          {props.buttonLabel}
        </button>
      </div>
      <div className='mb-5' style={showVisible}>
        <div className='flex justify-end'>
          <button
            className='bg-zinc-700 px-4 py-2 rounded-lg hover:bg-zinc-800 mb-5 flex items-center gap-2 font-bold'
            onClick={toggleVisibility}>
            <CiCircleRemove className='w-5 h-5' />
            Cancel
          </button>
        </div>
        {props.children}
      </div>
    </div>
  )
}

Togglable.propTypes = {
  hide: PropTypes.bool.isRequired,
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
