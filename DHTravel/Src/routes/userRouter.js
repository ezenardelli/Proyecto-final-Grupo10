const express = require('express');
const path = require('path');
const userRouter = express.Router();
const userController = require('../controller/userController');
const multer = require('multer');
const { body } = require('express-validator');

const registerValidation = require('../middlewares/registerValidationMiddleware');
const loginValidation = require('../middlewares/loginValidateMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authentificationMiddleware');

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, path.join(__dirname, '../../public/img/users'))
    },
    filename: (req, file, cb) => {
        const newUserAvatar = `user-${Date.now()}_img${path.extname(file.originalname)}`
        cb(null,newUserAvatar);
    }
});

const upload = multer({storage});


userRouter.get('/register', guestMiddleware, userController.register);
userRouter.post('/register',upload.single('userImage'), registerValidation, userController.registerPost);

userRouter.get('/login',guestMiddleware, userController.login);
userRouter.post('/login',loginValidation, userController.loginPost);

userRouter.get('/profile/',authMiddleware, userController.profile);

userRouter.get('/logout/', userController.logout);

module.exports = userRouter;