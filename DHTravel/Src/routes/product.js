const express = require('express');
const productRouter = express.Router();
const productController = require('../controller/productController');

productRouter.get('/carrito', productController.cart);
productRouter.get('/detalle', productController.detail);

module.exports = productRouter;