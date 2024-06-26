import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { displayNotification } from '../reducers/notificationReducer'
import { loginUser, retrieveUser, logoutUser } from '../reducers/loginReducer'

export const useField = (type = 'text') => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  const props = { type, value, onChange }

  return [props, reset]
}

export const useNotification = () => {
  const dispatch = useDispatch()

  const notificationSuccess = (message, time = 5) => {
    dispatch(displayNotification('success', message, time))
  }

  const notificationError = (message, time = 5) => {
    dispatch(displayNotification('error', message, time))
  }

  return [notificationSuccess, notificationError]
}

export const useLogin = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.login)

  const login = async (username, password) => {
    const res = await dispatch(loginUser(username, password))
    return res
  }

  const retrieve = () => {
    dispatch(retrieveUser())
  }

  const logout = () => {
    dispatch(logoutUser())
  }

  const logging = { login, retrieve, logout }

  return [user, logging]
}
