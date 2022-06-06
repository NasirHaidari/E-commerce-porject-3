const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB = require('./config/db')
const colors = require('colors')
const errorHandler = require('./middleware/error')

//Load env vars
dotenv.config({ path: './config/config.env' })

//Route files
const products = require('./routes/products')
const stores = require('./routes/stores')

const app = express()

// Body parser
app.use(express.json())

//Connect to database
connectDB()
// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

//Mount routers
app.use('/api/v1/products', products)
app.use(errorHandler)

//Mount Stores
app.use('/api/v1/stores', stores)

const PORT = process.env.PORT || 5000

// Start server
const server = app.listen(PORT, () => {
  console.log(
    `Server running on port  ${PORT} , running on ${process.env.NODE_ENV} mode`
      .black.bold.bgWhite
  )
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log('Error:'.yellow, err.message)
  // Close server & exit process
  server.close(() => {
    process.exit(1)
  })
})
