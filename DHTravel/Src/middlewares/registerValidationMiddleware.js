const path = require('path');
const { body } = require('express-validator');
const db = require('../database/models');

module.exports = [
    body('firstName').notEmpty().withMessage('Debe completar con su nombre/s.')
    .isLength({min:2}).withMessage('Debe contener al menos 2 caracteres.'),
    body('lastName').notEmpty().withMessage('Debe completar con su apellido/s.'),
    body('email').notEmpty().withMessage('Debe especificar un email valido.').bail()
    .isEmail().withMessage('Debes escribir un formato de correo válido'),
    // .custom(async (value) => {
    //     const user = await db.User.findOne({where: {email : value}});
    //     if (user) {
    //         return Promise.reject('El email ya se encuentra en uso');
    //     } else {
    //         return Promise.resolve();
    //     }
    // }),
    body('category').notEmpty().withMessage('Elija una categoria.'),
    body('password').notEmpty().withMessage('Debe ingresar una contraseña.')
    .isLength({min:8}).withMessage('Debe contener al menos 8 caracteres.')
    .isStrongPassword({ 
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        returnScore: false,
        pointsPerUnique: 1,
        pointsPerRepeat: 0.5,
        pointsForContainingLower: 10,
        pointsForContainingUpper: 10,
        pointsForContainingNumber: 10,
        pointsForContainingSymbol: 10
    }).withMessage('Debe contener una letra minuscula, una mayuscula, un numero y un caracter especial.'),
    body('image').custom((value, { req }) => {
        let file = req.file;
        let acceptedFormat = ['.jpg', '.png', '.jpeg', '.gif'];
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