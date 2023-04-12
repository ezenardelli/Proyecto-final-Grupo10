const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const db = require('../database/models');


const userController = {
    register: (req, res) => {
        res.render('./users/register')
    },

    login: (req, res) => {
        res.render('./users/login')
    },

    registerPost: (req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            res.render('./users/register', {
                errors: resultValidation.mapped(),
                oldData: req.body,
            })
        };
        if (!resultValidation.isEmpty()) {
            res.render('./users/register', {
                'errors': resultValidation.array(),
                'prev': req.body
            })
        }
        db.User.findOne({ where: { email: req.body.email } })
            .then((userExist) => {
                if (userExist) {
                    return res.send('El usuario ya se encuentra registrado');
                }
                const newUser = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    category: req.body.category,
                    image: req.file.filename,
                    password: bcrypt.hashSync(req.body.password, 10)
                };
                db.User.create(newUser)
                    .then(() => {
                        res.redirect('/login');
                    });
            })
    },

    loginPost: (req, res) => {
        const {
            email,
            password
        } = req.body;

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            db.User.findOne({ where: { email: req.body.email } })
                .then((userLogin) => {
                    if (userLogin) {
                        const enterPassword = bcrypt.compareSync(password, userLogin.password);
                        if (enterPassword) {
                            delete userLogin.password;
                            req.session.userLogged = userLogin;
                            if (req.body.rememberUser) {
                                res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
                            }

                            return res.redirect('/')

                        } else {
                            return res.send('Correo electronico o contraseña incorrecta');
                        }
                    }
                    return res.send('Por favor registrese.')
                });
        } else {
            res.render('./users/login', {
                'errors': errors.array(),
                'prev': req.body
            })
        }
    },

    profile: (req, res) => {
        return res.render('./users/userProfile', {
            user: req.session.userLogged
        });
    },

    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        res.redirect('/');
    },

    getAllUsers: (req, res) => {
        db.Users.findAll()
            .then((user) => {
                res.send({ user: user })
            })
    }
};

module.exports = userController;

