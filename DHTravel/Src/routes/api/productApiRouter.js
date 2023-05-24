const express = require('express');
const productApiRouter = express.Router();
const productApiController = require('../../controller/api/productApi');

productApiRouter.get('/api/products', productApiController.getAllProducts);
productApiRouter.get('/api/products/:id', productApiController.getProductById);

module.exports = productApiRouter;
