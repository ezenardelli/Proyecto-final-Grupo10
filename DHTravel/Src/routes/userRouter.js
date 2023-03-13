const express = require('express');
const path = require('path');
const userRouter = express.Router();
const userController = require('../controller/userController');
const multer = require('multer');
const { body } = require('express-validator');

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

const userValidations = [
    body('firstName').notEmpty().withMessage('Debe completar con sus nombres.'),
    body('lastName').notEmpty().withMessage('Debe completar con sus apellidos.'),
    body('email').notEmpty().withMessage('Debe especificar un email valido.'),
    body('category').notEmpty().withMessage('Elija una categoria.'),
    body('password').notEmpty().withMessage('Debe ingresar una contraseña.'),
    body('userImage').custom((value, { req }) => {
        let file = req.file;
        let acceptedFormat = ['.jpg', '.png'];
        if (!file){
            throw new Error('Debes subir una imagen de perfil.');
        } else {
            let fileExtension = path.extname(file.originalname);
            if(!acceptedFormat.includes(fileExtension)) {
                throw new Error(`Las extenciones permitidas son ${acceptedFormat.join(', ')}`)
            }
        }
        return true;
    }),
];

userRouter.get('/register', userController.register);
userRouter.post('/register',upload.single('userImage'), userValidations, userController.registerPost);

userRouter.get('/login', userController.login);

module.exports = userRouter;