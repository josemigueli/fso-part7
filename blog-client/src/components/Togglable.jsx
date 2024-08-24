/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { useUserValue } from '../UserContext'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/esm/Button'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)
  const hideVisible = { display: visible ? 'none' : '' }
  const showVisible = { display: visible ? '' : 'none' }
  const user = useUserValue()

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
      <div style={hideVisible} className='mb-3 text-end'>
        <Button
          variant='primary'
          id='create-blog-button'
          onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showVisible} className='mb-3 text-end'>
        <Button className='mb-3' variant='secondary' onClick={toggleVisibility}>
          Cancel
        </Button>
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
