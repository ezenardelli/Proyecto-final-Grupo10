const fs = require('fs');
const { validationResult } = require('express-validator');
const db = require('../database/models');

const productController = {
    cart: (req, res) => {
        res.render('./products/productCart')
    },
    detail: (req, res) => {
        res.render('./products/productDetail')
    },
    allProducts: (req, res) => {
        db.Product.findAll()
        .then((products) => {
            res.render('./products/allProducts', {products:products})
        })
        .catch((error) => {
            res.status(404).send(error)
        });
    },
    createProducts: (req, res) => {
        res.render('./products/productCreate')
    },
    createProductsPost: (req, res) => {
        const resultValidation = validationResult(req);
        if(resultValidation.errors.length > 0) {
            res.render('./products/productCreate', {
                errors: resultValidation.mapped(),
                oldData: req.body,
            })
        };
        const categoryId = req.body.category;
        
        const categoryType = db.Category.findByPk(categoryId);
        
        db.Product.create({
            name: req.body.name,
            image: req.body.filename,
            description: req.body.description,
            origin: req.body.origin,
            destination: req.body.destination,
            person: req.body.person,
            category_id: categoryType,
            date: req.body.date,
            price: req.body.price,
        });
        
        res.redirect('/');
        
    },
    productId: (req, res) => {
        db.Product.findByPk(req.params.id)
            .then((product) => {
                res.render('./products/productId', {product:product} )
            }).catch((error) => {
                res.status(500).send(error)
            });
    }, 
    productIdEdit: (req, res) => {
        db.Product.findByPk(req.params.id)
        .then((product) => {
            res.render('./products/productEdit', {product:product})
        })
        .catch((error) => {
            res.status(404).send(error)
        });
    },
    productIdEditPut: (req, res) => {
        let product = db.Product.findByPk(req.params.id);
        db.Product.update({
            name: req.body.name || product.name,
            image: req.body.filename || product.image,
            description: req.body.description || product.description,
            origin: req.body.origin || product.origin,
            destination: req.body.destination || product.destination,
            person: req.body.person || product.person,
            category_id: categoryType || product.category_id,
            date: req.body.date || product.date,
            price: req.body.price || product.price,
        }, {
            where: {
                id: req.params.id
            }
        });

        res.redirect('/');
    },
    productIdViewDelete: (req, res) => {
        // const {id} = req.params;
        // const products = allProducts.find(elem => elem.id === parseInt(id));
        // if (products){
        //     res.render('./products/productDelete', {allProducts:[products]});
        // }else{
        //     res.send('Product Not Found')
        // }
    },
    productIdDelete: (req, res) => {
        db.Product.destroy({
            where: {
                id: req.params.id
            }
        });
        
        res.redirect('/');
    },
};

module.exports = productController;