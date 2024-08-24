/* eslint-disable no-undef */
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 }).populate('comments', { content: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  jwt.verify(request.token, process.env.SECRET)

  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()

  const newBlog = await Blog.findById(savedBlog.id).populate('user', { username: 1, name: 1 })

  response.status(201).json(newBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  jwt.verify(request.token, process.env.SECRET)

  const userId = request.user.id
  const blogToDelete = await Blog.findById(request.params.id)

  if (userId.toString() !== blogToDelete.user.toString()) {
    return response.status(401).json({ error: 'invalid token' })
  }

  await Blog.findByIdAndDelete(request.params.id)

  response.status(204).end()
})

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  jwt.verify(request.token, process.env.SECRET)

  const { title, author, url, likes } = request.body
  const user = request.user.id

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes, user },
    { new: true, runValidators: true, context: 'query' }
  )

  response.json(updatedBlog)
})

module.exports = blogsRouter
