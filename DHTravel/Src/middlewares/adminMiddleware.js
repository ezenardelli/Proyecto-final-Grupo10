adminMiddleware =  (req, res, next) => {
    
    const user = req.session.userLogged;

    if (user && user.category === 1) {
        return next();
    } else {
        return res.redirect('/you-shall-not-pass!');
    }
    
}

module.exports = adminMiddleware;