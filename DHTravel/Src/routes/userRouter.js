const express = require('express');
const userRouter = express.Router();
const userController = require('../controller/userController');

userRouter.get('/registro', userController.register);
userRouter.get('/ingresa', userController.login);

module.exports = userRouter;