const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
//Route files
const products = require('./routes/products')
dotenv.config({ path: './config/config.env' })

const app = express()
// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

//Mount routers
app.use('/api/v1/products', products)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(
    `Server running on port  ${PORT} , running on ${process.env.NODE_ENV} mode`
  )
})
