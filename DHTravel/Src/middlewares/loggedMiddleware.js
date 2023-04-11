const db = require('../database/models');

loggedMiddleware = (req, res, next) => {
	res.locals.isLogged = false;
	let userFromCookie;
	let emailInCookie = req.cookies.userEmail;
	if(emailInCookie) {
	userFromCookie = db.User.findOne({where: {
		email: emailInCookie
	}})}

	if (userFromCookie) {
		req.session.userLogged = userFromCookie;
	}

	if (req.session.userLogged) {
		res.locals.isLogged = true;
		res.locals.userLogged = req.session.userLogged;
	}
	next();
}

module.exports = loggedMiddleware;