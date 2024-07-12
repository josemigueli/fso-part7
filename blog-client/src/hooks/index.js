import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createBlog, deleteBlog, updateBlog } from '../services/blogs'
import { useNotify } from '../NotificationContext'

export const useField = (type = 'text') => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  const props = { type, value, onChange }

  return [props, reset]
}

export const useBlogQuery = () => {
  const queryClient = useQueryClient()
  const notify = useNotify()

  const createMutation = useMutation({
    mutationFn: createBlog
  })

  const updateMutation = useMutation({
    mutationFn: updateBlog
  })

  const deleteMutation = useMutation({
    mutationFn: deleteBlog
  })

  const errorHandler = (err) => {
    let errorMessage = err.response.data.error
    if (!errorMessage) {
      errorMessage = 'Something went wrong'
    }
    notify(errorMessage, 'ERROR')
  }

  const createABlog = async (data) => {
    const res = await createMutation.mutateAsync(data, {
      onSuccess: (blog) => {
        const blogs = queryClient.getQueryData(['blogs'])
        queryClient.setQueryData(['blogs'], blogs.concat(blog))
        notify(`Blog ${data.title} by ${data.author} added`)
      },
      onError: (err) => {
        errorHandler(err)
      }
    })
    return res
  }

  const updateABlog = (data) => {
    updateMutation.mutate(data, {
      onSuccess: (blog) => {
        const blogs = queryClient.getQueryData(['blogs'])
        const newData = blogs.map((b) =>
          b.id === blog.id ? { ...b, likes: blog.likes } : b
        )
        queryClient.setQueryData(['blogs'], newData)
        notify(`Blog ${data.title} by ${data.author} liked!`)
      },
      onError: (err) => {
        errorHandler(err)
      }
    })
  }

  const deleteABlog = (id, title, author) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        const blogs = queryClient.getQueryData(['blogs'])
        const newData = blogs.filter((b) => {
          return b.id !== id
        })
        queryClient.setQueryData(['blogs'], newData)
        notify(`Blog ${title} by ${author} deleted`)
      },
      onError: (err) => {
        errorHandler(err)
      }
    })
  }

  return [createABlog, updateABlog, deleteABlog]
}
