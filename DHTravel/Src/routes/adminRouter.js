const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controller/adminController');

adminRouter.get('/admin', adminController.admin);

module.exports = adminRouter;