const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const port = process.env.PORT || 3001

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

require('./app/controllers/index')(app)

app.listen(port)
