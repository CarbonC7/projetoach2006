const promise = require('bluebird')

const options = {
    promiseLib: promise,
    query: (e) => {
        // console.log(e.query)
    }
}

const pgp = require('pg-promise')(options)
const db = pgp(process.env.DATABASE_URL)
db.connect()
module.exports = db