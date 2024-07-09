import { createContext, useReducer, useContext } from 'react'
import { checkUser } from './services/user'
import { useMutation } from '@tanstack/react-query'

const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      window.localStorage.setItem('loggedUser', JSON.stringify(action.payload))
      return action.payload
    case 'LOGOUT':
      window.localStorage.removeItem('loggedUser')
      return null
    case 'RETRIEVE':
      return JSON.parse(window.localStorage.getItem('loggedUser'))
    default:
      return state
  }
}

const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null)

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  )
}

export const useUserValue = () => {
  const userAndDispatch = useContext(UserContext)
  return userAndDispatch[0]
}

export const useUserLogin = () => {
  const userAndDispatch = useContext(UserContext)
  const dispatch = userAndDispatch[1]
  return (payload) => {
    dispatch({ type: 'LOGIN', payload })
  }
}

export const useUserRetrieve = () => {
  const userAndDispatch = useContext(UserContext)
  const dispatch = userAndDispatch[1]
  const mutation = useMutation({
    mutationFn: checkUser,
    onSuccess: () => {
      dispatch({ type: 'RETRIEVE' })
    },
    onError: () => {
      dispatch({ type: 'LOGOUT' })
    }
  })
  return () => {
    const user = JSON.parse(window.localStorage.getItem('loggedUser'))
    if (user) {
      mutation.mutate(user.token)
    }
  }
}

export const useUserLogout = () => {
  const userAndDispatch = useContext(UserContext)
  const dispatch = userAndDispatch[1]
  return () => {
    dispatch({ type: 'LOGOUT' })
  }
}

export default UserContext
