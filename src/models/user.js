const db = require('../../config/config.js')

const User = {};

User.create = (email, name, password) => {
    return db.none('INSERT into users(email, name, password) VALUES ($1, $2, $3)', [email, name, password]);
}

User.get = (email) =>  {
    if (email) {
        return db.any('SELECT * from users WHERE email = $1', [email]).then((data) => data[0]);
    } else {
        return db.any('SELECT * from users');
    }
}

User.update = (name, password, email) => {
    return db.none('UPDATE users SET name = $2, password = $3 WHERE email = $1', [email, name, password]); 
}

User.delete = (email) => {
    return db.none('DELETE from users WHERE email = $1', email)
}


module.exports = User;