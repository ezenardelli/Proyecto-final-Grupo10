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
            res.render('./products/productEdit', {allProducts:[products]});
        }else{
            res.send('Product Not Found')
        }
    },
    productIdEditPut: (req, res) => {
        const {id} = req.params;
        let product = allProducts.find(elem => elem.id === parseInt(id));
            product.name = req.body.name || product.name;
            product.image = req.body.image || product.image;
            product.description = req.body.description || product.description;
            product.origin = req.body.origin || product.origin;
            product.destination = req.body.destination || product.destination;
            product.person = req.body.person || product.person;
            product.category = req.body.category || product.category;
            product.date = req.body.date || product.date;
            product.price = req.body.price || product.price;
        const productPut = allProducts.filter(elem => elem.id !== parseInt(id));
        productPut.push(product);
        const productJSON = JSON.stringify(allProducts, null, 4);
        fs.writeFileSync(pathRoute, productJSON );
        res.redirect('/');
    },
    productIdViewDelete: (req, res) => {
        res.render('./products/productDelete')
    },
    productIdDelete: (req, res) => {
    const {id} = req.params;
    let productDelete = allProducts.filter(elem => elem.id !== parseInt(id));
        productDelete.push(product);
        const productJSON = JSON.stringify(allProducts, null, 4);
        fs.writeFileSync(pathRoute, productJSON );
        res.redirect('/');
    },
};

module.exports = productController;