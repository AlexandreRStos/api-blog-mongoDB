const express = require('express')
const authMiddleware = require('../middlewares/auth')

const Category = require('../models/category')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find()

    return res.send({ categories })
  } catch (err) {
    return res.status(400).send({ error: 'Error loading categories' })
  }
})

router.get('/:categoryId', async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId)

    return res.send({ category })
  } catch (err) {
    return res.status(400).send({ error: 'Error loading category' })
  }
})

router.use(authMiddleware)

router.post('/create', async (req, res) => {
  try {
    const category = await Category.create(req.body)

    return res.send({ category })
  } catch (err) {
    return res.status(400).send({ error: 'Error creating new category' })
  }
})

router.put('/:categoryId', async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.categoryId, req.body, { new: true })

    return res.send({ category })
  } catch (err) {
    return res.status(400).send({ error: 'Error updating category' })
  }
})

router.delete('/:categoryId', async (req, res) => {
  try {
    await Category.findByIdAndRemove(req.params.categoryId)

    return res.send()
  } catch (err) {
    return res.status(400).send({ error: 'Error Deleting category' })
  }
})

module.exports = app => app.use('/category', router)
