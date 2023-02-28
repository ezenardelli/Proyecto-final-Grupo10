const fs = require('fs');
const path = require('path');
const pathRoute = path.join(__dirname, "../database/products.json");
const file = fs.readFileSync(path.join(__dirname, '../database/products.json'), 'utf-8');
const allProducts = JSON.parse(file);
const productJSON = JSON.stringify(allProducts, null, 4);

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
        const newId = allProducts[allProducts.length -1].id +1;
        const obj = {
            id: newId,
            ...req.body
        };
        allProducts.push(obj);
        fs.writeFileSync(pathRoute, productJSON );
        res.redirect('/');
    },
    productId: (req, res) => {
        const {id} = req.params;
        const products = allProducts.find(elem => elem.id === parseInt(id));
        if (products){
            res.render('./products/productId', {allProducts:[products]});
        }else{
            res.send('Product Not Found')
        }
    },
    productIdEdit: (req, res) => {
        const {id} = req.params;
        const products = allProducts.find(elem => elem.id === parseInt(id));
        if (products){
            res.render('./products/productEdit', {allProducts:[products]});
        }else{
            res.send('Product Not Found')
        }
    },
    productIdEditPut: (req, res) => {
        allProducts.forEach(elem => {
            if(elem.id == req.body.id){
                elem.name = req.body.name;
                elem.person = req.body.person;
            }
        });
        res.redirect('/products')
    },
    productIdDelete: (req, res) => {res.send('not')}
};

module.exports = productController;