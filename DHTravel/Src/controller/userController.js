const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const pathRoute = path.join(__dirname, "../database/users.json");
const file = fs.readFileSync(path.join(__dirname, '../database/users.json'), 'utf-8');
const allUsers = JSON.parse(file);


const userController = {
    register: (req, res) => {
        res.render('./users/register')
    },
    registerPost: (req, res) => {
        const resultValidation = validationResult(req);
        if(resultValidation.errors.length > 0) {
            res.render('./users/register', {
                errors: resultValidation.mapped(),
                oldData: req.body,
            })
        };
        const newId = allUsers[allUsers.length -1].id +1;
        const obj = {
            id: newId,
            image: req.file.filename,
            ...req.body
        };
        allUsers.push(obj);
        const usersJSON = JSON.stringify(allUsers, null, 4);
        fs.writeFileSync(pathRoute, usersJSON );
        res.redirect('/login');
    },
    login: (req, res) => {
        res.render('./users/login')
    },
};

module.exports = userController;