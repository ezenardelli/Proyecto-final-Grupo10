const express = require('express');
const userApiRouter = express.Router();
const userApiController = require('../controller/userApi');

userApiRouter.get('/api/users',userApiController.getAllusers);
userApiRouter.get('/api/users/:id', userApiController.getUserbyId);

module.exports = userApiRouter;
