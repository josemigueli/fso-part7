import { createSlice } from '@reduxjs/toolkit'
import { displayNotification } from './notificationReducer'
import blogService from '../services/blogs'
import commentService from '../services/comments'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      const blogs = action.payload
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      return sortedBlogs
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setLike(state, action) {
      const liked = action.payload
      return state.map((b) =>
        b.id !== liked.id ? b : { ...b, likes: liked.likes }
      )
    },
    unsetBlog(state, action) {
      const id = action.payload
      return state.filter((b) => {
        return b.id !== id
      })
    },
    setComment(state, action) {
      const comment = action.payload
      return state.map((b) =>
        b.id !== comment.blog
          ? b
          : { ...b, comments: b.comments.concat(comment) }
      )
    }
  }
})

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createNewBlog = (title, author, url) => {
  return async (dispatch) => {
    try {
      const res = await blogService.create({ title, author, url })
      dispatch(appendBlog(res))
      dispatch(
        displayNotification('success', `Blog ${title} by ${author} added`, 5)
      )
      return true
    } catch (err) {
      dispatch(displayNotification('error', 'Something went wrong', 5))
      return false
    }
  }
}

export const likeABlog = (title, author, url, likes, id) => {
  return async (dispatch) => {
    const newLikes = likes + 1
    try {
      const res = await blogService.update({
        title,
        author,
        url,
        likes: newLikes,
        id
      })
      dispatch(setLike(res))
      return true
    } catch (err) {
      return false
    }
  }
}

export const deleteABlog = (id, title, author) => {
  return async (dispatch) => {
    try {
      await blogService.deleteOne(id)
      dispatch(unsetBlog(id))
      dispatch(
        displayNotification('success', `Blog ${title} by ${author} deleted`, 5)
      )
      return true
    } catch (err) {
      dispatch(displayNotification('error', 'Something went wrong', 5))
      return false
    }
  }
}

export const commentABlog = (content, blogId) => {
  return async (dispatch) => {
    try {
      const res = await commentService.addComment({ content, blogId })
      dispatch(setComment(res))
      dispatch(displayNotification('success', 'Comment added', 5))
      return true
    } catch (err) {
      dispatch(displayNotification('error', 'Something went wrong', 5))
      return false
    }
  }
}

export const { setBlogs, appendBlog, setLike, unsetBlog, setComment } =
  blogSlice.actions
export default blogSlice.reducer
