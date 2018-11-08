const mongoose = require('../../database')

const CategorySchema = new mongoose.Schema({
  category: {
    type: String,
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Category = mongoose.model('Category', CategorySchema)

module.exports = Category
