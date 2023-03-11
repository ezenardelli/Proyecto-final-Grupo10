const express = require('express');
const path = require('path');
const productRouter = express.Router();
const productController = require('../controller/productController');
const multer = require('multer');
const { body } = require('express-validator');

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

const validations = [
    body('name').notEmpty().withMessage('Debe completar el nombre del paquete.'),
    body('description').notEmpty().withMessage('Debe completar la descripcion.'),
    body('origin').notEmpty().withMessage('Debe especificar el origen.'),
    body('destination').notEmpty().withMessage('Debe especificar el destino.'),
    body('person').notEmpty().withMessage('Debe especificar la cantidad de personas incluidas.'),
    body('category').notEmpty().withMessage('Debe especificar la categoria.'),
    body('date').notEmpty().withMessage('Debe completar una fecha valida.'),
    body('price').notEmpty().withMessage('Debe especificar el valor del paquete.'),
    body('image').custom((value, { req }) => {
        let file = req.file;
        let acceptedFormat = ['.jpg', '.png'];
        if (!file){
            throw new Error('Debes subir una imagen.');
        } else {
            let fileExtension = path.extname(file.originalname);
            if(!acceptedFormat.includes(fileExtension)) {
                throw new Error(`Las extenciones permitidas son ${acceptedFormat.join(', ')}`)
            }
        }
        return true;
    }),
];


productRouter.get('/carrito', productController.cart);
productRouter.get('/detalle', productController.detail);
productRouter.get('/products', productController.allProducts);

productRouter.get('/products/create', productController.createProducts);
productRouter.post('/products/create',upload.single('image'), validations, productController.createProductsPost);

productRouter.get('/products/:id', productController.productId);

productRouter.get('/products/:id/edit', productController.productIdEdit);
productRouter.put('/products/:id/edit',upload.single('image'), productController.productIdEditPut);

productRouter.get('/products/:id/delete', productController.productIdViewDelete);
productRouter.delete('/products/:id/delete', productController.productIdDelete);

module.exports = productRouter;

