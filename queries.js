var Pool = require('pg').Pool;
var pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'hw_8',
  password: '12345678',
  port: 5432,
});

module.exports = pool;
