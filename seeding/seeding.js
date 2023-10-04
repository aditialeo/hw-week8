const fs = require('fs');
const pool = require('../queries.js');

const seedQuery = fs.readFileSync('seeding/seeding.sql', { encoding: 'utf8' });
pool.query(seedQuery, (err, res) => {
  console.log(err, res);
  console.log('Seeding Completed!');
  pool.end();
});

