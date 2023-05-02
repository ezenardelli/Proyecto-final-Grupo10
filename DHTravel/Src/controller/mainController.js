const db = require('../database/models');
const op = db.Sequelize.Op;

const mainController = {
    index: async (req, res) => {
        try {
            let products = await db.Product.findAll();
            let user = req.session.userLogged; 
            return res.render('./products/index', { products,user });
        } catch (error) {
            return res.send(error);
        };
    },
    contact: () => { 
    },
};

module.exports = mainController;