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
productRouter.get('/products/listall', productController.allProducts);

productRouter.get('/product/create', productController.createProducts);
productRouter.post('/product/create', upload.single('image'), productValidations, productController.createProductsPost);

productRouter.get('/product/:id', productController.productId);

productRouter.get('/product/:id/edit', productController.productIdEdit);
productRouter.put('/product/:id/edit',upload.single('image'), productController.productIdEditPut);

productRouter.delete('/product/:id', productController.productIdDelete);

module.exports = productRouter;

