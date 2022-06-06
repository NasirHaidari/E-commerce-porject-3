const fs = require('fs')
const mongoose = require('mongoose')
const colors = require('colors')
const dotenv = require('dotenv')

//load env variables
dotenv.config({ path: './config/config.env' })

//Load Models
const Store = require('./models/Store')
const Products = require('./models/Product')

//Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,

  useUnifiedTopology: true,
})

//Read JSON files
const stores = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/stores.json`, 'utf-8')
)
const products = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/products.json`, 'utf-8')
)

//Import data into DB
const importData = async () => {
  try {
    await Store.create(stores)
    await Products.create(products)
    console.log('Data Imported...'.green.inverse)
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

//Delete data from DB
const deleteData = async () => {
  try {
    await Store.deleteMany()
    await Products.deleteMany()
    console.log('Data Destroyed...'.red.inverse)
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

if (process.argv[2] === '-i') {
  importData()
} else if (process.argv[2] === '-d') {
  deleteData()
}
