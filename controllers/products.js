const Product = require('../models/Product')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')

//GET all products
//route : /api/v1/products
exports.getProducts = asyncHandler(async (req, res, next) => {
  console.log('req.query', req.query)
  let query

  // Copy req.query
  const reqQuery = { ...req.query }

  // Fields to exclude
  const removeFields = ['select']

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param])

  console.log(req.query)

  // Create query string
  let queryStr = JSON.stringify(reqQuery)

  // Create operators ($gt, $gte, $lt, $lte)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`)

  // Finding resources
  query = Product.find(JSON.parse(queryStr))
  //const products = await Product.find(queryStr)

  // Exclude query
  const products = await query

  res
    .status(200)
    .json({ success: true, length: products.length, data: products })
})

//GET a product
//route : /api/v1/products/:id
exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    return new ErrorResponse(
      `Product not found with id of ${req.params.id}`,
      404
    )
  }
  res.status(200).json({ success: true, data: product })
})

//POST create new product
//route : /api/v1/products
exports.createProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body)
  res.status(201).json({ success: true, data: product })
})

//PUT update a product
//route : /api/v1/products/:id
exports.updateProducts = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!product) {
    return new ErrorResponse(
      `Product not found with id of ${req.params.id}`,
      404
    )
  }
  res.status(200).json({ success: true, data: product })
})

//DELETE a product
//route : /api/v1/products/:id
exports.deleteProducts = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id)
  if (!product) {
    return new ErrorResponse(
      `Product not found with id of ${req.params.id}`,
      404
    )
  }
  res.status(200).json({ success: true, data: product })
})
