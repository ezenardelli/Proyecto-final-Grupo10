const fs = require('fs');
const path = require('path');

const file = fs.readFileSync(path.join(__dirname, '../database/products.json'), 'utf-8');
const allProducts = JSON.parse(file);

const productController = {
    cart: (req, res) => {
        res.render('./products/productCart')
    },
    detail: (req, res) => {
        res.render('./products/productDetail')
    },
    allProducts: (req, res) => {
        res.render('./products/allProducts', {allProducts})
    },
    createProducts: (req, res) => {
        res.render('./products/productCreate')
    },
    createProductsPost: (req, res) => {
        const {
            name,
            image,
            description,
            origin,
            destination,
            person,
            category,
            date,
            price,
        } = req.body;
    },
    productId: (req, res) => {
        const {id} = req.params;
        const products = allProducts.find(elem => elem.id === parseInt(id));
        if (products){
            res.render('./products/productId', {allProducts});
        }else{
            res.send('Product Not Found')
        }
    },
    productIdEdit: (req, res) => {
        const {id} = req.params;
        const products = allProducts.find(elem => elem.id === parseInt(id));
        if (products){
            res.render('./products/productId', {allProducts});
        }else{
            res.send('Product Not Found')
        }
    },
    productIdEditPut: (req, res) => {
        
    },
    productIdDelete: (req, res) => {res.send('not')}
};

module.exports = productController;