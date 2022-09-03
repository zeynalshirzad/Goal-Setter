const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const goalRouter = require('./routes/goalRoutes')
const { errorHandler } = require('./middlewares/errorMiddleware')
const connectDB = require('./config/db')

connectDB()

const app = express()

const port = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/goals', goalRouter)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is started on port ${port}`)
})
