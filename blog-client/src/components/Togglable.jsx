/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { useUserValue } from '../UserContext'
import PropTypes from 'prop-types'

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
      <div style={hideVisible}>
        <button id='create-blog-button' onClick={toggleVisibility}>
          {props.buttonLabel}
        </button>
      </div>
      <div style={showVisible}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  hide: PropTypes.bool.isRequired,
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
