const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const fs = require('fs');
const path = require('path');
const file = fs.readFileSync(path.join(__dirname, '../database/users.json'), 'utf-8');
const user = JSON.parse(file);


const userController = {
    register: (req, res) => {
        res.render('./users/register')
    },

    login: (req, res) => {
        res.render('./users/login')
    },

    registerPost: (req, res) => {
        const {
            firstName,
            lastName,
            image,
            email,
            category,
            password
        }=req.body;
        
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            res.render('./users/register', {
                errors: resultValidation.mapped(),
                oldData: req.body,
            })
        };
        
        if(resultValidation.isEmpty()){
            const userExist = User.findByField("email", email)
            if(userExist){
                res.send('El usuario ya se encuentra registrado');
            }else{
                const obj = {
                    ...req.body,
                    image: req.file.filename,
                    password: bcrypt.hashSync(password, 10)
                }
                User.create(obj);
                
                res.redirect('/login');
            }
        }else{
            res.render('./users/register',{
                'errors':resultValidation.array(),
                'prev': req.body
            })
        }
    },

    loginPost: (req,res) => {
        const {
            email,
            password
        }=req.body;

        const errors = validationResult(req);
        if(errors.isEmpty()){
            const userLogin = User.findByField('email',email);
            if(userLogin){
                const enterPassword = bcrypt.compareSync(password,userLogin.password);
                if(enterPassword){
                    //delete userLogin.password;
                    req.session.userLogged = userLogin;
                    // if(req.body.remember_user) {
                    //     res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
                    // }
                    
                    return res.redirect('/profile')
                    
                }else{
                    return res.send('Correo electronico o contraseña incorrecta');
                }
            }
            res.send('Por favor registrese.')
        }else{
            res.render('./users/login',{
                'errors':errors.array(),
                'prev': req.body
            })
        }
    },

    profile: (req, res) => {
		return res.render('./users/userProfile', {
			user: req.session.userLogged
		});
	},

    logout: (req,res) => {
        // res.clearCookie('');
        req.session.destroy();
        res.redirect('/');
    }
};

module.exports = userController;

