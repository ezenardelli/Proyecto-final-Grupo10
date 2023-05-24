const express = require('express');
const userApiRouter = express.Router();
const userApiController = require('../../controller/api/userApi');

userApiRouter.get('/api/users',userApiController.getAllusers);
userApiRouter.get('/api/users/:id', userApiController.getUserbyId);

module.exports = userApiRouter;
