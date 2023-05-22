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
    contact: (req, res) => { 
        return res.render('./main/contact')
    },
    terms: (req, res) => { 
        return res.render('./main/terms')
    },
    frecuent: (req, res) => { 
        return res.render('./main/q&a')
    },
    hhrr: (req, res) => { 
        return res.render('./main/hhrr')
    },
    aboutus: (req, res) => { 
        return res.render('./main/about-us')
    },
    payment: (req, res) => { 
        return res.render('./main/paymentMethod')
    },
};

module.exports = mainController;