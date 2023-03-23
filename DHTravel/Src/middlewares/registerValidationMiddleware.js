const path = require('path');
const { body } = require('express-validator');

module.exports = [
    body('firstName').notEmpty().withMessage('Debe completar con sus nombres.'),
    body('lastName').notEmpty().withMessage('Debe completar con sus apellidos.'),
    body('email').notEmpty().withMessage('Debe especificar un email valido.').bail()
    .isEmail().withMessage('Debes escribir un formato de correo válido'),
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