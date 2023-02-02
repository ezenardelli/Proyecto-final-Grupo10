const express = require('express');
const productRouter = express.Router();
const productController = require('../controller/productController');

productRouter.get('/carrito', productController.cart);
productRouter.get('/detalle', productController.detail);

productRouter.get('/productos', productController.allProducts);
productRouter.get('/productos/crear', productController.createProducts);

productRouter.post('/productos/crear', productController.createProducts);



module.exports = productRouter;