const { allProducts } = require("./productController");

const mainController = {
    index: (req, res) => {
        res.render('./products/index', {allProducts: allProducts})
    },
    contact: () => { 
    },
};

module.exports = mainController;