require('dotenv').config()
const express = require('express')
const handlebars = require('./config/handlebars')
const passport = require('passport');
const flash = require('connect-flash')
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');

const app = express()

const csrfProtection = csrf({cookie: true});

app.use(express.static('./src/assets'))
app.set('views', './src/views')
app.set('view engine', '.hbs')

app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({}));

app.use(cookieSession({maxAge: 4 * 60 * 60 * 1000, keys: [process.env.COOKIE_KEY]}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.engine('.hbs', handlebars)

app.get('/', (req, res) => {
    res.redirect('/auth/login')
});

app.use("/admin", require("./src/controllers/adminController")(app))
app.use("/auth", require("./src/controllers/authController")(csrfProtection))

const PORT = process.env.PORT || 3000;
app.listen(PORT , async () => {
    console.log(`Listening on port ${PORT}`)
})
