const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const { mongoose } = require('mongoose')
const app = express()
const cookieParser = require('cookie-parser')

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('data base conneccted'))
  .catch((err) => console.log('Error', err))

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use('/', require('./routes/authRoutes'))

const port = process.env.PORT || 8000
app.listen(port, () => console.log(`server is running on port: ${port}`))
