const express = require('express');
const mainRouter = express.Router();
const mainController = require('../controller/mainController');

mainRouter.get('/', mainController.index);
mainRouter.get('/Terms', mainController.terms);
mainRouter.get('/Q&A', mainController.frecuent);
mainRouter.get('/Contact', mainController.contact);
mainRouter.get('/About-us', mainController.aboutus);
mainRouter.get('/HHRR', mainController.hhrr);
mainRouter.get('/Payment-method', mainController.payment);

module.exports = mainRouter;
