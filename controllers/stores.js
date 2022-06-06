const Store = require('../models/Store')
const geocoder = require('../utils/geocoder')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')

//GET all Stores
//route : /api/v1/stores
exports.getStores = asyncHandler(async (req, res, next) => {
  const stores = await Store.find()
  res.status(200).json({ success: true, length: stores.length, data: stores })
})

//GET  get Stores with radius
//route : /api/v1/stores/radius/:zipcode/:distance/:unit

exports.getStoresInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode)
  console.log(loc)
  const lat = loc[0].latitude
  const lng = loc[0].longitude

  // Calc radius using radians
  // Divide dist by radius of Earth
  // Earth Radius = 3,963 mi / 6,378 km
  const radius = distance / 6378.137 // radius in km

  const stores = await Store.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  })
  res.status(200).json({ success: true, length: stores.length, data: stores })
})

//GET a Store
//route : /api/v1/stores/:id
exports.getStore = asyncHandler(async (req, res, next) => {
  const store = await Store.findById(req.params.id)

  if (!store) {
    return new ErrorResponse(`Store not found with id of ${req.params.id}`, 404)
  }
  res.status(200).json({ success: true, data: store })
})

//POST create new Store
//route : /api/v1/stores
exports.createStore = asyncHandler(async (req, res, next) => {
  const store = await Store.create(req.body)
  res.status(201).json({ success: true, data: store })
})

//PUT update a store
//route : /api/v1/stores/:id
exports.updateStore = asyncHandler(async (req, res, next) => {
  const store = await Store.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!store) {
    return new ErrorResponse(`Store not found with id of ${req.params.id}`, 404)
  }
  res.status(200).json({ success: true, data: store })
})

//DELETE a store
//route : /api/v1/stores/:id
exports.deleteStore = asyncHandler(async (req, res, next) => {
  console.log('params', req.params)
  const store = await Store.findByIdAndDelete(req.params.id)
  if (!store) {
    return new ErrorResponse(`Store not found with id of ${req.params.id}`, 404)
  }
  res.status(200).json({ success: true, data: store })
})
