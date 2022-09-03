const express = require('express')
const { errorHandler } = require('./middlewares/errorMiddleware')
const goalRouter = require('./routes/goalRoutes')
const dotenv = require('dotenv').config()

const app = express()

const port = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/goals', goalRouter)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is started on port ${port}`)
})
