const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')

commentsRouter.get('/', async (request, response) => {
  const comments = await Comment.find({})
  response.json(comments)
})

commentsRouter.post('/', async (request, response) => {
  const body = request.body
  const blog = await Blog.findById(body.blogId)

  const comment = new Comment({
    content: body.content,
    blog: body.blogId
  })

  const savedComment = await comment.save()

  blog.comments = blog.comments.concat(savedComment.id)
  await blog.save()

  response.status(201).json(savedComment)
})

module.exports = commentsRouter