const express = require('express');
const path = require('path');
const productRouter = express.Router();
const productController = require('../controller/productController');
const multer = require('multer');
const { body } = require('express-validator');

const productValidations = require('../middlewares/productValidationMiddelware');
const adminMiddleware = require('../middlewares/adminMiddleware');

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


productRouter.get('/cart',authMiddleware, productController.cart);
productRouter.get('/product/:id/detail', productController.detail);
productRouter.get('/products/listall', adminMiddleware, productController.allProducts);

productRouter.get('/product/create', adminMiddleware, productController.createProducts);
productRouter.post('/product/create', upload.single('image'), productValidations, productController.createProductsPost);

productRouter.get('/product/:id', adminMiddleware, productController.productId);

productRouter.get('/product/:id/edit', adminMiddleware, productController.productIdEdit);
productRouter.put('/product/:id/edit',upload.single('image'), productController.productIdEditPut);

productRouter.delete('/product/:id', productController.productIdDelete);

module.exports = productRouter;

