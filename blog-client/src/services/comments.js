import axios from 'axios'
const baseUrl = '/api/comments'

export const addComment = async (data) => {
  const response = await axios.post(baseUrl, data)
  return response.data
}
