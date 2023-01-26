const productController = {
    cart: (req, res) => {
        res.render('./products/productCart')
    },
    detail: (req, res) => {
        res.render('./products/productDetail')
    },
    admin: (req, res) => {
        res.render('./products/productEdit')
    }
};

module.exports = productController;