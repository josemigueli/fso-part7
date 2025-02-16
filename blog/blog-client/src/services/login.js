import axios from 'axios'
const baseUrl = '/api/login'

export const login = (credentials) =>
  axios.post(baseUrl, credentials).then((res) => res.data)
