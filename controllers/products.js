//GET all products
//route : /api/v1/products
exports.getProducts = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'get all products' })
}

//GET a product
//route : /api/v1/products/:id
exports.getProduct = (req, res, next) => {
  res.status(200).json({ success: true, msg: `get specific ${req.params.id}` })
}

//POST create new product
//route : /api/v1/products
exports.createProducts = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'create new product' })
}

//PUT update a product
//route : /api/v1/products/:id
exports.updateProducts = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `update a product ${req.params.id}` })
}

//DELETE a product
//route : /api/v1/products/:id
exports.deleteProducts = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `deleted a product with id ${req.params.id}` })
}
