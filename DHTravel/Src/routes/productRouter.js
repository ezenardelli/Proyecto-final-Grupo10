const express = require('express');
const path = require('path');
const productRouter = express.Router();
const productController = require('../controller/productController');
const multer = require('multer');
const { body } = require('express-validator');

const productValidations = require('../middlewares/productValidationMiddelware');

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


productRouter.get('/carrito',authMiddleware, productController.cart);
productRouter.get('/detalle',authMiddleware, productController.detail);
productRouter.get('/products', productController.allProducts);

productRouter.get('/products/create', productController.createProducts);
productRouter.post('/products/create',upload.single('image'), productValidations, productController.createProductsPost);

productRouter.get('/products/:id', productController.productId);

productRouter.get('/products/:id/edit', productController.productIdEdit);
productRouter.put('/products/:id/edit',upload.single('image'), productController.productIdEditPut);

productRouter.get('/products/:id/delete', productController.productIdViewDelete);
productRouter.delete('/products/:id/delete', productController.productIdDelete);

module.exports = productRouter;

