const { body } = require('express-validator');

module.exports = [
    body('email').notEmpty().withMessage('Debe ingresar un email valido.').bail()
    .isEmail().withMessage('Debes escribir un formato de correo válido'),
    body('password').notEmpty().withMessage('Debe ingresar una contraseña.'),
];
