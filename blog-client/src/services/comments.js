import axios from 'axios'
const baseUrl = '/api/comments'

const addComment = async (data) => {
  const response = await axios.post(baseUrl, data)
  return response.data
}

export default { addComment }
