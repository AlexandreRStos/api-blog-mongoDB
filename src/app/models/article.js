const mongoose = require('../../database')
const mongoosepaginate = require('mongoose-paginate')

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  content: {
    type: String,
    require: true
  },
  imageUrl: {
    type: String
  },
  categoryId: {
    type: String,
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

ArticleSchema.plugin(mongoosepaginate)

const Article = mongoose.model('Article', ArticleSchema)

module.exports = Article
