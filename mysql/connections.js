let mysql = require('mysql');
let config = require('../config/config.json');

let pool      =    mysql.createPool({
    connectionLimit : config.mysql.connectionLimit,
    host     : config.mysql.host,
    user     : config.mysql.user,
    password : config.mysql.password,
    database : config.mysql.database,
    debug    :  false
});

module.exports = pool;