const fs = require('fs');
const path = require('path');
const pathRoute = path.join(__dirname, "../database/products.json");
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
        const newId = allProducts[allProducts.length -1].id +1;
        const obj = {
            id: newId,
            ...req.body
        };
        allProducts.push(obj);
        const productJSON = JSON.stringify(allProducts, null, 4);
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
            res.render('./products/productCreate2', {allProducts:[products]});
        }else{
            res.send('Product Not Found')
        }
    },
    productIdEditPut: (req, res) => {
        const {id} = req.params;
        let products = allProducts.find(elem => elem.id === parseInt(id));
            products.name = req.body.name;
            products.image = req.body.image;
            products.description = req.body.description;
            products.origin = req.body.origin;
            products.destination = req.body.destination;
            products.person = req.body.person;
            products.category = req.body.category;
            products.date = req.body.date;
            products.price = req.body.price || products.price;
        const product2 = allProducts.filter(elem => elem.id !== parseInt(id));
        product2.push(products);
        const productJSON = JSON.stringify(allProducts, null, 4);
        fs.writeFileSync(pathRoute, productJSON );
        res.redirect('/');
    },
    productIdDelete: (req, res) => {res.send('not')}
};

module.exports = productController;