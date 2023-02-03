const express = require('express');
const productRouter = express.Router();
const productController = require('../controller/productController');

productRouter.get('/carrito', productController.cart);
productRouter.get('/detalle', productController.detail);

productRouter.get('/products', productController.allProducts);

productRouter.get('/products/:id', productController.productId);
productRouter.get('/products/:id/edit', productController.productIdEdit);
productRouter.put('/products/:id', productController.ProductIdEdit);
productRouter.delete('/products/:id', productController.productIdDelete);

productRouter.get('/products/create', productController.createProducts);
productRouter.post('/products/create', productController.postCreateProducts);


module.exports = productRouter;