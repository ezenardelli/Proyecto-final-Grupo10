const fs = require('fs');
const path = require('path');

const productController = {
    cart: (req, res) => {
        res.render('./products/productCart')
    },
    detail: (req, res) => {
        res.render('./products/productDetail')
    },
    admin: (req, res) => {
        res.render('./products/productCreate')
    },
    allProducts: (req, res) => {
        const file = fs.readFileSync(path.join(__dirname, '../database/products.json'), 'utf-8');
        const allProducts = JSON.parse(file);
        console.log(allProducts)
        res.render('./products/allProducts', {allProducts})
    },
    createProducts: (req, res) => {
        res.render('./products/productCreate')
    },
    postCreateProducts: (req, res) => {
        const {
            name,
            description,
            image,
            

            
        } = req.body;
    }
};

module.exports = productController;