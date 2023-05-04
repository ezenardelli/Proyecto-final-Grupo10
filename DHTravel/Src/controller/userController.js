const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const db = require('../database/models');
const op = db.Sequelize.Op;

const userController = {
    register: (req, res) => {
        res.render('./users/register')
    },

    login: (req, res) => {
        res.render('./users/login')
    },

    registerPost: async (req, res) => {

        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render('./users/register', {
                errors: resultValidation.mapped(),
                oldData: req.body,
            });
        }
    
        try {
            if (!resultValidation.isEmpty()) {
                return res.render('./users/register', {
                    errors: resultValidation.array(),
                    prev: req.body
                });
            } else {
                // const userExist = await db.User.findOne({ where: { email: req.body.email } })
                // if (userExist) {
                //     return res.send('El usuario ya se encuentra registrado');
                // } else {
                    const newUser = {
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        category: req.body.category,
                        image: req.file.filename,
                        password: bcrypt.hashSync(req.body.password, 10)
                    };
                    await db.User.create(newUser);
    
                    return res.redirect('/login');
                }
            // }
        } catch (error) {
            return res.send(error);
        }
    },
    

    loginPost: async (req, res) => {
        const { email, password } = req.body;
        const errors = validationResult(req);
        if (errors.errors.length > 0) {
            return res.render('./users/login', {
                errors: errors.mapped(),
                oldData: req.body,
            })
        };

        try {
            if (!errors.isEmpty()) {
                return res.render('./users/login', {
                    'errors': errors.array(),
                    'prev': req.body
                });
            } else {
                const userLogin = await db.User.findOne({ where: { email: email } });
                if (userLogin) {
                    const enterPassword = bcrypt.compareSync(password, userLogin.password);
                    if (enterPassword) {
                        req.session.userLogged = userLogin;
                        if (req.body.rememberUser) {
                            res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 });
                        }
                        return res.redirect('/');
                    } else {
                        return res.send('Correo electrónico o contraseña incorrecta');
                    }
                } else {
                    return res.send('Correo electrónico o contraseña incorrecta');
                }
            }


        } catch (error) {
            return res.send(error);
        }
    },

    profile: (req, res) => {
        return res.render('./users/userProfile', {
            user: req.session.userLogged
        });
    },

    getProfile: (req, res) => {
        return res.render('./users/profileEdit', {
            user: req.session.userLogged
        });
    },

    profileEdit: async (req, res) => {
        try {
            const user = await db.User.findByPk(req.params.id);
            let image = req.file ? req.file.filename : user.image;
            await db.User.update({
                firstName: req.body.firstName || user.firstName,
                lastName: req.body.lastName || user.lastName,
                email: req.body.email || user.email,
                category: req.body.category || user.category,
                image: image,
            }, {
                where: {
                    id: req.params.id
                }
            });
            res.redirect('/profile');

        } catch (error) {
            return res.send(error);
        }
    },

    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        res.redirect('/');
    },

    getAllUsers: async (req, res) => {
        try {
            const user = await db.User.findAll();
            return res.render('./users/allusers', { user });
        } catch (error) {
            return res.send(error);
        };
    },

    getUser: async (req, res) => {
        try {
            const user = await db.User.findByPk(req.params.id);
            return res.render('./users/userDetail', { user });
        } catch (error) {
            return res.send(error);
        };
    },

    getUserEdit: async (req, res) => {
        try {
            const user = await db.User.findByPk(req.params.id);
            return res.render('./users/userEdit', { user });
        } catch (error) {
            return res.send(error);
        };

    },

    userEdit: async (req, res) => {
        try {
            const user = await db.User.findByPk(req.params.id);
            let image = req.file ? req.file.filename : user.image;
            await db.User.update({
                firstName: req.body.firstName || user.firstName,
                lastName: req.body.lastName || user.lastName,
                email: req.body.email || user.email,
                category: req.body.category || user.category,
                image: image
            }, {
                where: {
                    id: req.params.id
                }
            });
            res.redirect('/users/listall');

        } catch (error) {
            return res.send(error);
        }
    },

    getUserCreate: (req, res) => {
        res.render('./users/userCreate')
    },

    userCreate: (req, res) => {
        async (req, res) => {

            const resultValidation = validationResult(req);
            if (resultValidation.errors.length > 0) {
                return res.render('./users/userCreate', {
                    errors: resultValidation.mapped(),
                    oldData: req.body,
                });
            }
        
            try {
                if (!resultValidation.isEmpty()) {
                    return res.render('./users/userCreate', {
                        errors: resultValidation.array(),
                        prev: req.body
                    });
                } else {
                    // const userExist = await db.User.findOne({ where: { email: req.body.email } })
                    // if (userExist) {
                    //     return res.send('El usuario ya se encuentra registrado');
                    // } else {
                        const newUser = {
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            category: req.body.category,
                            image: req.file.filename,
                            password: bcrypt.hashSync(req.body.password, 10)
                        };
                        await db.User.create(newUser);
        
                        return res.redirect('/users/listall');
                    }
                // }
            } catch (error) {
                return res.send(error);
            }
    }
},

    userDelete: (req, res) => {
        db.User.destroy({
            where: {
                id: req.params.id
            }
        });

        res.redirect('/users/listall');
    },

};

module.exports = userController;

