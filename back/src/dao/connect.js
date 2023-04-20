const mysql = require('mysql')

const con = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    database: 'vendas',
    timezone: 'utc'
})

module.exports = con