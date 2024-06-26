import axios from 'axios'
const baseUrl = '/api/users'

const checkUser = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const data = {}

  const res = await axios.post(`${baseUrl}/check`, data, config)
  return res.status
}

export default { checkUser }
