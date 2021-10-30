const express = require('express');
const passport = require('passport');
require("../services/passport")

const authRouter = express.Router();

module.exports = (csrfProtection) => {
    /* Rota para logout */
    authRouter.get("/logout", (req, res) => {
        if (req.user) {
            req.logOut();
            res.redirect("/auth/login");
        } else {
            res.status(401).redirect("/auth/signin");
        }
    });

    /* Middleware para redirecionar para dashboard de administração caso ele esteja logado */
    authRouter.use((req, res, next) => req.user ? res.redirect("/admin/dashboard"): next())

    /* Rota para login */
    authRouter.route('/login').get(csrfProtection, (req, res) => {
        res.locals.message = req.flash("error")[0];
        res.render('auth/login', { 
            layout: null, 
            csrfToken: req.csrfToken(),
    
        });
    }).post(csrfProtection, (req, res, next) => {
        passport.authenticate('local', {
            successRedirect: "/admin/projects",
            failureRedirect: "/auth/login",
            failureFlash: true
        })(req, res, next);
    })

    return authRouter;
}