const handlebars = require('express-handlebars');

module.exports = handlebars({
    defaultLayout: 'admin-panel',
    layoutsDir: 'src/views',
    helpers: {
        is: (a, b, opts) => {
            if (a == b) return opts.fn(this)
            else return opts.inverse(this)
        }
    },
    extname: '.hbs'
})