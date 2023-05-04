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
const adminMiddleware = require('../middlewares/adminMiddleware');


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

userRouter.get('/users/listall', adminMiddleware, userController.getAllUsers);

userRouter.get('/user/create',adminMiddleware, userController.getUserCreate);
userRouter.post('/user/create', upload.single('image'), registerValidation, userController.userCreate);

userRouter.get('/user/:id', adminMiddleware, userController.getUser);

userRouter.get('/user/:id/edit', adminMiddleware, userController.getUserEdit);
userRouter.put('/user/:id/edit', upload.single('image'), userController.userEdit);

userRouter.delete('/user/:id', userController.userDelete);

userRouter.get('/register', guestMiddleware, userController.register);
userRouter.post('/register', upload.single('image'), registerValidation, userController.registerPost);

userRouter.get('/login',guestMiddleware, userController.login);
userRouter.post('/login',loginValidation, userController.loginPost);

userRouter.get('/profile',authMiddleware, userController.profile);
userRouter.get('/profile/edit',authMiddleware, userController.getProfile);
userRouter.put('/profile/:id/edit', upload.single('image'), authMiddleware, userController.profileEdit);

userRouter.get('/profile/logout/', userController.logout);

module.exports = userRouter;