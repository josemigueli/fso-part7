import axios from 'axios'
const baseUrl = '/api/blogs'

const getToken = () => {
  const user = JSON.parse(window.localStorage.getItem('loggedUser'))
  return `Bearer ${user.token}`
}

export const getAllBlogs = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const createBlog = async (data) => {
  const config = {
    headers: {
      Authorization: getToken()
    }
  }
  const response = await axios.post(baseUrl, data, config)
  return response.data
}

export const updateBlog = async (data) => {
  const config = {
    headers: {
      Authorization: getToken()
    }
  }
  const response = await axios.put(`${baseUrl}/${data.id}`, data, config)
  return response.data
}

export const deleteBlog = async (id) => {
  const config = {
    headers: {
      Authorization: getToken()
    }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response
}
