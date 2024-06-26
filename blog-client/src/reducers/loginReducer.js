import { createSlice } from '@reduxjs/toolkit'
import { displayNotification } from './notificationReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'
import userService from '../services/user'

const initialState = null

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    unsetUser(state, action) {
      return null
    }
  }
})

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      return true
    } catch (exception) {
      dispatch(displayNotification('error', 'Invalid username or password', 5))
      return false
    }
  }
}

export const retrieveUser = () => {
  return async (dispatch) => {
    const user = JSON.parse(window.localStorage.getItem('loggedUser'))
    if (user) {
      try {
        await userService.checkUser(user.token)
        dispatch(setUser(user))
        blogService.setToken(user.token)
      } catch (err) {
        window.localStorage.removeItem('loggedUser')
        dispatch(unsetUser())
      }
    }
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem('loggedUser')
    dispatch(unsetUser())
  }
}

export const { setUser, unsetUser } = loginSlice.actions
export default loginSlice.reducer
