import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return null
    }
  }
})

export const displayNotification = (type, message, time) => {
  return (dispatch) => {
    dispatch(
      setNotification({
        message,
        type
      })
    )
    setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)
  }
}

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
