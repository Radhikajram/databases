const mysql = require('mysql2');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
});

con.connect(function(err) {
  if (err) throw err;
  console.log('Connected!');
});

//Select from country table where capital is 1109

con.execute('select * from `country` where `capital`= ?', ['1109'], (err, results, fields) => {
  console.log(results);
  con.unprepare('select * from `country` where `capital`= ?');
});

con.execute(
  'select * from `countrylanguage` where `countrycode`= ?',
  ['swe'],
  (err, results, fields) => {
    console.log(results);
    con.unprepare('select * from  `countrylanguage` where `countrycode`= ?');
  },
);

con.execute(
  'select count(name) from city,countrylanguage where city.countrycode = countrylanguage.countrycode and language = ?',
  ['Swedish'],
  function(err, results, fields) {
    console.log(results);
  },
);

con.execute(
  'select continent,count(language) from country a ,countrylanguage b where a.code= b.countrycode group by a.continent',
  function(err, results, fields) {
    console.log(results);
    con.close();
  },
);
