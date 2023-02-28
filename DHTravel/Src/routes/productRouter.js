const express = require('express');
const path = require('path');
const productRouter = express.Router();
const productController = require('../controller/productController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, path.join(__dirname, '../../public/img/productImage'))
    },
    filename: (req, file, cb) => {
        const newProductFile = `product-${Date.now()}_img${path.extname(file.originalname)}`
        cb(null,newProductFile);
    }
});

const upload = multer({storage});

productRouter.get('/carrito', productController.cart);
productRouter.get('/detalle', productController.detail);
productRouter.get('/products', productController.allProducts);

productRouter.get('/products/create', productController.createProducts);
productRouter.post('/products/create',upload.single('image'), productController.createProductsPost);

productRouter.get('/products/:id', productController.productId);
productRouter.get('/products/:id/edit', productController.productIdEdit);
productRouter.post('/products/:id/edit',upload.single('image'), productController.productIdEditPut);
productRouter.delete('/products/:id', productController.productIdDelete);

module.exports = productRouter;

