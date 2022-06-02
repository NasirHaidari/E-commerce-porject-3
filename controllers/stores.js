//GET all stores
//route : /api/v1/stores
exports.getStores = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'get all products' })
}

//GET a store
//route : /api/v1/stores/:id
exports.getStore = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `get specific store ${req.params.id}` })
}

//POST create new store
//route : /api/v1/store
exports.createProducts = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'create new store' })
}

//PUT update a store
//route : /api/v1/stores/:id
exports.updateProducts = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `update a stores ${req.params.id}` })
}

//DELETE a Store
//route : /api/v1/stores/:id
exports.deleteProducts = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `deleted a store with id ${req.params.id}` })
}
