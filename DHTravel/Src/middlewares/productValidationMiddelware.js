const path = require('path');
const { body } = require('express-validator');

module.exports = [
    body('name').notEmpty().withMessage('Debe completar el nombre del paquete.')
    .isLength({min:5}).withMessage('Debe contener al menos 5 caracteres.'),
    body('description').notEmpty().withMessage('Debe completar la descripcion.')
    .isLength({min:20}).withMessage('Debe contener al menos un descripcion de 20 caracteres.'),
    body('origin').notEmpty().withMessage('Debe especificar el origen.'),
    body('destination').notEmpty().withMessage('Debe especificar el destino.'),
    body('person').notEmpty().withMessage('Debe especificar la cantidad de personas incluidas.'),
    body('category').notEmpty().withMessage('Debe especificar la categoria.'),
    body('date').notEmpty().withMessage('Debe completar una fecha valida.'),
    body('price').notEmpty().withMessage('Debe especificar el valor del paquete.'),
    body('image').custom((value, { req }) => {
        let file = req.file;
        let acceptedFormat = ['.jpg', '.png', '.jpeg', '.gif'];
        if (!file){
            throw new Error('Debes subir una imagen.');
        } else {
            let fileExtension = path.extname(file.originalname);
            if(!acceptedFormat.includes(fileExtension)) {
                throw new Error(`Las extenciones permitidas son ${acceptedFormat.join(', ')}`)
            }
        }
        return true;
    }),
];