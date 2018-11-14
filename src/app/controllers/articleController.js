const express = require('express')
const authMiddleware = require('../middlewares/auth')

const Article = require('../models/article')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const { page = 1 } = req.query
    const options = {
      populate: ['author', 'category'],
      sort: '-createdAt',
      page,
      limit: 10
    }
    const articles = await Article.paginate({}, options)

    return res.send({ articles })
  } catch (err) {
    return res.status(400).send({ error: 'Error loading articles' })
  }
})

router.get('/:articleId', async (req, res) => {
  try {
    const article = await Article.findById(req.params.articleId).populate('author')

    return res.send({ article })
  } catch (err) {
    return res.status(400).send({ error: 'Error loading article' })
  }
})

router.use(authMiddleware)

router.post('/create', async (req, res) => {
  console.log(req.userId)

  try {
    const article = await Article.create({ ...req.body, author: req.userId })

    return res.send({ article })
  } catch (err) {
    return res.status(400).send({ error: 'Error creating new article' })
  }
})

router.put('/:articleId', async (req, res) => {
  try {
    const article = await Article
      .findByIdAndUpdate(req.params.articleId, req.body, { new: true })

    return res.send({ article })
  } catch (err) {
    return res.status(400).send({ error: 'Error updating article' })
  }
})

router.delete('/:articleId', async (req, res) => {
  try {
    await Article.findByIdAndRemove(req.params.articleId).populate('author')

    return res.send()
  } catch (err) {
    return res.status(400).send({ error: 'Error Deleting article' })
  }
})

module.exports = app => app.use('/article', router)
