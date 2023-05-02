const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controller/adminController');


adminRouter.get('/you-shall-not-pass!', adminController.notPermission);


module.exports = adminRouter;