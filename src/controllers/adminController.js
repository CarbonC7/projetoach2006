const express = require('express');
const adminRouter = express.Router();

module.exports = (csrfProtection) => {

    adminRouter.use((req, res, next) => {
        if (!req.user) return res.status(401).redirect('/auth/login');
        res.locals.user = { username: req.user.username, email: req.user.email }
        next();
    })

    adminRouter.get("/", (req, res) => res.redirect("/admin/projects"));

    adminRouter.get("/logout", (req, res) => {
        if (req.user) {
            req.logOut();
            res.redirect("/auth/login");
        } else {
            res.status(401).redirect("/auth/login");
        }
    })

    adminRouter.get("/projects", (req, res) => {
        res.render('admin/projects/all_projects', {
            sucess: true
        })
    })


    return adminRouter;
}