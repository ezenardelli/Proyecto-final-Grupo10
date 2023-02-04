const express = require('express');
const mainRouter = express.Router();
const mainController = require('../controller/mainController');

mainRouter.get('/', mainController.index);

module.exports = mainRouter;
