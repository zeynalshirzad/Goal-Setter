const path = require('path')
const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const goalRouter = require('./routes/goalRoutes')
const userRouter = require('./routes/userRoutes')
const { errorHandler } = require('./middlewares/errorMiddleware')
const connectDB = require('./config/db')

connectDB()

const app = express()

const port = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/goals', goalRouter)
app.use('/api/users', userRouter)

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))
  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  )
}

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is started on port ${port}`)
})
