const mysql = require('mysql2')

const conexao = mysql.createConnection({
    host: 'localhost',
    porta: 3306,
    user: 'root',
    password: '1234',
    database: 'agenda-petshop'
})

module.exports = conexao