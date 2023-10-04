# Express JS dan Integrasi Database

Penggunaan Express JS
● Pengintegrasian database di dalam Express JS
● Penggunaan seeding dan migrasi pada database

# import databse 
-buka server di pgadmin lalu create
-create DB dengan nama (hw_8)
-Restore hw_8 dengan file yg telah didownload yaitu file tar lalu import dan restore

## lalu hubungkan js dengan db 
- dengan cara 
    var Pool = require('pg').Pool;
    var pool = new Pool({
     user: 'postgres',
    host: 'localhost',
     database: 'hw_8',
     password: '12345678',
    port: 5432,
    });
module.exports = pool;

## proses install selesai pada library migrasi
buat file baru bernama database.json
{
    "dev": {
      "driver": "pg",
      "user": "postgres",
      "password": "12345678",
      "host": "localhost",
      "database": "hw_8",
      "port": "5432"
    }
  }

## seeding menambahkan data awal pada database sebelum aplikasi dijalankan

-seeding.sql
//  menambahkan 5 data baru pada tabel actor

INSERT INTO actor (actor_id, first_name, last_name, last_update)
VALUES
(201, 'Leo', 'Aditia', '2023-10-4 18:06:00'),
(202, 'Layla', 'Nana', '2023-10-4 19:32:00'),
(203, 'Lancelot', 'Mia', '2023-10-4 20:07:00'),
(204, 'Yuzhong', 'Alucard', '2023-10-4 22:09:00'),
(205, 'Grock', 'Kaja', '2023-10-4 12:40:00');

//  menambahkan 5 data baru pada tabel actor
  
-seeding.js
const fs = require('fs');
const pool = require('../queries.js');

const seedQuery = fs.readFileSync('seeding/seeding.sql', { encoding: 'utf8' });
pool.query(seedQuery, (err, res) => {
  console.log(err, res);
  console.log('Seeding Completed!');
  pool.end();
});
//digabungkan dengan query.js dan memasukan seeding.sql


## migration adalah fitur pembuatan atau perubahan pada tabel-tabel di database aplikasi kita

- 20231004145604-initialization-down.sql
    ALTER TABLE actor
    DROP COLUMN age;
- 20231004145604-initialization-up
    ALTER TABLE actor
    ADD COLUMN age NUMERIC;
-20231004145604-initialization.js
  'use strict';

var dbm;
var type;
var seed;
var fs = require('fs');
var path = require('path');
var Promise;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
  Promise = options.Promise;
};

exports.up = function(db) {
  var filePath = path.join(__dirname, 'sqls', '20231004145604-initialization-up.sql');
  return new Promise( function( resolve, reject ) {
    fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
      if (err) return reject(err);
      console.log('received data: ' + data);

      resolve(data);
    });
  })
  .then(function(data) {
    return db.runSql(data);
  });
};

exports.down = function(db) {
  var filePath = path.join(__dirname, 'sqls', '20231004145604-initialization-down.sql');
  return new Promise( function( resolve, reject ) {
    fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
      if (err) return reject(err);
      console.log('received data: ' + data);

      resolve(data);
    });
  })
  .then(function(data) {
    return db.runSql(data);
  });
};

exports._meta = {
  "version": 1
};


// ini kita bisa gunakan setelah melakukan pengninstalan migrasi library secara global dan melakukan create initialization sql file. 

## Run Locally

Install dependencies

```bash
  npm init
  npm install --save express
  npm install -g nodemon 
  npm install --save pg ->  penghubung aplikasi   Express dengan database.
  npm install -g db-migrate -> untuk melakukan migrasi
  npm install -g db-migrate-pg ->  untuk melakukan migrasi
```

Start the server

```bash
  npm run start -> untuk melakukan running 

  localhost:3000 -> maka aplikasi akan berjalan
  di url http://localhost:3000 

  
```

