import axios from 'axios'
const baseUrl = '/api/blogs'

let token
const user = JSON.parse(window.localStorage.getItem('loggedUser'))
if (user) {
  token = `Bearer ${user.token}`
}

export const getAllBlogs = () => axios.get(baseUrl).then((res) => res.data)

export const createBlog = async (data) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const response = await axios.post(baseUrl, data, config)
  return response.data
}

const update = async (data) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const response = await axios.put(`${baseUrl}/${data.id}`, data, config)
  return response.data
}

const deleteOne = async (id) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response
}

export default { update, deleteOne }
