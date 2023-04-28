const db = require('../database/models');
const op = db.Sequelize.Op;

const adminController ={
    notPermission: (req, res) => {
        return res.render('./main/youShallNotPass')
    }
};

module.exports = adminController;

