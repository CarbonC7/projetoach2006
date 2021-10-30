const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const moment = require('moment')
const User = require('../models/user')

// TODO aplicar função hash nas senhas

passport.use(
    new LocalStrategy(
        {
            usernameField: 'inputEmail',
            passwordField: 'inputPassword',
            pressReqToCallback: true
        },
        async (inputEmail, inputPassword, done) => {
            const user = await User.get(inputEmail);
            if (!user) return done(null, false, {message: "Usuário não existe"});
            if (user.password != inputPassword) return done(null, false, {message: "Senha incorreta"});
            console.log(`User ${user.username} logged in at ${moment().format('DD/MM/YYYY HH:mm')}`)
            return done(null, user);
        }
    )
)

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
})