const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'brianlai',
    password: '123',
    host: 'localhost',
    port: 5432,
    database: 'waultdb'
});

module.exports = pool;