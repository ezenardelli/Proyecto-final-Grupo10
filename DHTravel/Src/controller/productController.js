const fs = require('fs');
const { validationResult } = require('express-validator');
const db = require('../database/models');
const op = db.Sequelize.Op;

const productController = {
    cart: (req, res) => {
        res.render('./products/productCart')
    },
    detail: (req, res) => {
        db.Product.findByPk(req.params.id)
            .then((product) => {
                res.render('./products/productDetail', {products:product} )
            }).catch((error) => {
                res.status(500).send(error)
            });
    },
    allProducts: async (req, res) => {
        await db.Product.findAll()
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
    createProductsPost: async (req, res) => {
        try{
            const resultValidation = validationResult(req);
        if(resultValidation.errors.length > 0) {
            res.render('./products/productCreate', {
                errors: resultValidation.mapped(),
                oldData: req.body,
            })
        }else{
        
        await db.Product.create({
            name: req.body.name,
            image: req.file.filename,
            description: req.body.description,
            origin: req.body.origin,
            destination: req.body.destination,
            person: req.body.person,
            category_id: req.body.category,
            date: req.body.date,
            price: req.body.price,
        });
        
        res.redirect('/products/listall');
    }
        } catch (error) {
            res.send(error)
        }
        
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
        let image = req.file ? req.file.filename : product.image;
        db.Product.update({
            name: req.body.name || product.name,
            image: image,
            description: req.body.description || product.description,
            origin: req.body.origin || product.origin,
            destination: req.body.destination || product.destination,
            person: req.body.person || product.person,
            category_id: req.body.category || product.category,
            date: req.body.date || product.date,
            price: req.body.price || product.price,
        }, {
            where: {
                id: req.params.id
            }
        });

        res.redirect('/products/listall');
    },
    productIdViewDelete: (req, res) => {
        db.Product.findByPk(req.params.id)
        .then((product) => {
            res.render('./products/productDelete', {product:product})
        })
        .catch((error) => {
            res.status(404).send(error)
        });
    },
    productIdDelete: (req, res) => {
        db.Product.destroy({
            where: {
                id: req.params.id
            }
        });
        
        res.redirect('/products/listall');
    },
};

module.exports = productController;