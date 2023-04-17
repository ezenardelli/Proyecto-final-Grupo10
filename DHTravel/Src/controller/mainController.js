const db = require('../database/models');
const op = db.Sequelize.Op;

const mainController = {
    index: async (req, res) => {
        try {
            let products = await db.Product.findAll();
            return res.render('./products/index', { products });
        } catch (error) {
            return res.send(error);
        };
    },
    contact: () => { 
    },
};

module.exports = mainController;